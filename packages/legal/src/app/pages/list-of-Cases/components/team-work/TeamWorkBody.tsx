import { useEffect, useState } from "react";
import { Row, Col, Button, Collapse, Spinner } from "react-bootstrap";
import { useIntl } from "react-intl";
import EditTeamWorkPopup from "../../popups/EditTeamWorkPopup";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAssignMember } from "../../../../features/members";
import { useAppSelector } from "../../../../store/store";
import { fetchCauseStageNameByCauseId } from "../../../../features/cause-stage";
import { TeamWorkDeletePopup } from "@4eplatform/shared/src/popups/TeamWorkDeletePopup";
import AddOwnerPopup from "../../popups/AddOwnerPopup";
import AddSupervisorPopup from "../../popups/AddSupervisorPopup";
import AddLawyerPopup from "../../popups/AddLawyerPopup";
import AddDataEntryPopup from "../../popups/AddDataEntryPopup";
import AddSpecialistPopup from "../../popups/AddSpecialistPopup";
// import AddConsultativePopup from "../../popups/AddConsultativePopup";

interface Members {
  owner: Member[];
  supervisor: Member[];
  lawyers: Member[];
  dataEntry: Member[];
}
interface Member {
  id: string;
  userId: string;
  assignationType: number;
  fullName: string;
  stages: (
    | string
    | { lk_StageNameAr: string; lk_StageNameEn: string; sessionIds: string[] }
  )[];
}
interface TeamMembersProps {
  isConsultive: boolean;
  isLawyerToTakeAction:boolean;
    isDataEntry?:any;
  isOwnerOrSuperVisor?:any;
}
const DropDownConTeamWork = ({ isConsultive , isLawyerToTakeAction ,    isDataEntry,
  isOwnerOrSuperVisor, }: TeamMembersProps) => {
  const [openSections, setOpenSections] = useState<number[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [caseId, setCaseId] = useState("");
  const [causeStageId, setCauseStageId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState<Members>({
    owner: [],
    supervisor: [],
    lawyers: [],
    dataEntry: [],
  });
  const [filteredMembers, setFilteredMembers] = useState<{
    owner: any[];
    supervisor: any[];
    lawyers: any[];
    dataEntry: any[];
    consultatives: any[];
  }>({ owner: [], supervisor: [], lawyers: [], dataEntry: [], consultatives: [] });
  const [section, setSection] = useState("");
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const intl = useIntl();
  const dispatch = useDispatch();

  const sections = [
    {
      id: 1,
      title: "DirectorGeneralOfAdministration",
    },
    {
      id: 2,
      title: "AdministrationManager",
    },
    {
      id: 3,
      title: "Advisors",
    },
    {
      id: 4,
      title: "dataEntry",
    },
    {
      id: 5,
      title: "Specialists",
    },
  ];

  const location = useLocation();
  let source = location?.state?.source;
  const item = location?.state?.item;
  const comeFrom = location?.state?.comeFrom;
  const litigationStatus = item?.litigationStatus;
  const selectedCauseIdFromClients =location?.state?.selectedCauseIdFromClients;
  const caseData = useAppSelector((state) => state.causes.causeById);

  const isJudgmentIssued =
    litigationStatus === "صدر حكم" ||
    caseData?.causeStatus === 3 ||
    caseData?.causeStatus === "JudgmentWasIssued";
  // const isFinished = litigationStatus === "منتهية";

  let causeStageNames = useAppSelector(
    (state) => state?.causeStages?.causeStageNames
  );

  const handleToggle = (id: number) => {
    setOpenSections((prevState) =>
      prevState.includes(id)
        ? prevState.filter((sectionId) => sectionId !== id)
        : [...prevState, id]
    );
  };
  let [showEditPopup,setShowEditPopup]=useState(false)
  const handleShowEditPopup = (title: string) => {
    setPopupTitle(intl.formatMessage({ id: title }));
    setShowEditPopup(true);
  };
  const handleShowPopup = (title: string) => {
    setPopupTitle(intl.formatMessage({ id: title }));
    setShowPopup(true);
  };

  // const handleShowEdit = (title: string) => {
  //   setEditTitle(title);
  //   setShowEdit(true);
  // };

  const handleDeleteItem = () => setShowDelete(true);
  let theme = localStorage.getItem("Theme");

  // useEffect(() => {
  //   if (!caseId && (item?.id || item?.causeId)) {
  //     setCaseId(item?.id || item?.causeId);
  //   }
  // }, [item?.id || item?.causeId]);

  useEffect(() => {
    if ((item?.id || item?.causeId) && !caseId && comeFrom !== "/litigation-management" && comeFrom !== "/legal-notes"
     && comeFrom !== "/client-management"&&  comeFrom !== "/sessions-view"  ) {
      setCaseId(item?.id || item?.causeId);
      if (item?.causeId && item?.causeStageId)
        setCauseStageId(item?.causeStageId);
      if (item?.causeId && item?.sessionId) setSessionId(item?.sessionId);
    } else if (comeFrom !== "/litigation-management" && item?.causeId && !caseId  && comeFrom !== "/client-management" && comeFrom !== "/legal-notes"){
      setCaseId( item?.causeId);
      if (item?.causeId && item?.id)
        setCauseStageId(item?.id);
    }
    else if (comeFrom === "/legal-notes" && item?.causeId && !caseId  && comeFrom !== "/client-management"){
      setCaseId( item?.causeId);
      // if (item?.causeId && item?.causeStageId)
      //   setCauseStageId(item?.causeStageId);
      //   if (item?.causeId && item?.sessionId) setSessionId(item?.sessionId);
    }
    else if (comeFrom === "/client-management" && selectedCauseIdFromClients && !caseId){
      setCaseId( selectedCauseIdFromClients);
    }
     else if (comeFrom === "/sessions-view"  && item?.causeId){
      setCaseId( item?.causeId);
    }
    else if (comeFrom === "/litigation-management" && item?.causeId){
      setCaseId( item?.causeId);
    }   
  }, [item?.id, item?.causeId , comeFrom ,selectedCauseIdFromClients]);

  const fetchCauseStageNameById = async (caseId: string) => {
    await dispatch(fetchCauseStageNameByCauseId(caseId) as any).unwrap();
  };

  useEffect(() => {
    if (caseId) {
      fetchCauseStageNameById(caseId);
    }
  }, [caseId]);

  const selectedSessions =
    causeStageNames?.find((stage: any) => stage.caseStageId === causeStageId)
      ?.sessions || [];

  const fetchFilteredMembers = async (
    caseId: string,
    searchWord: string,
    causeStageId: string,
    sessionId: string

 
  ) => {
    setLoading(true);
    const member = await dispatch(
      fetchAssignMember({
        causeId: caseId,
        searchWord: searchTerm,
        CauseStageId: causeStageId,
        SessionId: sessionId,

      }) as any
    ).unwrap();
    setFilteredMembers(member.result);
    setMembers(member.result);
    setLoading(false);
  };

  useEffect(() => {
    if (caseId && (searchTerm || searchTerm === "")) {
      fetchFilteredMembers(caseId, searchTerm, causeStageId, sessionId);
    }
  }, [caseId, searchTerm, causeStageId, sessionId]);
  const handleShowEdit = (title: string) => {
    setEditTitle(title);
    setShowEdit(true);
  };
  return (
    <>
      <Row className="bg-gray-100 p-6 rounded-2 mx-0">
        <h4 className="fw-bolder mb-8 px-0">
          {intl.formatMessage({ id: "Teams" })}
        </h4>
        <Row className="w-100 align-items-center mb-5">
          <Col lg={6} sm={12} className={`mb-3`}>
            <div className="d-flex align-items-center bg-white bg-fix-dark border-fix-dark  position-relative w-100">
              <span className="svg-icon svg-icon-1 position-absolute text-muted mx-3">
                <i className="fa-solid fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control form-control-solid px-11 bg-white bg-fix-dark border-fix-dark "
                placeholder={intl.formatMessage({ id: "Search" })}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                value={searchTerm}
              />
            </div>
          </Col>
          <Col lg={3} sm={12} className={`mb-3`}>
            <select
              className="form-select bg-white bg-fix-dark border-fix-dark "
              onChange={(e) => {
                const value = e.target.value;
                setCauseStageId(value);

                setSessionId("");
              }}
              value={causeStageId}
            >
              <option value={" "}>
                {intl.formatMessage({ id: "AllCauseStages" })}
              </option>
              {causeStageNames &&
                Array.isArray(causeStageNames) &&
                causeStageNames.map((stage) => (
                  <option key={stage.caseStageId} value={stage.caseStageId}>
                    {intl.locale === "ar"
                      ? stage.lk_StageNameAr
                      : stage.lk_StageNameEn}
                  </option>
                ))}
            </select>
          </Col>
          <Col lg={3} sm={12} className={`mb-3`}>
            <select
              className="form-select bg-white bg-fix-dark border-fix-dark"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
            >
              <option value={" "}>
                {intl.formatMessage({ id: "AllSessions" })}
              </option>
              {selectedSessions &&
                Array.isArray(selectedSessions) &&
                selectedSessions.map((session) => (
                  <option key={session.sessionId} value={session.sessionId}>
                    {intl.formatMessage({ id: "Session" })}:{" "}
                    {session.sessionNumber}
                  </option>
                ))}
            </select>
          </Col>
          <Col lg={3} sm={12}></Col>
        </Row>
        {loading ? (
          <div className="d-flex gap-4 justify-content-center align-items-center py-4">
            {intl.formatMessage({ id: "DataIsLoaded..." })}
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row className="g-3">
            {sections?.map((section, index) => (
              <Col xs={12} key={section.id}>
                <div
                  className={`rounded p-3 ${
                    theme == "dark" ? "bg-light" : "bg-white"
                  }`}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-0 d-flex justify-content-center align-items-center">
                      {intl.formatMessage({ id: section.title })}
                      {section.id === 1 &&
                      Array.isArray(filteredMembers?.owner) &&
                      filteredMembers.owner.length > 0 ? (
                        <div className="me-3 px-3 bg-primary py-1 rounded-3 text-white fs-7">
                          {filteredMembers.owner.length}
                        </div>
                      ) : section.id === 2 &&
                        Array.isArray(filteredMembers?.supervisor) &&
                        filteredMembers.supervisor.length > 0 ? (
                        <div className="me-3 px-3 bg-primary py-1 rounded-3 text-white fs-7">
                          {filteredMembers.supervisor.length}
                        </div>
                      ) : section.id === 3 &&
                        Array.isArray(filteredMembers?.lawyers) &&
                        filteredMembers.lawyers.length > 0 ? (
                        <div className="me-3 px-3 bg-primary py-1 rounded-3 text-white fs-7">
                          {filteredMembers.lawyers.length}
                        </div>
                      )
                       : section.id === 4 &&
                        Array.isArray(filteredMembers?.dataEntry) &&
                        filteredMembers.dataEntry.length > 0 ? (
                        <div className="me-3 px-3 bg-primary py-1 rounded-3 text-white fs-7">
                          {filteredMembers.dataEntry.length}
                        </div>
                      ): section.id === 5 &&
                        Array.isArray(filteredMembers?.consultatives) &&
                        filteredMembers.consultatives.length > 0 ? (
                        <div className="me-3 px-3 bg-primary py-1 rounded-3 text-white fs-7">
                          {filteredMembers.consultatives.length}
                        </div>
                      )
                      : null}
                    </h4>
                    <div>
                    {/* {!isJudgmentIssued && section.id !==1 && (
                      <Button variant="link" className="text-dark" onClick={() => handleShowEditPopup(section.title)}>
                        <i className="fa-solid fa-pen fs-2"></i>
                      </Button>
                    )} */}
                      {(isOwnerOrSuperVisor || isDataEntry)   &&(
                        <Button
                          variant="link"
                          className="text-primary"
                          onClick={() => {
                            if (section.id === 1) setSection("Owner");
                            else if (section.id === 2)
                              setSection("Supervisors");
                            else if (section.id === 3) setSection("Lawyers");
                            else if (section.id === 4) setSection("DataEntry");
                            else setSection("Consultatives");
                            handleShowPopup(section.title);
                          }}
                        >
                          <i className="fa-solid fa-circle-plus fs-2"></i>
                        </Button>
                      )}
                      <Button
                        variant="link"
                        className="text-dark"
                        onClick={() => handleToggle(section.id)}
                      >
                        {openSections.includes(section?.id) ? (
                          <i className="fa-solid fa-angle-up fs-3"></i>
                        ) : (
                          <i className="fa-solid fa-angle-down fs-3"></i>
                        )}
                      </Button>
                    </div>
                  </div>

                  <Collapse
                    className="h-fit"
                    in={openSections.includes(section.id)}
                  >
                    <div>
                      {(section.id === 1 &&
                      Array.isArray(filteredMembers?.owner)
                        ? filteredMembers.owner
                        : section.id === 2 &&
                          Array.isArray(filteredMembers?.supervisor)
                        ? filteredMembers.supervisor
                        : section.id === 3 &&
                          Array.isArray(filteredMembers?.lawyers)
                        ? filteredMembers.lawyers
                        : section.id === 4 && Array.isArray(filteredMembers?.dataEntry)
                        ? filteredMembers.dataEntry
                        : section.id === 5 && Array.isArray(filteredMembers?.consultatives)
                        ? filteredMembers.consultatives
                        : []
                      ).map((member, index) => (
                        <div
                          key={index}
                          className="bg-white bg-fix-dark border-fix-dark  p-3 rounded mb-3 d-flex flex-column flex-sm-row align-items-start align-items-sm-center"
                        >
                          <Col
                            xs={12}
                            sm={6}
                            className="d-flex align-items-center mb-2 mb-sm-0"
                          >
                            <i className="fa-solid fa-circle-user fs-3 text-primary me-3"></i>
                            <div>
                              <span className="fw-bold">{member.fullName}</span>{" "}
                              {/* <span className="text-muted">
                                ({intl.formatMessage({ id: "Internal" })})
                              </span> */}
                            </div>
                          </Col>
                          <Col
                            xs={12}
                            sm={6}
                            className="d-flex justify-content-start justify-content-sm-end flex-wrap"
                          >
                            {Array.isArray(member?.stages) && member?.stages?.map((stage, stageIdx) => (
                              <div
                                key={stageIdx}
                                className="bg-secondary text-dark py-2 px-3 rounded me-2 mb-2"
                              >
                                {typeof stage === "object" &&
                                "lk_StageNameAr" in stage
                                  ? intl.locale === "ar"
                                    ? stage.lk_StageNameAr
                                    : stage.lk_StageNameEn
                                  : stage}{" "}
                                {typeof stage === "object" &&
                                "sessions" in stage
                                  ? Array.isArray(stage?.sessions) && stage?.sessions.map(
                                      (session, sessionIdx) => (
                                        <span
                                          key={sessionIdx}
                                          className="text-muted"
                                        >
                                          {" "}
                                          (
                                          {intl.formatMessage({
                                            id: "Session",
                                          })}
                                          : #{session?.sessionNumber})
                                        </span>
                                      )
                                    )
                                  : null}
                              </div>
                            ))}
                            {/* {(section.id === 1 && Array.isArray(members?.owner)
                              ? members.owner
                              : section.id === 2 &&
                                Array.isArray(members?.supervisor)
                              ? members.supervisor
                              : section.id === 3 &&
                                Array.isArray(members?.lawyers)
                              ? members.lawyers
                              : Array.isArray(members?.dataEntry)
                              ? members.dataEntry
                              : []
                            ).flatMap(
                              (member) =>
                                member.stages?.map((stage, stageIdx) => (
                                  <div
                                    key={stageIdx}
                                    className="bg-secondary text-dark py-2 px-3 rounded me-2 mb-2"
                                  >
                                    {typeof stage === "object" &&
                                    "lk_StageNameAr" in stage
                                      ? intl.locale === "ar"
                                        ? stage.lk_StageNameAr
                                        : stage.lk_StageNameEn
                                      : stage}{" "}
                                    
                                    {typeof stage === "object" &&
                                    "sessionIds" in stage
                                      ? stage.sessionIds.map(
                                          (session, sessionIdx) => (
                                            <span
                                              key={sessionIdx}
                                              className="text-muted"
                                            >
                                              {" "}
                                              (
                                              {intl.formatMessage({
                                                id: "Session",
                                              })}
                                              : {session})
                                            </span>
                                          )
                                        )
                                      : null}
                                  </div>
                                )) || []
                            )} */}
                            {(!isJudgmentIssued && (isOwnerOrSuperVisor || isDataEntry)  ) && (
                              <div
                                className="text-danger fs-3 ms-2"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  handleDeleteItem();
                                  setSelectedMember(member.id);
                                }}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </div>
                            )}
                          </Col>
                        </div>
                      ))}
                    </div>
                  </Collapse>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Row>

      {section === "Owner" && showPopup && (
        <AddOwnerPopup
          key={"Owner"}
          source={source}
          show={true}
          title={popupTitle}
          handleClose={() => setShowPopup(false)}
          fetchFilteredMembers={fetchFilteredMembers}
          filteredMembers={filteredMembers?.owner}
          searchTerm={searchTerm}
          causeStageId={causeStageId}
          sessionId={sessionId}
        />
      )}
      {section === "Supervisors" && showPopup && (
        <AddSupervisorPopup
          key={"Supervisors"}
          source={source}
          show={true}
          title={popupTitle}
          handleClose={() => setShowPopup(false)}
          fetchFilteredMembers={fetchFilteredMembers}
          filteredMembers={filteredMembers?.supervisor}
          searchTerm={searchTerm}
          causeStageId={causeStageId}
          sessionId={sessionId}
        />
      )}
      {section == "Lawyers" && showPopup && (
        <AddLawyerPopup
          key={"Lawyers"}
          source={source}
          show={showPopup}
          title={popupTitle}
          handleClose={() => setShowPopup(false)}
          fetchFilteredMembers={fetchFilteredMembers}
          filteredMembers={filteredMembers?.lawyers}
          searchTerm={searchTerm}
          causeStageId={causeStageId}
          sessionId={sessionId}
        />
      )}
      {section == "DataEntry" && showPopup && (
        <AddDataEntryPopup
          key={"DataEntry"}
          source={source}
          show={showPopup}
          title={popupTitle}
          handleClose={() => setShowPopup(false)}
          fetchFilteredMembers={fetchFilteredMembers}
          filteredMembers={filteredMembers?.dataEntry}
          searchTerm={searchTerm}
          causeStageId={causeStageId}
          sessionId={sessionId}
        />
      )}
      {section == "Consultatives" && showPopup && (
        <AddSpecialistPopup
          key={"Consultatives"}
          source={source}
          show={showPopup}
          title={popupTitle}
          handleClose={() => setShowPopup(false)}
          fetchFilteredMembers={fetchFilteredMembers}
          filteredMembers={filteredMembers?.consultatives}
          searchTerm={searchTerm}
          causeStageId={causeStageId}
          sessionId={sessionId}
        />
      )}

      <TeamWorkDeletePopup
        showDelete={showDelete}
        handleCloseDelete={() => setShowDelete(false)}
        id={selectedMember}
        fetchFilteredMembers={fetchFilteredMembers}
        caseId={caseId}
      />

     
      {showEditPopup && (
        <EditTeamWorkPopup
          source={source}
          show={showEditPopup}
          title={popupTitle}
          handleClose={() => setShowEditPopup(false)}
          fetchFilteredMembers={fetchFilteredMembers}
          filteredMembers={filteredMembers?.owner}
          searchTerm={searchTerm}
          causeStageId={causeStageId}
          sessionId={sessionId}
        />
      )}
    </>
  );
};

export default DropDownConTeamWork;
