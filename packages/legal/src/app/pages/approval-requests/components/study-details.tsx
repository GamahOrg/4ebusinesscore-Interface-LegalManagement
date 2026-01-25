import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import StudyClaimDetails3 from "./StudyClaimDetails2";

const StudyDetails3 = () => {
  return (
    <>
      <GenericToolbar
        list={[
          { key: "ApprovalRequests", value: "/approval-requests" },
          { key: "StudyDetails", value: "" },
        ]}
      />

      <StudyClaimDetails3 />
    </>
  );
};

export default StudyDetails3;
