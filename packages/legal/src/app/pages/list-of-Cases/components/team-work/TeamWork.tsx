import TeamWorkBody from "./TeamWorkBody";
import CaseInfo from "../CaseInfo";

interface TeamMembersProps {
  isConsultive: boolean;
  isLawyerToTakeAction:boolean;
  isDataEntry?:any;
  isOwnerOrSuperVisor?:any;
}
function TeamWork({ isConsultive , isLawyerToTakeAction ,isDataEntry,
  isOwnerOrSuperVisor, }: TeamMembersProps) {
  return (
    <>
      <CaseInfo
      // color="gray-100"
      // caseTitle="نزاع أرض الرياض"
      // caseNumber="#5645645"
      // caseName="الدعوى #7"
      // caseStatus="منتهية"
      />

      <div>
        <TeamWorkBody isConsultive ={isConsultive} isLawyerToTakeAction={isLawyerToTakeAction}
         isDataEntry={isDataEntry}
        isOwnerOrSuperVisor={isOwnerOrSuperVisor} />
      </div>
    </>
  );
}

export default TeamWork;
