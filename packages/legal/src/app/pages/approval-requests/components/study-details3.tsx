import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import { StudyClaimD } from "./StudyClaimDetails3";

const StudyDetails4 = () => {
  return (
    <>
      <GenericToolbar
        list={[
          { key: "ApprovalRequests", value: "/approval-requests" },
          { key: "StudyDetails", value: "" },
        ]}
      />

      <StudyClaimD />
    </>
  );
};

export default StudyDetails4;
