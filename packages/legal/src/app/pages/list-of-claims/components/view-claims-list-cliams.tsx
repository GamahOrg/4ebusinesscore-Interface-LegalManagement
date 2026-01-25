import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import { useState } from "react";
import { useIntl } from "react-intl";
import { useLocation } from "react-router";
import CliamData from "./CliamData";
import FollowUp from "./FollowUp";

export default function ViewClaimsListCliams() {
  const intl = useIntl();
  const [activeButtonId, setActiveButtonId] = useState<number>(1);
  const buttons: any = [
    {
      id: 1,
      name: intl.formatMessage({
        id: "ClaimData",
      }),
    },
    {
      id: 2,
      name: `${intl.formatMessage({
        id: "FollowUp",
      })}`,
    },
  ];
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [activeButton, setActiveButton] = useState<any>(buttons[0]);

  const handleButtonClick = (button: any) => {
    setActiveButton(button);
    setActiveButtonId(button.id);
  };

  const ActivatedUserDetailsTab = () => {
    switch (activeButton.id) {
      case 1:
        return (
          <>
            <CliamData />
          </>
        );
      case 2:
        return (
          <>
            <FollowUp />
          </>
        );
      default:
        return null;
    }
  };
  return (
    <div>
      <GenericToolbar
        list={[
          { key: "ListOfClaims", value: "/list-of-claims" },
          { key: "PresentationOfLawsuit", value: "" },
        ]}
      />
      <div className="card card-xl-stretch mb-xl-8 pb-8">
        <div className="card-Systems-Header d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column mt-5">
            <h1 className="text-right">
              <span className="fs-2 mt-3 mb-1">
                {intl.formatMessage({ id: "PresentationOfLawsuit" })}
              </span>
            </h1>
            <h1 className="card-title">
              <span className="fw-semibold fs-6 text-muted">
                {intl.formatMessage({
                  id: "ViewTheIssuedLawsuitData",
                })}
              </span>
            </h1>
          </div>
        </div>
        <div>
          <>
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
                    {intl.formatMessage({
                      id: button.name,
                    })}
                  </button>
                ))}
              </div>
            </div>

            {ActivatedUserDetailsTab()}
          </>
        </div>
      </div>
    </div>
  );
}
