import { useEffect, useState } from "react";
import ClientsSection from "./ClientsSection";
import CaseSection from "./CaseSection";
import { Button, Spinner } from "react-bootstrap";
import { useIntl } from "react-intl";
import { AddPopup } from "@4eplatform/shared/src/popups/AddPopup";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { RootState, useAppDispatch } from "../../../../store/store";
import { fetchAllLKCauseCategories } from "../../../../features/lk-cause-categories";
import { useSelector } from "react-redux";
import { fetchAllLKStage } from "../../../../features/stage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AddCauseProps,
  AddCauseSchema,
} from "../../../../validations/add-cause-validation";
import { postCause } from "../../../../features/causes";
import { ClientType } from "../../../../models/LegalEnums";
import { useNavigate } from "react-router-dom";

export default function AddAcaseHome() {
  const intl = useIntl();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [clients, setClients] = useState<any>([]);
  const [opponents, setOpponents] = useState<any>([]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      fetchAllLKCauseCategories({
        PageNumber: 1,
        pageSize: 1000,
      })
    );
    dispatch(fetchAllLKStage({}));
  }, []);
  const causeCategories: any = useSelector(
    (state: RootState) => state?.lkCauseCategories?.lkCauseCategories
  );

  const causeStages = useSelector(
    (state: RootState) => state?.lkSatge?.lkStages
  );

  const [clientStatus, setClientStatus] = useState("lawyers");
  let [documents, setDocuments] = useState<any>([]);
  const [selectedCauseStage, setSelectedCauseStage] = useState<any>({});
  const [
    selectLK_ClassificationTypeELibraryId,
    setSelectLK_ClassificationTypeELibraryId,
  ] = useState<any>();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    watch,
    setValue,
    trigger,
    setError,
    formState: { errors },
  } = useForm<AddCauseProps>({
    resolver: yupResolver(AddCauseSchema),
    mode: "all",
    reValidateMode: "onChange",
  });
  let navigate = useNavigate();
  const selectedCauseStageId = watch("causeStageId");

  // const LK_ClassificationTypeELibraryId = watch("LK_ClassificationTypeELibraryId");
  const caseType = watch("caseType");
  const caseDate = watch("caseDate");
  const causeStageNumber = watch("causeStageNumber");
  const handleAddCause = async (formValues: AddCauseProps) => {
    if (!clientStatus) {
      showAlert(false, "YouMustSelectClientStatus", intl);
      return;
    } else if (clients?.length == 0) {
      showAlert(false, "YouMustSelectClients", intl);
      return;
    } else if (opponents?.length == 0) {
      showAlert(false, "YouMustSelectOpenents", intl);
      return;
    }
    const mergedArray = [...clients, ...opponents];
    let formData = new FormData();
    formData.append("Title", formValues?.title);
    formData.append("IncidentDate", formValues?.incidentDate);
    formData.append("IncidentLocation", formValues?.incidentLocation);
    formData.append("Subject", formValues?.subject);
    formData.append("LK_CauseCategoryId", formValues?.causeClassification);

    if (caseType === "lawsuit") {
      if (caseDate) {
        formData.append("CauseDate", caseDate);
      }
      if (causeStageNumber) {
        formData.append("CauseStageNumber", causeStageNumber);
      }
    } else {
      // For study cases, use incidentDate as CauseDate
      formData.append("CauseDate", formValues?.incidentDate);
    }
    if (formValues?.LK_TypeJudiciaryId) {
      formData.append("LK_TypeJudiciaryId", formValues?.LK_TypeJudiciaryId);
    }

    let stageIdValue = "";
    if (caseType === "study") {
      stageIdValue = "1";
    } else if (caseType === "lawsuit" && selectedCauseStageId) {
      stageIdValue = selectedCauseStageId;
    }
    formData.append("LK_StageId", stageIdValue);
    if (formValues?.causeClassification === "12") {
      formData.append("OtherCategoryNameAr", formValues?.OtherCategoryNameAr);
      formData.append("OtherCategoryNameEn", formValues?.OtherCategoryNameEn);

      // const body = {Category:{
      //   OtherCategoryNameAr: formValues?.OtherCategoryNameAr,
      //   OtherCategoryNameEn: formValues?.OtherCategoryNameEn,
      // }}
      //   dispatch(addLKCauseCategory({body}) as any ).then((res: any) => {
      //     if (
      //       res?.payload?.statusEnum == 0 &&
      //       res?.payload?.message == "SavedSuccessfully"
      //     ) {
      //       reset();
      //       navigate(-1);;
      //   }
      //   else if (res?.payload?.message === "[\"The combination of NameAr and NameEn must be unique.\"]")
      //     {
      //             showAlert(false, "mustChangeName", intl);
      //   }

      // })
    }
    if (clientStatus == "lawyers") {
      formData.append("ClientType", ClientType.Plaintiff.toString());
    } else if (clientStatus == "dayManager") {
      formData.append("ClientType", ClientType.Defendant.toString());
    }

    mergedArray?.forEach((ele: any, documentIndex) => {
      formData.append(
        `CauseLitigant[${documentIndex}].litigantId`,
        ele?.litigantId
      );
      formData.append(
        `CauseLitigant[${documentIndex}].compliment`,
        ele?.compliment
      );
    });
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

    dispatch(postCause(formData) as any).then((res: any) => {
      if (
        res?.payload?.statusEnum == 0 &&
        res?.payload?.message == "SavedSuccessfully"
      ) {
        showAlert(true, "AddedSuccessfully", intl);
        reset();
        navigate(-1);
      } else if (res?.payload?.message === "Cause title is already exists") {
        showAlert(false, "CauseTitleAlreadyExists", intl);
      } else if (
        res?.payload?.message === "Cause title is already exists" ||
        res?.payload?.message === "IncidentDate cant be in the future"
      ) {
        showAlert(false, "CauseTitleAlreadyExistsAndDate", intl);
      } else if (
        res?.payload?.message == "IncidentDate cant be in the future"
      ) {
        showAlert(false, "IncidentDate cant be in the future", intl);
      } else if (
        res?.payload?.message == "CauseDate must be after Cause IncidentDate"
      ) {
        showAlert(false, "CauseDateMustBeAfterIncidentDate", intl);
      } else if (
        res?.payload?.message ===
        '["IncidentDate cant be in the future","CauseDate must be after Cause IncidentDate"]'
      ) {
        showAlert(false, "DateValidationErrors", intl);
      } else if (
        res?.payload?.message === '["IncidentDate cant be in the future"]'
      ) {
        showAlert(false, "DateValidationErrors2", intl);
      } else if (
        res?.payload?.message === '["Cause stage number is already exists"]'
      ) {
        showAlert(false, "CauseStageNumberIsAlreadyExists", intl);
      } else if (
        res?.payload?.message ===
        '["Cause title is already exists","Cause stage number is already exists"]'
      ) {
        showAlert(
          false,
          "CauseStageNumberIsAlreadyExistsAndCauseTiltleIsAlreadyExists",
          intl
        );
      } else if (
        res?.payload?.message ===
        '["Cause stage number is already exists","IncidentDate cant be in the future","CauseDate must be after Cause IncidentDate"]'
      ) {
        showAlert(false, "DateValidationAndCauseStageErrors", intl);
      } else if (
        res?.payload?.message ===
        '["Cause stage number is already exists","IncidentDate cant be in the future"]'
      ) {
        showAlert(
          false,
          "CauseStageNumberIsAlreadyExistsAndIncidentDateCantBeInTheFuture",
          intl
        );
      } else if (
        res?.payload?.message ===
        '["Cause stage number is already exists","CauseDate must be after Cause IncidentDate"]'
      ) {
        showAlert(
          false,
          "CauseStageNumberIsAlreadyExistsAndCauseDateMustBeAfterIncidentDate",
          intl
        );
      } else {
        showAlert(false, res?.payload?.message, intl);
      }
    });
  };
  const loading = useSelector((state: RootState) => {
    return state?.causesData?.loading;
  });

  return (
    <>
      <form onSubmit={handleSubmit(handleAddCause)} noValidate>
        <div className="card table-dark card-xl-stretch mb-xl-8">
          <CaseSection
            causeCategories={causeCategories}
            causeStages={causeStages}
            selectedCauseStageId={selectedCauseStageId}
            register={register}
            errors={errors}
            selectedCauseStage={selectedCauseStage}
            setSelectedCauseStage={setSelectedCauseStage}
            watch={watch}
          />
          <ClientsSection
            setClients={setClients}
            clients={clients}
            setOpponents={setOpponents}
            setClientStatus={setClientStatus}
            clientStatus={clientStatus}
            setValue={setValue}
            trigger={trigger}
            documents={documents}
            setDocuments={setDocuments}
            errors={errors}
            opponents={opponents}
          />
          <div className="d-flex justify-content-md-end justify-content-center px-5 mt-10 pb-4 mb-10 mx-5 mt-3 add-edit-case-bottom flex-wrap">
            {/* <Button
            variant="secondary"
            className="me-3 px-20 mb-3"
            onClick={() => {
              navigate(-1)
            }}
          >
            {intl.formatMessage({ id: "Drafts" })}
          </Button> */}
            <Button
              variant="secondary"
              className="me-3 px-20 mb-3"
              onClick={() => {
                navigate(-1);
              }}
            >
              {intl.formatMessage({ id: "Cancel" })}
            </Button>
            {!loading ? (
              <button
                type="submit"
                className="btn btn-primary px-20 text-center  mb-3"
              >
                {intl.formatMessage({ id: "Add" })}
              </button>
            ) : (
              <Button variant="primary" disabled className="px-10 mb-3">
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="mx-2"
                />
                <span>{intl.formatMessage({ id: "DataIsLoaded..." })}</span>
              </Button>
            )}
          </div>
        </div>
      </form>

      {modalShow && (
        <AddPopup show={modalShow} handleClose={() => setModalShow(false)} />
      )}
    </>
  );
}
