import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import StepDetailsTab from "./StepDetails";
import AddSession from "../popups/AddSession";

const Steps = () => {
  const [steps, setSteps] = useState<any[]>([1]);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isLast, setIsLast] = useState<boolean>(false);

  // State to control AddSession popup visibility
  const [isAddSessionVisible, setIsAddSessionVisible] = useState<boolean>(false);

  const handleAddNewStep = () => {
    setSteps([...steps, steps[steps.length - 1] + 1]);
  };

  const handleRemoveStep = (step: number) => {
    setSteps(steps.filter((item) => item !== step));
  };

  useEffect(() => {
    steps.length === 1 ? setIsLast(true) : setIsLast(false);
  }, [steps]);

  const handleAgree = () => {
    // Add a new step and close the popup
    handleAddNewStep();
    setIsAddSessionVisible(false);
  };

  return (
    <>
      <div className="d-flex flex-wrap gap-5 align-items-center mb-5">
        {steps.map((item) => (
          <StepDetailsTab
            tab={item}
            handleActive={setActiveStep}
            activeStep={activeStep}
            key={item}
            handleRemoveStep={handleRemoveStep}
            isLast={isLast}
          />
        ))}
        <Button
          className="mx-0 btn btn-success"
          variant="light"
          type="button"
          onClick={() => setIsAddSessionVisible(true)} // Show AddSession popup
        >
          <i className="fas fa-plus"></i>
        </Button>
      </div>

      {/* AddSession Popup */}
      <AddSession
        show={isAddSessionVisible}
        onHide={() => setIsAddSessionVisible(false)} // Close popup
        activeButtonId={0} // Pass required props
        onAgree={handleAgree} // Callback for Agree button
      />
    </>
  );
};

export default Steps;
