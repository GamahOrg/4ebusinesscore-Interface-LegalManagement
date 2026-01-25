import { Modal, Spinner } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useForm, FieldError } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { JudgmentValidationSchema } from "../Validations/JudgmentSchema";
import { useIntl } from "react-intl";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchAllLKJudgement } from "../../../features/lk-judgement-controllers";
import { useParams } from "react-router-dom";
import {
  fetchAllJudgementGrounds,
  postJudgmentGround,
} from "../../../features/judgement-ground";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { fetchCauseStageNameByCauseId } from "../../../features/cause-stage";
import { fetchCauseTitles } from "../../../features/causes";

import { fetchCauseStageById } from "../../../features/cause-stage";

interface AddJudgmentPopupProps {
  show: boolean;
  handleClose: () => void;
  causeStageId: string;
  pageNumber: number;
  pageSize: number;
  searchTerm: string;
  selectedCause: string;
  selectedDegree: string;
}

interface NextSessionForm {
  date: string;
  time: string;
  reason: string;
}
interface ReportInfoForm {
  type: string;
  judgmentTitle: string;
  description: string;
}

interface AttachmentItem {
  file: File;
  customName: string;
}
interface JudgmentFormValues {
  toLevel: string;
  judgmentSituation: string;
  causeStage?: string;
  nextSession: NextSessionForm;
  reportInfo: ReportInfoForm;
  attachments?: AttachmentItem[];
}

const AddJudgmentPopup = ({
  show,
  handleClose,
  causeStageId,
  pageNumber,
  pageSize,
  searchTerm,
  selectedCause,
  selectedDegree,
}: AddJudgmentPopupProps) => {
  const intl = useIntl();
  const { id } = useParams();

  const [attachments, setAttachments] = useState<AttachmentItem[]>([]);
  const dispatch = useAppDispatch();
  const { causeTitles } = useAppSelector((state) => state.causesData);
  const { causeStageNames, loading: causeStageLoading } = useAppSelector(
    (state) => state.causeStages
  );
  const [selectedCauseFromPopup, setSelectedCauseFromPopup] = useState("");
  const [selectedCauseStage, setSelectedCauseStage] = useState("");
  const [selectedJudgment, setSelectedJudgment] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [filteredJudgments, setFilteredJudgments] = useState<any[]>([]);
  const [sessionId, setSessionId] = useState<any>(null);
  const [sessionDate, setSessionDate] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchCauseTitles({}) as any);
  }, [dispatch]);

  useEffect(() => {
    if (selectedCauseFromPopup) {
      setValue("toLevel", selectedCauseFromPopup);
      dispatch(fetchCauseStageNameByCauseId(selectedCauseFromPopup) as any);
    }
  }, [selectedCauseFromPopup, dispatch]);

  const lKJudgement = useAppSelector((state) => state.lKJudgement?.lKJudgement);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<JudgmentFormValues>({
    resolver: yupResolver(JudgmentValidationSchema) as any,
    defaultValues: {
      toLevel: "",
      judgmentSituation: "",
      reportInfo: {
        type: "",
        judgmentTitle: "",
        description: "",
      },
      nextSession: {
        date: "",
        time: "",
        reason: "",
      },
    },
  });

  useEffect(() => {
    register("attachments");
  }, [register]);

  let formValues = watch();

  useEffect(() => {
    if (show) {
      dispatch(fetchAllLKJudgement({}));
    }
  }, [show]);

  useEffect(() => {
    if (lKJudgement?.length > 0) {
      const filtered = lKJudgement.filter(
        (item) =>
          item?.nameAr === "صدر الحكم" ||
          item?.nameAr === "تأجيل" ||
          item?.nameEn === "The verdict has been issued" ||
          item?.nameEn === "delay" ||
          item?.nameEn === "Delay" ||
          item?.nameAr === "شطب" ||
          item?.nameEn === "Crossed out"
      );
      setFilteredJudgments(filtered);
    }
  }, [lKJudgement]);

  useEffect(() => {
    if (causeStageId && causeStageNames?.length > 0) {
      const stage = causeStageNames.find((stage) => stage.id === causeStageId);
      if (stage) {
        setValue("causeStage", stage.lk_StageNameAr);
      }
    }
  }, [causeStageId, causeStageNames]);

  useEffect(() => {
    if (causeStageNames?.length > 0) {
      const latestStage = causeStageNames[causeStageNames.length - 1];
      setValue("causeStage", latestStage.lk_StageNameAr);
      setSelectedCauseStage(latestStage.caseStageId);
    }
  }, [causeStageNames]);

  useEffect(() => {
    if (selectedCauseStage) {
      dispatch(fetchCauseStageById({ CauseStageId: selectedCauseStage })).then(
        (res: any) => {
          const sessions = res?.payload?.result?.sessions;
          if (Array.isArray(sessions) && sessions.length > 0) {
            const lastSession = sessions[sessions.length - 1];
            setSessionId(lastSession?.id);
            setSessionDate(lastSession?.sessionDate);
          }
        }
      );
    }
  }, [selectedCauseStage]);
  var minDate = "";
  if (sessionDate) {
    const selectedDate = new Date(sessionDate as string);
    selectedDate.setDate(selectedDate.getDate() + 1);
    minDate = selectedDate.toISOString().split("T")[0];
  }

  const handleJudgmentSituationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setSelectedJudgment(value);
    setValue("judgmentSituation", value, {
      shouldValidate: true,
    });
    const selectedItem = filteredJudgments.find(
      (item) => item?.id?.toString() === value
    );
    if (!(selectedItem?.nameAr === "تأجيل" || selectedItem?.id === 8)) {
      setValue("nextSession.date", null as any);
      setValue("nextSession.time", null as any);
      clearErrors(["nextSession.date", "nextSession.time"]);
    }
  };

  const shouldShowNextSession = () => {
    if (!filteredJudgments || !selectedJudgment) return false;

    const selectedJudgmentItem = filteredJudgments.find(
      (item) => item?.id?.toString() === selectedJudgment
    );
    return (
      selectedJudgmentItem?.nameAr === "تأجيل" ||
      selectedJudgmentItem?.id === 8 ||
      selectedJudgmentItem?.id === 1
    );
  };



  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const filesUploaded = event.target.files;

    if (filesUploaded) {
      const filesArray = Array.from(filesUploaded);

      const uniqueFiles = filesArray.filter(
        (newFile) =>
          !attachments.some(
            (existingFile) =>
              existingFile.file.name === newFile.name &&
              existingFile.file.size === newFile.size
          )
      );
      const newAttachments: AttachmentItem[] = [
        ...attachments,
        ...uniqueFiles.map((file) => ({ file, customName: "" })),
      ];

      setAttachments(newAttachments);
      setValue("attachments", newAttachments, { shouldValidate: true });
    }
  }

  function handleCustomNameChange(index: number, newName: string) {
    const updated = [...attachments];
    updated[index].customName = newName;
    setAttachments(updated);
    setValue("attachments", updated, { shouldValidate: true });
  }

  const onSubmit = (data: any) => {
    const formData = new FormData();

    let nextSessionDateTime = "";
    if (
      shouldShowNextSession() &&
      data?.nextSession?.date &&
      data?.nextSession?.time
    ) {
      nextSessionDateTime = new Date(
        `${data.nextSession.date}T${data.nextSession.time}:00Z`
      ).toISOString();
    }

    const mergedArr = [];
    formData.append("LK_JudgementId", data?.judgmentSituation);
    formData.append("SessionJedgementStatus", data?.reportInfo?.type);
    formData.append("CauseId", data?.toLevel);
    formData.append("CauseStageId", selectedCauseStage || causeStageId || "");
    if (sessionId) {
      formData.append("SessionId", sessionId);
    }
    formData.append("TitleJudement", data?.reportInfo?.judgmentTitle);
    formData.append("JudgementStatement", data?.reportInfo?.description);

    if (shouldShowNextSession() && nextSessionDateTime) {
      formData.append("NextSession", nextSessionDateTime);
    }

    attachments?.length > 0 &&
      attachments?.forEach((attach, index: number) => {
        formData.append(`Attachments[${index}].attachmentFile`, attach?.file);
        formData.append(
          `Attachments[${index}].attachmentName`,
          attach?.customName
        );
      });



    {
      setIsSaving(true);
      dispatch(postJudgmentGround(formData))
        .then((res: any) => {
          setIsSaving(false);
          if (res?.payload?.statusEnum === 1) {
            showAlert(true, "AddedSuccessfully", intl);
            handleClose();
            dispatch(
              fetchAllJudgementGrounds({
                pageNumber: pageNumber,
                PageSize: pageSize,
                SearchItem: searchTerm,
                CauseId: selectedCause || undefined,
                lkStageId: selectedDegree || undefined,
              }) as any
            );
          } else if (
            res?.payload?.message ===
            "Cannot add JedgementGround for a session with a future or today's creation date."
          ) 
          
          {
            showAlert(false, "JudgmentGroundError", intl);
          } 
//           else if (
//   res?.payload?.message ===
//   "Cannot add JedgementGround for a session with a judgement."
// ) {

//       showAlert(false, "SessionJudgementError2", intl);
// }
          else if (
            res?.payload?.message ===
            "Cannot add JudgementGround for a session with a judgement."
          ) {
            showAlert(false, "SessionJudgementError", intl);
          } else if (
            res?.payload?.message === "No sessions found for this cause stage"
          ) {
            showAlert(false, "CauseStageError", intl);
          } else if (
            res?.payload?.message === "No valid session found"
          ) {
            showAlert(false, "NoValidSessionFound", intl);
          } else if (res?.payload?.message == "نوع الملف غير مسموح.") {
            showAlert(false, "FileTypeNotAllowed", intl);
          } else if (
            res?.payload?.message ===
            "Cannot specify a next session before the current session has occurred."
          ) {
            showAlert(
              false,
              "CannotSpecifyANextSessionBeforeTheCurrentSessionHasOccured",
              intl
            );
            
          } else if (
            res?.payload?.message ===
            "Judgment must not be added before the session date"
          ) {
            showAlert(false, "JudgmentBeforeSessionError", intl);
          } else if (
            res?.payload?.message ==
            '["Next session date cannot be before the current session date."]'
          ) {
            showAlert(
              false,
              "NextSessionDateCannotBeBeforeTheCurrentSessionDate",
              intl
            );
          } else if (
            res?.payload?.message ==
            '["Duplicate requirement found in request.","Duplicate requirement found in request."]'
          ) {
            showAlert(false, "DuplicateRequirements", intl);
          } else if (
            res?.payload?.message ==
            '["Duplicate requirement found in request."]'
          )
           {
            showAlert(false, "DuplicateRequirements", intl);
          } else {
            showAlert(false, "AnErrorOccurred", intl);
          }
        })
        .catch(() => {
          setIsSaving(false);
          showAlert(false, "AnErrorOccurred", intl);
        });
      console.log("Form submitted:", data);
      dispatch(fetchAllLKJudgement({}));
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
    setValue("attachments", newAttachments, { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const renderStepOne = () => (
    <div className="rounded p-4">
      <div className="row">
        <div className="col-12 bg-light p-4 rounded mb-4">
          <div className="row">
            <div className="col-lg-6 col-12">
              <div className="mb-3">
                <label className="mb-2 text-muted required">
                  {intl.formatMessage({ id: "Name" })}/{" "}
                  {intl.formatMessage({ id: "Number" })}{" "}
                  {intl.formatMessage({ id: "TheCase" })}
                </label>
                <select
                  className="form-select mb-6"
                  value={selectedCauseFromPopup}
                  {...register("toLevel")}
                  onChange={(e) => setSelectedCauseFromPopup(e.target.value)}
                >
                  <option value="">
                    {intl.formatMessage({ id: "ChooseTheCase" })}
                  </option>
                  {causeTitles?.length > 0 &&
                    causeTitles.map((cause: any, index: number) => {
                      const title = cause?.title || "";
                      const shortTitle =
                        title.length > 10 ? `${title.slice(0, 15)}...` : title;

                      return (
                        <option
                          key={`${cause.id}-${index}`}
                          value={String(cause.id)}
                          title={title}
                        >
                          {shortTitle}
                        </option>
                      );
                    })}
                </select>

                {errors.toLevel && selectedCauseFromPopup === "" && (
                  <div className="text-danger">
                    {intl.formatMessage({
                      id: (errors.toLevel as FieldError).message,
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="mb-3">
                <label className="mb-2 text-muted required">
                  {intl.formatMessage({ id: "TheLawsuit" })}
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="special fa-solid fa-align-right"></i>
                    </span>
                  </div>
                  <div className="bg-light rounded mb-6">
                    <input
                      type="text"
                      placeholder="دعوي #4"
                      className="form-control rounded-end-0 border-start-0"
                      value={
                        selectedCauseFromPopup && causeStageNames?.length > 0
                          ? causeStageNames[causeStageNames.length - 1]
                              .lk_StageNameAr
                          : ""
                      }
                      disabled
                    />
                  </div>
                </div>
                {errors.toLevel && selectedCauseFromPopup === "" && (
                  <div className="text-danger">
                    {intl.formatMessage({
                      id: (errors.toLevel as FieldError).message,
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 p-4 rounded">
          <div className="row">
            <div className="col-lg-6 col-12">
              <div className="mb-3">
                <label className="form-label text-muted small required">
                  {intl.formatMessage({ id: "PositionSessionReport" })}
                </label>
                <select
                  className="form-select"
                  defaultValue={""}
                  {...register("judgmentSituation")}
                  onChange={handleJudgmentSituationChange}
                >
                  <option value={""} disabled>
                    {intl.formatMessage({ id: "Choose" })}
                  </option>
                  {filteredJudgments?.length > 0 &&
                    filteredJudgments.map((item: any) => {
                      const label =
                        intl.locale === "ar" ? item?.nameAr : item?.nameEn;

                      const shortLabel =
                        label && label.length > 10
                          ? `${label.slice(0, 15)}...`
                          : label;

                      return (
                        <option key={item?.id} value={item?.id} title={label}>
                          {shortLabel}
                        </option>
                      );
                    })}
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
            <div className="col-lg-6 col-12">
              <div className="mb-3">
                <label className="form-label text-muted small required">
                  {intl.formatMessage({ id: "JudicialRuling" })}
                </label>
                <div className="d-flex align-items-center flex-wrap mt-3 gap-4">
                  <div className="d-flex gap-2">
                    <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                      <input
                        type="radio"
                        className="form-check-input widget-9-radio xRadioBg"
                        id="forTheAuthority"
                        value={2}
                        {...register("reportInfo.type", {
                          required: "InputFieldIsRequried",
                        })}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <label
                      className="form-check-label"
                      htmlFor="forTheAuthority"
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
                        id="againstTheAuthority"
                        value={1}
                        {...register("reportInfo.type", {
                          required: "InputFieldIsRequried",
                        })}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <label
                      className="form-check-label"
                      htmlFor="againstTheAuthority"
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
                        id="endTheDispute"
                        value={3}
                        {...register("reportInfo.type", {
                          required: "InputFieldIsRequried",
                        })}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <label
                      className="form-check-label"
                      htmlFor="endTheDispute"
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
        </div>
      </div>
      <div className="col-12 mt-3 mb-3">
        <label className="mb-2 form-label text-muted small">
          {intl.formatMessage({ id: "Document" })}
        </label>

        <div className="notice d-flex flex-column bg-light-primary rounded border-primary border border-dashed p-5">
          <label
            htmlFor="outputAttachment"
            className="form-label  dropzone-select  uploadFile-style inputAreaHeight w-100"
          >
            {Array.isArray(attachments) && attachments?.length > 0 ? (
              <>
                <div
                  role="button"
                  className="d-flex align-items-center h-100 mt-1"
                >
                  <div className="py-auto ps-3">
                    <i className="fa-solid fa-link fs-1 text-primary"></i>
                  </div>
                  <div className="row py-auto flex-wrap my-3">
                    {attachments?.map((attachment, index) => (
                      <div
                        className="d-flex align-items-center"
                        key={attachment?.file?.name}
                      >
                        <span className="text-primary fw-bolder me-2  w-40">
                          {attachment?.file?.name}
                        </span>
                        {/* input لاسم مخصص */}
                        <input
                          type="text"
                          className="form-control form-control-sm me-2 w-50 my-4 "
                          placeholder={intl.formatMessage({
                            id: "EnterAttachmentName",
                          })}
                          value={attachment.customName}
                          onChange={(e) =>
                            handleCustomNameChange(index, e.target.value)
                          }
                        />

                        <button
                          type="button"
                          className="btn btn-link text-danger p-0 flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            removeAttachment(index);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div role="button" className="d-flex align-items-center">
                  <div className="py-auto px-3">
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
              </>
            )}
          </label>
          <div
            className="dropzone drropzone-queue "
            id="kt_dropzonejs_example_3"
          >
            <div className="dropzone-panel">
              <input
                multiple
                type="file"
                id="outputAttachment"
                name="attachments"
                ref={fileInputRef}
                onChange={(e) => handleFileChange(e)}
                placeholder={intl.formatMessage({ id: "FileUpload" })}
                className="dropzone-select  uploadFile-style inputAreaHeight d-none"
              />
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
      <div className="mb-4">
        <h6 className="fw-bold text-muted mb-3 required">
          {intl.formatMessage({ id: "Title1" })}
        </h6>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text ">
              <i className="special fas fa-layer-group"></i>
            </span>
          </div>
          <input
            className="form-control"
            placeholder={intl.formatMessage({ id: "Title1" })}
            {...register("reportInfo.judgmentTitle")}
          />
        </div>
        {errors.reportInfo?.judgmentTitle && (
          <div className="text-danger mt-1">
            {intl.formatMessage({
              id: (errors.reportInfo.judgmentTitle as FieldError).message,
            })}
          </div>
        )}
      </div>
      <div className="mb-4">
        <h6 className="fw-bold mb-3 text-muted required">
          {intl.formatMessage({ id: "TextSessionReport" })}
        </h6>
        <textarea
          className="form-control"
          placeholder={intl.formatMessage({ id: "TextSessionReport" })}
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

      {shouldShowNextSession() && (
        <div>
          <h6 className="fw-bold mb-3 required">
            {intl.formatMessage({ id: "NextSession" })}
          </h6>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label text-muted">
                  {intl.formatMessage({ id: "ChooseDate" })}
                </label>
                <input
                  type="date"
                  className="form-control"
                  {...register("nextSession.date", {
                    required: shouldShowNextSession()
                      ? "InputFieldIsRequried"
                      : false,
                  })}
                  min={minDate}
                />
                {errors.nextSession?.date && (
                  <div className="text-danger mt-1">
                    {intl.formatMessage({
                      id: errors.nextSession.date.message,
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label text-muted">
                  {intl.formatMessage({ id: "ChooseTime" })}
                </label>
                <input
                  type="time"
                  className="form-control"
                  {...register("nextSession.time", {
                    required: shouldShowNextSession()
                      ? "InputFieldIsRequried"
                      : false,
                  })}
                />
                {errors.nextSession?.time && (
                  <div className="text-danger mt-1">
                    {intl.formatMessage({
                      id: errors.nextSession.time.message,
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  useEffect(() => {
    if (show) {
      const modals = document.querySelectorAll('.modal[aria-hidden="true"]');
      modals.forEach((modal) => {
        modal.setAttribute("aria-hidden", "false");
      });
    }
  }, [show]);

  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      centered
      enforceFocus={false}
      backdrop={false}
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center position-relative w-100 mt-3">
          {intl.formatMessage({ id: "AddingTheTermsOfTheSession" })}
        </Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="overflow-auto" style={{ maxHeight: "60vh" }}>
          <div className="mb-4 rounded bg-light-primary">
            <div className="d-flex justify-content-between align-items-center position-relative bg-light-primary py-2 px-10 rounded flex-wrap gap-2 mt-5">
              {/* Step 1 */}
              <div
                className="d-flex align-items-center gap-2 position-relative"
                style={{ zIndex: 2 }}
              >
                <span
                  className={`rounded-circle d-flex align-items-center justify-content-center text-white`}
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
          {renderStepOne()}
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-light px-4"
            onClick={handleClose}
            disabled={isSaving}
          >
            {intl.formatMessage({ id: "Retreat" })}
          </button>
          <button
            type="submit"
            className="btn btn-primary px-4"
            disabled={isSaving}
          >
            {isSaving ? (
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

export default AddJudgmentPopup;
