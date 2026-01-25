import { FC, useState } from "react";
import { useIntl } from "react-intl";

import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import LawistData2 from "./LawistData2";
import FollowLawsuits2 from "./FollowLawsuits2";

const ViewLawsuit2ListCliams: FC = () => {
  const intl = useIntl();
  const [activeButton, setActiveButton] = useState<any>({
    id: 1,
    name: intl.formatMessage({ id: "ClaimData" }),
  });

  const buttons = [
    { id: 1, name: intl.formatMessage({ id: "ClaimData" }) },
    { id: 2, name: intl.formatMessage({ id: "FollowUp" }) },
  ];

  const handleButtonClick = (button: any) => {
    setActiveButton(button);
  };

  const ActivatedUserDetailsTab = () => {
    switch (activeButton.id) {
      case 1:
        return <LawistData2 />;
      case 2:
        return <FollowLawsuits2 />;
      default:
        return null;
    }
  };

  return (
    <>
      <GenericToolbar
        list={[
          { key: "ListOfClaims", value: "/list-of-claims" },
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
                {intl.formatMessage({ id: "WePresentToYouTheReceivedClaim" })}
              </span>
            </h1>
          </div>
        </div>
        <div>
          <div className="d-flex">
            <div className="card-Systems-Header pb-0 w-100 d-flex gap-6 mb-5">
              {buttons.map((button: any) => (
                <button
                  key={button.id}
                  className={`btn btn-active-color-primary rounded-0 bg-transparent border-0 p-5 fs-6 fw-bolder border border-bottom border-white border-2 ${
                    activeButton.id === button.id
                      ? "active text-dark"
                      : "text-muted"
                  } rounded-0 px-0 fw-bolder`}
                  onClick={() => handleButtonClick(button)}
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

export default ViewLawsuit2ListCliams;
