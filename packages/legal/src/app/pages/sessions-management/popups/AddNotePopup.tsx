import React, { useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";

type PopupProps = {
  show?: boolean;
  handleClose?: () => void;
};

const AddNotePopup: React.FC<PopupProps> = ({ show, handleClose }) => {
  const intl = useIntl();

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      className={!show ? "inert" : ""}
      onHide={handleClose}
    >
      <div className="card">
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            <h1>{intl.formatMessage({ id: "AddANote" })}</h1>{" "}
          </Modal.Title>
        </Modal.Header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Modal.Body className="px-5 py-4">
            <div className="mb-4">
              <label htmlFor="notes" className="required mb-3">
                {intl.formatMessage({ id: "Notee" })}
              </label>
              <textarea className="form-control" rows={4} id="notes" />
            </div>
          </Modal.Body>

          <Modal.Footer className="d-flex justify-content-end px-5 pb-4 mb-5">
            <div className="me-3 btn btn-secondary" onClick={handleClose}>
              {intl.formatMessage({ id: "Cancel" })}
            </div>

            <button type="submit" className="btn btn-success">
              {intl.formatMessage({ id: "Add" })}
            </button>
          </Modal.Footer>
        </form>
      </div>
    </Modal>
  );
};

export default AddNotePopup;
