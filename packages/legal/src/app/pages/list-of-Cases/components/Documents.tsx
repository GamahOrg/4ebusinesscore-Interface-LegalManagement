import React from 'react'
import Document from './Occasions/Document'

interface DocumentsProps {
  isConsultive?:boolean;
  isLawyerToTakeAction?:boolean;
  isDataEntry?:any;
  isOwnerOrSuperVisor?:any;

}
function Documents({isConsultive , isLawyerToTakeAction ,  
   isDataEntry,
  isOwnerOrSuperVisor,} : DocumentsProps) {
  return (
    <>
      <Document isConsultive={isConsultive} isLawyerToTakeAction ={isLawyerToTakeAction}   isDataEntry={isDataEntry}
        isOwnerOrSuperVisor={isOwnerOrSuperVisor} />
    </>
  )
}

export default Documents
