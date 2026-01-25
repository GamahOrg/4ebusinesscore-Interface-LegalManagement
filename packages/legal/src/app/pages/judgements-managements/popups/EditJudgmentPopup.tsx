import { Modal, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useForm, FieldError } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import { Resolver } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchAllLKJudgement } from "../../../features/lk-judgement-controllers";
import { fetchAllJudgementGrounds, fetchJudgementById } from "../../../features/judgement-ground";
import { putJudgmentGround } from "../../../features/judgement-ground";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { JudgmentValidationSchema } from "../Validations/JudgmentValidationSchema";
import { fetchCauseTitles } from "../../../features/causes";
import { fetchCauseStageNameByCauseId } from "../../../features/cause-stage";
import { SessionJedgementStatus } from "../../../models/LegalEnums";
import { deletejudgementRequirements } from "../../../features/judement-requirements";

interface Attachment {
  id: string;
  filePath: string;
  fileName: string;
  attchmentName:string;
}
interface JudgmentResponse {
  payload?: {
    success?: boolean;
    message?: string;
    error?: {
      message: string;
    };
  };
}

interface NextSessionForm {
  date: string;
  time: string;
  reason?: string;
}
interface ReportInfoForm {
  type: string;
  judgmentTitle: string;
  description: string;
}

interface JudgmentFormValues {
  toLevel: string;
  judgmentSituation: string;
  causeStage?: string;
  nextSession?: NextSessionForm;
  reportInfo: ReportInfoForm;
  attachments?: any[];
  clientRequests: Array<{
    requirementsText?: string;
    requirementType?: number;
    id?:string;
  }> | null;
  opponentRequests: Array<{
    requirementsText?: string;
    requirementType?: number;
        id?:string;
  }> | null;
}

interface NextSessionErrors {
  date?: FieldError;
  time?: FieldError;
}

interface FormErrors {
  nextSession?: NextSessionErrors;
  [key: string]: any;
}

interface EditJudgmentPopup {
  show: boolean;
  handleClose: () => void;
  judgmentId: string;
  sessionId?: string;
  pageNumber?: number;
  pageSize?:number;
  searchTerm?:string;
  selectedCause?:string;
  selectedDegree?:string;
}

interface CombinedAttachment {
  file?: File;
  id?: string;
  fileName: string;
  isExisting?: boolean;
  filePath?: string;
  attchmentName?:string;
}

const EditJudgmentPopup = ({
  show,
  handleClose,
  judgmentId,
  sessionId,
  pageNumber,
  pageSize,
  searchTerm,
  selectedCause,
  selectedDegree,
}: EditJudgmentPopup) => {
  const intl = useIntl();
  const language = intl.locale;
  const dispatch = useAppDispatch();
  const [clientInput, setClientInput] = useState("");
  const [opponentInput] = useState("");
  const [attachments, setAttachments] = useState<CombinedAttachment[]>([]);
  const [existingAttachments, setExistingAttachments] = useState<Attachment[]>(
    []
  );
  const [selectedCauseFromPopup, setSelectedCauseFromPopup] = useState("");
  const [selectedCauseStage, setSelectedCauseStage] = useState("");
  const [showAttachmentError, setShowAttachmentError] = useState(false);
  const [selectedJudgment, setSelectedJudgment] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const lKJudgementSituation = useAppSelector(
    (state) => state.lKJudgement.lKJudgement
  );
  const { causeTitles } = useAppSelector((state) => state.causesData);
  const currentJudgment =
    useAppSelector((state) => state.judgementGround.judgementGroundsById) || {};

  const [filteredJudgments, setFilteredJudgments] = useState<any[]>([]);
  const { causeStageNames } = useAppSelector((state) => state.causeStages);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    trigger,
    clearErrors,
    unregister,
  } = useForm<JudgmentFormValues>({
    resolver: yupResolver(
      JudgmentValidationSchema
    ) as Resolver<JudgmentFormValues>,
    defaultValues: {
      attachments: [],
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
      clientRequests: null,
      opponentRequests: null,
    },
  });

  useEffect(() => {
    if (show) {
      dispatch(fetchAllLKJudgement({}));
    }
  }, [show, dispatch]);

  useEffect(() => {
    register("attachments");
  }, [register]);

  useEffect(() => {
    const hasFiles = attachments.length > 0 || existingAttachments.length > 0;
    if (hasFiles) {
      const allAttachments = [
        ...attachments,
        ...existingAttachments.map((att) => ({
          fileName: att.fileName,
          filePath: att.filePath,
          isExisting: true,
          attchmentName:att.attchmentName,
        })),
      ];
      setValue("attachments", allAttachments);
    } else {
      setValue("attachments", []);
    }
    trigger("attachments");
  }, [attachments, existingAttachments, setValue, trigger]);

  useEffect(() => {
    dispatch(fetchCauseTitles({}) as any);
  }, [dispatch]);

  useEffect(() => {
    if (causeStageNames?.length > 0) {
      const latestStage = causeStageNames[causeStageNames.length - 1];
      setValue("causeStage", latestStage.lk_StageNameAr);
      setSelectedCauseStage(latestStage.caseStageId);
    }
  }, [causeStageNames, setValue]);

  useEffect(() => {
    if (show && judgmentId) {
      dispatch(fetchJudgementById(judgmentId) as any);
    }
  }, [show, judgmentId, dispatch]);

  useEffect(() => {
    if (lKJudgementSituation?.length > 0) {
      const filtered = lKJudgementSituation.filter(
        (item) =>
          item?.id === 2 ||
          item?.id === 8 ||
          item?.nameAr === "صدر حكم" ||
          item?.nameAr === "تأجيل"||
          item?.nameAr === "شطب" || 
        item?.nameEn === "Crossed out" 
      );
      setFilteredJudgments(filtered);
    }
  }, [lKJudgementSituation]);

  useEffect(() => {
    if (currentJudgment?.causeId) {
      setSelectedCauseFromPopup(String(currentJudgment.causeId));
      setValue("toLevel", String(currentJudgment.causeId));
      dispatch(
        fetchCauseStageNameByCauseId(String(currentJudgment.causeId)) as any
      );
    }
  }, [currentJudgment, dispatch, setValue]);

  useEffect(() => {
    if (currentJudgment) {
      // Reset form with all current values
      reset({
        toLevel: String(currentJudgment.causeId || ""),
        judgmentSituation: String(currentJudgment.lK_JudgementId || ""),
        reportInfo: {
          type: String(currentJudgment.sessionJedgementStatus || ""),
          judgmentTitle: currentJudgment.titleJudement || "",
          description: currentJudgment.judgementStatement || "",
        },
        nextSession: {
          date: currentJudgment.nextSession
            ? new Date(currentJudgment.nextSession).toISOString().split("T")[0]
            : "",
          time: currentJudgment.nextSession
            ? new Date(currentJudgment.nextSession)
                .toLocaleTimeString("en-US", { hour12: false })
                .slice(0, 5)
            : "",
          reason: "",
        },
        attachments: currentJudgment.attachments
          ? currentJudgment.attachments.map((att) => ({
              fileName: att.fileName,
              filePath: att.filePath,
              isExisting: true,
              attchmentName:att.attchmentName
            }))
          : [],
        clientRequests:
          currentJudgment.judgementRequirementsDto?.filter(
            (r) => r.requirementType === 1
          ) || [],
        opponentRequests:
          currentJudgment.judgementRequirementsDto?.filter(
            (r) => r.requirementType === 2
          ) || [],
      });

      // Set local state values
      if (currentJudgment.lK_JudgementId) {
        setSelectedJudgment(String(currentJudgment.lK_JudgementId));
      }
      if (currentJudgment.attachments) {
        setExistingAttachments(currentJudgment.attachments);
      }

      // Trigger validation after setting values
      setTimeout(() => {
        trigger([
          "toLevel",
          "judgmentSituation",
          "reportInfo.type",
          "reportInfo.judgmentTitle",
          "reportInfo.description",
          "attachments",
        ]);
      }, 0);
    }
  }, [currentJudgment, reset, trigger]);

  const shouldShowNextSession = () => {
    if (!filteredJudgments || !selectedJudgment) return false;
    const selectedJudgmentItem = filteredJudgments.find(
      (item) => item?.id?.toString() === selectedJudgment
    );
    return (
      selectedJudgmentItem?.nameAr === "تأجيل" || selectedJudgmentItem?.id === 8
    );
  };

  const [ShowRequestsOfTheDispute, setShowRequestsOfTheDispute] = useState<any>(false);
  useEffect(()=>{
  if (currentJudgment.lK_JudgementId===2 || currentJudgment.lK_JudgementNameAr ==="صدر الحكم"
    || currentJudgment.lK_JudgementNameAr ==="The verdict has been issued"
  ){
setShowRequestsOfTheDispute(false)

  }else{
setShowRequestsOfTheDispute(true);
  }
  },[currentJudgment])
  useEffect(() => {
    if (currentJudgment?.attachments) {
      const existingAttachments = currentJudgment.attachments.map((att) => ({
        ...att,
        fileName: att.fileName,
        attchmentName:att.attchmentName,
        isExisting: true,
      }));
      setAttachments(existingAttachments);
    }
  }, [currentJudgment]);

  const handleJudgmentSituationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setSelectedJudgment(value);
    setValue("judgmentSituation", value);

    if (!shouldShowNextSession()) {
      setValue("nextSession.date", "");
      setValue("nextSession.time", "");
      clearErrors(["nextSession.date", "nextSession.time"]);
    }
   const selectedItem = filteredJudgments.find(item => item?.id?.toString() === value);
    if (selectedItem?.nameAr === "تأجيل" 
      || selectedItem?.id === 8 
      || selectedItem?.nameAr ===  
      "Delay") {
      setShowRequestsOfTheDispute(true);
    } else {
       setShowRequestsOfTheDispute(false);
     }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesUploaded = event.target.files;
    if (filesUploaded) {
      const files = Array.from(filesUploaded);
      setAttachments((prevAttachments) => {
        const newAttachments = [
          ...prevAttachments,
          ...files.map((file) => ({
            file,
            fileName: file.name,
            isExisting: false,
          
          })),
        ];
        setValue("attachments", newAttachments);
        return newAttachments;
      });
      setShowAttachmentError(false);
    }
  };

  
function handleCustomNameChange(index: number, newName: string) {
  const updated = [...attachments];
  updated[index].attchmentName = newName;
  setAttachments(updated);
  setValue("attachments", updated, { shouldValidate: true });
}
  const removeAttachment = (index: number) => {
    setAttachments((prev) => {
      const newAttachments = prev.filter((_, i) => i !== index);
      setValue("attachments", newAttachments);
      return newAttachments;
    });
  };

  const onSubmit = async (data: any) => {
    if (attachments.length === 0) {
      setShowAttachmentError(true);
      return;
    }

    setIsSaving(true);
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
    try {
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

      formData.append("LK_JudgementId", data.judgmentSituation);
      formData.append("CauseId", selectedCauseFromPopup);
      formData.append("CauseStageId", selectedCauseStage);
      formData.append("SessionJedgementStatus", data.reportInfo.type);

      const mergedArr = [
        ...(data.clientRequests || []),
        ...(data.opponentRequests || []),
      ];

      if (mergedArr.length > 0) {
        // formData.append("JudgementRequirements", JSON.stringify(mergedArr));
        mergedArr?.forEach((ele:any , index)=>{
              formData.append(`JudgementRequirements[${index}].requirementType`, ele?.requirementType);
              formData.append(`JudgementRequirements[${index}].requirementsText`, ele?.requirementsText);
        })
      }
      formData.append("JudgementStatement", data.reportInfo.description);
      formData.append("TitleJudement", data.reportInfo.judgmentTitle);

      if (shouldShowNextSession() && nextSessionDateTime) {
        formData.append("NextSession", nextSessionDateTime);
      }


      const existingAttachments = attachments.filter(att => att.isExisting);
      const newAttachments = attachments.filter(att => !att.isExisting);
      existingAttachments.forEach(att => {
      formData.append("OdAttachmenPaths", att.filePath as string);
      });

     newAttachments?.forEach((att , index:number) => {
      
         if (att?.file) {
           formData.append(`Attachments[${index}].attachmentFile`, att.file);
        }
  if (att?.attchmentName) {
    formData.append(`Attachments[${index}].attachmentName`, att.attchmentName);
  }
});
      const response = (await dispatch(
        putJudgmentGround({
          id: judgmentId,
          body: formData,
        })
      )) as unknown as JudgmentResponse;

      if (response.payload?.message == "JudgementGroundUpdatedSuccessfully") {
        showAlert(
          true,
          intl.formatMessage({ id: "UpdatedSuccessfully" }),
          intl
        );
        dispatch(fetchAllLKJudgement({}));
        dispatch(
        fetchAllJudgementGrounds({
        pageNumber: pageNumber,
        PageSize: pageSize,
        SearchItem: searchTerm,
        CauseId: selectedCause || undefined,
        lkStageId: selectedDegree || undefined,
      }) as any
    );
        handleClose();
      } 
      else if (response.payload?.message ==="Can't change a cause judgement"){
       showAlert(
          false,
          intl.formatMessage({ id: "CannotChangeACauseJudgemet" }),
          intl
        );
      } else if (response?.payload?.message == '[\"Duplicate requirement found in request.\",\"Duplicate requirement found in request.\"]'){
          showAlert(false, "DuplicateRequirements", intl);
        }
        else if (response?.payload?.message == '[\"Duplicate requirement found in request.\"]'){
          showAlert(false, "DuplicateRequirements", intl);
        }
      else {
        const errorMessage =
          response.payload?.error?.message ||
          response.payload?.message ||
          "AnErrorOccurred";
        showAlert(false, errorMessage, intl);
      }
    } catch (error) {
      console.error("Error updating judgment:", error);
      showAlert(false, "AnErrorOccurred", intl);
    } finally {
      setIsSaving(false);
    }
  };

  const renderForm = () => (
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
                  className={`form-select mb-6 ${
                    errors.toLevel ? "is-invalid" : ""
                  }`}
                  {...register("toLevel")}
                  value={selectedCauseFromPopup}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const value = e.target.value;
                    setSelectedCauseFromPopup(value);
                    setValue("toLevel", value);
                    if (value) {
                      dispatch(fetchCauseStageNameByCauseId(value) as any);
                    }
                  }}
                  disabled
                >
                  <option value="">
                    {intl.formatMessage({ id: "ChooseTheCase" })}
                  </option>

                  {causeTitles?.map((cause: any, index: number) => (
                    <option
                      key={`${cause.id}-${index}`}
                      value={String(cause.id)}
                    >
                      {cause?.title}
                    </option>
                  ))}
                </select>

                {errors.toLevel && (
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
                      className="form-control border-0 bg-light rounded-end-0 border-start-0"
                      value={
                        causeStageNames?.length > 0
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
                <label className="form-label text-muted required">
                  {intl.formatMessage({ id: "PositionSessionReport" })}
                </label>
                <select
                  className={`form-select ${
                    errors.judgmentSituation ? "is-invalid" : ""
                  }`}
                  value={selectedJudgment}
                  {...register("judgmentSituation")}
                  onChange={handleJudgmentSituationChange}
                  disabled
                >
                  <option value={""} disabled>
                    {intl.formatMessage({ id: "Choose" })}
                  </option>
                  {filteredJudgments?.length > 0 &&
                    filteredJudgments?.map((item) => (
                      <option
                        key={item?.nameEn + "-" + item?.id}
                        value={item?.id}
                      >
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
                                id="forTheAuthority"
                                value={"2"}
                                {...register("reportInfo.type")}
                                style={{ cursor: "pointer" }}
                                disabled
            
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
                                value={"1"}
                                {...register("reportInfo.type")}
                                style={{ cursor: "pointer" }}
                                 disabled
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
                                value={"3"}
                                {...register("reportInfo.type")}
                                style={{ cursor: "pointer" }}
                               disabled
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
        <label className="mb-2 text-muted required">
          {intl.formatMessage({ id: "Document" })}
        </label>

        <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed p-5 h-auto  min-h-80px">
          <label
            htmlFor="outputAttachment"
            className="form-label dropzone-select uploadFile-style inputAreaHeight w-100"
          >
            {attachments.length > 0 ? (
              <div role="button" className="d-flex align-items-start h-100">
                <div className="py-auto px-3">
                  <i className="fa-solid fa-link fs-1 text-primary"></i>
                </div>
                <div className="w-100 ms-3 overflow-auto py-auto flex-wrap">
                  {attachments.map((attachment, index) => (
                    <div
                      key={`attachment-${index}`}
                      className="d-flex align-items-center justify-content-between w-100 mb-2 gap-2"
                    >
                      <span className="text-primary fw-bolder flex-grow-1 text-truncate">
                        {attachment.isExisting ? 
                        attachment.attchmentName || attachment.fileName
                      : attachment.fileName}
                      </span>
                      {!attachment.isExisting && (
                          <input
                          type="text"
                          className="form-control form-control-sm me-2 w-50 my-4 custom-bg"
                          placeholder={intl.formatMessage({ id: "EnterAttachmentName" })}
                          value={attachment.attchmentName}
                          onChange={(e) => handleCustomNameChange(index, e.target.value)}
                              />  
                      )}  
                      
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
            ) : (
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
                    {intl.formatMessage({ id: "SupportFollowingFormats" })} pdf,
                    png, jpeg
                  </span>
                </div>
              </div>
            )}
          </label>
          <input
            multiple
            type="file"
            accept=".pdf,.png,.jpeg,.jpg"
            id="outputAttachment"
            onChange={handleFileChange}
            className="d-none"
          />
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
            className={`form-control ${
              errors.reportInfo?.judgmentTitle ? "is-invalid" : ""
            }`}
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
          className={`form-control ${
            errors.reportInfo?.description ? "is-invalid" : ""
          }`}
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
                  className={`form-control ${
                    (errors as FormErrors).nextSession?.date ? "is-invalid" : ""
                  }`}
                  {...register("nextSession.date", {
                    required: {
                      value: shouldShowNextSession(),
                      message: "InputFieldIsRequried",
                    },
                  })}
                />
                {(errors as FormErrors).nextSession?.date && (
                  <div className="text-danger mt-1">
                    {intl.formatMessage({
                      id: "InputFieldIsRequried",
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
                  className={`form-control ${
                    (errors as FormErrors).nextSession?.time ? "is-invalid" : ""
                  }`}
                  {...register("nextSession.time", {
                    required: {
                      value: shouldShowNextSession(),
                      message: "InputFieldIsRequried",
                    },
                  })}
                />
                {(errors as FormErrors).nextSession?.time && (
                  <div className="text-danger mt-1">
                    {intl.formatMessage({
                      id: "InputFieldIsRequried",
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

   return (
    <Modal size="lg" show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-center w-100">
          {intl.formatMessage({ id: "EditSessionReport" })}
        </Modal.Title>
      </Modal.Header>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          handleSubmit(onSubmit)(e);
        }}
      >
        <Modal.Body>
          <div className="mb-4 rounded bg-light-primary">
            <div className="d-flex justify-content-center align-items-center position-relative bg-light-primary py-2 px-10 rounded flex-wrap gap-2 mt-5">
              <div
                className="d-flex align-items-center gap-2 position-relative"
                style={{ zIndex: 2 }}
              >
                <span
                  className="rounded-circle d-flex align-items-center stepNum justify-content-center text-white"
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

          {renderForm()}
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClose}
            disabled={isSaving}
          >
            {intl.formatMessage({ id: "Retreat" })}
          </button>
          <button
            type="submit"
            className="btn btn-primary"
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
              intl.formatMessage({ id: "SaveChanges" })
            )}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default EditJudgmentPopup;
