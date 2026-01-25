import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import EditStudyClaimsForm from "./EditStudyClaimForm";

const EditClaimStudy = () => {
  return (
    <>
      <GenericToolbar
        list={[
          { key: "StudyOfLawsuits", value: "/study-of-lawsuits" },
          { key: "EditStudy", value: "" },
        ]}
      />

      <EditStudyClaimsForm />
    </>
  );
};

export default EditClaimStudy;
