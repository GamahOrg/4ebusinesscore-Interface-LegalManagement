import { FC, useState } from "react";
import { useIntl } from "react-intl";

import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import { useLocation } from "react-router";
import LawistData from "./LawistData";
import FollowLawsuits from "./FollowLawsuits";

const ViewLawsuit: FC = () => {
  const intl = useIntl();
  const [activeButton, setActiveButton] = useState<number>(1);

  const buttons = [
    { id: 1, name: intl.formatMessage({ id: "ClaimData" }) },
    { id: 2, name: intl.formatMessage({ id: "FollowUp" }) },
  ];

  const handleButtonClick = (buttonId: number) => {
    setActiveButton(buttonId);
  };

  const ActivatedUserDetailsTab = () => {
    switch (activeButton) {
      case 1:
        return <LawistData />;
      case 2:
        return <FollowLawsuits />;
      default:
        return null;
    }
  };

  return (
    <>
      <GenericToolbar
        list={[
          { key: "Archives", value: "/archives" },
          { key: "ViewLawsuit", value: "" },
        ]}
      />
      <div className="card card-xl-stretch mb-xl-8">
        <div className="card-Systems-Header d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column mt-5">
            <h1 className="text-right">
              <span className="fs-2 mt-3 mb-1">
                {intl.formatMessage({ id: "ViewLawsuit" })}
              </span>
            </h1>
            <h1 className="card-title">
              <span className="fw-semibold fs-6 text-muted">
                {intl.formatMessage({
                  id: "WeshowYouAllTheDetailsOfTheInvitation",
                })}
              </span>
            </h1>
          </div>
        </div>
        <div>
          <div className="d-flex">
            <div className="card-Systems-Header pb-0 w-100 d-flex gap-6 mb-5">
              {buttons.map((button) => (
                <button
                  key={button.id}
                  className={`btn btn-active-color-primary rounded-0 bg-transparent border-0 p-5 fs-6 fw-bolder border border-bottom border-white border-2 ${
                    activeButton === button.id
                      ? "active text-dark"
                      : "text-muted"
                  } rounded-0 px-0 fw-bolder`}
                  onClick={() => handleButtonClick(button.id)}
                >
                  {button.name}
                </button>
              ))}
            </div>
          </div>
          {ActivatedUserDetailsTab()}
        </div>
      </div>
    </>
  );
};

export default ViewLawsuit;
