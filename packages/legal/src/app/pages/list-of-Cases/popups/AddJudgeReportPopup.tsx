import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useForm, FieldError } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Spinner } from "react-bootstrap";
import { JudgeReportValidationSchema } from "../validations/JudgeReportValidationSchema";
import { useIntl } from "react-intl";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchAllLKJudgement } from "../../../features/lk-judgement-controllers";
import { useParams } from "react-router-dom";
import { postJudgmentGround } from "../../../features/judgement-ground";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import { v4 as uuidv4 } from "uuid";
import { fetchCauseStageById } from "../../../features/cause-stage";
import { fetchCauseById } from "../../../features/cause";

interface AddJudgeReportPopupProps {
  show: boolean;
  handleClose: () => void;
  causeStageId: string;
  sessionId: string;
  selectedSessionDate?: string;
}

const AddJudgeReportPopup = ({
  show,
  handleClose,
  causeStageId,
  sessionId,
  selectedSessionDate,
}: AddJudgeReportPopupProps) => {
  const intl = useIntl();
  let [loading, setLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  
  var minDate = "";
  if (selectedSessionDate) {
    const selectedDate = new Date(selectedSessionDate as string);
    selectedDate.setDate(selectedDate.getDate() + 1);
    minDate = selectedDate.toISOString().split("T")[0];
  }
  
  const lKJudgement = useAppSelector((state) => state.lKJudgement?.lKJudgement);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
    trigger,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(JudgeReportValidationSchema),
    defaultValues: {
      judgmentSituation: "",
      reportInfo: {
        type: "",
        attachments: [],
        judgmentTitle: "",
        description: "",
        nextSession: { date: null, time: null },
      },
    },
    mode: "onChange",
  });
  
  let formValues = watch();
  
  let handleReset = () => {
    setAttachments([]);
    reset({
      judgmentSituation: "",
      reportInfo: {
        type: "",
        attachments: [],
        judgmentTitle: "",
        description: "",
        nextSession: { date: null, time: null },
      },
    });
  };
  
  let handleCancel = () => {
    handleClose();
    handleReset();
  };
  
  useEffect(() => {
    if (show) {
      dispatch(fetchAllLKJudgement({}));
    }
  }, [show]);

  const [attachments, setAttachments] = useState<
    { fileAsBinary: File; fileAsBase64: string; id: string; attachmentName: string }[]
  >([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newAttachments: {
        fileAsBinary: File;
        fileAsBase64: string;
        id: string;
        attachmentName: string;
      }[] = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          newAttachments.push({
            id: uuidv4(),
            fileAsBinary: file,
            fileAsBase64: reader.result as string,
            attachmentName: "",
          });
          if (newAttachments.length === files.length) {
            setAttachments((prevAttachments) => [
              ...prevAttachments,
              ...newAttachments,
            ]);
          }
        };
      });
    }
  };
  
  useEffect(() => {
    setValue(
      "reportInfo.attachments",
      attachments?.map((attachment) => {
        return attachment?.fileAsBinary;
      })
    );
    if (attachments?.length) {
      trigger("reportInfo.attachments");
    }
  }, [attachments]);
  
  useEffect(() => {
    let date = formValues.reportInfo.nextSession.date;
    let time = formValues.reportInfo.nextSession.time;
    let judgmentSituation = watch("judgmentSituation");
    let currentSessionDate = selectedSessionDate?.split("T")[0];
    let currentSessionTime = selectedSessionDate?.split("T")[1]?.slice(0, -3);
    const sessionDateTime = new Date(`${date}T${time}`);
    const currentSessionDateTime = new Date(
      `${currentSessionDate}T${currentSessionTime}`
    );
    if (date && time && +judgmentSituation == 2) {
      const today = new Date();
      if (sessionDateTime.getTime() < today.getTime()) {
        setError("reportInfo.nextSession", {
          type: "manual",
          message: "SessionMustBeAfterNow",
        });
      } else {
        clearErrors("reportInfo.nextSession");
      }
    }
  }, [
    formValues.reportInfo.nextSession.date,
    formValues.reportInfo.nextSession.time,
    formValues.judgmentSituation,
  ]);

  const removeFile = (id: string) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((item, i) => item?.id !== id)
    );
  };

  const handleAttachmentNameChange = (id: string, name: string) => {
    setAttachments((prevAttachments) =>
      prevAttachments.map((attachment) =>
        attachment.id === id ? { ...attachment, attachmentName: name } : attachment
      )
    );
  };
  
  let theme = localStorage.getItem("Theme");

  const onSubmit = (data: any) => {
    const formData = new FormData();
    let nextSessionDateTime = `${data?.reportInfo?.nextSession.date}T${data?.reportInfo?.nextSession.time}:00`;
    
    formData.append("LK_JudgementId", data?.judgmentSituation);
    formData.append("SessionJedgementStatus", data?.reportInfo?.type);
    formData.append("CauseId", String(id));
    formData.append("CauseStageId", causeStageId);
    formData.append("SessionId", sessionId);
    formData.append("TitleJudement", data?.reportInfo?.judgmentTitle);
    formData.append("JudgementStatement", data?.reportInfo?.description);
    
    if (
      data?.reportInfo?.nextSession.date &&
      data?.reportInfo?.nextSession.time &&
      (+data?.judgmentSituation == 8 || +data?.judgmentSituation == 1)
    ) {
      formData.append("NextSession", nextSessionDateTime);
    }
    
    attachments?.length > 0 &&
      attachments?.forEach((file, index) => {
        formData.append(`Attachments[${index}].AttachmentFile`, file?.fileAsBinary);
        formData.append(`Attachments[${index}].attachmentName`, file?.attachmentName || "");
      });

    setLoading(true);
    dispatch(postJudgmentGround(formData)).then((res: any) => {
      if (
        res?.payload?.message === "JedgementGroundAdddedSuccessfully" ||
        res?.payload?.statusEnum === 1
      ) {
        setLoading(false);
        showAlert(true, "AddedSuccessfully", intl, () => {
          dispatch(fetchCauseStageById({ causeStageId }));
          dispatch(fetchCauseById(id as string) as any);
          handleReset();
        });
        handleClose();
      } else if (
        res?.payload?.message ===
        "Cannot add JedgementGround for a session with a future or today's creation date."
      ) {
        setLoading(false);
        showAlert(false, "JudgmentGroundError", intl);
      } else if (
        res?.payload?.message ===
        "Cannot add JedgementGround for a session with a judgement."
      ) {
        setLoading(false);
        showAlert(
          false,
          "CannotAddJedgementGroundForSessionWithJudgement",
          intl
        );
      } else if (res?.payload?.message === "SessionIsNotFound") {
        setLoading(false);
        showAlert(false, "SessionIsNotFound", intl);
      } else if (res?.payload?.message === "You can't add judgement ground") {
        setLoading(false);
        showAlert(false, "YouCan'tAddJudgementGround", intl);
      } else if (
        res?.payload?.message ===
        "Judgment must not be added before the session date"
      ) {
        setLoading(false);
        showAlert(false, "JudgementMustNotBeAddedBeforeTheSessionDate", intl);
      } else if (res?.payload?.message == "نوع الملف غير مسموح.") {
        setLoading(false);
        showAlert(false, "FileTypeNotAllowed", intl);
      } else if (res?.payload?.message == "[\"Next session date cannot be before the current session date.\"]") {
        setLoading(false);
        showAlert(false, "NextSessionDateCannotBeBeforeTheCurrentSessionDate", intl);
      } else if (res?.payload?.message == '[\"Duplicate requirement found in request.\",\"Duplicate requirement found in request.\"]') {
        setLoading(false);
        showAlert(false, "DuplicateRequirements", intl);
      } else if (res?.payload?.message == '[\"Duplicate requirement found in request.\"]') {
        setLoading(false);
        showAlert(false, "DuplicateRequirements", intl);
      } else {
        setLoading(false);
        showAlert(false, "AnErrorOccurred", intl);
      }
    });
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={() => {
        handleClose();
        handleReset();
      }}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center position-relative w-100 mt-3">
          {intl.formatMessage({ id: "AddingTheTermsOfTheSession" })}
        </Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          
          <div className="mb-4 rounded bg-light-primary">
            <div className="d-flex justify-content-center align-items-center position-relative bg-light-primary py-2 px-10 rounded mt-5">
              <div className="d-flex align-items-center gap-2 position-relative">
                <span
                  className="rounded-circle d-flex align-items-center justify-content-center text-white"
                  style={{
                    width: "24px",
                    height: "24px",
                    backgroundColor: "#00A3FF",
                  }}
                >
                  1
                </span>
                <span className="text-muted">
                  {intl.formatMessage({ id: "SessionPrompts" })}
                </span>
              </div>
            </div>
          </div>

          <div className={`bg-${theme == "dark" ? "light" : "white"} rounded p-4`}>
            <div className="row">
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label text-muted small required">
                    {intl.formatMessage({ id: "PositionSessionReport" })}
                  </label>
                  <select
                    className={`form-select`}
                    defaultValue={""}
                    {...register("judgmentSituation")}
                  >
                    <option value={""} disabled>
                      {intl.formatMessage({ id: "Choose" })}
                    </option>
                    {lKJudgement?.length > 0 &&
                      lKJudgement
                        ?.filter((ele) => {
                          return (
                            ele?.nameAr === "صدر الحكم" ||
                            ele?.nameAr === "تأجيل" ||
                            ele?.nameEn === "The verdict has been issued" ||
                            ele?.nameEn === "delay" ||
                            ele?.nameEn === "Delay" ||
                            ele?.nameAr === "شطب" ||
                            ele?.nameEn === "Crossed out"
                          );
                        })
                        ?.map((item) => (
                          <option key={item?.nameEn + "-" + item?.id} value={item?.id}>
                            {intl.locale === "ar" ? item?.nameAr : item?.nameEn}
                          </option>
                        ))}
                  </select>
                  {errors.judgmentSituation && (
                    <div className="text-danger">
                      {intl.formatMessage({
                        id: (errors.judgmentSituation as FieldError).message,
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label text-muted small required">
                    {intl.formatMessage({ id: "JudicialRuling" })}
                  </label>
                  <div className="d-flex align-items-center mt-3 gap-4 flex-wrap">
                    <div className="d-flex gap-2">
                      <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                        <input
                          type="radio"
                          className="form-check-input widget-9-radio xRadioBg"
                          id="ForTheAuthority"
                          value={"2"}
                          {...register("reportInfo.type")}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      <label
                        className="form-check-label"
                        htmlFor="ForTheAuthority"
                        style={{ cursor: "pointer" }}
                      >
                        {intl.formatMessage({ id: "ForTheAuthority" })}
                      </label>
                    </div>
                    <div className="d-flex gap-2">
                      <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                        <input
                          type="radio"
                          className="form-check-input widget-9-radio xRadioBg"
                          id="AgainstTheAuthority"
                          value={"1"}
                          {...register("reportInfo.type")}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      <label
                        className="form-check-label"
                        htmlFor="AgainstTheAuthority"
                        style={{ cursor: "pointer" }}
                      >
                        {intl.formatMessage({ id: "AgainstTheAuthority" })}
                      </label>
                    </div>
                    <div className="d-flex gap-2">
                      <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                        <input
                          type="radio"
                          className="form-check-input widget-9-radio xRadioBg"
                          id="EndTheDispute"
                          value={"3"}
                          {...register("reportInfo.type")}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      <label
                        className="form-check-label"
                        htmlFor="EndTheDispute"
                        style={{ cursor: "pointer" }}
                      >
                        {intl.formatMessage({ id: "EndTheDispute" })}
                      </label>
                    </div>
                  </div>
                  {errors.reportInfo?.type && (
                    <div className="text-danger mt-1">
                      {intl.formatMessage({
                        id: (errors.reportInfo.type as FieldError).message,
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="col-12 mt-3 mb-3">
              <label className="mb-2">
                {intl.formatMessage({ id: "Document" })}
              </label>

              <div className="h-fit notice bg-light-primary rounded border-primary border border-dashed p-5">
                <label
                  htmlFor="outputAttachment"
                  className="form-label dropzone-select uploadFile-style inputAreaHeight"
                >
                  <div role="button" className="d-flex align-items-center">
                    <div className="py-auto ps-3">
                      <i className="fa-solid fa-link fs-1 text-primary"></i>
                    </div>
                    <div className="row py-auto">
                      <span className="text-primary fw-bolder">
                        {intl.formatMessage({
                          id: "DragAndDropOrChooseFilesFromComputer",
                        })}
                      </span>
                      <span className="pt-3 pb-2">
                        {" "}
                        {intl.formatMessage({
                          id: "SupportFollowingFormats",
                        })}{" "}
                        pdf , png , jpeg
                      </span>
                    </div>
                  </div>
                </label>
                <div className="dropzone dropzone-queue" id="kt_dropzonejs_example_3">
                  <div className="dropzone-panel">
                    <input
                      multiple
                      type="file"
                      id="outputAttachment"
                      name="attachments"
                      onChange={handleFileChange}
                      placeholder={intl.formatMessage({ id: "FileUpload" })}
                      className="dropzone-select uploadFile-style inputAreaHeight d-none"
                    />
                  </div>
                </div>
                {attachments?.length > 0 && (
                  <div className="mt-3">
                    {attachments?.map((file, index) => (
                      <div
                        key={file?.id}
                        className="d-flex justify-content-between align-items-center mt-2 mx-2 p-3 border rounded"
                      >
                        <div className="d-flex align-items-center flex-grow-1 me-3">
                          <img
                            src={getIconSrc(
                              file?.fileAsBinary?.name,
                              file?.fileAsBinary,
                              ""
                            )}
                            className="w-30px h-30px border-radius-50 me-2"
                            alt={file?.fileAsBinary?.name}
                          />
                          <div className="flex-grow-1">
                            <div className="mb-2">
                              <span className="text-muted small">
                                {file?.fileAsBinary?.name}
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder={intl.formatMessage({
                                id: "EnterAttachmentName",
                              })}
                              value={file?.attachmentName}
                              onChange={(e) =>
                                handleAttachmentNameChange(file?.id, e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div
                          className="bg-danger w-20px h-20px cursor-pointer border-radius-50 d-flex align-items-center justify-content-center"
                          onClick={() => removeFile(file?.id)}
                        >
                          X
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
              </div>
            </div>
            
            <div className="mb-4">
              <h6 className="fw-bold mb-3 required">
                {intl.formatMessage({ id: "Title1" })}
              </h6>
              <input
                className="form-control"
                {...register("reportInfo.judgmentTitle")}
              />
              {errors.reportInfo?.judgmentTitle && (
                <div className="text-danger mt-1">
                  {intl.formatMessage({
                    id: (errors.reportInfo.judgmentTitle as FieldError).message,
                  })}
                </div>
              )}
            </div>
            
            <div className="mb-4">
              <h6 className="fw-bold mb-3 required">
                {intl.formatMessage({ id: "TextSessionReport" })}
              </h6>
              <textarea
                className="form-control"
                rows={4}
                {...register("reportInfo.description")}
              />
              {errors.reportInfo?.description && (
                <div className="text-danger mt-1">
                  {intl.formatMessage({
                    id: (errors.reportInfo.description as FieldError).message,
                  })}
                </div>
              )}
            </div>

            {(formValues.judgmentSituation == "تأجيل" ||
              formValues.judgmentSituation == "تاجيل" ||
              formValues.judgmentSituation == "8" ||
              formValues.judgmentSituation == "1") && (
              <>
                <div>
                  <h6 className="fw-bold mb-3">
                    {intl.formatMessage({ id: "NextSession" })}
                  </h6>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label required">
                          {intl.formatMessage({ id: "ChooseDate" })}
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          {...register("reportInfo.nextSession.date")}
                          min={minDate}
                        />
                        {errors?.reportInfo?.nextSession?.date && (
                          <div className="text-danger mt-1">
                            {intl.formatMessage({
                              id: (
                                errors?.reportInfo?.nextSession?.date as FieldError
                              ).message,
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label required">
                          {intl.formatMessage({ id: "ChooseTime" })}
                        </label>
                        <input
                          type="time"
                          className="form-control"
                          {...register("reportInfo.nextSession.time")}
                        />
                        {errors?.reportInfo?.nextSession?.time && (
                          <div className="text-danger mt-1">
                            {intl.formatMessage({
                              id: (
                                errors?.reportInfo?.nextSession?.time as FieldError
                              ).message,
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
             
            
            {errors.reportInfo?.nextSession &&
              !errors.reportInfo?.nextSession?.time?.message &&
              !errors.reportInfo?.nextSession?.date?.message && (
                <div className="text-danger mt-1">
                  {intl.formatMessage({
                    id: (errors?.reportInfo?.nextSession as FieldError).message,
                  })}
                </div>
              )}
               </>
            )}
          </div>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-light px-4" onClick={handleCancel}>
            {intl.formatMessage({ id: "Retreat" })}
          </button>

          <button type="submit" className="btn btn-primary px-4" disabled={loading}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="mx-2"
                />
                <span>{intl.formatMessage({ id: "DataIsLoaded..." })}</span>
              </>
            ) : (
              intl.formatMessage({ id: "Add" })
            )}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddJudgeReportPopup;