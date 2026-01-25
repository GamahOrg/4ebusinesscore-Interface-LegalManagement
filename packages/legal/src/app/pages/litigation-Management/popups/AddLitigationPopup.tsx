import { AddPopup } from "@4eplatform/shared/src/popups/AddPopup";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import { fetchCauseTitles } from "../../../features/causes";
import {
  addChangeCauseStage,
  fetchAllCauseStages,
  fetchCauseStageNameByCauseId,
} from "../../../features/cause-stage";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignMember } from "../../../features/members";
import { useForm } from "react-hook-form";
import {
  LitigationProps,
  LitigationSchema,
} from "../../../validations/add-Litigation-Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AssignationType,
  CauseStageStatus,
  LitigantStatus,
} from "../../../models/LegalEnums";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { Spinner } from "react-bootstrap";
import { RootState } from "../../../store/store";
import { CauseStageNameModel } from "../../../models/CauseStageNameModel";

interface ChangeLitigationLevelPopupProps {
  show: boolean;
  handleClose: () => void;
  pageIndex: number;
  pageSize: number;
  searchTerm: string;
  selectedCause: string;
  selectedDegree: string;
}
interface Supervisor {
  id: string;
  userId: string;
  assignationType: AssignationType;
  fullName: string;
  stages: (
    | string
    | { lk_StageNameAr: string; lk_StageNameEn: string; sessionIds: string[] }
  )[];
}

const AddLitigationPopup = ({
  show,
  handleClose,
  pageIndex,
  pageSize,
  searchTerm,
  selectedCause,
  selectedDegree,
}: ChangeLitigationLevelPopupProps) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [selectedCase, setSelectedCase] = useState("");
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [causeTitles, setCauseTitles] = useState<any>([]);
  const [causeTitleId, setCauseTitleId] = useState<any>("");
  const [currentCause, setCurrentCause] = useState<any[]>([]);
  const [lastCause, setLastCause] = useState<any>({
    lK_Stage: { nameAr: "", nameEn: "" },
  });
  const [loading, setLoading] = useState(false);
 const [causeDate, setCauseDate] = useState<any>(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    setError,
    reset,
    formState: { errors },
  } = useForm<LitigationProps>({
    resolver: yupResolver(LitigationSchema),
    mode: "all",
    reValidateMode: "onSubmit",
  });
  let formValues = watch();
  let language = intl.locale;

  const selectedCauseId = watch("causeId");

  let changeCauseStage = (formValues: LitigationProps) => {
        if(         
        ( lastCause?.lk_StageNameAr == "دراسة"
      || lastCause?.lk_StageNameEn == "Study")
          && causeDate==null){
       return;
    }
  setLoading(true);
    let formData = new FormData();
    formData.append("causeId", formValues.causeId);
    formData.append("causeStageNumber", formValues.causeStageNumber);
    formData.append("lK_StageId", String(formValues.lk_StageId));
    formData.append("redirector", String(formValues.Redirector));
    formData.append("superVisorId", formValues.superVisorId);
    // formData.append("CauseDate",
    //           ( lastCause?.lk_StageNameAr == "دراسة"
    //   || lastCause?.lk_StageNameEn == "Study") ? causeDate : null);
        if(lastCause?.lk_StageNameAr == "دراسة"|| lastCause?.lk_StageNameEn == "Study")
      {
       formData.append("CauseDate", causeDate);
      }
      if(formValues?.causeStageNumber &&formValues.causeStageNumber.length>50){
          showAlert(false, "CaseNumberTooLong", intl, () => {});
          setLoading(false);
          return;
      }
    dispatch(addChangeCauseStage(formData) as any).then((res) => {
      if (res?.payload?.statusEnum == 1 || res?.payload?.statusEnum == 3) {
        showAlert(true, "AddedSuccessfully", intl, () => {
          resetForm();
          dispatch(
            fetchAllCauseStages({
              ...(searchTerm && { searchWord: searchTerm }),
              ...(!searchTerm && !selectedCase && !selectedDegree
                ? { pagesize: pageSize, pageIndex: pageIndex }
                : { pagesize: "10000", pageIndex: "1" }),

              ...(selectedCause && { causeId: selectedCause }),
              ...(selectedDegree && { lK_StageId: selectedDegree }),
            }) as any
          );
          setLoading(false);
          handleClose();
        });
      } else if (res?.payload?.message == "CauseStags Not Fish yet") {
        setLoading(false);
        showAlert(false, "CauseStagsNotFinishedYet", intl, () => {});
      } else if (res?.payload?.message == "[\"Cause Number Already Exists\"]") {
        setLoading(false);
        showAlert(false, "CauseNumberAlreadyExists", intl);
      } 
       else if (res?.payload?.message == "CauseStageIsFaildToAdd") {
        setLoading(false);
        showAlert(false, res?.payload?.messsage, intl, () => {});
      }
       else if (res?.payload?.message) {
        setLoading(false);
        showAlert(false, res?.payload?.messsage, intl, () => {
          handleClose();
        });
      }
    });
  };

  let newCases = useSelector((state: RootState) => state.lkSatge.lkStages);

  let [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [notFoundSuperVisors, setNotFoundSuperVisors] = useState("");

  useEffect(() => {
    const fetchTitles = async () => {
      const response = await dispatch(fetchCauseTitles({}) as any);
      setCauseTitles(response.payload.result);
    };
    fetchTitles();
  }, [dispatch]);

  const fetchCurrentCause = async (causeTitleId: string) => {
    if (causeTitleId) {
      const response = await dispatch(
        fetchCauseStageNameByCauseId(causeTitleId) as any
      ).unwrap();
      setCurrentCause(response?.result);
    }
  };

  const fetchSupervisor = async (causeTitleId: string) => {
    await dispatch(
      fetchAssignMember({
        causeId: causeTitleId,
        assignationType: AssignationType.Supervisor,
      }) as any
    ).then((res) => {
      setSupervisors(res?.payload?.result?.supervisor);
      if (
        res?.payload?.result?.supervisor?.length == 0 ||
        !res?.payload?.result?.supervisor
      ) {
        setNotFoundSuperVisors("NotFoundMembers");
      } else {
        setNotFoundSuperVisors("");
      }
    });
  };
  useEffect(() => {
    if (selectedCauseId) {
      setCauseTitleId(selectedCauseId);
    }
  }, [selectedCauseId]);

  useEffect(() => {
    if (causeTitleId) {
      fetchSupervisor(causeTitleId);
      fetchCurrentCause(causeTitleId);
    }
  }, [causeTitleId]);

  useEffect(() => {
    if (currentCause?.length > 0) {
      const lastCauseItem =
        currentCause?.length > 0
          ? currentCause.findLast((cause: CauseStageNameModel) => cause)
          : null;
      // currentCause?.length > 0
      //   ? currentCause.findLast(
      //       (cause: CauseStageNameModel) =>
      //         cause?.causeStageStatus === CauseStageStatus.IsFinished
      //     ) ||
      //     currentCause.findLast(
      //       (cause: CauseStageNameModel) =>
      //         cause?.causeStageStatus === CauseStageStatus.IsActive
      //     )
      //   : null;
      setLastCause(lastCauseItem);
    }
  }, [currentCause]);

  useEffect(() => {
    setValue("causeId", "");
  }, []);

  const resetForm = () => {
    reset({
      causeId: "",
      lk_StageId: undefined,
      causeStageNumber: undefined,
      Redirector: undefined,
      superVisorId: undefined,
    });
    setSelectedCase("");
    setCauseTitleId("");
    setCurrentCause([]);
    setLastCause({});
    setLoading(false);
  };
  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center w-100">
            {" "}
            {intl.formatMessage({ id: "AddLitigation" })}
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(changeCauseStage)}>
          <Modal.Body>
            <div className="bg-gray-100 px-10 py-5 rounded">
              <div className="row">
                <div className="mb-5">
                  <h2>{intl.formatMessage({ id: "TheCase" })}</h2>
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                  <div className="">
                    <label className="mb-2 required">
                      {intl.formatMessage({ id: "Name" })} /{" "}
                      {intl.formatMessage({ id: "Casenumber" })}
                    </label>
                 <select {...register("causeId")} className="form-select">
                    <option value="">
                      {intl.formatMessage({ id: "Choose" })}
                    </option>
                    {causeTitles?.map((cause: any, index: number) => {
                      const label = cause?.title || "";
                      const shortLabel = label.length > 10 ? `${label.slice(0, 15)}...` : label;

                      return (
                        <option key={cause?.id + index} value={cause?.id} title={label}>
                          {shortLabel}
                        </option>
                      );
                    })}
                  </select>

                    {DisplayErrorMessage(
                      errors?.causeId?.message,
                      intl,
                      language
                    )}
                    {notFoundSuperVisors == "NotFoundMembers" &&
                      DisplayErrorMessage(
                        "YouMustSelectCauseThatHasSupervisor",
                        intl,
                        language
                      )}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                  <div className="mb-3">
                    <label className="mb-2 required">
                      {intl.formatMessage({ id: "CurrentCase" })}
                    </label>
                    <input
                      type="text"
                      className={"form-control"}
                      placeholder="دعوي#2"
                      value={
                        language === "ar"
                          ? lastCause?.lk_StageNameAr
                          : lastCause?.lk_StageNameEn
                      }
                      readOnly
                    />
                  </div>
                </div>
     {(lastCause?.lk_StageNameAr == "دراسة"
      || lastCause?.lk_StageNameEn == "Study"
      )&& (
     <div className="col-12 col-md-6 col-lg-6 mb-5">
                  <div className="mb-3">
                    <label className="mb-2 required">
                      {intl.formatMessage({ id: "CaseDate" })}
                    </label>
                    <input
                      type="date"
                      className={`form-control`}
                      placeholder={intl.formatMessage({ id: "CaseDate" })}
                     value={causeDate}
                      onChange={(e) => setCauseDate(e.target.value)}
                       onClick={(e) => {
                         
                          const target = e.currentTarget as HTMLInputElement;
                          if (target && typeof target.showPicker === 'function') {
                            target.showPicker();
                          } else {
                        
                            target.focus();
                            target.click();
                          }
                        }}
                        style={{ cursor: 'pointer' }}
                    />
                  </div>
                   {!causeDate && (
                     <div className={`mt-2 d-block text-danger w-100 ${language === "ar" ? "text-right" :"text-left"}`}>
                     {intl.formatMessage({id:"InputFieldIsRequried"})}
                     </div>
                  )}
                </div>
              )}
              </div>
            </div>
            {formValues.causeId !== "" && (
              <div className="px-10 py-5 rounded">
                <div className="row g-5">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-10">
                    <label className="mb-2 required">
                      {intl.formatMessage({ id: "NewCase" })}
                    </label>
                    <select
                      className="form-select bg-gray-100"
                      {...register("lk_StageId")}
                    >
                      <option value={""}>
                        {intl.formatMessage({ id: "Choose" })}
                      </option>
                      {newCases?.length > 0 &&
                newCases
                  ?.filter((ele:any) => {
                    return ele?.isStudy == false    
                  })
                      ?.map((newCase: any, index) => {
                        return (
                          <option key={newCase?.id} value={newCase?.id}>
                            {language === "ar"
                              ? newCase?.nameAr
                              : newCase?.nameEn}
                          </option>
                        );
                      })}
                    </select>
                    {DisplayErrorMessage(
                      errors?.lk_StageId?.message,
                      intl,
                      language
                    )}
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-10">
                    <label
                      htmlFor="degreeName"
                      className="form-label mb-3 required fs-5 fw-bold"
                    >
                      {intl.formatMessage({ id: "Casenumber" })} /{" "}
                      {intl.formatMessage({ id: "CaseNumber" })}  
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={intl.formatMessage({ id: "CaseNumber" })}
                      {...register("causeStageNumber")}
                    />
                    {DisplayErrorMessage(
                      errors?.causeStageNumber?.message,
                      intl,
                      language
                    )}
                  </div>

                  <div className="col-12 col-md-6 col-lg-6 col-sm-3">
                    <label className="mb-2 required">
                      {intl.formatMessage({
                        id: "ResponsibleForMovingTheCase",
                      })}
                    </label>
                    <div className="bg-gray-100 px-4 py-4 rounded d-flex  gap-2">
                      <div className="d-flex align-items-center gap-2">
                        <input
                          className="form-check-input widget-9-radio xRadioBg"
                          type="radio"
                          id="Clients"
                          value={LitigantStatus.Client}
                          {...register("Redirector")}
                        />
                        <label className="fs-7">
                          {intl.formatMessage({ id: "Clients" })}
                        </label>
                      </div>
                      <div className="d-flex align-items-center me-4 gap-2">
                        <input
                          className="form-check-input widget-9-radio xRadioBg"
                          type="radio"
                          {...register("Redirector")}
                          id="Opponents"
                          value={LitigantStatus.Opponent}
                        />
                        <label className="fs-7">
                          {intl.formatMessage({ id: "Opponents" })}
                        </label>
                      </div>
                    </div>
                    {DisplayErrorMessage(
                      errors?.Redirector?.message,
                      intl,
                      language
                    )}
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-10">
                    <label className="mb-2 required">
                      {intl.formatMessage({ id: "Manager" })}
                    </label>
                    <select
                      className="form-select bg-gray-100"
                      {...register("superVisorId")}
                    >
                      <option value={""}>
                        {intl.formatMessage({ id: "Choose" })}
                      </option>
                      {supervisors?.map((supervisor: Supervisor, index) => {
                        return (
                          <option
                            key={supervisor?.userId + index}
                            value={supervisor?.userId}
                          >
                            {supervisor?.fullName}
                          </option>
                        );
                      })}
                    </select>
                    {DisplayErrorMessage(
                      errors?.superVisorId?.message,
                      intl,
                      language
                    )}
                  </div>
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-end gap-2 border-0">
            <button
              type="button"
              onClick={() => {
                resetForm();
                handleClose();
              }}
              className="btn btn-secondary px-5"
              style={{
                borderRadius: "8px",
                minWidth: "120px",
              }}
            >
              {intl.formatMessage({ id: "Cancel" })}
            </button>

            {!loading ? (
              <button
                type="submit"
                className="btn px-5 btn btn-success text-white"
                style={{
                  borderRadius: "8px",
                  minWidth: "120px",
                }}
              >
                {intl.formatMessage({ id: "Change" })}
              </button>
            ) : (
              <Button variant="success" disabled className="px-15 w-50">
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="mx-2"
                />
                <span>{intl.formatMessage({ id: "Adding" })}</span>
              </Button>
            )}
          </Modal.Footer>
        </form>
      </Modal>
      {modalShow && (
        <AddPopup show={modalShow} handleClose={() => setModalShow(false)} />
      )}
    </>
  );
};

export default AddLitigationPopup;
