import { RightToolbar } from "@4eplatform/shared/src/partials/RightToolbar";
import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import { StudyClaimDetails } from "./StudyClaimDetails";

const StudyDetails2 = () => {
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

export default StudyDetails2;
