import React, { useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { EmployeeHierarchyPopupForAddDataEntry } from "./EmployeeHierarchyPopupForAddDataEntry";
import { DeletePopup } from "./DeletePopup";
import { EmployeeHierarchyPopupForAddConsultative } from "./EmployeeHierarchyPopupForAddConsultative";

type PopupProps = {
  show: boolean;
  handleClose: () => void;
  consultative: any;
  setConsultative: any;
  employeeIds: any;
  setEmployeeIds: any;
  orgIds: any;
  setOrgIds: any;
  data: any;
  setData: any;
  selectedSatge?:any;
};

const AddConsultative: React.FC<PopupProps> = ({
  show,
  handleClose,
  consultative,
  setConsultative,
  employeeIds,
  setEmployeeIds,
  orgIds,
  setOrgIds,
  data,
  setData,
  selectedSatge,
}) => {
  const intl = useIntl();

  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);

  const [modalHShow, setModalHShow] = useState<boolean>(false);
  const [membersChecked, setMembersChecked] = useState<string[]>([]);
  const [employeeNames, setEmployeeNames] = useState<string[]>([]);
  const [selectedConsultative, setSelectedConsultative] = useState<any>(null);
  const handleConsultativeCheckboxChange = (userId: number) => {
    setConsultative((prevConsultative) =>
      prevConsultative.map((entry) =>
        entry.userId === userId
          ? { ...entry, isStudyStage: !entry.isStudyStage }
          : entry
      )
    );
  };
  const handleAddConsultative = () => {
    setConsultative((prevConsultives) => {
       const merged = [...prevConsultives, ...membersChecked];
       const unique = merged.filter(
         (owner, index, self) =>
           index === self.findIndex((o) => o.userId === owner.userId)
       );
       return unique;
     });
   
     if (consultative?.length > 0) {
       showAlert(true, "AddedSuccessfully", intl);
     }
     handleClose();
  };
  const handleDeleteConsultative = (userId: string) => {
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
    setConsultative((prevConsultative) =>
      prevConsultative.filter((consultative) => consultative.userId !== userId)
    );
  };
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
      className={!show ? "inert" : ""}
    >
      <div className="card">
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            <h1>{intl.formatMessage({ id: "Specialists" })}</h1>
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

{
  consultative?.map((consultative:any , index)=>{
    return(
<div className="row" key={index}>
              <div className="col-md-6 col-lg-5">
                <div className="d-flex justify-content-between align-items-center p-3">
                  <div>
                    <i className="fa-solid fa-circle-user fs-3 text-primary me-3"></i>
                    <span className="fw-bold">
                      {consultative?.fullName}
                     </span>                   
                      {/* <span className="text-muted">
                      ({intl.formatMessage({ id: "Internal" })})
                    </span> */}
                  </div>
                  <i
                    role="button"
                    onClick={() => {
                      setSelectedConsultative(consultative?.userId)
                      setShowDeletePopup(true)}}
                    className="fas fa-trash text-danger fs-3"
                  ></i>
                </div>
              </div>
              <div className=" col-md-6 col-lg-7 px-lg-20">
                <div className="d-flex align-items-center fw-bold fs-3 p-3">
                  <input type="checkbox" className="form-check-input fs-3"
                  checked={consultative?.isStudyStage || false}
                  onChange={() => handleConsultativeCheckboxChange(consultative.userId)} />

                  {/* <div className="text-end">
                    <span className="mx-3 fs-6 fs-md-4">{intl.formatMessage({id:"StudyStageUpdate"})}</span>
                  </div> */}

                       {typeof selectedSatge === "object" && "nameAr" in selectedSatge ? (
                        <>
                            {intl.formatMessage({ id: "StageUpdater" })}{"  "}
                            {intl.locale === "ar" ? selectedSatge.nameAr : selectedSatge.nameEn}
                         </>
                        ) : (
                       selectedSatge
                        )}
                </div>
              </div>
            </div>
    )
  })
}


          </div>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-center px-5 pb-4">
          <Button variant="secondary" className="me-3" onClick={handleClose}>
            {intl.formatMessage({ id: "Cancel" })}
          </Button>
          <Button variant="success"  onClick={()=> handleAddConsultative()}>
            {intl.formatMessage({ id: "Add" })}
          </Button>
        </Modal.Footer>
      </div>
            <div
              className="modal fade"
              id="Rega_modal_viewEmployee_hierarchy"
              aria-hidden="true"
            >
              <EmployeeHierarchyPopupForAddConsultative
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
                consultative={consultative}
                setConsultative={setConsultative}
                isConsultative={true}
              />
            </div>
      <DeletePopup
        showDelete={showDeletePopup}
        handleCloseDelete={() => setShowDeletePopup(false)}
        id={selectedConsultative}
        handleDelete={handleDeleteConsultative}
      />

    </Modal>
  );
};

export default AddConsultative;
