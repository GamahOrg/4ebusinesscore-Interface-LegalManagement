import { Dropdown, ButtonGroup } from "react-bootstrap";
import { useIntl } from "react-intl";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AcceptPopup } from "../propus/AcceptPopup";
import PopUp from "@4eplatform/shared/src/popups/pop-up";
import { RejectPopup } from "../propus/RejectPopup";
interface Action {
  id: string;
  label: string;
  icon: string;
  className: string;
  handler?: ActionHandler;
  isLink?: boolean;
  linkTo?: string;
}

interface ActionHandler {
  action: () => void;
  usePopup?: boolean;
}

interface ActionProps {
  rowIndex: number;
  status: string;
}

const IncomingClaimsProcedures2: FC<ActionProps> = ({ rowIndex, status }) => {
  const navigate = useNavigate();

  const intl = useIntl();
  const [modalDShow, setModalDShow] = useState<boolean>(false);
  const [showAcceptPopup, setShowAcceptPopup] = useState<boolean>(false);
  const [showAttributionPopup, setAttributionPopup] = useState<boolean>(false);
  const getActions = (index: number) => {
    const actions: Action[] = [
      {
        id: "show",
        label: intl.formatMessage({ id: "Show" }),
        icon: "fa-solid fa-eye",
        className: "text-dark",
        isLink: true,
        linkTo: `/view-cliams3?status=${status}`, // Passing status as query param
        handler: {
          action: () => navigate(`/view-cliams3/?${status}`),
        },
      },

      {
        id: "attribution",
        label: intl.formatMessage({ id: "Attribution" }),
        icon: "fa-solid fa-share-from-square",
        className: "text-black",
        handler: {
          action: () => setAttributionPopup(true),
          usePopup: true,
        },
      },

      {
        id: "accept",
        label: intl.formatMessage({ id: "Accept" }),
        icon: "fa-solid fa-check fs-3",
        className: "text-success",
        handler: {
          action: () => setShowAcceptPopup(true),
          usePopup: true,
        },
      },
      {
        id: "reject",
        label: intl.formatMessage({ id: "Reject" }),
        icon: "fa-regular fa-circle-xmark",
        className: "text-danger",
        handler: {
          action: () => setModalDShow(true),
          usePopup: true,
        },
      },
    ];
    switch (index) {
      case 0:
        return actions.filter((action) =>
          ["show", "accept", "attribution", "reject"].includes(action.id)
        );

      default:
        return actions.filter((action) => action.id === "show");
    }
  };

  const actions = getActions(rowIndex);
  const emps = [
    "AbdullahbinMohammed",
    "SaudMohammedAliAl-Qahtani",
    "SaudMohammedAliAl-Qahtani",
    "AbdullahbinMohammed",
  ];
  return (
    <>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle
          split
          variant="none"
          className="p-0 text-center"
          id="dropdown-custom-2"
        >
          <i className="bi bi-three-dots fs-2" style={{ color: "#7e8299" }}></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {actions.map((action) => (
            <Dropdown.Item as="button" className="py-1" key={action.id}>
              {action.isLink ? (
                <Link
                  to={action.linkTo || ""}
                  className={`menu-link px-3 mb-2 ${action.className}`}
                >
                  <i className={`${action.icon} mx-2 fs-4`}></i>
                  {action.label}
                </Link>
              ) : (
                <div
                  onClick={() => {
                    action.handler?.action();
                  }}
                  className={`menu-link px-3 ${action.className}`}
                >
                  <span className="svg-icon svg-icon-3 mx-2">
                    <i className={action.icon}></i>
                  </span>
                  {action.label}
                </div>
              )}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <div className="modal fade">
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
      </div>
    </>
  );
};

export default IncomingClaimsProcedures2;
