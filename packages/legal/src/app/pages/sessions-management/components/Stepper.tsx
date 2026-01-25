import React from "react";

type Step = {
  id: number;
  label: string;
};

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepChange,
}) => {
  return (
    <div className="stepper-container d-flex align-items-center justify-content-center">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          {/* Step Circle */}
          <div className="step">
            <div
              className={`step-circle cursor-pointer mx-1 ${
                currentStep >= step.id ? "active" : ""
              }`}
              onClick={() => onStepChange(step.id)}
            >
              {step.id}
            </div>
            <div className="step-label">{step.label}</div>
          </div>

          {/* Step Line */}
          {index !== steps.length - 1 && (
            <div
              className={`step-line ${
                currentStep > step.id ? "active-line" : ""
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
