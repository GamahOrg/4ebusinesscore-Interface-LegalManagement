import TeamWork from './team-work/TeamWork'

interface TeamMembersProps {
  isConsultive: boolean;
  isLawyerToTakeAction:boolean;
  isDataEntry?:any;
  isOwnerOrSuperVisor?:any;
}
function TeamMembers({ isConsultive ,isLawyerToTakeAction ,
    isDataEntry,
  isOwnerOrSuperVisor,
 }: TeamMembersProps) {
  return (
    <div className=''>
<TeamWork isConsultive ={isConsultive}  isLawyerToTakeAction={isLawyerToTakeAction}
isDataEntry={isDataEntry}
        isOwnerOrSuperVisor={isOwnerOrSuperVisor}/>    </div>
  )
}

export default TeamMembers
