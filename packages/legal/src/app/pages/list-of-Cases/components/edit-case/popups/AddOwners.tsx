import React, { useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { EmployeeHierarchyPopupForAddOwner } from "./EmployeeHierarchyPopupForAddOwner";
import { DeletePopup } from "./DeletePopup";

type PopupProps = {
  show: boolean;
  handleClose: () => void;
  owners?:any;
  setOwners?:any;
  viewOnly?: string;
  employeeIds?: any;
  setEmployeeIds?: any;
  orgIds?: any;
  setOrgIds?: any;
  data?: any;
  setData?: any;

};

const AddOwners: React.FC<PopupProps> = ({
  show,
  handleClose,
  owners,
  setOwners,
  viewOnly = "false",
  employeeIds,
  setEmployeeIds,
  data,
  setData,
  orgIds,
  setOrgIds,


}) => {
  const intl = useIntl();
  const [modalHShow, setModalHShow] = useState<boolean>(false);

  const [membersChecked, setMembersChecked] = useState<string[]>([]);
  const [employeeNames, setEmployeeNames] = useState<string[]>([]);
  
   const [selectedOwner, setSelectedOwner] = useState<any>("");


  const handleDeleteOwner = (userId: string) => {
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
    setOwners((prevOwners) =>
      prevOwners.filter((owner) => owner.userId !== userId)
    );

  };
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
 const handleAddOwner = () => {
  setOwners((prevOwners) => {
    const merged = [...prevOwners, ...membersChecked];
    const unique = merged.filter(
      (owner, index, self) =>
        index === self.findIndex((o) => o.userId === owner.userId)
    );
    return unique;
  });

  if (owners?.length > 0) {
    showAlert(true, "AddedSuccessfully", intl);
  }
  handleClose();
};
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}

    >
      <div className="card">
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            <h1>{intl.formatMessage({ id: "DirectorGeneralOfAdministration" })}</h1>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-5 py-4">
          <div className="mb-4 mt-3">
            <div className="d-flex align-items-center mb-2">
              <label className="form-label me-2 required">
                {intl.formatMessage({ id: "ChooseUser" })}
              </label>
            </div>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-user-cog special"></i>
                </span>
              </div>
              <input
                className="form-control"
                placeholder={intl.formatMessage({
                  id: "EnterUser",
                })}
                value={employeeNames}
                onChange={(e:any) => setEmployeeNames(e.target.value)}
              />
              <div className="h-110 d-flex" role="button">
                <span
                  className="input-group-text"
                  onClick={() => setModalHShow(true)}
                >
                  <i className="bi bi-diagram-3 fs-3 text-muted"></i>
                </span>
              </div>
            </div>
          </div>

          <div
            className="card bg-gray-100 mb-4"
          >
            {owners?.map((owner: any , index) => {
              return (
                <div className="row" key={index}>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-5">
                    <div className="d-flex justify-content-between align-items-center p-3">
                      <div>
                        <i className="fa-solid fa-circle-user fs-3 text-primary me-3"></i>
                        <span className="fw-bold">
                            {owner?.fullName}
                     </span>
                      </div>
                      <i
                        role="button"
                        onClick={() =>
                        {
                          setSelectedOwner(owner?.userId);
                          setShowDeletePopup(true)
                        }
               
                          }
                        
                        className="fas fa-trash text-danger fs-3"
                      ></i>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-center px-5 pb-4">
          <Button variant="secondary" className="me-3" 
          onClick={()=>{
            handleClose();
          }}
          >
            {intl.formatMessage({ id: "Cancel" })}
          </Button>
          <Button variant="success" onClick={()=> handleAddOwner()} type="submit">{intl.formatMessage({ id: "Add" })}</Button>
        </Modal.Footer>
      </div>

      <div
        className="modal fade"
        id="Rega_modal_viewEmployee_hierarchy"
        aria-hidden="true"
      >
        <EmployeeHierarchyPopupForAddOwner
          show={modalHShow}
          handleClose={() => setModalHShow(false)}
          employeeIds={employeeIds}
          setEmployeeIds={setEmployeeIds}
          membersChecked={membersChecked}
          setMembersChecked={setMembersChecked}
          orgIds={orgIds}
          setOrgIds={setOrgIds}
          employeeNames={employeeNames}
          setEmployeeNames={setEmployeeNames}
          data={data}
          setData={setData}
         owners={owners}
         setOwners={setOwners}
         isOwners={true}
        />
      </div>

           <div className="modal fade" id="Rega_modal_Accept" aria-hidden="true">
              <DeletePopup
                showDelete={showDeletePopup}
                handleCloseDelete={() => setShowDeletePopup(false)}
                id={selectedOwner}
                handleDelete={handleDeleteOwner}
              />
            </div>
    </Modal>
  );
};

export default AddOwners;
