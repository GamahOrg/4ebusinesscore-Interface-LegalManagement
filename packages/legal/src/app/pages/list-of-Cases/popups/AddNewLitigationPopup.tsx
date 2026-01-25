import { AddPopup } from "@4eplatform/shared/src/popups/AddPopup";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootState, useAppDispatch } from "../../../store/store";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import {
  AddCaseValidationProps,
  CaseValidationSchema,
} from "../validations/AddCaseValidationSchema";
import { addChangeCauseStage } from "../../../features/cause-stage";
import { fetchAllLKStage } from "../../../features/stage";
import { fetchAssignMember } from "../../../features/members";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { fetchCauseById } from "../../../features/cause";
import { useLocation } from "react-router-dom";

interface ChangeLitigationLevelPopupProps {
  show: boolean;
  handleClose: () => void;
  causeId: any;
  causeStagesDispatched?: any;
  comeFrom?: string;
  callingData?: any;

  selectedCauseStageId?: any;
  setSelectedCauseStageId?: any;
}

const AddNewLitigationPopup = ({
  causeStagesDispatched,
  causeId,
  show,
  handleClose,
  comeFrom,
  callingData,
  selectedCauseStageId,
  setSelectedCauseStageId,
}: ChangeLitigationLevelPopupProps) => {
  const dispatch = useAppDispatch();
  let [loading, setLoading] = useState(false);
  let location = useLocation();
  const intl = useIntl();
  const [allCauses, setAllCauses] = useState([]);
  const [superVisor, setSuperVisor] = useState([]);
  const [modalShow, setModalShow] = useState<boolean>(false);

  let language = intl.locale;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm<AddCaseValidationProps>({
    resolver: yupResolver(CaseValidationSchema),
    mode: "all",
  });

  const lkStage = watch("Lk_StageId");

  const fetchNewCases = async () => {
    let response = await dispatch(fetchAllLKStage({}) as any);
    setAllCauses(response.payload.result);
  };
  const [notFoundSuperVisors, setNotFoundSuperVisors] = useState("");

  const fetchSupervisor = async (causeTitleId: number) => {
    let response = await dispatch(
      fetchAssignMember({ causeId: causeTitleId, assignationType: 2 }) as any
    );
    if (response.payload.message == "NotFoundMember") {
      setNotFoundSuperVisors("NotFoundMember");
    }
    setSuperVisor(response.payload.result?.supervisor);
  };
  useEffect(() => {
    if (show) {
      fetchNewCases();
    }
  }, [show]);

  useEffect(() => {
    if (show && causeId) {
      fetchSupervisor(causeId);
    }
  }, [show, causeId]);
  const [causeDate, setCauseDate] = useState<any>(null);

  useEffect(() => {
    if (lkStage === "1") {
      setValue("CauseStageNumber", null, { shouldValidate: true });
    }
  }, [lkStage]);

  const onSubmit = async (formValues: any) => {
    if (lastCause?.lK_Stage?.isStudy && causeDate == null) {
      return;
    }
    let formData = new FormData();
    formData.append("CauseId", causeId);
    formData.append("CauseStageNumber", formValues.CauseStageNumber);
    formData.append("Lk_StageId", formValues.Lk_StageId);
    formData.append("SuperVisorId", formValues.SuperVisorId);
    formData.append("Redirector", String(Number(formValues.Redirector)));
    // formData.append("CauseDate",lastCause?.lK_Stage?.isStudy ? causeDate : null);
    if (lastCause?.lK_Stage?.isStudy) {
      formData.append("CauseDate", causeDate);
    }
    setLoading(true);
    if (
      formValues.CauseStageNumber &&
      formValues.CauseStageNumber.length > 50
    ) {
      showAlert(false, "CaseNumberTooLong", intl, () => {});
      setLoading(false);
      return;
    }
    dispatch(addChangeCauseStage(formData) as any).then((res) => {
      if (res?.payload?.statusEnum == 1 || res?.payload?.statusEnum == 3) {
        setLoading(false);

        // Reset form immediately
        reset({
          CauseStageNumber: "",
          Lk_StageId: "",
          SuperVisorId: "",
          Redirector: "2",
        });

        // Close modal
        handleClose();

        // Show success alert
        showAlert(true, "CauseStageIsChangedSuccessfully", intl, () => {
          // Add a small delay to ensure server processing is complete
          setTimeout(() => {
            if (location.pathname?.includes("cases-view")) {
              callingData();
              return;
            }

            setSelectedCauseStageId(res?.payload?.result);

            // Fetch updated cause data
            dispatch(fetchCauseById(causeId) as any)
              .then((result) => {
                if (result?.payload?.statusEnum === 1) {
                  if (comeFrom && comeFrom === "list-of-Cases" && callingData) {
                    callingData();
                  } else if (
                    comeFrom &&
                    comeFrom === "litigation-stages" &&
                    callingData
                  ) {
                    callingData();
                  }
                }
              })
              .catch((error) => {
                console.error("Error fetching cause data:", error);
                // Still call the callback even if fetch fails
                if (comeFrom && comeFrom === "list-of-Cases" && callingData) {
                  callingData();
                } else if (
                  comeFrom &&
                  comeFrom === "litigation-stages" &&
                  callingData
                ) {
                  callingData();
                }
              });
          }, 500); // Increased delay to ensure server processing
        });
      } else if (res?.payload?.message == "CauseStags Not Fish yet") {
        setLoading(false);
        showAlert(false, "CauseStagsNotFinishedYet", intl);
      } else if (res?.payload?.message == "don't have permission to add ") {
        setLoading(false);
        showAlert(false, "YouDontHavePermission", intl);
      } else if (res?.payload?.message == '["Cause Number Already Exists"]') {
        setLoading(false);
        showAlert(false, "CauseNumberAlreadyExists", intl);
      } else if (
        res?.payload?.message ==
        "CauseStatus Is Pending, You Can't add CauseStage"
      ) {
        setLoading(false);
        showAlert(false, "CauseStatusIsPendingCannotAddCauseStage", intl);
      } else {
        setLoading(false);
        showAlert(false, res?.payload?.message, intl);
      }
    });
  };

  let { causeStages } = useSelector((state: RootState) => {
    return state?.causes?.causeById;
  });

  useEffect(() => {
    if (comeFrom && comeFrom === "list-of-Cases" && causeId) {
      dispatch(fetchCauseById(causeId) as any);
    }
  }, [causeId, comeFrom]);

  let lastCause =
    comeFrom && comeFrom === "list-of-Cases"
      ? causeStages[causeStages.length - 1]
      : causeStagesDispatched[causeStagesDispatched.length - 1];

  useEffect(() => {
    setValue("Redirector", "2");
    setValue("Lk_StageId", "1");

    if (!show) {
      setCauseDate(null);
    }
  }, [show]);

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center w-100">
            {" "}
            {intl.formatMessage({ id: "AddNewLitigation" })}
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="py-5">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-6 mb-5">
                  <div className="mb-3">
                    <label className="mb-2 required">
                      {intl.formatMessage({ id: "Degree" })}
                    </label>
                    <input
                      type="text"
                      className={`form-control`}
                      readOnly
                      disabled
                      value={
                        language === "ar"
                          ? lastCause?.lK_Stage.nameAr
                          : lastCause?.lK_Stage.nameEn
                      }
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6 mb-5">
                  <div className="mb-3">
                    <label className="mb-2 required">
                      {intl.formatMessage({ id: "To" })}
                    </label>
                    <select className="form-select" {...register("Lk_StageId")}>
                      <option value="" disabled selected>
                        {intl.formatMessage({ id: "Choose" })}
                      </option>
                      {allCauses?.length > 0 &&
                        allCauses
                          // ?.filter((ele: any) => {
                          //   return ele?.isStudy == false;
                          // })
                          ?.map((item: any, index: number) => (
                            <option key={index} value={item?.id?.toString()}>
                              {language === "ar" ? item?.nameAr : item?.nameEn}
                            </option>
                          ))}
                    </select>
                    {DisplayErrorMessage(
                      errors?.Lk_StageId?.message,
                      intl,
                      intl.locale
                    )}
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-6 mb-5">
                  <div className="mb-3">
                    <label className="mb-2 required">
                      {intl.formatMessage({
                        id: "ResponsibleForMovingTheCase",
                      })}
                    </label>
                    <div className="border px-6 py-4 rounded d-flex align-items-center gap-6">
                      <div className="d-flex align-items-center gap-2 form-check form-check-custom form-check-solid form-check-md">
                        <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                          <input
                            className="form-check-input widget-9-radio xRadioBg"
                            type="radio"
                            value={"2"}
                            {...register("Redirector")}
                          />
                        </div>

                        <label className="fs-6">
                          {intl.formatMessage({ id: "Clients" })}
                        </label>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                          <input
                            className="form-check-input widget-9-radio xRadioBg"
                            type="radio"
                            value={"1"}
                            {...register("Redirector")}
                          />
                        </div>
                        <label className="fs-6">
                          {intl.formatMessage({ id: "Opponents" })}
                        </label>
                      </div>
                    </div>
                    {DisplayErrorMessage(
                      errors?.Redirector?.message,
                      intl,
                      intl.locale
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6 mb-5">
                  <div className="mb-3">
                    <label className="mb-2 required">
                      {intl.formatMessage({ id: "Manager" })}
                    </label>
                    <select
                      className={`form-select`}
                      {...register("SuperVisorId")}
                    >
                      <option value={""} disabled selected>
                        {intl.formatMessage({ id: "Choose" })}
                      </option>
                      {superVisor?.map((supervisor: any) => {
                        return (
                          <option
                            key={supervisor?.id + "-" + supervisor?.userId}
                            value={supervisor?.userId}
                          >
                            {supervisor?.fullName}
                          </option>
                        );
                      })}
                    </select>
                    {DisplayErrorMessage(
                      errors?.SuperVisorId?.message,
                      intl,
                      intl.locale
                    )}
                    {notFoundSuperVisors == "NotFoundMember" ? (
                      <div className="text-danger">
                        {intl.formatMessage({ id: "notFoundMember" })}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                {lkStage !== "1" && (
                  <div className="col-12 col-md-6 col-lg-6 mb-5">
                    <div className="mb-3">
                      <label className="mb-2 required">
                        {intl.formatMessage({ id: "CaseNumber" })}
                      </label>
                      <input
                        type="text"
                        className={`form-control`}
                        placeholder={intl.formatMessage({ id: "CaseNumber" })}
                        {...register("CauseStageNumber")}
                      />
                      {DisplayErrorMessage(
                        errors?.CauseStageNumber?.message,
                        intl,
                        intl.locale
                      )}
                    </div>
                  </div>
                )}
                {lastCause?.lK_Stage?.isStudy && (
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
                          // Make the entire input clickable to open calendar
                          const target = e.currentTarget as HTMLInputElement;
                          if (
                            target &&
                            typeof target.showPicker === "function"
                          ) {
                            target.showPicker();
                          } else {
                            // Fallback: focus the input to trigger calendar
                            target.focus();
                            target.click();
                          }
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    {!causeDate && (
                      <div
                        className={`mt-2 d-block text-danger w-100 ${
                          language === "ar" ? "text-right" : "text-left"
                        }`}
                      >
                        {intl.formatMessage({ id: "InputFieldIsRequried" })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-end gap-2 border-0">
            <button
              type="button"
              onClick={() => {
                handleClose();
                reset({
                  CauseStageNumber: "",
                  Lk_StageId: "",
                  SuperVisorId: "",
                  Redirector: "2",
                });
                setCauseDate(null);
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
              <>
                <button
                  className="btn px-5 btn btn-success text-white"
                  type="submit"
                  style={{
                    borderRadius: "8px",
                    minWidth: "120px",
                  }}
                >
                  {intl.formatMessage({ id: "Change" })}
                </button>
              </>
            ) : (
              <Button variant="success" disabled className="px-15 w-25">
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
        <div className="modal fade">
          <AddPopup
            show={modalShow}
            handleClose={() => setModalShow(false)}
            handleCloseMainPopup={() => handleClose()}
          />
        </div>
      )}
    </>
  );
};
export default AddNewLitigationPopup;
