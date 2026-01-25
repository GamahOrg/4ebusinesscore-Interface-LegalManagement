import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import MenuNav from "../menu-nav";
import EditCaseDetails from "./EditCaseDetails";
import EditPartiesToTheDispute from "./EditPartiesToTheDispute";
import EditDropDownConTeamWork from "./EditDropDownConTeamWork";
import EditDocument from "./EditDocument";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchCauseById } from "../../../../features/cause";
import { AppDispatch, RootState } from "../../../../store/store";
import { fetchAllLKCauseCategories } from "../../../../features/lk-cause-categories";
import { fetchAllLKStage } from "../../../../features/stage";
import moment from "moment";
import { useIntl } from "react-intl";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { putCause } from "../../../../features/causes";
import { ClientType } from "../../../../models/LegalEnums";
import { EditCauseSchema , EditCauseProps } from "../../../../validations/edit-cause-validation";

function EditCaseTabs() {
  const tabs = [
    {
      id: 1,
      title: "CaseDetails",
    },
    {
      id: 2,
      title: "PartiesToTheDispute",
    },
    {
      id: 3,
      title: "TeamMembers",
    },

    {
      id: 4,
      title: "Documents",
    },
  ];
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(1);
  let intl = useIntl();
  const tabValidationFields: Record<number, ("title" | "incidentDate" | "incidentLocation" | "subject" | "LK_TypeJudiciaryId")[]> = {
    1: ["title", "incidentDate", "incidentLocation", "subject", "LK_TypeJudiciaryId"],
    2: [],
    3: [],
    4: [],
  };
  const handleButtonClick = async (button: { id: number }) => {
    const fields = tabValidationFields[activeTab] || [];
    const isValid = await trigger(fields); 
    if (activeTab == 1 &&!isValid) {
      return;
    }

    const isMovingForward = button.id > activeTab;
  
    if (isMovingForward) {
      if (activeTab == 2 && clients?.length == 0) {
        showAlert(false, "YouMustSelectClients", intl);
        return;
      }
  
      if (activeTab == 2 && opponents?.length == 0) {
        showAlert(false,"YouMustSelectOpenents", intl);
        return;
      }
    }
  
    setActiveTab(button.id);
  };


  const onNext = async (fields: ("title" | "incidentDate" | "incidentLocation" | "subject" | "LK_TypeJudiciaryId")[]) => {
    const isValid = await trigger(fields);
    if (activeTab == 1 &&!isValid ) {
      return;
    }

    if (activeTab == 2 &&clients?.length == 0) {
      showAlert(false, "YouMustSelectClients", intl);
      return;
    }
    if (activeTab == 2 &&opponents?.length == 0) {
      showAlert(false, "YouMustSelectOpenents", intl);
      return;
    }
    setActiveTab((prev) => prev + 1);
  };
  const dispatch = useDispatch<AppDispatch>();
  const [causeData, setCauseData] = useState<any>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchCauseById(id) as any)
        .then((response: any) => {
          setCauseData(response.payload);
        })
        .catch((error: any) => {
          console.error("Error fetching cause data:", error);
        });
    }
  }, [id, dispatch]);
  

  useEffect(() => {
    dispatch(fetchAllLKCauseCategories({}));
    dispatch(fetchAllLKStage({}));
  }, []);
  const causeDetails = useSelector((state: RootState) => {
    return state?.causes?.causeById;
  });
  const causeCategories = useSelector(
    (state: RootState) => state?.lkCauseCategories?.lkCauseCategories
  );
  const causeStages = useSelector(
    (state: RootState) => state?.lkSatge?.lkStages
  );
  const [selectedClassification, setSelectedClassification] = useState<any>();
  const [selectedCauseStageId, setSelectedCauseStageId] = useState<any>();
  const [selectedTypeJudiciaryId, setSelectedTypeJudiciaryId] = useState<any>();

  const [clients, setClients] = useState<any[]>([]);
  const [opponents, setOpponents] = useState<any[]>([]);
  const [clientStatus, setClientStatus] = useState<any>();
  const [owners, setOwners] = useState<any[]>([]);
  const [supervisors, setSupervisors] = useState<any[]>([]);
  const [lawyers, setLawyers] = useState<any[]>([]);
  const [dataEntry, setDataEntry] = useState<any[]>([]);
  const [consultatives, setConsultatives] = useState<any[]>([]);
  const [selectedSatge, setSelectedStage] = useState<any>({});
  const [selectedFilesForAttachments, setSelectedFilesForAttachments] =
    useState<any>([]);
  useEffect(() => {
    if (causeDetails) {
      setOwners(causeDetails?.causeAssigns?.owner);
      setSupervisors(causeDetails?.causeAssigns?.supervisor);
      setLawyers(causeDetails?.causeAssigns?.lawyers);
      setDataEntry(causeDetails?.causeAssigns?.dataEntry)
      setConsultatives(causeDetails?.causeAssigns?.consultatives)
      setSelectedClassification(causeDetails?.lK_CauseCategories?.id);
      setSelectedCauseStageId(
        causeDetails?.causeStages[causeDetails?.causeStages?.length - 1]
          ?.lK_StageId
      );
      setSelectedTypeJudiciaryId(causeDetails?.lkTypeJudiciaryId || causeDetails?.lK_TypeJudiciary?.id);
      setClients(causeDetails?.causeLitigants?.filter(item => item.litigant.litigantStatus == 2));
      setOpponents(causeDetails?.causeLitigants?.filter(item => item.litigant.litigantStatus == 1))
      setClientStatus(
        causeDetails?.clientType =="Plaintiff" 
          ? "lawyers"
          : causeDetails?.clientType == "Defendant"
          ? "dayManager"
          : ""
      );

      setSelectedStage(causeDetails?.causeStages[causeDetails?.causeStages?.length - 1]?.lK_Stage);
      const lastStage = causeDetails?.causeStages?.[causeDetails.causeStages.length - 1];
      const attachments = lastStage?.causeStageAttachment;

if (Array.isArray(attachments)) {
  const mappedAttachments = attachments.map((attachment: any) => ({
    name: attachment?.fileName,
    path: attachment?.filePath,
    id: attachment?.id,
    createdOn: attachment?.createdOn,
    createdByName: attachment?.createdByName,
    attachmentSource: {
      id: attachment?.attachmentSource?.id,
      nameAr: attachment?.attachmentSource?.nameAr,
      nameEn: attachment?.attachmentSource?.nameEn,
    },
  }));

  setSelectedFilesForAttachments(mappedAttachments);
} else {
  setSelectedFilesForAttachments([]); 
}

    }
  }, [causeDetails]);

  useEffect(() => {
    if (causeDetails) {
      setValue("title", causeDetails?.title);
      if (causeDetails.incidentDate) {
        const formattedDate = causeDetails.incidentDate.slice(0, 10); 
        setValue("incidentDate", formattedDate);
      }
      setValue("incidentLocation", causeDetails?.incidentLocation);
      setValue("subject", causeDetails?.subject);
    }
  }, [causeDetails]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    trigger,
    reset,
  } = useForm<EditCauseProps>({
    resolver: yupResolver(EditCauseSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (causeDetails) {
      setValue("title", causeDetails?.title);
      if (causeDetails.incidentDate) {
        const formattedDate = causeDetails.incidentDate.slice(0, 10); 
        setValue("incidentDate", formattedDate);
      }
      setValue("incidentLocation", causeDetails?.incidentLocation);
      setValue("subject", causeDetails?.subject);
      setValue("LK_TypeJudiciaryId", causeDetails?.lkTypeJudiciaryId || causeDetails?.lK_TypeJudiciary?.id);
    }
  }, [causeDetails, setValue]);

  const navigate = useNavigate();
  const handleSubmitForm = (formValues: EditCauseProps) => {
if (
  supervisors &&
  supervisors.length === 0 &&
  ((lawyers && lawyers.length > 0) || (dataEntry && dataEntry.length > 0))
) {
  showAlert(false, "EachClaimMustHaveOneSupervisior", intl);
  return;
}

    let formData = new FormData();
    formData.append("Id", id || "");
    formData.append("Title", formValues?.title);
    formData.append("IncidentDate", formValues?.incidentDate);
    formData.append("CauseDate", formValues?.incidentDate); // Use same date as IncidentDate to satisfy backend validation
    formData.append("IncidentLocation", formValues?.incidentLocation);
    formData.append("Subject", formValues?.subject);
    formData.append("LK_CauseCategoryId", selectedClassification);
    formData.append("LK_StageId", selectedCauseStageId);
    formData.append("LK_TypeJudiciaryId", formValues?.LK_TypeJudiciaryId || selectedTypeJudiciaryId);

    if (clientStatus == "lawyers") {
      formData.append("ClientType", ClientType.Plaintiff.toString());
    } else if (clientStatus == "dayManager") {
      formData.append("ClientType", ClientType.Defendant.toString());
    }
    const mergedLitigants = [...(clients ?? []), ...(opponents ?? [])];
    mergedLitigants?.forEach((ele: any, documentIndex) => {
      formData.append(`CauseLitigant[${documentIndex}].litigantId`, ele?.litigant?.id);
      formData.append(`CauseLitigant[${documentIndex}].compliment`, ele?.compliment);
    });
    supervisors?.forEach((ele: any, documentIndex) => {
      formData.append(`Supervisors[${documentIndex}].id`, ele?.userId);
      formData.append(`Supervisors[${documentIndex}].isSupervisorStage`, ele?.isSupervisorStage);
    });
    lawyers?.forEach((ele: any, documentIndex) => {
      formData.append(`Lawyers[${documentIndex}]`, ele?.userId);
    });
    dataEntry?.forEach((ele: any, documentIndex) => {
      formData.append(`DataEntries[${documentIndex}]`, ele?.userId);
    });
    owners?.forEach((ele: any, documentIndex) => {
      formData.append(`Owner[${documentIndex}]`, ele?.userId);
    });
    consultatives?.forEach((ele: any, documentIndex) => {
      formData.append(`Consultatives[${documentIndex}]`, ele?.userId);
    });
    const newAttachments = selectedFilesForAttachments?.filter(
      (file: any) => (file.attachmentFile && file.attachmentFile.size > 0) || (file.attachment && file.attachment.size > 0)
    );
    const oldAttachments = selectedFilesForAttachments?.filter(
      (file: any) => !file.attachmentFile && !file.attachment
    );
    newAttachments?.forEach((file: any, index: number) => {
      
      const attachmentFile = file?.attachment;
      formData.append(`Attachments[${index}].attachmentFile`, attachmentFile);
      formData.append(`Attachments[${index}].attachmentName`, file?.attachmentName || attachmentFile?.name);
    formData.append(`Attachments[${index}].lK_AttachmentSourceId`, file?.lK_AttachmentSourceId);
     });

    oldAttachments?.forEach((file: any, index: number) => {
    formData.append(`OdAttachmenPaths[${index}]`, file?.path);
    });
    dispatch(putCause(formData) as any).then((res: any) => {
      if (
        res?.payload?.statusEnum == 1 &&
        res?.payload?.message == "CauseEditedSuccessfully"
      ) {
        showAlert(true, "ModifiedSuccessfully", intl);
        reset();
        navigate("/cases-view")
      } else if (res?.payload?.message == '["CauseDate must be after Cause IncidentDate"]'){
        showAlert(false, "CauseDateMustBeAfterCauseIncidentDate", intl);
      }
      else {
        showAlert(false, res?.payload?.message, intl);
      }
    });
  };

  const loading = useSelector((state: RootState) => {
    return state?.causesData?.loading;
  });

  const onBack = () => {
  if (activeTab > 1) {
    setActiveTab((prev) => prev - 1);
  } else {
    navigate("/cases-view"); 
  }
};
  const ActivatedEditCauseTab = () => {
    switch (activeTab) {
      case 1:
        return (
          <EditCaseDetails
            causeCategories={causeCategories}
            causeStages={causeStages}
            register={register}
            errors={errors}
            selectedClassification={selectedClassification}
            setSelectedClassification={setSelectedClassification}
            selectedCauseStageId={selectedCauseStageId}
            setSelectedCauseStageId={setSelectedCauseStageId}
            onNext={onNext}
            

            causeDetails={causeDetails}
            selectedSatge={selectedSatge}
            setSelectedStage={setSelectedStage}
            onBack={onBack}
            selectedTypeJudiciaryId={selectedTypeJudiciaryId}
            setSelectedTypeJudiciaryId={setSelectedTypeJudiciaryId}
          />
        );
      case 2:
        return <EditPartiesToTheDispute 
             setClients={setClients}
             clients={clients}
             setOpponents={setOpponents}
             opponents={opponents} 
             setClientStatus={setClientStatus}
             clientStatus={clientStatus}
             onNext={onNext}
             onBack={onBack}/>;
      case 3:
        return <EditDropDownConTeamWork 
        owners={owners} 
        setOwners={setOwners}
        supervisors={supervisors}
        setSupervisors={setSupervisors}
        lawyers={lawyers}
        setLawyers={setLawyers}
        dataEntry={dataEntry}
        setDataEntry={setDataEntry}
        consultatives={consultatives}
        setConsultatives={setConsultatives}
        onNext={onNext}
        selectedSatge={selectedSatge}
        onBack={onBack}
        />;
      case 4:
        return <EditDocument 
        setSelectedFilesForAttachments={setSelectedFilesForAttachments}
        selectedFilesForAttachments={selectedFilesForAttachments} 
        loading={loading}
        onBack={onBack}
        onSubmit={handleSubmit(handleSubmitForm)}
        />;
    }
  };
  return (
    <div className="container card pb-5">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="menu-nav my-4 mb-8 w-100 border-bottom border-gray-300 border-1 d-flex align-items-end gap-10 custom-mobile-tabs">
          {tabs?.map((button) => (
            <div className="nav-item" key={button.id}>
              <div
                className={`menu-tab pb-4 border-3 
                  ${
                    activeTab == button.id
                      ? "border-primary border-bottom border-3 "
                      : ""
                  }
                `}
                onClick={() => handleButtonClick(button)}
              >
                <span
                  className={`title fw-bolder cursor-pointer ${
                    activeTab === button.id ? "text-primary" : "text-gray-500"
                  }`}
                >
                  {intl.formatMessage({
                    id: button.title,
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
        {ActivatedEditCauseTab()}
      </form>
    </div>
  );
}

export default EditCaseTabs;
