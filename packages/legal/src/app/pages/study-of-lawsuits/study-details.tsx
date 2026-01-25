import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import { StudyClaimDetails } from "./components/StudyClaimDetails";

const StudyDetails = () => {
  return (
    <>
      <GenericToolbar
        list={[
          { key: "StudyOfLawsuits", value: "/study-of-lawsuits" },
          { key: "StudyDetails", value: "" },
        ]}
      />

      <StudyClaimDetails />
    </>
  );
};

export default StudyDetails;
