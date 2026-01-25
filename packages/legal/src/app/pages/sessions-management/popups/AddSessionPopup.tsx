import React, { useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import Stepper from "../components/Stepper";
import SessionData from "../components/SessionData";
import SessionDocs from "../components/SessionDocs";
import { useNavigate } from "react-router-dom";
import { AddPopup } from "@4eplatform/shared/src/popups/AddPopup";

type PopupProps = {
  show?: boolean;
  handleClose?: () => void;
};

const AddSessionPopup: React.FC<PopupProps> = ({ show, handleClose }) => {
  const intl = useIntl();
  let navigate = useNavigate();
  const steps = [
    { id: 1, label: intl.formatMessage({ id: "SessionInfo" }) },
    { id: 2, label: intl.formatMessage({ id: "SessionDocs" }) },
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [showAddPopup, setShowAddPopup] = useState(false);

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const submitHandler = () => {
    if (currentStep === 1) {
      handleNextStep();
    } else {
      setShowAddPopup(true);
    }
  };

  return (
    <>
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
              <h1>{intl.formatMessage({ id: "AddSession" })}</h1>
            </Modal.Title>
          </Modal.Header>

          <form onSubmit={(e) => e.preventDefault()}>
            <Modal.Body className="px-5 py-4">
              <Stepper
                steps={steps}
                currentStep={currentStep}
                onStepChange={(step) => setCurrentStep(step)}
              />

              {currentStep === 1 && <SessionData />}
              {currentStep === 2 && <SessionDocs />}
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-end px-5 pb-4 mb-5">
              <button className="btn btn-secondary px-15" onClick={handleClose}>
                {intl.formatMessage({ id: "Cancel" })}
              </button>

              {currentStep < steps.length ? (
                <button
                  className="btn btn-success px-15"
                  onClick={handleNextStep}
                >
                  {intl.formatMessage({ id: "Next" })}
                </button>
              ) : (
                <button
                  className="btn btn-success px-15"
                  onClick={submitHandler}
                >
                  {intl.formatMessage({ id: "Add" })}
                </button>
              )}
            </Modal.Footer>
          </form>
        </div>
      </Modal>

      {showAddPopup && (
        <AddPopup
          show={showAddPopup}
          handleClose={() => setShowAddPopup(false)}
          handleCloseMainPopup={handleClose}
        />
      )}
    </>
  );
};

export default AddSessionPopup;
