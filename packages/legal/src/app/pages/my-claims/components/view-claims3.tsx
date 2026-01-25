import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";

import { useState } from "react";
import { useIntl } from "react-intl";
import CliamData from "./CliamData";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import FollowUpModify from "./FollowUpModify";
export default function ViewClaims3() {
  const intl = useIntl();
  const [showDeleteModel, setShowDeleteModel] = useState(false);

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
  const [activeButtonId, setActiveButtonId] = useState<number>(2);
  const [activeButton, setActiveButton] = useState<any>(buttons[1]);

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
            <FollowUpModify />
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
          { key: "MyClaims", value: "/my-claims" },
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
                  id: "ViewIncomingClaimData",
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
      {showDeleteModel && (
        <div className="modal fade" aria-hidden="true">
          <DeletePopup
            showDelete={showDeleteModel}
            handleCloseDelete={() => setShowDeleteModel(false)}
          />
        </div>
      )}
    </div>
  );
}
