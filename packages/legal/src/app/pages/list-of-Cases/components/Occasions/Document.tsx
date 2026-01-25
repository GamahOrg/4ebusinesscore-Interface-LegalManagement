import DocumentBody from "./DocumentBody";
import CaseInfo from "../CaseInfo";

interface DocumentProps{
  isConsultive?:boolean;
  isLawyerToTakeAction?:boolean;
  isDataEntry?:any;
  isOwnerOrSuperVisor?:any;
}
function Document({isConsultive , isLawyerToTakeAction , isDataEntry,
  isOwnerOrSuperVisor, }:DocumentProps) {
  return (
    <>
      <CaseInfo />
      <div>
        <DocumentBody isConsultive={isConsultive} isLawyerToTakeAction={isLawyerToTakeAction}        isDataEntry={isDataEntry}
        isOwnerOrSuperVisor={isOwnerOrSuperVisor} />
      </div>
    </>
  );
}

export default Document;
