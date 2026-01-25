import { AddPopup } from "@4eplatform/shared/src/popups/AddPopup";
import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import { useState } from "react";
import { Stepper } from "../strepper/Stepper";
import { useIntl } from "react-intl";
import CliamDataAddLAsuit from "./CliamData-AddLasuit";
import FlowUpAddLasuit from "./FlowUp-AddLasuit";
import { SendPopup } from "../propus/SendPopup";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import { Form, Col } from "react-bootstrap";
import CliamDataAddLAsuit2 from "./CliamData-AddLasuit 2";
import { SavePopup } from "@4eplatform/shared/src/popups/SavePopup";
export default function AddLawsuit() {
  const intl = useIntl();
  const [currentStep, setCurrentStep] = useState(0);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState<boolean>(false);
  const [showSendPopup, setShowSendPopup] = useState<boolean>(false);
  const handleSave = () => {
    setIsSaved(true);
    setShowSavePopup(true);
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
  const [selectedOption, setSelectedOption] = useState("IssuedClaim");

  const handleLawsuitTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOption(event.target.value);
    setCurrentStep(0);
  };
  return (
    <>
      <GenericToolbar
        list={[
          { key: "MyClaims", value: "/my-claims" },
          { key: "AddAnClaim", value: "" },
        ]}
      />

      <div className="card card-xl-stretch mb-xl-8">
        <div className="card-Systems-Header">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column mt-5">
              <h1 className="text-right">
                <span className="fs-2 mt-3 mb-1">
                  {intl.formatMessage({ id: "AddAnClaim" })}
                </span>
              </h1>
              <h1 className="card-title">
                <span className="fw-semibold fs-6 text-muted">
                  {intl.formatMessage({ id: "EnterDataToAddAnIssuedLawsuit" })}
                </span>
              </h1>
            </div>{" "}
            <Col md={3}>
              <Form.Group controlId="lawsuitTypeSelect">
                <Form.Label>
                  {intl.formatMessage({ id: "TypeOfLawsuit" })}
                </Form.Label>
                <Form.Select
                  onChange={handleLawsuitTypeChange}
                  value={selectedOption}
                >
                  <option value="IssuedClaim">
                    {intl.formatMessage({ id: "IssuedClaim" })}
                  </option>
                  <option value="IncomingClaim">
                    {intl.formatMessage({ id: "IncomingClaim" })}
                  </option>
                </Form.Select>
              </Form.Group>
            </Col>
          </div>

          {selectedOption === "IssuedClaim" && (
            <>
              <div className="d-flex w-100 justify-content-center p-10 mb-5">
                <Stepper
                  steps={steps}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                />
              </div>

              {currentStep === 0 && <CliamDataAddLAsuit />}
              {currentStep === 1 && <FlowUpAddLasuit />}
            </>
          )}

          {selectedOption === "IncomingClaim" && <CliamDataAddLAsuit2 />}
          <div className="d-flex justify-content-end mb-5 my-5">
            <button
              className="btn btn-outlined-dark border border-dark mx-3 w-100px"
              onClick={() => navigate("/my-claims")}
            >
              {intl.formatMessage({ id: "Cancel" })}
            </button>

            {selectedOption === "IssuedClaim" && (
              <>
                {currentStep !== 0 && (
                  <button
                    className="btn btn-secondary w-100px"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                  >
                    {intl.formatMessage({ id: "Previous" })}
                  </button>
                )}

                {currentStep === 0 && (
                  <button
                    className="btn btn-primary w-100px"
                    onClick={currentStep === 0 ? handleSave : handleNext}
                  >
                    {intl.formatMessage({ id: "Save" })}
                  </button>
                )}
                <button
                  className={`btn w-100px ${
                    currentStep === steps.length - 1
                      ? "btn-primary"
                      : "btn-primary"
                  } mx-3`}
                  onClick={
                    currentStep === steps.length - 1 ? handleSave : handleNext
                  }
                >
                  {currentStep === steps.length - 1
                    ? intl.formatMessage({ id: isSaved ? "Save" : "Save" })
                    : intl.formatMessage({ id: "Next" })}
                </button>
                {currentStep === steps.length - 1 && (
                  <Button
                    variant="success"
                    className="mx-3 w-100px"
                    onClick={() => setShowSendPopup(true)}
                  >
                    {intl.formatMessage({ id: "Send" })}
                  </Button>
                )}
              </>
            )}

            {selectedOption === "IncomingClaim" && (
              <>
                <button
                  className="btn btn-primary w-100px mx-3"
                  onClick={handleSave}
                >
                  {intl.formatMessage({ id: "Save" })}
                </button>
                <Button
                  variant="success"
                  className="mx-3 w-100px"
                  onClick={() => setShowSendPopup(true)}
                >
                  {intl.formatMessage({ id: "Send" })}
                </Button>
              </>
            )}
          </div>

          <SavePopup
            show={showSavePopup}
            handleClose={() => setShowSavePopup(false)}
          />

          <AddPopup show={modalShow} handleClose={() => setModalShow(false)} />
          <SendPopup
            show={showSendPopup}
            handleClose={() => setShowSendPopup(false)}
            onConfirm={() => console.log("Send confirmed")}
            title={"SendConfirmation"}
            text={"AreYouSureYouWantToSend"}
            confirmText={"Yes"}
            cancelText={"No"}
            successText={"SentSuccessfully"}
          />
        </div>
      </div>
    </>
  );
}
