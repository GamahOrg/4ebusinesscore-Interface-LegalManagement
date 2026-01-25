import { Button, Col, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import AddDocumentPopup from "./AddDocumentPopup";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { useDispatch, useSelector } from "react-redux";
import { fetchCauseTitles } from "../../../features/causes";
import {
  fetchAllCauseStages,
  fetchCauseStageById,
} from "../../../features/cause-stage";
import { AppDispatch, RootState } from "../../../store/store";
import {
  fetchSessionById,
  fetchSessionByIdParams,
  UpdateSession,
} from "../../../features/session";
import { LegalRootUrl } from "@4eplatform/shared/apis/legal";
import AddDocToEditCausePopup from "../components/edit-case/popups/AddDocToEditCause";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { AssignationType } from "../../../models/LegalEnums";
import { EditSessionCreateValidationSchema } from "../validations/EditSessionCreateValidationSchema";
import getIconSrcError from "@4eplatform/shared/functions/getIconSrcError";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";

interface Lawyer {
  userId: string;
  userName: string;
  userImage?: string;
  isChecked: boolean;
  assignationType: number;
  isInternal?: boolean;
}
interface DataEntry {
  userId: string;
  userName: string;
  userImage?: string;
  isChecked: boolean;
  assignationType: number;
  isInternal?: boolean;
}
interface EditSessionPopupProps {
  show: boolean;
  handleClose: () => void;
  setShowAccordionEdit?: any;
  causeId?: string;
  causeStageId?: string;
  sessionId?: string;
}

const EditSessionPopup = ({
  show,
  handleClose,
  setShowAccordionEdit,
  causeId,
  causeStageId,
  sessionId,
}: EditSessionPopupProps) => {
  const intl = useIntl();
  const dispatch = useDispatch<AppDispatch>();
  const [showDelete, setShowDelete] = useState(false);
  const [step, setStep] = useState(1);

  const [showAddDocumentPopup, setShowAddDocumentPopup] =
    useState<boolean>(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [currentSourceId, setCurrentSourceId] = useState<number>(0);
  const [selectedCauseId, setSelectedCauseId] = useState<string>(causeId || "");
  const [selectedCauseStageId, setSelectedCauseStageId] = useState<string>(
    causeStageId || ""
  );

  const [uploadedFiles, setUploadedFiles] = useState<{
    clients: File[];
    opponents: File[];
    court: File[];
  }>({
    clients: [],
    opponents: [],
    court: [],
  });

  const language = intl.locale;

  useEffect(() => {
    dispatch(fetchCauseTitles({}));
  }, [dispatch, sessionId]);

  // handleLawyers&DataEntry
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [dataEntry, setDataEntry] = useState<DataEntry[]>([]);
  const [assignee, setAssignee] = useState([]);
  useEffect(() => {
    if (causeId && sessionId && show) {
      const data = {
        id: sessionId,
        params: {
          CauseId: causeId,
        },
      };

      dispatch(fetchSessionByIdParams(data)).then((res: any) => {
        const assignees = res?.payload?.result?.sessionAssigneeDto;
        setAssignee(assignees);
        const lawyersWithType3 = assignees?.filter(
          (item: any) => item.assignationType === AssignationType.Lawyers
        );
        setLawyers(lawyersWithType3);
        const dataEntryWithType4 = assignees?.filter(
          (item: any) => item.assignationType === AssignationType.DataEntry
        );
        setDataEntry(dataEntryWithType4);
      });
    }
  }, [dispatch, causeId, sessionId, show]);
  const handleDataentryCheckboxChange = (
    dataEntryId: string,
    checked: boolean
  ) => {
    setDataEntry((prevDataEntry) =>
      prevDataEntry.map((ele: any) =>
        ele.userId === dataEntryId ? { ...ele, isChecked: checked } : ele
      )
    );
  };
  const handleLawyerCheckboxChange = (lawyerId: string, checked: boolean) => {
    setLawyers((prevLawyers) =>
      prevLawyers.map((lawyer) =>
        lawyer.userId === lawyerId ? { ...lawyer, isChecked: checked } : lawyer
      )
    );
  };

  const session = useSelector((state : RootState)=> state?.session?.sessionByIdParams)
  // handle new attachments
  const [selectedFilesForAttachments, setSelectedFilesForAttachments] =
    useState<any>([]);
  const [showDocPopup, setShowDocPopup] = useState(false);

  const [indexFile, setIndexFile] = useState<any>(null);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const handleFileDelete = (indexToRemove: any) => {
    const updatedFiles = selectedFilesForAttachments?.filter(
      (file: any, index: any) => index !== indexToRemove
    );
    setSelectedFilesForAttachments(updatedFiles);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    trigger,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(EditSessionCreateValidationSchema),
    defaultValues: {
      causeId: causeId || "",
      causeStageId: causeStageId || "",
      SessionDate: "",
      SessionTime: "",
      CourtName: "",
      AreaName: "",
      Attachments: [],
      Location:"",
    },
  });

  useEffect(() => {
    if (session) {
      setValue("CourtName", session.courtName);
      setValue("AreaName", session.areaName);
      setValue("Location", session.location);
      if (session?.sessionDate) {
        const sessionDate = new Date(session?.sessionDate);
        const year = sessionDate.getFullYear();
         const month = String(sessionDate.getMonth() + 1).padStart(2, "0"); 
         const day = String(sessionDate.getDate()).padStart(2, "0");

        const formatted = `${year}-${month}-${day}`; 
        setValue("SessionDate", formatted);
        setValue(
          "SessionTime",
          `${sessionDate.getHours().toString().padStart(2, "0")}:${sessionDate
            .getMinutes()
            .toString()
            .padStart(2, "0")}`
        );
        setSelectedFilesForAttachments(session?.sessionAttachmentDto)
      }
    }
  }, [session, setValue, trigger]);

  useEffect(() => {
    // Always fetch cause stages, but if causeId is provided, we can use it to filter
    dispatch(fetchAllCauseStages({ causeId: watch("causeId") }));
  }, [dispatch, selectedCauseId, watch("causeId")]);

  let { causeTitles } = useSelector((state: any) => state.causesData);
  let { causeStageProto: causeStages } = useSelector(
    (state: any) => state.causeStages.causeStages
  );

  useEffect(() => {
    if (causeId) {
      setSelectedCauseId(causeId);
      setValue("causeId", causeId);
    }
    if (causeStageId) {
      setSelectedCauseStageId(causeStageId);
      setValue("causeStageId", causeStageId);
    }
  }, [causeId, causeStageId, setValue]);

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await trigger([
      "causeId",
      "causeStageId",
      "SessionDate",
      "SessionTime",
      "AreaName",
      "CourtName",
      "Location"
    ]);
    if (isValid) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("CauseId", selectedCauseId || data.causeId || "");
    formData.append(
      "causeStageId",
      selectedCauseStageId || data.causeStageId || ""
    );
    formData.append("AreaName", data.AreaName);
    formData.append("CourtName", data.CourtName);
   formData.append("Location", data.Location);
    formData.append(
      "SessionDate",
      `${data.SessionDate}T${data.SessionTime}:00`
    );

    const newAttachments = selectedFilesForAttachments?.filter(
      (file: any) => file.attachment && file.attachment.size > 0
    );
    const oldAttachments = selectedFilesForAttachments?.filter(
      (file: any) => !file.attachment
    );
    newAttachments?.forEach((file: any, index: number) => {
     
      formData.append(`Attachments[${index}].attachmentFile`, file?.attachment);
    
      formData.append(
        `Attachments[${index}].lK_AttachmentSourceId`,
        file?.lK_AttachmentSourceId
      );
     
      formData.append(
        `Attachments[${index}].attachmentName`,
        file?.attachmentName || file?.attachment?.name || ''
      );
    });

    oldAttachments?.forEach((file: any, index: number) => {
      formData.append(`OdAttachmenPaths[${index}]`, file?.filePath);
    });
    const dataCheckedLawyers = lawyers
      ?.filter((lawyer: any) => lawyer.isChecked)
      ?.map((lawyer: any) => ({
        userId: lawyer.userId,
        assignationType: AssignationType.Lawyers,
      }));

    const dataCheckedDataEntry = dataEntry
      ?.filter((entry: any) => entry.isChecked)
      ?.map((entry: any) => ({
        userId: entry.userId,
        assignationType: AssignationType.DataEntry,
      }));
      const assigneeLawyersAndDataEntry = [
        ...(dataCheckedLawyers || []),
        ...(dataCheckedDataEntry || []),
      ];
 
    assigneeLawyersAndDataEntry?.forEach((ele: any, index: number) => {

      formData.append(`SessionAssigneeDto[${index}].userId`, ele?.userId);
      formData.append(
        `SessionAssigneeDto[${index}].assignationType`,
        ele?.assignationType
      );
    });
    if (assigneeLawyersAndDataEntry?.length == 0){
      showAlert(false, "MustInsertLawyersAndDataEntry", intl);
      return;
    }
    if (dataCheckedLawyers?.length == 0) {
      showAlert(false, "MustInsertLawyerAssign", intl);
      return;
    }
    if (dataCheckedDataEntry?.length === 0) {
      showAlert(false, "MustInsertDataEntryAssign", intl);
      return;
    }
    dispatch(
      UpdateSession({
        params: {
          Id: sessionId,
        },
        body: formData,
      }) as any
    )
      .unwrap()
      .then((res: any) => {
        setIsSubmitting(false);
        setStep(1);
        setShowAccordionEdit?.(true);
        if (res?.message === "Session Updated Successfully") {
          showAlert(true, "UpdatedSessionSuccessfully", intl, () => {
            if (causeStageId || data.causeStageId) {
              dispatch(
                fetchCauseStageById({
                  causeStageId: causeStageId || data.causeStageId,
                })
              );
            }
            handleClose();
            reset();
            setSelectedCauseId("");
            setSelectedCauseStageId("");
            setUploadedFiles({
              clients: [],
              opponents: [],
              court: [],
            });
          });
        } else if (res?.message === '["Last Session not Finshed "]') {
          showAlert(false, "LastSessionNotFinshed", intl);
        } else if (
          res?.message ===
          '["CauseStage notFound or Finished","Cause not in Progress"]'
        ) {
          showAlert(false, "YouCan'tAddSessionForNotActiveCase", intl);
        } else if (res?.message === '["CauseStage notFound or Finished"]') {
          showAlert(false, "CauseStageNotFoundFinished", intl);
        } else if (
          res?.message === '["cause stage in study"]' ||
          res?.message?.includes("cause stage in study")
        ) {
          showAlert(false, "CauseStageInStudy", intl);
        } else if (
          res?.message ===
          '["Last Session not Finshed ","New Session Must be after the last session date","Session Date can not be before the Cause date"]'
        ) {
          showAlert(false, "SessionValidationMessage", intl);
        } else if (
          res?.message ===
          '["New Session Must be after the last session date","Session Date can not be before the Cause date"]'
        ) {
          showAlert(false, "SessionDateValidationMessage", intl);
        } else if (
          res?.message == "The session date must be after the last session date"
        ) {
          showAlert(false, "SessionDateMustBeAfterTheLastSessionDate", intl);
        } else if (
          res?.message ==
          '["Last Session not Finshed ","New Session Must be after the last session date"]'
        ) {
          showAlert(false, "SessionDateValidationA", intl);
        } else if (
          res?.message ==
          '["CauseStage notFound or Judgment issued","New Session Must be after the last session date"]'
        ) {
          showAlert(false, "SessionDateValidationB", intl);
        } else if (
          res?.message ==
          '["CauseStage notFound or Judgment issued","Cause is  Judgment issued"]'
        ) {
          showAlert(false, "SessionDateValidationC", intl);
        } else if (
          res?.message ==
          '["CauseStage notFound or Judgment issued","Cause is  Judgment issued","New Session Must be after the last session date","Session Date can not be before the Cause date"]'
        ) {
          showAlert(false, "SessionDateValidationD", intl);
        } else if (
          res?.message ==
          '["CauseStage notFound or Judgment issued","Cause is  Judgment issued","Session Date can not be before the Cause date"]'
        ) {
          showAlert(false, "SessionDateValidationD", intl);
        }
        else if (res?.message == "You can't add a session."){
          showAlert(false, "SessionPermission", intl);
                } 
       else if (res?.message == '[\"The session date must be after the cause creation date\"]'){
          showAlert(false, "SessionDateMustBeAfterTheCauseDate", intl);
      }    
      else if (res?.message == '[\"The session date must be after the last session date\"]'){
          showAlert(false, "SessionDateMustBeAfterTheLastSession", intl);
      }
      else if (res?.message =='[\"The session date must be after the last session date\",\"The session date must be after the cause creation date\"]'){
          showAlert(false, "SessionDateMustBeAfterLastSessionDateAndTheCauseCreationDate", intl);
      } else if (res?.message === '["Cannot update session because the cause is either finished or crossed out"]') {
          showAlert(false, "CannotUpdateSessionCauseFinishedOrCrossedOut", intl);
      } else if (
        res?.message?.includes("The following lawyers are already assigned to another") ||
        res?.message?.includes("session within 2 hours") ||
        res?.message?.includes("The following lawyers are already assigned to another session within 2 hours")
      ) {
        showAlert(false, "LawyersAlreadyAssignedWithinTwoHours", intl);
      } else {
          showAlert(false, res?.message, intl, () => {
            handleClose();
          });
        }
      })
      .catch((error: any) => {
        setIsSubmitting(false);
        console.error('Update session error:', error);
      });

    // showAlert(true, "UpdatedSuccessfully", intl, () => {
    //   handleClose();
    // });
    // setStep(1);
    // reset();
    // setSelectedCauseId("");
    // setSelectedCauseStageId("");

    // setUploadedFiles({
    //   clients: [],
    //   opponents: [],
    //   court: [],
    // });
  };

  const theme = localStorage.getItem("Theme");
  const renderStepOne = () => (
    <div className="bg-light rounded p-4">
      {/* Case Info Section */}
      {!causeId && (
        <div className="bg-fix-dark bg-white rounded p-4 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bolder required m-0">
              {intl.formatMessage({ id: "SessionData" })}{" "}
            </h5>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="mb-2 required">
                  {intl.formatMessage({ id: "Name" })} /{" "}
                  {intl.formatMessage({ id: "Casenumber" })}
                </label>
                <select {...register("causeId")} className={"form-select"}>
                  {causeTitles?.map((cause: any) => {
                    return (
                      <option key={cause.id} value={cause.id}>
                        {cause.title}
                      </option>
                    );
                  })}
                </select>
                {errors.causeId && (
                  <div className="text-danger mt-1">
                    {intl.formatMessage({ id: "InputFieldIsRequried" })}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label
                  htmlFor="TheLawsuit"
                  className="form-label px-2 fontSz-6 required"
                >
                  {intl.formatMessage({ id: "TheLawsuit" })}
                </label>
                <select
                  className="form-select bg-gray-100"
                  {...register("causeStageId")}
                >
                  {causeStages?.map((causeStage: any) => {
                    return (
                      <option key={causeStage.id} value={causeStage.id}>
                        {language === "ar"
                          ? causeStage?.lkStage.nameAr
                          : causeStage?.lkStage.nameEn}
                      </option>
                    );
                  })}
                </select>
                {errors.causeStageId && (
                  <div className="text-danger mt-1">
                    {intl.formatMessage({ id: "InputFieldIsRequried" })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Session Info Section */}
      <div className="bg-fix-dark bg-white rounded p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bolder required m-0">
            {intl.formatMessage({ id: "SessionData" })}{" "}
          </h5>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label required text-muted">
                {" "}
                {intl.formatMessage({ id: "SessionDate" })}
              </label>
              <input
                type="date"
                className={`form-control`}
                {...register("SessionDate")}
              />
              {errors.SessionDate && (
                <div className="text-danger mt-1">
                  {intl.formatMessage({ id: "InputFieldIsRequried" })}
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label required text-muted">
                {intl.formatMessage({ id: "SessionTime" })}
              </label>
              <input
                type="time"
                className={`form-control`}
                {...register("SessionTime")}
              />
              {errors.SessionTime && (
                <div className="text-danger mt-1">
                  {intl.formatMessage({ id: "InputFieldIsRequried" })}
                </div>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label required text-muted">
                {intl.formatMessage({ id: "TheCourtOfJurisdiction" })}
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="special fas fa-landmark"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className={`form-control`}
                  placeholder={intl.formatMessage({ id: "EnterCourtName" })}
                  {...register("CourtName")}
                />
              </div>
              {errors.CourtName && (
                <div className="text-danger mt-1">
                  {intl.formatMessage({ id: "InputFieldIsRequried" })}
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label required text-muted">
                {" "}
                {intl.formatMessage({ id: "CourtDivision" })}{" "}
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="special fas fa-gavel"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className={`form-control`}
                  placeholder={intl.formatMessage({ id: "EnterCourtDivision" })}
                  {...register("AreaName")}
                />
              </div>
              {errors?.AreaName && (
                <div className="text-danger mt-1">
                  {errors?.AreaName?.message}
                </div>
              )}
            </div>
          </div>

          {/* موقع المحكمة */}
               <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label required text-muted">
                {" "}
                {intl.formatMessage({ id: "CourtLocation" })}{" "}
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="special fas fa-gavel"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className={`form-control`}
                  placeholder={intl.formatMessage({ id: "EnterCourtLocation" })}
                  {...register("Location")}
                />
              </div>
              {errors.Location?.message && (
                <div className="text-danger mt-1">
                  {intl.formatMessage({ id: "InputFieldIsRequried" })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Assignment Section */}
      <div className="bg-fix-dark bg-white rounded p-4">
        <h5 className="fw-bolder required m-0">الإسناد</h5>

        <div className="row">
          {/* Lawyers Section */}
          <div className="col-lg-6 col-12 rounded p-4">
            <label className="form-label mb-2 text-muted">
              {intl.formatMessage({ id: "Lawyers" })}
            </label>
            <div
              className="d-flex flex-column bg-light rounded p-2 gap-7 h-100"
              style={{ maxHeight: "150px", overflow: "auto" }}
            >
              {lawyers?.length > 0 ? (
                lawyers?.map((lawyer, index) => (
                  <div
                    className="form-check d-flex align-items-center gap-2 m-0"
                    key={index}
                  >
                    <input
                      className="form-check-input m-0"
                      type="checkbox"
                      checked={lawyer.isChecked === true}
                      onChange={(e) =>
                        handleLawyerCheckboxChange(
                          lawyer.userId,
                          e.target.checked
                        )
                      }
                    />
                    <label className="form-check-label d-flex align-items-center gap-2">
                    <img
                      src={
                        lawyer?.userImage && 
                        lawyer.userImage !== "null" && 
                        lawyer.userImage !== "null" 
                          ? getIconSrc(
                              lawyer?.userImage,
                              { filePath: lawyer?.userImage },
                              UserManagmentRootUrl
                            )
                          : toAbsoluteUrl("/media/avatars/300-1.jpg")
                      }
                      onError={(e: any) =>
                        (e.target.src = toAbsoluteUrl("/media/avatars/300-1.jpg"))
                      }
                      alt="user"
                      style={{
                        width: theme === "dark" ? "25px" : "40px",
                        height: theme === "dark" ? "25px" : "40px",
                        borderRadius: "50%",
                      }}
                    />
                      <span className="fs-6 fs-10px">{lawyer?.userName}</span>
                      <span className="text-muted">
                        {/* {lawyer?.isInternal
                          ? intl.formatMessage({ id: "Internal" })
                          : intl.formatMessage({ id: "External" })} */}
                             {intl.formatMessage({id:"Internal"})}
                      </span>
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-center mt-2">
                  {intl.formatMessage({ id: "NoLawyers" })}
                </p>
              )}
            </div>
            {/* {errors?.lawyers && (
              <div className="text-danger mt-1">
                {intl.formatMessage({ id: "SelectAtLeastOneLawyer" })}
              </div>
            )} */}
          </div>

          {/* Data Entry Section */}
          <div className="col-lg-6 col-12 rounded p-4">
            <label className="form-label mb-2 text-muted">
              {intl.formatMessage({ id: "DataEntryOperators" })}
            </label>
            <div
              className="d-flex flex-column bg-light rounded p-2 gap-7 h-100"
              style={{ maxHeight: "150px", overflow: "auto" }}
            >
              {dataEntry?.length > 0 ? (
                dataEntry?.map((operator, index) => (
                  <div
                    className="form-check d-flex align-items-center gap-2 m-0"
                    key={index}
                  >
                    <input
                      className="form-check-input m-0"
                      type="checkbox"
                      checked={operator?.isChecked === true}
                      onChange={(e) =>
                        handleDataentryCheckboxChange(
                          operator.userId,
                          e.target.checked
                        )
                      }
                    />
                    <label className="form-check-label d-flex align-items-center gap-2">
                    <img
                      src={
                        operator?.userImage && 
                        operator.userImage !== "null" && 
                        operator.userImage !== "null" 
                          ? getIconSrc(
                              operator?.userImage,
                              { filePath: operator?.userImage },
                              UserManagmentRootUrl
                            )
                          : toAbsoluteUrl("/media/avatars/300-1.jpg")
                      }
                      onError={(e: any) =>
                        (e.target.src = toAbsoluteUrl("/media/avatars/300-1.jpg"))
                      }
                      alt="user"
                      style={{
                        width: theme === "dark" ? "25px" : "40px",
                        height: theme === "dark" ? "25px" : "40px",
                        borderRadius: "50%",
                      }}
                    />
                      <span className="fs-6 fs-10px">{operator.userName}</span>
                      <span className="text-muted">
                        {/* {operator?.isInternal
                          ? intl.formatMessage({ id: "Internal" })
                          : intl.formatMessage({ id: "External" })} */}
                             {intl.formatMessage({id:"Internal"})}
                      </span>
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-center mt-2">
                  {intl.formatMessage({ id: "NoDataEntryOperators" })}
                </p>
              )}
            </div>
            {/* {errors?.dataEntry && (
              <div className="text-danger mt-1">
                {intl.formatMessage({
                  id: "SelectAtLeastOneDataEntryOperator",
                })}
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStepTwo = () => (
    <div className="bg-light rounded p-4">
      <div className="bg-fix-dark bg-white rounded p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bolder m-0">
            {intl.formatMessage({ id: "SessionDocuments" })}{" "}
          </h5>
          <Button
            onClick={() => setShowDocPopup(true)}
            variant="link"
            className="text-white transparent-button"
          >
            <i className="fa-solid fs-1 text-primary fa-circle-plus"></i>
          </Button>
        </div>

        <div className="d-flex flex-column gap-3">
          <div className="d-flex flex-column gap-2">
            {selectedFilesForAttachments?.map((attachment: any, index) => {
              const isNew = !attachment.filePath;
              return (
                <div
                  key={attachment.id || index}
                  className="border rounded overflow-hidden p-3  mb-4  w-100 p-3 bg-white bg-fix-dark border-fix-dark d-flex flex-column flex-sm-row align-items-center"
                >
                  <Col className="col-12 col-lg-3 col-sm-4  mb-3 mb-sm-0 text-truncate">
                    {!isNew ? (
                      <h6 className="text-muted">
                        <span className="mx-2">
                          {intl.formatMessage({ id: "Source" })}
                        </span>{" "}
                        :
                        {intl.locale === "ar"
                          ? attachment.lK_AttachmentSourceNameAr
                          : attachment.lK_AttachmentSourceNameEn}
                      </h6>
                    ) : (
                      <h6 className="text-muted">
                        <span className="mx-2">
                          {intl.formatMessage({ id: "Source" })}
                        </span>{" "}
                        :{attachment.lK_AttachmentSourceName}
                      </h6>
                    )}
                  </Col>
                  <Col className="col-12 col-lg-8 col-sm-5 py-2 px-3 d-flex justify-content-between mb-3 mb-sm-0 flex-wrap">
                    <div className="d-flex align-items-center justify-content-around w-100">
                      <img
                        src={
                          isNew
                            ? URL.createObjectURL(attachment?.attachment)
                            : LegalRootUrl +
                              attachment?.filePath?.replace("wwwroot/", "")
                        }
                        alt=""
                        className="h-40px"
                         onError={(e: any) => {
                          e.target.src =getIconSrcError(isNew ? attachment?.attachment?.name :attachment?.fileName )}}       
                      />
                      <div className="d-flex flex-column ms-2 w-75">
                        <span className="fw-bolder ">
                          {isNew ? (attachment?.attachmentName || attachment?.attachment?.name) : (attachment?.attachmentName || attachment.fileName)}
                        </span>
                        {isNew && (
                          <input
                            type="text"
                            className="form-control form-control-sm mt-1"
                            placeholder={intl.formatMessage({ id: "attachmentFile" }) || "Attachment Name"}
                            value={attachment?.attachmentName || ""}
                            onChange={(e) => {
                              setSelectedFilesForAttachments((prev) => {
                                return prev.map((att, idx) => {
                                  if (idx === index) {
                                    return {
                                      ...att,
                                      attachmentName: e.target.value
                                    };
                                  }
                                  return att;
                                });
                              });
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </Col>

                  <span
                    className="mx-3 text-danger cursor-pointer"
                    onClick={() => {
                      setIndexFile(index);
                      setShowDeletePopup(true);
                    }}
                  >
                    <i className="fa-regular fs-3 fa-trash-can"></i>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      centered
      className={!show ? "inert" : ""}
    >
      <Modal.Header
        closeButton
        className="pb-0 border-bottom-0"
      >
        <Modal.Title className="text-center position-relative w-100 mt-3">
          {intl.formatMessage({ id: "EditSession" })}
        </Modal.Title>
      </Modal.Header>

      <form onSubmit={step === 2 ? handleSubmit(onSubmit) : handleNext}>
        <Modal.Body>
          {/* Steps Indicator */}
          <div className="mb-4 rounded bg-light-primary">
            <div className="d-flex align-items-center justify-content-between px-10 position-relative mt-5 py-5">
  

              {/* Step 1 */}
              <div
               className="d-flex flex-column align-items-center position-relative flex-md-row" 
               style={{ zIndex: 2 }}
              >
                <span
                  className={`rounded-circle d-flex align-items-center justify-content-center text-white`}
                  style={{
                    width: "24px",
                    height: "24px",
                    backgroundColor:
                      step === 2
                        ? "#50CD89"
                        : step === 1
                        ? "#00A3FF"
                        : "#B5B5C3",
                  }}
                >
                  {step === 2 ? (
                    <i className="fas fa-check" style={{ fontSize: "12px" }} />
                  ) : (
                    "1"
                  )}
                </span>
                <span className="text-muted mt-2 mt-md-0 mx-md-2">
                  {intl.formatMessage({ id: "SessionData" })}{" "}
                </span>
              </div>

      {/* Dashed Line */}
      <div
        className="flex-grow-1 mx-2"
        style={{
          height: "1px",
          background:
            "repeating-linear-gradient(to right, #B5B5C3, #B5B5C3 5px, transparent 5px, transparent 10px)",
          zIndex: 1,
        }}
      />
              {/* Step 2 */}
              <div
       className="d-flex flex-column align-items-center position-relative flex-md-row" style={{ zIndex: 2 }}
              >
                <span
                  className={`rounded-circle d-flex align-items-center justify-content-center text-white`}
                  style={{
                    width: "24px",
                    height: "24px",
                    backgroundColor: step === 2 ? "#00A3FF" : "#B5B5C3",
                  }}
                >
                  2
                </span>
                <span className="text-muted mt-2 mt-md-0 mx-md-2">
                  {intl.formatMessage({ id: "SessionDocuments" })}{" "}
                </span>
              </div>
            </div>
          </div>
          {step === 1 ? renderStepOne() : renderStepTwo()}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-end gap-2">
          <button
            className="btn btn-light px-4"
            type="button"
            onClick={step === 1 ? handleClose : handleBack}
          >
            {step === 1
              ? intl.formatMessage({ id: "Cancel" })
              : intl.formatMessage({ id: "Previous" })}
          </button>
          <button
            className="btn btn-primary px-4"
            type="submit"
            disabled={isSubmitting}
            style={{ backgroundColor: "#00A3FF" }}
          >
            {step === 1 ? (
              intl.formatMessage({ id: "Next" })
            ) : isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {intl.formatMessage({ id: "UpdatingSession" }) || "Updating..."}
              </>
            ) : (
              intl.formatMessage({ id: "UpdateSession" })
            )}
          </button>
        </Modal.Footer>
      </form>
      <DeletePopup
        showDelete={showDelete}
        handleCloseDelete={() => setShowDelete(false)}
      />
      <AddDocumentPopup
        show={showAddDocumentPopup}
        handleClose={() => {
          setShowAddDocumentPopup(false);
        }}
        setDocuments={(prevDocsUpdater) => {
          // The AddDocumentPopup component passes a function that takes previous docs and returns updated docs
          // We need to create a mock previous state to pass to this function
          const mockPrevDocs = [];

          // Call the updater function with our mock previous state
          const updatedDocs = prevDocsUpdater(mockPrevDocs);

          // Find the document for the current source
          const currentDoc = updatedDocs.find(
            (doc) => doc.lK_AttachmentSourceId === currentSourceId
          );

          if (currentDoc && currentDoc.attachments) {
            // Extract the binary files from the attachments
            const files = currentDoc.attachments?.map(
              (attachment) => attachment.fileAsBinary
            );

            // Update the uploadedFiles state based on the currentSourceId
            const newFiles = { ...uploadedFiles };
            if (currentSourceId === 0) {
              newFiles.clients = [...newFiles.clients, ...files];
            } else if (currentSourceId === 1) {
              newFiles.opponents = [...newFiles.opponents, ...files];
            } else if (currentSourceId === 2) {
              newFiles.court = [...newFiles.court, ...files];
            }
            setUploadedFiles(newFiles);
          }
        }}
        selectedLKSource={{
          id: currentSourceId,
          name:
            currentSourceId === 0
              ? "Clients"
              : currentSourceId === 1
              ? "Opponents"
              : "Court",
        }}
      />
      {showDeleteModel && (
        <div className="modal fade">
          <DeletePopup
            showDelete={showDeleteModel}
            handleCloseDelete={() => setShowDeleteModel(false)}
          />
        </div>
      )}

      {showDocPopup && (
        <AddDocToEditCausePopup
          show={showDocPopup}
          handleClose={() => setShowDocPopup(false)}
          setSelectedFilesForAttachments={setSelectedFilesForAttachments}
          selectedFilesForAttachments={selectedFilesForAttachments}
        />
      )}
      {showDeletePopup && (
        <div className="modal fade" id="Rega_modal_Accept" aria-hidden="true">
          <DeletePopup
            showDelete={showDeletePopup}
            handleCloseDelete={() => setShowDeletePopup(false)}
            id={indexFile}
            handleDelete={handleFileDelete}
          />
        </div>
      )}
    </Modal>
  );
};

export default EditSessionPopup;
