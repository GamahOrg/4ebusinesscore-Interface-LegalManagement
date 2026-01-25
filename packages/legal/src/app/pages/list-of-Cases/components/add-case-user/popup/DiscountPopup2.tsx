import React, { useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { showAlert } from "@4eplatform/shared/services/showAlert";

type PopupProps = {
  show: boolean;
  handleClose: () => void;
};

const DiscountPopup: React.FC<PopupProps> = ({ show, handleClose }) => {
  const intl = useIntl();
  const [name, setName] = useState("");
  const [identityType, setIdentityType] = useState("");

  const showAddedSuccessfully = () => {
    showAlert(true, "AddedSuccessfully", intl, () => {
      handleClose();
    });
  };
  const handleSubmit = () => {
    showAlert(true, "AddedSuccessfully", intl);
    handleClose();
  };
  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
      className={!show ? "inert" : ""}
    >
      <div className="card">
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            <h1>{intl.formatMessage({ id: "AddDiscount" })}</h1>
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
            <Form.Control
              type="text"
              className="bg-light"
              placeholder={intl.formatMessage({ id: "EnterName" })}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              onChange={(e) => setIdentityType(e.target.value)}
            >
              <option value="">
                {intl.formatMessage({ id: "SelectTheType" })}
              </option>
              <option value="NationalIdentity">
                {intl.formatMessage({ id: "NationalIdentity" })}
              </option>
              <option value="ResidentID">
                {intl.formatMessage({ id: "ResidentID" })}
              </option>
              <option value="LicenseNumber">
                {intl.formatMessage({ id: "LicenseNumber" })}
              </option>
              <option value="CommercialRegistration">
                {intl.formatMessage({ id: "CommercialRegistration" })}
              </option>
              <option value="UnifiedNumber">
                {intl.formatMessage({ id: "UnifiedNumber" })}
              </option>
            </Form.Select>
          </div>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-center px-5 pb-4">
          <Button variant="secondary" className="me-3" onClick={handleClose}>
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

export default DiscountPopup;
