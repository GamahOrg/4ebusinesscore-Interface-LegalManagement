import { useIntl } from "react-intl";

type Prop = {
  handleActive: any;
  tab: any;
  activeStep: number;
  handleRemoveStep: any;
  isLast: boolean;
};
const StepDetailsTab = ({
  handleActive,
  tab,
  activeStep,
  handleRemoveStep,
  isLast,
}: Prop) => {
  const intl = useIntl();
  return (
    <button
      onClick={() => handleActive(tab)}
      className={`relative btn w-150px mx-0 ${
        tab === activeStep ? "btn-primary" : "btn-light"
      }`}
    >
      <span
        className={`fw-bolder ${
          tab === activeStep ? "text-white" : "text-gray-500"
        }`}
      >
        {intl.formatMessage({ id: "Session" })} ( {tab} )
        {!isLast && (
          <i
            onClick={() => handleRemoveStep(tab)}
            className="x-close-btn fa-solid fa-xmark  fs-4 text-danger hover-danger"
          ></i>
        )}
      </span>
    </button>
  );
};

export default StepDetailsTab;
