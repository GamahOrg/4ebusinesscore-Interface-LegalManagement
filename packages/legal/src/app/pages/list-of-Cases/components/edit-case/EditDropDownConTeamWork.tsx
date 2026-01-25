
import React, { useState } from "react";
import { Row, Col, Button, Collapse } from "react-bootstrap";
import { useIntl } from "react-intl";
import AddSupervisors from "./popups/AddSupervisors";
import EditSupervisors from "./popups/EditSupervisors";
import AddLawyers from "./popups/AddLawyers";
import EditLawyers from "./popups/EditLawyers";
import AddDataEntry from "./popups/AddDataEntry";
import EditDataEntry from "./popups/EditDataEntry";
import { useNavigate } from "react-router-dom";
import AddOwners from "./popups/AddOwners";
import { DeletePopup } from "./popups/DeletePopup";
import AddConsultative from "./popups/AddConsultative";
import EditConsultative from "./popups/EditConsultative";



type EditDropDownConTeamWorkProps={
  owners?:any;
  setOwners?:any;
  supervisors?:any;
  setSupervisors?:any;
  lawyers?:any;
  setLawyers?:any;
  dataEntry?:any;
  setDataEntry?:any; 
  consultatives?:any;
  setConsultatives?:any; 
  onNext?:any;
  selectedSatge?:any;
  onBack?:any;
}
const EditDropDownConTeamWork:React.FC<EditDropDownConTeamWorkProps> =({
  owners,
  setOwners,
  supervisors,
  setSupervisors,
  lawyers,
  setLawyers,
  dataEntry,
  setDataEntry,
  consultatives,
  setConsultatives,
  onNext,
  selectedSatge,
  onBack,
})=> {
  let navigate=useNavigate()
  const [openSections, setOpenSections] = useState([1, 2, 3, 4, 5]); // Initialize to open all sections
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [showAddSupervisorsPopup, setShowAddSupervisorsPopup] =
    useState<boolean>(false);
  const [showEditSupervisorsPopup, setShowEditSupervisorsPopup] =
    useState<boolean>(false);
  const [showAddLawyersPopup, setShowAddLawyersPopup] =
    useState<boolean>(false);
  const [showEditLawyersPopup, setShowEditLawyersPopup] =
    useState<boolean>(false);
    const [showAddDataEntryPopup, setShowAddDataEntryPopup] =
    useState<boolean>(false);
    const [showEditDataEntryPopup, setShowEditDataEntryPopup] =
    useState<boolean>(false);
        const [showAddConsultativesPopup, setShowAddConsultativesPopup] =
    useState<boolean>(false);
    const [showEditConsultativesPopup, setShowEditConsultativesPopup] =
    useState<boolean>(false);
  const intl = useIntl();
  const handleToggle = (id: any) => {
    setOpenSections((prevState) =>
      prevState.includes(id)
        ? prevState.filter((sectionId) => sectionId !== id)
        : [...prevState, id]
    );
  };

  const [orgIds, setOrgIds] = useState<string[]>([]);
  let [data, setData] = useState<any>([]);
  const [employeeIds, setEmployeeIds] = useState<string[]>(supervisors?.map((item) => item?.userId
  ));
  const [selectedSuperVisor, setSelectedSuperVisor] = useState<any>("");
  const [showDeleteSuperVisorPopup, setShowDeleteSupervisorPopup] = useState<boolean>(false);

  const handleDeleteSupervisor = (userId: string) => {
    const updatedUserIds = employeeIds.filter((id: any) => id !== userId);
    setEmployeeIds(updatedUserIds);
    const updatedOrgs = data
      ?.map((item: any) => {
        const membersChecked = item.mebmers.some((member: any) =>
          updatedUserIds.includes(member.userId)
        );
        return membersChecked ? item.id : null;
      })
      .filter(Boolean);
    setOrgIds(updatedOrgs);
    setData((prevData: any) =>
      prevData.map((item: any) => ({
        ...item,
        collapsed: false,
        checked: updatedOrgs.includes(item.id),
        mebmers: item.mebmers.map((member: any) =>
          member.userId === userId ? { ...member, checked: false } : member
        ),
      }))
    );
    setSupervisors((prevSupervisors) => {
      const deletedSupervisor = prevSupervisors.find(
        (supervisor) => supervisor.userId === userId
      );
  
      const updatedSupervisors = prevSupervisors.filter(
        (supervisor) => supervisor.userId !== userId
      );
      if (deletedSupervisor?.isSupervisorStage) {
        return updatedSupervisors.map((supervisor) => ({
          ...supervisor,
          isSupervisorStage: supervisor.isSupervisorStage, 
        }));
      }
  
      return updatedSupervisors;
    });
  };
  const [orgIdsLawyers, setOrgIdsLawyers] = useState<string[]>([]);
  let [dataLawyers, setDataLawyers] = useState<any>([]);
  const [employeeIdsLawyers, setEmployeeIdsLawyers] = useState<string[]>(lawyers?.map((item) => item?.userId
  ));
  const [selectedLawyer, setSelectedLawyer] = useState<any>("");
  const [showDeleteLawyerPopup, setShowDeleteLawyerPopup] = useState<boolean>(false);
  const handleDeleteLawyer = (userId: string) => {
    const updatedUserIds = employeeIdsLawyers.filter((id: any) => id !== userId);
    setEmployeeIdsLawyers(updatedUserIds);
    const updatedOrgs = dataLawyers
      ?.map((item: any) => {
        const membersChecked = item.mebmers.some((member: any) =>
          updatedUserIds.includes(member.userId)
        );
        return membersChecked ? item.id : null;
      })
      .filter(Boolean);
      setOrgIdsLawyers(updatedOrgs);
      setDataLawyers((prevData: any) =>
      prevData.map((item: any) => ({
        ...item,
        collapsed: false,
        checked: updatedOrgs.includes(item.id),
        mebmers: item.mebmers.map((member: any) =>
          member.userId === userId ? { ...member, checked: false } : member
        ),
      }))
    );
    setLawyers((prevLawyers) => {
      const deletedLawyer = prevLawyers.find(
        (lawyer) => lawyer.userId === userId
      );
  
      const updatedLawyers = prevLawyers.filter(
        (lawyer) => lawyer.userId !== userId
      );
      if (deletedLawyer?.isStudyStage) {
        return updatedLawyers.map((lawyer) => ({
          ...lawyer,
          isStudyStage: lawyer.isStudyStage, 
        }));
      }
  
      return updatedLawyers; 
    });
  };

  const [orgIdsDataEntry, setOrgIdsDataEntry] = useState<string[]>([]);
  let [dataDataEntry, setDataDataEntry] = useState<any>([]);
  const [employeeIdsDataEntry, setEmployeeIdsDataEntry] = useState<string[]>(dataEntry?.map((item) => item?.userId
  ));
  const [selectedDataEntry, setSelectedDataEntry] = useState<any>("");
  const [showDeleteDataEntryPopup, setShowDeleteDataEntryPopup] = useState<boolean>(false);
  const handleDeleteDataEntry = (userId: string) => {
    const updatedUserIds = employeeIdsDataEntry.filter((id: any) => id !== userId);
    setEmployeeIdsDataEntry(updatedUserIds);
    const updatedOrgs = dataDataEntry
      ?.map((item: any) => {
        const membersChecked = item.mebmers.some((member: any) =>
          updatedUserIds.includes(member.userId)
        );
        return membersChecked ? item.id : null;
      })
      .filter(Boolean);
      setOrgIdsDataEntry(updatedOrgs);
      setDataDataEntry((prevData: any) =>
      prevData.map((item: any) => ({
        ...item,
        collapsed: false,
        checked: updatedOrgs.includes(item.id),
        mebmers: item.mebmers.map((member: any) =>
          member.userId === userId ? { ...member, checked: false } : member
        ),
      }))
    );
    setDataEntry((prevDataEntry) => {
      const deletedDataEntry = prevDataEntry.find(
        (entry) => entry.userId === userId
      );
  
      const updatedDataEntries = prevDataEntry.filter(
        (entry) => entry.userId !== userId
      );
      if (deletedDataEntry?.isStudyStage) {
        return updatedDataEntries.map((entry) => ({
          ...entry,
          isStudyStage: entry.isStudyStage, 
        }));
      }
  
      return updatedDataEntries; 
    });
  };
  const [showAddOwnersPopup, setShowAddOwnersPopup] =
  useState<boolean>(false);
  const [orgIdsOwners, setOrgIdsOwners] = useState<string[]>([]);
  let [dataOwners, setDataOwners] = useState<any>([]);
  const [employeeIdsOwners, setEmployeeIdsOwners] = useState<string[]>(owners?.map((item) => item?.userId
  ));
  const [selectedOwner, setSelectedOwner] = useState<any>("");
  const [showDeleteOwnerPopup, setShowDeleteOwnerPopup] = useState<boolean>(false);
  const handleDeleteOwner = (userId: string) => {
    const updatedUserIds = employeeIdsOwners.filter((id: any) => id !== userId);
    setEmployeeIdsOwners(updatedUserIds);
    const updatedOrgs = dataOwners
      ?.map((item: any) => {
        const membersChecked = item.mebmers.some((member: any) =>
          updatedUserIds.includes(member.userId)
        );
        return membersChecked ? item.id : null;
      })
      .filter(Boolean);
      setOrgIdsOwners(updatedOrgs);
      setDataOwners((prevData: any) =>
      prevData.map((item: any) => ({
        ...item,
        collapsed: false,
        checked: updatedOrgs.includes(item.id),
        mebmers: item.mebmers.map((member: any) =>
          member.userId === userId ? { ...member, checked: false } : member
        ),
      }))
    );
    setOwners((prevOwners) => {
      const deletedOwner = prevOwners.find(
        (owner) => owner.userId === userId
      );
  
      const updatedOwners = prevOwners.filter(
        (owner) => owner.userId !== userId
      );
      return updatedOwners; 
    });
  };

  const [orgIdsConsultatives, setOrgIdsConsultatives] = useState<string[]>([]);
  let [dataConsultatives, setDataConsultatives] = useState<any>([]);
  const [employeeIdsConsultatives, setEmployeeIdsConsultatives] = useState<string[]>(consultatives?.map((item) => item?.userId
  ));
  const [selectedConsultative, setSelectedConsultative] = useState<any>("");
  const [showDeleteConsultativePopup, setShowDeleteConsultativePopup] = useState<boolean>(false);
  const handleDeleteConsultative = (userId: string) => {
    const updatedUserIds = employeeIdsConsultatives.filter((id: any) => id !== userId);
    setEmployeeIdsConsultatives(updatedUserIds);
    const updatedOrgs = dataConsultatives
      ?.map((item: any) => {
        const membersChecked = item.mebmers.some((member: any) =>
          updatedUserIds.includes(member.userId)
        );
        return membersChecked ? item.id : null;
      })
      .filter(Boolean);
      setOrgIdsConsultatives(updatedOrgs);
      setDataConsultatives((prevData: any) =>
      prevData.map((item: any) => ({
        ...item,
        collapsed: false,
        checked: updatedOrgs.includes(item.id),
        mebmers: item.mebmers.map((member: any) =>
          member.userId === userId ? { ...member, checked: false } : member
        ),
      }))
    );
    setConsultatives((prevConsultatives) => {
      const deletedConsultative = prevConsultatives.find(
        (consultative) => consultative.userId === userId
      );

      const updatedConsultatives = prevConsultatives.filter(
        (consultative) => consultative.userId !== userId
      );
      return updatedConsultatives;
    });
  };
  return (
    <>
    <div className="bg-gray-100 p-5 rounded">
      <Row className="g-3 mb-5">
        <Col xs={12}>
          <div className="bg-white bg-fix-dark border-fix-dark rounded p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0 px-3">
                  {intl.formatMessage({ id: "DirectorGeneralOfAdministration" })}
                </h2>
                {owners?.length > 0 && (
                <span className="badge badge-light-success rounded fs-5">
                {owners.length}
      </span>
                )}  
              </div>
              <div className="d-flex justify-content-between align-items-center">
                {/* add owner */}
                <Button variant="link" className="text-white transparent-button"
                     onClick={()=> setShowAddOwnersPopup(true)}>
                  <i className="fa-solid fs-1 text-primary fa-circle-plus"></i>
                </Button>
                <Button
                  variant="link"
                  className="text-dark transparent-button"
                  onClick={() => handleToggle(1)}
                >
                  <i
                    className={`fa-solid ${
                      openSections.includes(1) ? "fa-angle-up" : "fa-angle-down"
                    } fs-3`}
                  ></i>
                </Button>
              </div>
            </div>
            {owners?.map((owner:any , index)=>{
              return(
<Collapse in={openSections.includes(1)}  key={index}>
              <div className="mt-3">
                <div
                  className="bg-white bg-fix-dark border-fix-dark  p-3 rounded mb-3 d-flex justify-content-between"
                >
                  <div
                    className="d-flex align-items-center mb-2 mb-sm-0"
                  >
                    <i className="fa-solid fa-circle-user fs-3 text-primary me-3"
              ></i>
                    <div>
                    <span className="fw-bold">
                                   {owner?.fullName}</span>

                    </div>
                  </div>
                    <div className="d-flex ">
                      {/* <div className="bg-secondary text-dark py-2 px-3 rounded me-2 mb-2">
                        {intl.formatMessage({ id: "Claim#1" })}
                      </div> */}
                      <i
                        role="button"
                        onClick={() =>
                          {
                            setSelectedOwner(owner?.userId);
                            setShowDeleteOwnerPopup(true);
                          }
                            }
                        className="fas fa-trash text-danger fs-3"
                      ></i>
                    </div>

                </div>
              </div>
            </Collapse>
              )
            })}
          </div>
        </Col>
        {showDeleteOwnerPopup ? (
          <DeletePopup
            showDelete={showDeleteOwnerPopup}
            handleCloseDelete={() => setShowDeleteOwnerPopup(false)}
            id={selectedOwner}
            handleDelete={handleDeleteOwner}
          />
        ) : (
          ""
        )}
{showAddOwnersPopup ? (
          <AddOwners
            show={showAddOwnersPopup}
            handleClose={() => setShowAddOwnersPopup(false)}
            owners={owners}
            setOwners={setOwners}
            employeeIds={employeeIdsOwners}
            setEmployeeIds={setEmployeeIdsOwners}
            orgIds={orgIdsOwners}
            setOrgIds={setOrgIdsOwners}
            data={dataOwners}
            setData={setDataOwners}
          />
        ) : (
          ""
        )}
      </Row>
      <Row className="g-3 mb-5">
        <Col xs={12}>
          <div className="bg-white bg-fix-dark border-fix-dark rounded p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0 px-3">
                  {intl.formatMessage({ id: "AdministrationManager" })}
                </h2>
                {supervisors?.length > 0 && (
                <span className="badge badge-light-success rounded fs-5">
                {supervisors.length}
      </span>
                )}  
              </div>
              <div className="d-flex justify-content-between align-items-center">
                {/* <Button
                  onClick={() => setShowEditSupervisorsPopup(true)}
                  variant="link"
                  className="text-white"
                >
                  <i className="fa-solid fs-1 text-gray fa-pencil"></i>
                </Button> */}

                <Button
                  onClick={() => setShowAddSupervisorsPopup(true)}
                  variant="link"
                  className="text-white transparent-button"
                >
                  <i className="fa-solid fs-1 text-primary fa-circle-plus"></i>
                </Button>
                <Button
                  variant="link"
                  className="text-dark transparent-button"
                  onClick={() => handleToggle(2)}
                >
                  <i
                    className={`fa-solid ${
                      openSections.includes(2) ? "fa-angle-up" : "fa-angle-down"
                    } fs-3`}
                  ></i>
                </Button>
              </div>
            </div>
            {supervisors?.map((supervisor , index)=>{
              return(
                <Collapse in={openSections.includes(2)} key={index}>
                <div className="mt-3">
                  <div
 
                    className="bg-white bg-fix-dark border-fix-dark  p-3 rounded mb-3 d-flex justify-content-between"
                  >
                    <div
                      
                      className="d-flex align-items-center mb-2 mb-sm-0"
                    >
                      <i className="fa-solid fa-circle-user fs-3 text-primary me-3"></i>
                      <div>
                        <span className="fw-bold">
                        {supervisor?.fullName} </span>

                      </div>
                    </div>
                    <div

                      className="d-flex "
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        {/* <div className="bg-secondary text-dark py-2 px-3 rounded me-2 mb-2">
                          {intl.formatMessage({ id: "Claim#1" })}
                        </div> */}
                        <i
                          role="button"
                          onClick={() =>
                            {
                           
                              setSelectedSuperVisor(supervisor?.userId);
                              setShowDeleteSupervisorPopup(true);
                            }
                   
                              }
                          className="fas fa-trash text-danger fs-3"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </Collapse>
              )
            })}
          </div>
        </Col>
        {showDeleteSuperVisorPopup ? (
          <DeletePopup
            showDelete={showDeleteSuperVisorPopup}
            handleCloseDelete={() => setShowDeleteSupervisorPopup(false)}
            id={selectedSuperVisor}
            handleDelete={handleDeleteSupervisor}
          />
        ) : (
          ""
        )}
        {showAddSupervisorsPopup ? (
          <AddSupervisors
            show={showAddSupervisorsPopup}
            handleClose={() => setShowAddSupervisorsPopup(false)}
            supervisors={supervisors}
            setSupervisors={setSupervisors}
            employeeIds={employeeIds}
            setEmployeeIds={setEmployeeIds}
            orgIds={orgIds}
            setOrgIds={setOrgIds}
            data={data}
            setData={setData}
            selectedSatge ={selectedSatge}
          />
        ) : (
          ""
        )}
        {showEditSupervisorsPopup ? (
          <EditSupervisors
            show={showEditSupervisorsPopup}
            handleClose={() => setShowEditSupervisorsPopup(false)}
          />
        ) : (
          ""
        )}
      </Row>
      <Row className="g-3 mb-5">
        <Col xs={12}>
          <div className="bg-white bg-fix-dark border-fix-dark rounded p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0 px-3">
                  {intl.formatMessage({ id: "Advisors" })}
                </h2>
                {lawyers?.length > 0 && (
                <span className="badge badge-light-success rounded fs-5">
                {lawyers.length}
      </span>
                )}  
              </div>
              <div className="d-flex justify-content-between align-items-center">
                {/* <Button
                  onClick={() => setShowEditLawyersPopup(true)}
                  variant="link"
                  className="text-white"
                >
                  <i className="fa-solid fs-1 text-gray fa-pencil"></i>
                </Button> */}

                <Button
                  onClick={() => setShowAddLawyersPopup(true)}
                  variant="link"
                  className="text-white transparent-button"
                >
                  <i className="fa-solid fs-1 text-primary fa-circle-plus"></i>
                </Button>
                <Button
                  variant="link"
                  className="text-dark transparent-button"
                  onClick={() => handleToggle(3)}
                >
                  <i
                    className={`fa-solid ${
                      openSections.includes(3) ? "fa-angle-up" : "fa-angle-down"
                    } fs-3`}
                  ></i>
                </Button>
              </div>
            </div>

{lawyers?.map((lawyer , index)=>{
              return(
                <Collapse in={openSections.includes(3)} key={index}>
                <div className="mt-3">
                  <div
                    className="bg-white bg-fix-dark border-fix-dark  p-3 rounded mb-3 d-flex justify-content-between"
                  >
                    <div
                      className="d-flex align-items-center mb-2 mb-sm-0"
                    >
                      <i className="fa-solid fa-circle-user fs-3 text-primary me-3"></i>
                      <div>
                        <span className="fw-bold">
                                  {lawyer?.fullName}
                                  </span>
                        {/* <span className="text-muted">
                          ({intl.formatMessage({ id: "dataEntry" })})
                        </span> */}
                      </div>
                    </div>
                    <div
              
                      className="d-flex"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        {/* <div className="bg-secondary text-dark py-2 px-3 rounded me-2 mb-2">
                          {intl.formatMessage({ id: "Claim#1" })}
                        </div> */}
                        <i
                          role="button"
                          onClick={() =>
                            {
                           
                              setSelectedLawyer(lawyer?.userId);
                              setShowDeleteLawyerPopup(true);
                            }
                   
                              }
                          className="fas fa-trash text-danger fs-3"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </Collapse>
              )
            })}
          </div>
        </Col>
        {showDeleteLawyerPopup ? (
          <DeletePopup
            showDelete={showDeleteLawyerPopup}
            handleCloseDelete={() => setShowDeleteLawyerPopup(false)}
            id={selectedLawyer}
            handleDelete={handleDeleteLawyer}
          />
        ) : (
          ""
        )}
        {showAddLawyersPopup ? (
          <AddLawyers
            show={showAddLawyersPopup}
            handleClose={() => setShowAddLawyersPopup(false)}
            lawyers={lawyers}
            setLawyers={setLawyers}
            employeeIds={employeeIdsLawyers}
            setEmployeeIds={setEmployeeIdsLawyers}
            orgIds={orgIdsLawyers}
            setOrgIds={setOrgIdsLawyers}
            data={dataLawyers}
            setData={setDataLawyers}
            selectedSatge ={selectedSatge}

          />
        ) : (
          ""
        )}
        {showEditLawyersPopup ? (
          <EditLawyers
            show={showEditLawyersPopup}
            handleClose={() => setShowEditLawyersPopup(false)}
          />
        ) : (
          ""
        )}
      </Row>
      <Row className="g-3 mb-5">
        <Col xs={12}>
          <div className="bg-white bg-fix-dark border-fix-dark rounded p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0 px-3">
                  {intl.formatMessage({ id: "DataEntries" })}
                </h2>

                {dataEntry?.length > 0 && (
                <span className="badge badge-light-success rounded fs-5">
                {dataEntry.length}
      </span>
                )}  
               
              </div>
              <div className="d-flex justify-content-between align-items-center">
                {/* <Button
                  onClick={() => setShowEditDataEntryPopup(true)}
                  variant="link"
                  className="text-white"
                >
                  <i className="fa-solid fs-1 text-gray fa-pencil"></i>
                </Button> */}

                <Button
                  onClick={() => setShowAddDataEntryPopup(true)}
                  variant="link"
                  className="text-white transparent-button"
                >
                  <i className="fa-solid fs-1 text-primary fa-circle-plus"></i>
                </Button>
                <Button
                  variant="link"
                  className="text-dark transparent-button"
                  onClick={() => handleToggle(4)}
                >
                  <i
                    className={`fa-solid ${
                      openSections.includes(4) ? "fa-angle-up" : "fa-angle-down"
                    } fs-3`}
                  ></i>
                </Button>
              </div>
            </div>
            {dataEntry?.map((entry:any , index)=>{
              return(
<Collapse in={openSections.includes(4)} key={index}>
              <div className="mt-3">
                <div
                  className="bg-white bg-fix-dark border-fix-dark  p-3 rounded mb-3 d-flex justify-content-between"
                >
                  <div

                    className="d-flex align-items-center mb-2 mb-sm-0"
                  >
                    <i className="fa-solid fa-circle-user fs-3 text-primary me-3"></i>
                    <div>
                    <span className="fw-bold">
                    {entry?.fullName}</span>{" "}
                      {/* <span className="text-muted">
                        ({intl.formatMessage({ id: "Internal" })})
                      </span> */}
                    </div>
                  </div>
                  <div

                    className="d-flex justify-content-start justify-content-sm-end flex-wrap"
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      {/* <div className="bg-secondary text-dark py-2 px-3 rounded me-2 mb-2">
                        {intl.formatMessage({ id: "Claim#1" })}
                      </div> */}
                      <i
                        role="button"
                        onClick={() =>
                          {
                         
                            setSelectedDataEntry(entry?.userId);
                            setShowDeleteDataEntryPopup(true);
                          }
                 
                            }
                        className="fas fa-trash text-danger fs-3"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </Collapse>
              )
            })}
                    {showDeleteDataEntryPopup ? (
          <DeletePopup
            showDelete={showDeleteDataEntryPopup}
            handleCloseDelete={() => setShowDeleteDataEntryPopup(false)}
            id={selectedDataEntry}
            handleDelete={handleDeleteDataEntry}

          />
        ) : (
          ""
        )}
        {showAddDataEntryPopup ? (
          <AddDataEntry
            show={showAddDataEntryPopup}
            handleClose={() => setShowAddDataEntryPopup(false)}
            dataEntry={dataEntry}
            setDataEntry={setDataEntry}
            employeeIds={employeeIdsDataEntry}
            setEmployeeIds={setEmployeeIdsDataEntry}
            orgIds={orgIdsDataEntry}
            setOrgIds={setOrgIdsDataEntry}
            data={dataDataEntry}
            setData={setDataDataEntry}
           selectedSatge ={selectedSatge}
          />
        ) : (
          ""
        )}
        {showEditDataEntryPopup ? (
          <EditDataEntry
            show={showEditDataEntryPopup}
            handleClose={() => setShowEditDataEntryPopup(false)}
          />
        ) : (
          ""
        )}

          </div>
        </Col>
        {showDeleteConsultativePopup ? (
          <DeletePopup
            showDelete={showDeleteConsultativePopup}
            handleCloseDelete={() => setShowDeleteConsultativePopup(false)}
            id={selectedConsultative}
            handleDelete={handleDeleteConsultative}

          />
        ) : (
          ""
        )}
        {showAddConsultativesPopup ? (
          <AddConsultative
            show={showAddConsultativesPopup}
            handleClose={() => setShowAddConsultativesPopup(false)}
            consultative={consultatives}
            setConsultative={setConsultatives}
            employeeIds={employeeIdsConsultatives}
            setEmployeeIds={setEmployeeIdsConsultatives}
            orgIds={orgIdsConsultatives}
            setOrgIds={setOrgIdsConsultatives}
            data={dataConsultatives}
            setData={setDataConsultatives}
           selectedSatge ={selectedSatge}
          />
        ) : (
          ""
        )}
        {showEditConsultativesPopup ? (
          <EditConsultative
            show={showEditConsultativesPopup}
            handleClose={() => setShowEditConsultativesPopup(false)}
          />
        ) : (
          ""
        )}
      </Row>
      <Row className="g-3 mb-5">
        <Col xs={12}>
          <div className="bg-white bg-fix-dark border-fix-dark rounded p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0 px-3">
                  {intl.formatMessage({ id: "Specialists" })}
                </h2>

                {consultatives?.length > 0 && (
                <span className="badge badge-light-success rounded fs-5">
                {consultatives.length}
      </span>
                )}  
               
              </div>
              <div className="d-flex justify-content-between align-items-center">
                {/* <Button
                  onClick={() => setShowEditDataEntryPopup(true)}
                  variant="link"
                  className="text-white"
                >
                  <i className="fa-solid fs-1 text-gray fa-pencil"></i>
                </Button> */}

                <Button
                  onClick={() => setShowAddConsultativesPopup(true)}
                  variant="link"
                  className="text-white transparent-button"
                >
                  <i className="fa-solid fs-1 text-primary fa-circle-plus"></i>
                </Button>
                <Button
                  variant="link"
                  className="text-dark transparent-button"
                  onClick={() => handleToggle(5)}
                >
                  <i
                    className={`fa-solid ${
                      openSections.includes(5) ? "fa-angle-up" : "fa-angle-down"
                    } fs-3`}
                  ></i>
                </Button>
              </div>
            </div>
            {consultatives?.map((consultative:any , index)=>{
              return(
<Collapse in={openSections.includes(5)} key={index}>
              <div className="mt-3">
                <div
                  className="bg-white bg-fix-dark border-fix-dark  p-3 rounded mb-3 d-flex justify-content-between"
                >
                  <div

                    className="d-flex align-items-center mb-2 mb-sm-0"
                  >
                    <i className="fa-solid fa-circle-user fs-3 text-primary me-3"></i>
                    <div>
                    <span className="fw-bold">
                   {consultative?.fullName}</span>
                      {/* <span className="text-muted">
                        ({intl.formatMessage({ id: "Internal" })})
                      </span> */}
                    </div>
                  </div>
                  <div

                    className="d-flex justify-content-start justify-content-sm-end flex-wrap"
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      {/* <div className="bg-secondary text-dark py-2 px-3 rounded me-2 mb-2">
                        {intl.formatMessage({ id: "Claim#1" })}
                      </div> */}
                      <i
                        role="button"
                        onClick={() =>
                          {
                            setSelectedConsultative(consultative?.userId);
                            setShowDeleteConsultativePopup(true);
                          }
                 
                            }
                        className="fas fa-trash text-danger fs-3"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </Collapse>
              )
            })}
          </div>
        </Col>
        {showDeleteConsultativePopup ? (
          <DeletePopup
            showDelete={showDeleteConsultativePopup}
            handleCloseDelete={() => setShowDeleteConsultativePopup(false)}
            id={selectedConsultative}
            handleDelete={handleDeleteConsultative}

          />
        ) : (
          ""
        )}
        {showAddConsultativesPopup ? (
          <AddConsultative
            show={showAddConsultativesPopup}
            handleClose={() => setShowAddConsultativesPopup(false)}
            consultative={consultatives}
            setConsultative={setConsultatives}
            employeeIds={employeeIdsConsultatives}
            setEmployeeIds={setEmployeeIdsConsultatives}
            orgIds={orgIdsConsultatives}
            setOrgIds={setOrgIdsConsultatives}
            data={dataConsultatives}
            setData={setDataConsultatives}
           selectedSatge ={selectedSatge}
          />
        ) : (
          ""
        )}
        {showEditConsultativesPopup ? (
          <EditConsultative
            show={showEditConsultativesPopup}
            handleClose={() => setShowEditConsultativesPopup(false)}
          />
        ) : (
          ""
        )}
      </Row>
      </div>
      <div className="d-flex justify-content-end px-5 pb-4 mx-5 mt-3">
          <Button variant="secondary" className="me-3"
          onClick={onBack}>
            {intl.formatMessage({ id: "Cancel" })}
          </Button>
          <Button variant="primary"   onClick={() => onNext()}>
            {intl.formatMessage({ id: "Next" })}
          </Button>
        </div>
    </>
  );
}

export default EditDropDownConTeamWork;
