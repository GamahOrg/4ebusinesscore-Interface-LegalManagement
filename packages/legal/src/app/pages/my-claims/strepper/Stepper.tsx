import { Fragment } from "react";
import "./Style.css";
export const Stepper = ({ steps, currentStep, setCurrentStep }: any) => {
  return (
    <div className="stepper justify-space-between mb-5 w-50">
      {steps.map((step: any, index: number) => (
        <Fragment key={index}>
          {index > 0 && (
            <div
              className={`line w-100 ${currentStep >= index ? "active" : ""}`}
            ></div>
          )}
          <div
            onClick={() => setCurrentStep(index)}
            key={index}
            className={`step ${
              currentStep >= index ? "active" : ""
            } d-flex flex-column justify-content-center position-relative cursor-pointer`}
          >
            <div
              className={`step-circle ${currentStep >= index ? "active" : ""}`}
            >
              {currentStep > index ? (
                <i className="fa-solid fa-check text-white fs-3"></i>
              ) : (
                step?.icon
              )}
            </div>
            <b
              className="mt-3 position-absolute top-100"
              style={{
                minWidth: "114px",
                textAlign: "center",
              }}
            >
              {step?.name}
            </b>
          </div>
        </Fragment>
      ))}
    </div>
  );
};
