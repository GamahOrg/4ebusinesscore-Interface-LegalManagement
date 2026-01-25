import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import AddStudyClaimsForm from "./AddStudyClaimForm";

const AddClaimStudy = () => {
  return (
    <>
      <GenericToolbar
        list={[
          { key: "StudyOfLawsuits", value: "/study-of-lawsuits" },
          { key: "AddStudy", value: "" },
        ]}
      />

      <AddStudyClaimsForm />
    </>
  );
};

export default AddClaimStudy;
