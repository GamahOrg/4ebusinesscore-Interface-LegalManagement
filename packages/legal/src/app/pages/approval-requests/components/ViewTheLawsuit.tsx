import { FC, useState } from "react";
import { useIntl } from "react-intl";

import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import LawistData from "./LawistData";
import FollowLawsuits from "./FollowLawsuits";
import { RejectPopup } from "../propus/RejectPopup";
import { AcceptPopup } from "../propus/AcceptPopup";
import PopUp from "@4eplatform/shared/src/popups/pop-up";

const ViewLawsuit3: FC = () => {
  const intl = useIntl();
  const [activeButton, setActiveButton] = useState<number>(1);
  const [modalDShow, setModalDShow] = useState<boolean>(false);
  const [showAcceptPopup, setShowAcceptPopup] = useState<boolean>(false);
  const [showAttributionPopup, setAttributionPopup] = useState<boolean>(false);
  const emps = [
    "AbdullahbinMohammed",
    "SaudMohammedAliAl-Qahtani",
    "SaudMohammedAliAl-Qahtani",
    "AbdullahbinMohammed",
  ];
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
  //
  return (
    <>
      <GenericToolbar
        list={[
          { key: "ApprovalRequests", value: "/approval-requests" },
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
        {/* <div className="d-flex justify-content-end me-9 mb-9">
                  <button
                    className="btn btn-white border border-dark text-dark"
                    onClick={() => setAttributionPopup(true)}
                  >
                    {intl.formatMessage({ id: "Imputation" })}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => setModalDShow(true)}
                  >
                    {intl.formatMessage({ id: "Reject" })}
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowAcceptPopup(true)}

                  >
                    {intl.formatMessage({ id: "Acceptance" })}
                  </button>
                </div> */}
      </div>

      <RejectPopup
        handleClose={() => setModalDShow(false)}
        show={modalDShow}
        id={3}
        withReason={true}
        reasonRequired={true}
      />
      <AcceptPopup
        handleClose={() => setShowAcceptPopup(false)}
        show={showAcceptPopup}
        text="ConfirmAcceptClaim"
      />
      <PopUp
        title="TheAttribution"
        size="lg"
        withActions={false}
        handleClose={() => setAttributionPopup(false)}
        show={showAttributionPopup}
      >
        <hr className="mb-10" />
        <div className="question-title d-flex flex-column gap-2">
          <span>{intl.formatMessage({ id: "TheSubject" })}</span>
          <select
            className="form-select form-select-solid fw-bolder"
            data-kt-select2="true"
            data-placeholder="Select option"
            data-allow-clear="true"
            data-kt-user-table-filter="role"
            data-hide-search="true"
          >
            <option>{intl.formatMessage({ id: "SelectEmployee" })}</option>
            {emps.map((emp, index) => (
              <option key={index} value={index}>
                {intl.formatMessage({ id: emp })}
              </option>
            ))}
          </select>
        </div>
        <div className="answer d-flex flex-column gap-2 mt-6">
          <span>{intl.formatMessage({ id: "Notces" })}</span>
          <textarea
            className="text-area-form"
            placeholder={intl.formatMessage({ id: "EnterNotces" })}
          />
        </div>
        <div className="d-flex justify-content-end gap-5 py-5">
          <div
            onClick={() => setAttributionPopup(false)}
            style={{
              borderColor: "black",
              borderStyle: "solid",
              borderWidth: "2px",
            }}
            className="btn text-black text-center px-20 w-10 mb-2"
          >
            {intl.formatMessage({ id: "Back" })}
          </div>
          <div className="btn btn-primary text-center px-20 w-10 mb-2">
            {intl.formatMessage({ id: "Send" })}
          </div>
        </div>
      </PopUp>
    </>
  );
};

export default ViewLawsuit3;
//
