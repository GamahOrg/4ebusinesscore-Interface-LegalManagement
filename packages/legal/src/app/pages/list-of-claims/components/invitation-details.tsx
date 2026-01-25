import { FC, useState } from "react";
import { useIntl } from "react-intl";

import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import { useLocation } from "react-router";
import LawistData from "./LawistData";
import FollowLawsuits from "./FollowLawsuits";
import { AcceptPopup } from "@4eplatform/shared/src/popups/AcceptPopup";
import { RejectPopup } from "@4eplatform/shared/src/popups/RejectPopup";

const InvitationDetails: FC = () => {
  const intl = useIntl();
  const [activeButton, setActiveButton] = useState<number>(1);
  const [modalAShow, setModalAShow] = useState<boolean>(false);
  const [modalRShow, setModalRShow] = useState<boolean>(false);

  const buttons = [
    {
      id: 1,
      name: intl.formatMessage({ id: "ClaimData" }),
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "FollowUp" }),
    },
  ];

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const handleButtonClick = (id: number) => {
    setActiveButton(id);
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
          { key: "ListOfClaims", value: "/list-of-claims" },
          { key: "InvitationDetails", value: "" },
        ]}
      />
      <div className="card card-xl-stretch mb-xl-8">
        <div className="card-Systems-Header d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column mt-5">
            <h1 className="text-right">
              <span className="fs-2 mt-3 mb-1">
                {intl.formatMessage({ id: "InvitationDetails" })}
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

          <div className="d-flex justify-content-between">
            <button
              className="btn btn-danger me-2 style-button-invitation-details"
              onClick={() => setModalRShow(true)}
            >
              {intl.formatMessage({ id: "Reject" })}
            </button>
            <button
              className="btn btn-primary style-button-invitation-details"
              onClick={() => setModalAShow(true)}
            >
              {intl.formatMessage({ id: "Accept" })}
            </button>
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

      <div className="modal fade" id="Rega_modal_reject">
        <RejectPopup
          show={modalRShow}
          handleClose={() => setModalRShow(false)}
        />
      </div>
      <div className="modal fade" id="rega_modal_committeesAcceptUser">
        <AcceptPopup
          show={modalAShow}
          handleClose={() => setModalAShow(false)}
        />
      </div>
    </>
  );
};

export default InvitationDetails;
