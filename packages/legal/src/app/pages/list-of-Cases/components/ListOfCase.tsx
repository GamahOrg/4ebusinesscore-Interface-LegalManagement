import { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router";
import PartiesToTheDispute from "./PartiesToTheDispute";
import CaseDetails from "./Case-Details/CaseDetails";
import TeamMembers from "./TeamMembers";
import LevelsOfLitigation from "./LitigationStages";
import CaseArchive from "./CaseArchive";
import Documents from "./Documents";
import MenuNav from "./menu-nav";
import Provisions from "./Provisions";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchCauseById } from "../../../features/cause";
import { CauseStatus } from "../../../models/LegalEnums";
import CauseComments from "./CauseComments";
import { fetchAssignMember } from "../../../features/members";
import { title } from "process";
import { fetchIsConsultative } from "../../../features/cause-comments";

function ListOfCase() {
  const location = useLocation();
    let { id: caseId } = useParams();
  const status = location?.state?.item?.litigationStatus;
  const statusId = location?.state?.item?.caseStatusById;
  const hideOtherTabs = location?.state?.hideOtherTabs;
  const caseData = useAppSelector((state) => state.causes.causeById);
  const assignedMembers = useAppSelector((state) => state.members.members);

  const loggedSpecialistId = localStorage.getItem("userId");

  const [isSpecialist, setIsSpecialist] = useState<boolean>(false);
  const [isConsultive , setIsConsultive] = useState<boolean>(true); 
  const [isLawyerToTakeAction , setIsLawyerToTakeAction] = useState<boolean>(false);
  const [isDataEntry , setIsDataEntry] = useState<boolean>(false);
  const [isOwnerOrSuperVisor , setIsOwnerOrSuperVisor] = useState<boolean>(false);
  useEffect(()=>{
   dispatch(fetchIsConsultative({
    CauseId:caseId,
   }) as any).then((res: any) => {
   if(res?.payload?.message == "RetrievedSuccessfully" || res?.payload?.statusEnum == 3){
     setIsConsultive(res?.payload?.result?.isConsultative)
     setIsLawyerToTakeAction(res?.payload?.result?.isLawyer)
     setIsDataEntry(res?.payload?.result?.isDataEntery)
     setIsOwnerOrSuperVisor(res?.payload?.result?.isOwnerOrSupervisor)
   }
    });
     },[]);
  const tabs = [
    {
      title: "CaseDetails",
      render: <CaseDetails LitigationStatus={status} />,
    },
    {
      title: "PartiesToTheDispute",
      render: <PartiesToTheDispute LitigationStatus={status} />,
    },
    { title: "TeamMembers", render: <TeamMembers
       isConsultive={isConsultive}
       isLawyerToTakeAction={isLawyerToTakeAction} 
       isDataEntry={isDataEntry}
      isOwnerOrSuperVisor={isOwnerOrSuperVisor}/> },
    { title: "lawsuits", render: <LevelsOfLitigation isConsultive={isConsultive} isLawyerToTakeAction={isLawyerToTakeAction}   
      isDataEntry={isDataEntry}
      isOwnerOrSuperVisor={isOwnerOrSuperVisor}/> },
    { title: "Documents", render: <Documents isConsultive={isConsultive}  isLawyerToTakeAction={isLawyerToTakeAction}
     isDataEntry={isDataEntry}
      isOwnerOrSuperVisor={isOwnerOrSuperVisor} /> },
    { title: "Provisions", render: <Provisions /> },
    { title: "CaseArchive", render: <CaseArchive /> },
    // { title: "Notes", render: <CauseComments /> },
    // {
    //   title: "ProceduresAndApprovals",
    //   render: <ProceduresAndApprovals />,
    // },
  ];

  const userId = localStorage.getItem("userId");

  
  const normalizedMembers: any[] = Array.isArray(assignedMembers)
    ? (assignedMembers as any[])
    : Object.values(assignedMembers ?? ({} as any)).flat() as any[];

  const userExists = normalizedMembers.some(
    (item: any) => item?.userId === userId
  );

  // Conditionally add the "Notes" tab
  if (userExists) {
    tabs.push({ title: "Notes", render: <CauseComments isConsultive={isConsultive}  /> });
  }

  // Initialize state for currentTab and active
  const [currentTab, setCurrentTab] = useState(() => {
    // If there is a hash in the URL, use it; otherwise, default to the first tab.
    return location.hash || `#${tabs[0]?.title}`;
  });

  const [active, setActive] = useState(() => {
    // Extract the tab name from the hash or fallback to the first tab
    return location.hash ? location.hash.replace("#", "") : tabs[0]?.title;
  });

  // Sync the state when the location.hash changes
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      setCurrentTab(hash);
      setActive(hash.replace("#", ""));
    }
  }, [location.hash]); // Only re-run when location.hash changes

  const visibleTabs = tabs.filter(
    (tab) => !(tab.title === "" && !isSpecialist)
  );
  const updatedTabs = visibleTabs.map((tab) => ({
    ...tab,
    isActive: tab.title === active,
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCauseById(caseId as string) as any);
  }, [dispatch, caseId]);

  const fetchSpecialists = async (caseId: string) => {
    const member = await dispatch(
      fetchAssignMember({
        causeId: caseId,
      }) as any
    ).unwrap();

    const isInSpecialists = member.result?.consultatives?.some(
      (item: any) => item.userId === loggedSpecialistId
    );
    setIsSpecialist(isInSpecialists ?? false);
  };

  useEffect(() => {
    if (caseId) {
      fetchSpecialists(caseId);
    }
  }, [caseId]);
  return (
    <div className="container card p-sm-10 p-5">
      {true && (
        <MenuNav tabs={updatedTabs} active={active} setActive={setActive} />
      )}
      {updatedTabs
        .filter((tab) => `#${tab.title}` === currentTab)
        .map((tab, index) => (
          <Fragment key={index}>{tab.render}</Fragment>
        ))}
    </div>
  );
}

export default ListOfCase;
