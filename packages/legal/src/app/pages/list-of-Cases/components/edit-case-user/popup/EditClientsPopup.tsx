import React, { useMemo, useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { showAlert } from "@4eplatform/shared/services/showAlert";

type PopupProps = {
  show: boolean;
  handleCloseNewClient: () => void;
};

const EditClientsPopup: React.FC<PopupProps> = ({ show, handleCloseNewClient }) => {
  const intl = useIntl();
  const [name, setName] = useState("");
  const [identityType, setIdentityType] = useState(-1);

  const showAddedSuccessfully = () => {
    showAlert(true, "AddedSuccessfully", intl, () => {
      handleCloseNewClient();
    });
  };
  const handleSubmit = () => {
    showAddedSuccessfully();
  };

  const identityLabel = useMemo(() => {
    switch (identityType) {
      case 0: return "NationalIdentity";
      case 1: return "ResidentID";
      case 2: return "LicenseNumber";
      case 3: return "CommercialRegistration";
      case 4: return "UnifiedNumber";
      default: return "NationalIdentity";
    }
  }, [identityType]);


  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleCloseNewClient}
      className={!show ? "inert" : ""}
    >
      <div className="card">
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            <h1>{intl.formatMessage({ id: "AddClient" })}</h1>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-5 py-4">
          <div className="mb-4 mt-3">
            <div className="d-flex align-items-center mb-2">
              <label className="form-label me-2">
                {intl.formatMessage({ id: "Name" })}
              </label>
              <span className="text-danger">*</span>
            </div>

            <div className="input-group bg-white bg-fix-dark   ">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="special fas fa-user"></i>
                </span>
              </div>
              <input
                id="CaseAddress"
                type="text"
                className="form-control"
                placeholder={intl.formatMessage({ id: "EnterName" })}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="d-flex align-items-center mb-2">
              <label className="form-label me-2">
                {intl.formatMessage({ id: "IdentityType" })}
              </label>
              <span className="text-danger">*</span>
            </div>
            <Form.Select
              className="bg-light"
              value={identityType}
              defaultValue={-1}
              onChange={(e) => setIdentityType(Number(e.target.value))}
            >
              <option value={-1}>
                {intl.formatMessage({ id: "SelectTheType" })}
              </option>
              <option value={0}>
                {intl.formatMessage({ id: "NationalIdentity" })}
              </option>
              <option value={1}>
                {intl.formatMessage({ id: "ResidentID" })}
              </option>
              <option value={2}>
                {intl.formatMessage({ id: "LicenseNumber" })}
              </option>
              <option value={3}>
                {intl.formatMessage({ id: "CommercialRegistration" })}
              </option>
              <option value={4}>
                {intl.formatMessage({ id: "UnifiedNumber" })}
              </option>
            </Form.Select>
          </div>

          <div className="mb-4 mt-3">
            <div className="d-flex align-items-center mb-2">
              <label className="form-label me-2">
                {intl.formatMessage({ id: identityLabel })}
              </label>
              <span className="text-danger">*</span>
            </div>

            <div className="input-group bg-white bg-fix-dark">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="special fas fa-user"></i>
                </span>
              </div>
              <input
                id="CaseAddress"
                type="text"
                className="form-control"
                placeholder={intl.formatMessage({ id: identityLabel })}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-center px-5 pb-4">
          <Button variant="secondary" className="me-3" onClick={handleCloseNewClient}>
            {intl.formatMessage({ id: "Cancel" })}
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            {intl.formatMessage({ id: "Add" })}
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default EditClientsPopup;
