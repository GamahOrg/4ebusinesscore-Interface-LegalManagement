import { Button, Modal } from "react-bootstrap";
import { useState, useEffect, Fragment } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SessionCreateValidationSchema } from "../validations/SessionCreateValidationSchema";
import { useIntl } from "react-intl";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { useDispatch, useSelector } from "react-redux";
import { AddSession, fetchAllSessionsNew } from "../../../features/session";
import { fetchAssignMember } from "../../../features/members";
import { fetchCauseTitles } from "../../../features/causes";
import {
  fetchCauseStageById,
  fetchCauseStageNameByCauseId,
} from "../../../features/cause-stage";
import { AppDispatch, RootState } from "../../../store/store";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AssignationType } from "../../../models/LegalEnums";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { fetchAllLkAttachmentSources } from "../../../features/attachment-source";
import AddCauseDocPopup from "../components/add-case-user/popup/AddCauseDocPopup";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";
import Select from "react-select";
import { searchSelectStylesModeStyles } from "@4eplatform/shared/functions/searchSelectStylesModeStyles";

interface AddSessionPopupProps {
  show: boolean;
  handleClose: () => void;
  setShowAccordionEdit?: any;
  causeId?: string;
  causeStageId?: string;
  comeFromSessionsList?: boolean;
}

const AddSessionPopup = ({
  show,
  handleClose,
  setShowAccordionEdit,
  causeId,
  causeStageId,
  comeFromSessionsList,
}: AddSessionPopupProps) => {
  const intl = useIntl();
  let { id } = useParams();
  let [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [showDelete, setShowDelete] = useState(false);
  const [step, setStep] = useState(1);

  // const [showAddDocumentPopup, setShowAddDocumentPopup] =
  //   useState<boolean>(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  // const [showDeleteAttachmentModel, setShowDeleteAttachmentModel] =
  //   useState(false);
  // const [currentSourceId, setCurrentSourceId] = useState<number>(0);
  // const [selectedAttachmentIndex, setSelectedAttachmentIndex] =
  //   useState<number>(0);
  // const [selectedAttachmentSource, setSelectedAttachmentSource] =
  //   useState<number>(-1);

  let cause = useSelector((state: RootState) => {
    return state?.causes?.causeById;
  });
  let { causeStageById } = useSelector((state: RootState) => {
    return state?.causeStages;
  });

  let lastSessionDate =
    Array.isArray(causeStageById?.sessions) &&
    [...causeStageById?.sessions]?.reverse()[0]?.sessionDate?.split("T")[0];
  let causeDate = cause?.causeDate?.split("T")[0];
  let [minSessionDate, setMinSessionDate] = useState<string>("");
  useEffect(() => {
    if (lastSessionDate) {
      let date = new Date(lastSessionDate);
      date.setDate(date.getDate() + 1);
      const formattedDate = date.toISOString().split("T")[0];
      setMinSessionDate(formattedDate);
    } else if (causeDate) {
      let date = new Date(causeDate);
      date.setDate(date.getDate() + 1);
      const formattedDate = date.toISOString().split("T")[0];
      setMinSessionDate(formattedDate);
    }
  }, [causeDate, lastSessionDate]);

  // start Dynamic Attachments
  let theme = localStorage.getItem("Theme");
  let [documents, setDocuments] = useState<any>([]);
  let lkAttachmentSources: any = useSelector((state: RootState) => {
    return state?.attachmentSource?.lkAttachmentSources;
  });
  useEffect(() => {
    dispatch(
      fetchAllLkAttachmentSources({
        pageSize: "10000",
      }) as any
    );
  }, []);
  let [selectedLKSource, setSelectedLKSource] = useState<any>({});
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  let [selectedId, setSelectedId] = useState<string>("");
  const deleteDoc = (sourceId: number, attachmentId: string) => {
    setDocuments?.((prev) => {
      return prev.map((doc) => {
        if (doc?.lK_AttachmentSourceId === sourceId) {
          return {
            ...doc,
            attachments: doc.attachments.filter(
              (att) => att?.id !== attachmentId
            ),
          };
        }
        return doc;
      });
    });
    showAlert(true, "DeletedSuccessfully", intl);
  };
  const [addShowDoc, setAddShowDoc] = useState(false);
  useEffect(() => {
    setValue("Attachments", documents);
    if (documents?.length) {
      trigger("Attachments");
    }
  }, [documents]);
  // end Dynamic Attachments
  const language = intl.locale;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    trigger,
    reset,
    watch,
    control,
  } = useForm({
    resolver: yupResolver(SessionCreateValidationSchema),
    mode: "all",
    defaultValues: {
      causeId: causeId || "",
      causeStageId: causeStageId || "",
      SessionDate: "",
      SessionTime: "",
      CourtName: "",
      AreaName: "",
      Attachments: [],
      lawyers: [],
      dataEntry: [],
      Location: "",
    },
  });
  useEffect(() => {
    dispatch(fetchCauseTitles({}));
  }, [dispatch]);

  let { causeTitles } = useSelector((state: any) => state.causesData);

  const selectedCauseId = watch("causeId");
  const [notFoundSuperVisors, setNotFoundSuperVisors] = useState("");
  useEffect(() => {
    if (show && (causeId || selectedCauseId)) {
      dispatch(
        fetchAssignMember({
          causeId: causeId || selectedCauseId,
        }) as any
      ).then((res) => {
        if (res.payload.message == "NotFoundMember") {
          setNotFoundSuperVisors("NotFoundMember");
        }
      });
    }
  }, [show, causeId, selectedCauseId]);

  useEffect(() => {
    if (selectedCauseId) {
      dispatch(fetchCauseStageNameByCauseId(selectedCauseId) as any);
    }
  }, [dispatch, selectedCauseId]);

  let { causeStageNames } = useSelector((state: RootState) => {
    return state?.causeStages;
  });

  const { dataEntry, lawyers } = useSelector(
    (state: any) => state.members.members || { dataEntry: [], lawyers: [] }
  );
  let darkMode = localStorage.getItem("Theme") == "dark" ? true : false;

  // Update selected IDs and form values when props change
  useEffect(() => {
    if (causeId) {
      setValue("causeId", causeId);
    }
    if (causeStageId) {
      setValue("causeStageId", causeStageId);
    }
  }, [causeId, causeStageId, setValue, show]);

  const selectedLawyers = watch("lawyers", []);
  const selectedDataEntryOperators = watch("dataEntry", []);

  const handleCheckboxChange = (
    userId: string,
    field: "lawyers" | "dataEntry"
  ) => {
    const current = getValues(field) || [];
    const updated = current.includes(userId)
      ? current.filter((id) => id !== userId)
      : [...current, userId];

    setValue(field, updated, { shouldValidate: true });
  };

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      setStep(2);
      return;
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const onSubmit = (data: any) => {
    if (step === 1) {
      handleNext();
      return;
    }
    const formData = new FormData();
    formData.append("CauseId", causeId || data.causeId || id || "");
    formData.append("CauseStageId", causeStageId || data.causeStageId || "");
    formData.append("AreaName", data.AreaName);
    formData.append("CourtName", data.CourtName);
    formData.append(
      "SessionDate",
      `${data.SessionDate}T${data.SessionTime}:00`
    );
    formData.append("Location", data.Location);

    // Merge lawyers and dataEntry with their assignationType
    const lawyers = data.lawyers?.map((lawyer) => ({
      userId: lawyer,
      assignationType: AssignationType.Lawyers,
    }));
    const dataEntryMembers = data.dataEntry?.map((operator) => ({
      userId: operator,
      assignationType: AssignationType.DataEntry,
    }));
    [...lawyers, ...dataEntryMembers]?.forEach((user, index) => {
      formData.append(`SessionAssigneeDto[${index}].userId`, user?.userId);
      formData.append(
        `SessionAssigneeDto[${index}].assignationType`,
        user?.assignationType
      );
    });
    // Append each attachment in the correct structure
    let globalAttachmentIndex = 0;
    documents?.forEach((document) => {
      document?.attachments?.forEach((attachment) => {
        formData.append(
          `Attachments[${globalAttachmentIndex}].AttachmentFile`,
          attachment?.fileAsBinary
        );

        formData.append(
          `Attachments[${globalAttachmentIndex}].lK_AttachmentSourceId`,
          document?.lK_AttachmentSourceId
        );

        formData.append(
          `Attachments[${globalAttachmentIndex}].attachmentName`,
          attachment?.attachmentName || ""
        );

        globalAttachmentIndex++;
      });
    });

    // Submit
    setLoading(true);
    dispatch(AddSession(formData) as any)
      .unwrap()
      .then((res: any) => {
        console.log("Session API Response:", res);
        setShowAccordionEdit?.(true);

        // Handle both direct response and payload response structures
        const responseMessage = res?.message || res?.payload?.message;
        const responseStatus = res?.statusEnum || res?.payload?.statusEnum;

        if (
          (responseMessage === "Session Add Successfully" ||
            responseMessage == "Session added successfully.") &&
          responseStatus == 1
        ) {
          setLoading(false);
          showAlert(true, "AddedSuccessfully", intl, () => {
            if (causeStageId || data.causeStageId) {
              dispatch(
                fetchCauseStageById({
                  causeStageId: causeStageId || data.causeStageId,
                })
              );
            }
            if (comeFromSessionsList) {
              dispatch(
                fetchAllSessionsNew({
                  PageSize: 10,
                  pageIndex: 1,
                })
              );
            }
            handleClose();
            setStep(1);
            reset({
              causeId: "",
              causeStageId: "",
              SessionDate: "",
              SessionTime: "",
              CourtName: "",
              AreaName: "",
              Attachments: [],
              lawyers: [],
              dataEntry: [],
              Location: "",
            });
            setDocuments([]);
          });
        } else if (responseMessage === "You Cant Add Session ") {
          setLoading(false);
          showAlert(false, "YouCantAddSession", intl);
        } else if (responseMessage === "Last Session not Finshed ") {
          setLoading(false);
          showAlert(false, "LastSessionNotFinshed", intl);
        } else if (
          responseMessage === "Last Session not Finished" ||
          responseMessage === "Last Session not Finished " ||
          responseMessage === '["Last Session not Finished"]'
          //  ||
          // responseMessage?.includes("Last Session not Finished")
        ) {
          setLoading(false);
          showAlert(false, "LastSessionNotFinshed", intl);
        } else if (
          responseMessage ===
          `[\"CauseStage notFound or Judgment issued\",\"Last Session not Finished\",\"Cannot add session because the cause is either finished or crossed out\"]`
        ) {
          setLoading(false);
          showAlert(false, "CauseStagsFinishedYet", intl);
        } else if (
          responseMessage ===
          '["CauseStage notFound or Finished","Cause not in Progress"]'
        ) {
          setLoading(false);
          showAlert(false, "YouCan'tAddSessionForNotActiveCase", intl);
        } else if (responseMessage === '["CauseStage notFound or Finished"]') {
          setLoading(false);
          showAlert(false, "CauseStageNotFoundFinished", intl);
        } else if (
          responseMessage === '["cause stage in study"]' ||
          responseMessage?.includes("cause stage in study")
        ) {
          setLoading(false);
          showAlert(false, "CauseStageInStudy", intl);
        } else if (
          responseMessage === "Session Date can not be before the Cause date"
        ) {
          setLoading(false);
          showAlert(false, "SessionValidationMessage", intl);
        } else if (
          responseMessage ===
          '["New Session Must be after the last session date","Session Date can not be before the Cause date"]'
        ) {
          setLoading(false);
          showAlert(false, "SessionDateValidationMessage", intl);
        } else if (
          responseMessage ==
          "Last Session not Finshed  , Session Date can not be before the Cause date"
        ) {
          setLoading(false);
          showAlert(
            false,
            "SessionDateValidationMessageRelatedCauseDate",
            intl
          );
        } else if (
          responseMessage ===
          '["Session Date can not be before the Cause date"]'
        ) {
          setLoading(false);
          showAlert(false, "SessionDateCannotBeBeforeTheCauseDate", intl);
        } else if (
          responseMessage ==
          "The session date must be after the last session date"
        ) {
          setLoading(false);
          showAlert(false, "SessionDateCannotBeBeforeTheLastSessionDate", intl);
        } else if (
          responseMessage ==
          '["CauseStage notFound or Judgment issued","New Session Must be after the last session date"]'
        ) {
          setLoading(false);
          showAlert(false, "SessionDateValidationB", intl);
        } else if (
          responseMessage ==
          '["CauseStage notFound or Judgment issued","Cause is  Judgment issued"]'
        ) {
          setLoading(false);
          showAlert(false, "SessionDateValidationC", intl);
        } else if (
          responseMessage ==
          '["CauseStage notFound or Judgment issued","Cause is  Judgment issued","New Session Must be after the last session date","Session Date can not be before the Cause date"]'
        ) {
          setLoading(false);
          showAlert(false, "SessionDateValidationD", intl);
        } else if (
          responseMessage ==
          '["CauseStage notFound or Judgment issued","Cause is  Judgment issued","Session Date can not be before the Cause date"]'
        ) {
          setLoading(false);
          showAlert(false, "SessionDateValidationD", intl);
        } else if (responseMessage == "You can't add a session.") {
          setLoading(false);
          showAlert(false, "SessionPermission", intl);
        } else if (responseMessage == "The supervisor must be assigned") {
          setLoading(false);
          showAlert(false, "SupervisorMustBeAssigned", intl);
        } else if (
          responseMessage ===
            "CauseStage notFound or Judgment issued Cannot add" ||
          responseMessage ===
            '["CauseStage notFound or Judgment issued","Last Session not Finished","Cannot add session because the cause is either finished or crossed out"]' ||
          responseMessage?.includes("CauseStage notFound or Judgment issued") ||
          responseMessage?.includes(
            "Cannot add session because the cause is either finished or crossed out"
          )
        ) {
          setLoading(false);
          showAlert(false, "CauseStageNotFoundOrJudgmentIssued", intl);
        } else if (
          responseMessage?.includes(
            "The following lawyers are already assigned to another"
          ) ||
          responseMessage?.includes("session within 2 hours") ||
          responseMessage?.includes(
            "The following lawyers are already assigned to another session within 2 hours"
          )
        ) {
          setLoading(false);
          showAlert(false, "LawyersAlreadyAssignedWithinTwoHours", intl);
        } else if (
          responseMessage ===
            "New Session Must be after the last session date" ||
          responseMessage?.includes(
            "New Session Must be after the last session date"
          )
        ) {
          setLoading(false);
          showAlert(false, "SessionDateCannotBeBeforeTheLastSessionDate", intl);
        } else if (
          responseMessage === "Cause Study in Study" ||
          responseMessage?.includes("Cause Study in Study")
        ) {
          setLoading(false);
          showAlert(false, "CauseStudyinStudy", intl);
        } else {
          setLoading(false);

          if (responseMessage) {
            showAlert(false, responseMessage, intl);
          } else {
            showAlert(false, "AnErrorOccurred", intl);
          }
        }
      })
      .catch((error: any) => {
        setLoading(false);
        console.error("Error adding session:", error);
        showAlert(false, "AnErrorOccurred", intl);
      });
  };
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
                <Controller
                  name="causeId"
                  control={control}
                  render={({ field }) => {
                    const options =
                      causeTitles?.map((cause: any) => ({
                        value: String(cause.id),
                        label: cause.title,
                        search: `${cause.causeNumber} ${cause.title}`,
                      })) || [];

                    const selectedOption =
                      options.find((opt) => opt.value === field.value) || null;

                    return (
                      <Select
                        {...field}
                        id="causeId"
                        className="react-select__container select-menu-dark-fix"
                        placeholder={intl.formatMessage({ id: "AllCauses" })}
                        options={options}
                        isClearable
                        styles={searchSelectStylesModeStyles(darkMode)}
                        onChange={(selected) =>
                          field.onChange(selected ? selected.value : "")
                        }
                        value={selectedOption}
                        noOptionsMessage={() =>
                          intl.formatMessage({ id: "NoAvailableCases" })
                        }
                        filterOption={(option, rawInput) => {
                          const input = rawInput.toLowerCase();
                          return option.data.search
                            .toLowerCase()
                            .includes(input);
                        }}
                        formatOptionLabel={(option) => {
                          const label = option.label || "";
                          const shortLabel =
                            label.length > 3
                              ? `${label.slice(0, 15)}...`
                              : label;

                          return <span title={label}>{shortLabel}</span>;
                        }}
                      />
                    );
                  }}
                />

                {errors.causeId?.message && (
                  <div className="text-danger mt-1">
                    {intl.formatMessage({ id: errors.causeId.message })}
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
                <input
                  type="text"
                  className="form-control"
                  placeholder={intl.formatMessage({ id: "TheLawsuit" })}
                  value={
                    !selectedCauseId
                      ? ""
                      : language === "ar"
                      ? causeStageNames?.at(-1)?.lk_StageNameAr
                      : causeStageNames?.at(-1)?.lk_StageNameEn
                  }
                  readOnly
                />

                {errors.causeStageId?.message && (
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
                min={minSessionDate}
                {...register("SessionDate")}
                onClick={(e) => {
                  const target = e.currentTarget as HTMLInputElement;
                  if (target && typeof target.showPicker === "function") {
                    target.showPicker();
                  } else {
                    target.focus();
                    target.click();
                  }
                }}
                style={{ cursor: "pointer" }}
              />
              {errors.SessionDate?.message && (
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
                onClick={(e) => {
                  const target = e.currentTarget as HTMLInputElement;
                  if (target && typeof target.showPicker === "function") {
                    target.showPicker();
                  } else {
                    target.focus();
                    target.click();
                  }
                }}
                style={{ cursor: "pointer" }}
              />
              {errors.SessionTime?.message && (
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
              {errors.CourtName?.message && (
                <div className="text-danger mt-1">
                  {intl.formatMessage({ id: errors.CourtName.message as any })}
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
              {errors.AreaName?.message && (
                <div className="text-danger mt-1">
                  {intl.formatMessage({ id: errors.AreaName.message as any })}
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
                  {intl.formatMessage({ id: errors.Location.message as any })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Assignment Section */}
      <div className="bg-fix-dark bg-white rounded p-4">
        <h5 className="fw-bolder required m-0">
          {intl.formatMessage({ id: "Assign" })}
        </h5>

        <div className="row">
          {/* Lawyers Section */}
          <div className="col-lg-6 col-12 rounded p-4">
            <label className="form-label mb-2 text-muted">
              {intl.formatMessage({ id: "Lawyers" })}
            </label>
            <div
              className="d-flex flex-column bg-light rounded p-2 gap-8 h-100"
              style={{ maxHeight: "150px", overflow: "auto" }}
            >
              {lawyers?.length > 0 ? (
                lawyers.map((lawyer) => (
                  <div
                    className="form-check d-flex align-items-center gap-2 m-0"
                    key={lawyer.id}
                  >
                    <input
                      className="form-check-input m-0"
                      type="checkbox"
                      id={lawyer.id}
                      checked={selectedLawyers?.includes(lawyer.userId)}
                      onChange={() =>
                        handleCheckboxChange(lawyer.userId, "lawyers")
                      }
                    />
                    <label
                      className="form-check-label d-flex align-items-center gap-2"
                      htmlFor={lawyer.id}
                    >
                      <img
                        onError={(e: any) =>
                          (e.target.src = toAbsoluteUrl(
                            "/media/avatars/300-1.jpg"
                          ))
                        }
                        src={
                          lawyer?.userImage
                            ? UserManagmentRootUrl + lawyer?.userImage
                            : toAbsoluteUrl("/media/avatars/300-1.jpg")
                        }
                        alt="lawyer"
                        className="rounded-circle"
                        style={{
                          width: theme === "dark" ? "25px" : "40px",
                          height: theme === "dark" ? "25px" : "40px",
                        }}
                      />
                      <span className="fs-6 fs-10px">{lawyer.fullName}</span>
                      <span className="text-muted">
                        {/* {lawyer?.isInternal
                          ? intl.formatMessage({ id: "Internal" })
                          : intl.formatMessage({ id: "External" })} */}
                        {intl.formatMessage({ id: "Internal" })}
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
            {errors.lawyers?.message && (
              <div className="text-danger mt-1">
                {intl.formatMessage({ id: "SelectAtLeastOneLawyer" })}
              </div>
            )}
          </div>

          {/* Data Entry Section */}
          <div className="col-lg-6 col-12 rounded p-4">
            <label className="form-label mb-2 text-muted">
              {intl.formatMessage({ id: "DataEntryOperators" })}
            </label>
            <div
              className="d-flex flex-column bg-light rounded p-2 gap-8 h-100"
              style={{ maxHeight: "150px", overflow: "auto" }}
            >
              {dataEntry?.length > 0 ? (
                dataEntry.map((operator) => (
                  <div
                    className="form-check d-flex align-items-center gap-2 m-0"
                    key={operator.id}
                  >
                    <input
                      className="form-check-input m-0"
                      type="checkbox"
                      id={operator.id}
                      checked={selectedDataEntryOperators?.includes(
                        operator.userId
                      )}
                      onChange={() =>
                        handleCheckboxChange(operator.userId, "dataEntry")
                      }
                    />
                    <label
                      className="form-check-label d-flex align-items-center gap-2"
                      htmlFor={operator.id}
                    >
                      <img
                        alt="operator"
                        className="rounded-circle"
                        style={{
                          width: theme === "dark" ? "25px" : "40px",
                          height: theme === "dark" ? "25px" : "40px",
                        }}
                        onError={(e: any) =>
                          (e.target.src = toAbsoluteUrl(
                            "/media/avatars/300-1.jpg"
                          ))
                        }
                        src={
                          operator?.userImage
                            ? UserManagmentRootUrl + operator?.userImage
                            : toAbsoluteUrl("/media/avatars/300-1.jpg")
                        }
                      />
                      <span className="fs-6 fs-10px">{operator.fullName}</span>
                      <span className="text-muted">
                        {/* {operator?.isInternal
                          ? intl.formatMessage({ id: "Internal" })
                          : intl.formatMessage({ id: "External" })} */}
                        {intl.formatMessage({ id: "Internal" })}
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
            {errors?.dataEntry?.message && (
              <div className="text-danger mt-1">
                {intl.formatMessage({
                  id: "SelectAtLeastOneDataEntryOperator",
                })}
              </div>
            )}
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
        </div>

        <div className="d-flex flex-column gap-3">
          {/* Display uploaded files */}
          <div className="d-flex flex-column gap-2">
            {/* dynamicAttachments */}
            {lkAttachmentSources?.map((source) => (
              <div className="border rounded p-3 mb-3" key={source.id}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="text-muted">
                    {intl.formatMessage({ id: "Source" })}:
                    {intl.locale == "ar" ? source?.nameAr : source?.nameEn}
                  </h6>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm rounded-circle d-flex align-items-center justify-content-center p-0"
                    style={{ width: "20px", height: "20px" }}
                    onClick={() => {
                      setSelectedLKSource({
                        id: source?.id,
                        name:
                          intl.locale == "ar" ? source?.nameAr : source?.nameEn,
                      });
                      setAddShowDoc(true);
                    }}
                  >
                    <i className="bi bi-plus" style={{ fontSize: "16px" }}></i>
                  </button>
                </div>

                {documents
                  ?.filter((document) => {
                    return document?.lK_AttachmentSourceId == source?.id;
                  })
                  ?.map((document, index) => {
                    return (
                      <Fragment key={index}>
                        <div
                          className={`mb-4 border rounded p-3 bg-${
                            theme == "dark" ? "#1b1b29" : "light"
                          }`}
                        >
                          {document?.attachments?.map((doc, index) => (
                            <div
                              key={doc?.id}
                              className="d-flex align-items-center justify-content-between mb-2"
                            >
                              <div
                                className={`d-flex justify-content-between align-items-center border rounded p-2 w-${"100"} bg-gray-100`}
                              >
                                <div>
                                  <img
                                    src={getIconSrc(
                                      doc?.fileName,
                                      doc?.fileAsBinary,
                                      ""
                                    )}
                                    className="w-50px h-50px border-radius-50 mx-2"
                                  />
                                  <span>
                                    {index + 1}#{" "}
                                    {doc?.attachmentName || doc?.fileName}{" "}
                                  </span>
                                </div>
                                <i
                                  onClick={() => {
                                    setShowDeletePopup(true);
                                    setSelectedId(doc?.id);
                                  }}
                                  className="fa-solid fa-trash mx-2 fs-4 text-danger cursor-pointer"
                                ></i>
                              </div>
                              {selectedId == doc?.id && showDeletePopup && (
                                <DeletePopup
                                  showDelete={showDeletePopup}
                                  handleCloseDelete={() =>
                                    setShowDeletePopup(false)
                                  }
                                  handleDelete={() => {
                                    deleteDoc(
                                      document?.lK_AttachmentSourceId,
                                      doc?.id
                                    );
                                  }}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </Fragment>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  let handleReset = () => {
    reset();
    setDocuments([]);
    handleClose();
  };

  //Set the value of the last causeStage after selecting the Cause
  useEffect(() => {
    if (causeStageNames?.at(-1)?.caseStageId) {
      setValue("causeStageId", causeStageNames.at(-1).caseStageId);
    }
  }, [causeStageNames, setValue]);

  return (
    <Modal
      size="lg"
      show={show}
      onHide={() => {
        handleClose();
        reset();
        setStep(1);
      }}
      centered
      className={!show ? "inert" : ""}
      style={{ zIndex: 1050 }}
    >
      <Modal.Header closeButton className="pb-0 border-bottom-0">
        <Modal.Title className="text-center position-relative w-100 mt-3">
          {intl.formatMessage({ id: "AddSession" })}
        </Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          {/* Steps Indicator */}
          <div className="mb-4 rounded bg-light-primary">
            {/* Step Circles with Dashed Line */}
            <div className="d-flex align-items-center justify-content-between px-10 position-relative mt-5 py-5">
              {/* Step 1 */}
              <div
                className="d-flex flex-column align-items-center position-relative flex-md-row"
                style={{ zIndex: 2 }}
              >
                <span
                  className="rounded-circle d-flex align-items-center justify-content-center text-white"
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
                  {intl.formatMessage({ id: "SessionData" })}
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
                className="d-flex flex-column align-items-center position-relative flex-md-row"
                style={{ zIndex: 2 }}
              >
                <span
                  className="rounded-circle d-flex align-items-center justify-content-center text-white"
                  style={{
                    width: "24px",
                    height: "24px",
                    backgroundColor: step === 2 ? "#00A3FF" : "#B5B5C3",
                  }}
                >
                  2
                </span>
                <span className="text-muted mt-2 mt-md-0 mx-md-2">
                  {intl.formatMessage({ id: "SessionDocuments" })}
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
            onClick={step === 1 ? handleReset : handleBack}
          >
            {step === 1
              ? intl.formatMessage({ id: "Cancel" })
              : intl.formatMessage({ id: "Previous" })}
          </button>

          {step === 1 && (
            <>
              <button
                className="btn btn-primary px-4"
                type="submit"
                style={{ backgroundColor: "#00A3FF" }}
              >
                {intl.formatMessage({ id: "Next" })}
              </button>
            </>
          )}
          {step === 2 && (
            <>
              {!loading ? (
                <button
                  className="btn btn-primary px-4"
                  type="submit"
                  style={{ backgroundColor: "#00A3FF" }}
                >
                  {intl.formatMessage({ id: "AddSession" })}
                </button>
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
            </>
          )}
        </Modal.Footer>
      </form>
      <DeletePopup
        showDelete={showDelete}
        handleCloseDelete={() => setShowDelete(false)}
      />
      {showDeleteModel && (
        <div className="modal fade">
          <DeletePopup
            showDelete={showDeleteModel}
            handleCloseDelete={() => setShowDeleteModel(false)}
          />
        </div>
      )}
      {addShowDoc && (
        <div className="modal fade">
          <AddCauseDocPopup
            setDocuments={setDocuments}
            show={addShowDoc}
            handleClose={() => setAddShowDoc(false)}
            selectedLKSource={selectedLKSource}
          />
        </div>
      )}
    </Modal>
  );
};

export default AddSessionPopup;
