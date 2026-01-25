import React, { useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import Stepper from "../components/Stepper";
import JudgmentSessionData from "../components/JudgmentSessionData";
import RequestsOfBothPartiesToeDisputeForSession from "../components/RequestsOfBothPartiesToeDisputeForSession";

type PopupProps = {
  show?: boolean;
  handleClose?: () => void;
};

const AddSessionJudgementPopup: React.FC<PopupProps> = ({
  show,
  handleClose,
}) => {
  const intl = useIntl();
  const steps = [
    { id: 1, label: intl.formatMessage({ id: "Judgment" }) },
    {
      id: 2,
      label: intl.formatMessage({ id: "RequestsOfBothPartiesToTheDispute" }),
    },
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  let submitHandler = () => {
    if (currentStep === 1) {
      handleNextStep();
    } else {
    }
  };
  let [clientRequests, setClientRequests] = useState<any>([]);
  let [liabilityRequests, setLiabilityRequests] = useState<any>([]);
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
            <h1>{intl.formatMessage({ id: "AddJudgementReport" })}</h1>{" "}
          </Modal.Title>
        </Modal.Header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Modal.Body className="px-5 py-4">
            <Stepper
              steps={steps}
              currentStep={currentStep}
              onStepChange={(step) => setCurrentStep(step)}
            />{" "}
            {currentStep == 1 && (
              <>
                <JudgmentSessionData />
              </>
            )}
            {currentStep == 2 && (
              <>
                <RequestsOfBothPartiesToeDisputeForSession
                  {...{
                    clientRequests,
                    setClientRequests,
                    setLiabilityRequests,
                    liabilityRequests,
                  }}
                />
              </>
            )}
          </Modal.Body>

          <Modal.Footer className="d-flex justify-content-end px-5 pb-4 mb-5">
            <div className="me-3 btn btn-secondary" onClick={handleClose}>
              {intl.formatMessage({ id: "Cancel" })}
            </div>

            {currentStep < steps.length ? (
              <div className="btn btn-success" onClick={handleNextStep}>
                {intl.formatMessage({ id: "Next" })}
              </div>
            ) : (
              <div
                className="btn btn-success"
                onClick={() => {
                  submitHandler();
                }}
              >
                {intl.formatMessage({ id: "Add" })}
              </div>
            )}
          </Modal.Footer>
        </form>
      </div>
    </Modal>
  );
};

export default AddSessionJudgementPopup;
