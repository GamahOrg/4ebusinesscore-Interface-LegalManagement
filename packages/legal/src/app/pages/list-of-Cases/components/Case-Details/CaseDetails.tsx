
import CaseDetailsWithNewStatus from "./CaseDetailsWithNewStatus";
import CaseDetailsWithAllStatus from "./CaseDetailsWithAllStatus";

type props ={
    LitigationStatus: string;
}

    function CaseDetails(LitigationStatus: props) {

    return (
        <>
        {LitigationStatus.LitigationStatus == "جديدة" ?
            <CaseDetailsWithNewStatus status = {LitigationStatus.LitigationStatus}/>
            : <CaseDetailsWithAllStatus status = {LitigationStatus.LitigationStatus}/>
            } 
        </>
    );
    }

    export default CaseDetails;
