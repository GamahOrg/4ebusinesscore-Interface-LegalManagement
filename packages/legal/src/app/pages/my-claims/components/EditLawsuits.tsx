import { AddPopup } from "@4eplatform/shared/src/popups/AddPopup";
import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import { useState } from "react";
import { Stepper } from "../strepper/Stepper";
import { useIntl } from "react-intl";
import { AcceptPopup } from "../propus/AcceptPopup";
import { SendPopup } from "../propus/SendPopup";
import { useNavigate } from "react-router-dom";
import CliamDataAddLAsuit2 from "./CliamDataEditLAsuit";
import FlowUpEditLasuit from "./FlowUp-EditLasuit";
export default function EditLawsuit() {
  const intl = useIntl();
  const [currentStep, setCurrentStep] = useState(0);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showAcceptPopup, setShowAcceptPopup] = useState<boolean>(false);
  const [showSendPopup, setShowSendPopup] = useState<boolean>(false);
  const handleSave = () => {
    setIsSaved(true);
    setShowAcceptPopup(true);
  };
  const handleSendClick = () => {
    setShowSendPopup(true);
  };
  const navigate = useNavigate();
  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const steps = [
    {
      name: intl.formatMessage({ id: "ClaimData" }),
      id: 1,
      icon: <i className="fa-solid fa-calendar-days fs-3"></i>,
    },
    {
      name: `${intl.formatMessage({ id: "FollowUp" })}`,
      id: 1,
      icon: <i className="fa-solid fa-book fs-3"></i>,
    },
  ];

  return (
    <>
      <GenericToolbar
        list={[
          { key: "MyClaims", value: "/my-claims" },
          { key: "EditAnIssuedClaim", value: "" },
        ]}
      />

      <div className="card card-xl-stretch mb-xl-8">
        <div className="card-Systems-Header">
          <div className="d-flex flex-column mt-5">
            <h1 className="text-right">
              <span className="fs-2 mt-3 mb-1">
                {intl.formatMessage({ id: "EditAnIssuedClaim" })}
              </span>
            </h1>
            <h1 className="card-title">
              <span className="fw-semibold fs-6 text-muted">
                {intl.formatMessage({
                  id: "EnterTheFollowingInformationToEditTheClaim",
                })}
              </span>
            </h1>
          </div>

          <div className="d-flex w-100 justify-content-center p-10 mb-5">
            <Stepper
              steps={steps}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          </div>

          {currentStep === 0 && <CliamDataAddLAsuit2 />}
          {currentStep === 1 && <FlowUpEditLasuit />}

          <div className="d-flex justify-content-end mb-5 my-5">
            {currentStep !== 0 && (
              <button
                className="btn btn-secondary"
                onClick={handlePrev}
                disabled={currentStep === 0}
              >
                {intl.formatMessage({ id: "Previous" })}
              </button>
            )}

            <button
              className="btn btn-outlined-dark border border-dark mx-3"
              onClick={() => navigate("/my-claims")}
            >
              {intl.formatMessage({ id: "Cancel" })}
            </button>

            {currentStep === 0 && (
              <button
                className="btn btn-success"
                onClick={currentStep === 0 ? handleSave : handleNext}
              >
                {intl.formatMessage({ id: "Save" })}
              </button>
            )}

            {currentStep === steps.length - 1 && (
              <button
                className="btn btn-primary mx-3"
                onClick={handleSendClick}
              >
                {intl.formatMessage({
                  id: "Send",
                })}
              </button>
            )}
            <button
              className={`btn ${
                currentStep === steps.length - 1 ? "btn-success" : "btn-primary"
              } mx-3`}
              onClick={
                currentStep === steps.length - 1 ? handleSave : handleNext
              }
            >
              {currentStep === steps.length - 1
                ? intl.formatMessage({ id: isSaved ? "Save" : "Save" })
                : intl.formatMessage({ id: "Next" })}
            </button>
          </div>

          <AcceptPopup
            show={showAcceptPopup}
            handleClose={() => setShowAcceptPopup(false)}
            onConfirm={() => console.log("Accepted")}
          />

          <AddPopup show={modalShow} handleClose={() => setModalShow(false)} />
          <SendPopup
            show={showSendPopup}
            handleClose={() => setShowSendPopup(false)}
            onConfirm={() => console.log("Send confirmed")}
            title="Send Confirmation"
            text={intl.formatMessage({ id: "AreYouSureYouWantToSend" })}
            confirmText={intl.formatMessage({ id: "Yes" })}
            cancelText={intl.formatMessage({ id: "No" })}
            successText={intl.formatMessage({ id: "SentSuccessfully" })}
          />
        </div>
      </div>
    </>
  );
}
