import React from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { showAlert } from "@4eplatform/shared/services/showAlert";

type PopupProps = {
  show: boolean;
  handleClose: () => void;
};

const EditConsultative: React.FC<PopupProps> = ({ show, handleClose }) => {
  const intl = useIntl();
  const showAddedSuccessfully = () => {
    showAlert(true, "SavedSuccessfully", intl,()=>{
      handleClose();
    });
  };
  const handleSubmit = () => {
    showAddedSuccessfully();
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
            <h1>{intl.formatMessage({ id: "DataEntries" })}</h1>
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
                // value={employeeName}
              />
              <div className="h-110 d-flex" role="button">
                <span
                  className="input-group-text"
                  //   onClick={() => setModalHShow(true)}
                >
                  <i className="bi bi-diagram-3 fs-3 text-muted"></i>
                </span>
              </div>
            </div>
          </div>

          <div
            style={{ border: "1px solid #d7d7f3" }}
            className="card bg-gray-100 mb-4"
          >
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-5">
                <div className="d-flex justify-content-between align-items-center py-3">
                  <div>
                    <i className="fa-solid fa-circle-user fs-3 text-primary me-3"></i>
                    <span className="fw-bold">محمد عماد عبد العظيم</span>{" "}
                    <span className="text-muted">
                      ({intl.formatMessage({ id: "Internal" })})
                    </span>
                  </div>
                  <i
                    role="button"
                    // onClick={() => setShowDeletePopup(true)}
                    className="fas fa-trash text-danger fs-3"
                  ></i>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-7 px-20">
                <div className="d-flex align-items-center fw-bold fs-3 py-2">
                  <input checked type="checkbox" className="form-check-input fs-3" />

                  <div className="text-end">
                    <span className="mx-3">محدث مرحلة الدراسة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-center px-5 pb-4">
          <Button variant="secondary" className="me-3" onClick={handleClose}>
            {intl.formatMessage({ id: "Cancel" })}
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            {intl.formatMessage({ id: "Edit" })}
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default EditConsultative;
