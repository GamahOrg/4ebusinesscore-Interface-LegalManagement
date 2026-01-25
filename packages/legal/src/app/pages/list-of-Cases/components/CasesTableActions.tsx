import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import JudgmentReportModal from "../popups/JudgmentReportModal";
import AddSessionPopup from "../popups/AddSessionPopup";
import TerminateCasePopup from "../popups/TerminateCasePopup";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import AddNewLitigationPopup from "../popups/AddNewLitigationPopup";

type ActionProps = {
  id: string;
  status: string | number;
  handleNavigate: any;
  callingData?: any;
};

export const CasesTableActions: FC<ActionProps> = ({
  id,
  status,
  handleNavigate,
  callingData,
}) => {
  const intl = useIntl();
  const language = intl.locale;
  const showEdit =
    language === "ar" ? status === "تحت الدراسة" : status === "In Progress";
  const showActions = status == "صدر حكم";
  const [modalShowjudgmentReport, setModalShowjudgmentReport] =
    useState<boolean>(false);
  const [showAddSessionPopup, setShowAddSessionPopup] =
    useState<boolean>(false);
  const [showTerminateCasePopup, setShowTerminateCasePopup] =
    useState<boolean>(false);
  const [showChangeLitigationLevelPopup, setShowChangeLitigationLevelPopup] =
    useState<boolean>(false);

  return (
    <>
      <Dropdown as={ButtonGroup} style={{ float: "inline-end" }}>
        <Dropdown.Toggle
          split
          variant="none"
          className="p-0 text-center"
          id="dropdown-custom-2"
          aria-label={intl.formatMessage({ id: "Actions" })}
        >
          <i className="bi bi-three-dots fs-2 text-gray-700"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="p-1">
          <Dropdown.Item
            as="button"
            className="menu-link px-3 py-2 my-1 text-muted mx-0"
          >
            <div onClick={() => handleNavigate()}>
              <div className="text-dark">
                <i className="fa-solid fa-eye mx-2 fs-4"></i>
                {intl.formatMessage({
                  id: "ShowCase",
                })}
              </div>
            </div>
          </Dropdown.Item>

          {showEdit && (
            <Dropdown.Item
              as="button"
              className="menu-link px-3 py-2 my-1 text-muted mx-0"
            >
              <Link
                to={`/cases-view/edit-case/${id}`}
                // state={{ status: status }}
                className="menu-link"
              >
                <div className="text-dark">
                  <i className="fa-solid fa-pen-to-square fs-4 mx-2"></i>
                  {intl.formatMessage({
                    id: "Edit",
                  })}
                </div>
              </Link>
            </Dropdown.Item>
          )}

          {showActions && (
            <>
              <Dropdown.Item
                as="button"
                className="menu-link px-3 py-2 my-1 text-muted mx-0"
                onClick={() => setModalShowjudgmentReport(true)}
              >
                <div className="text-dark">
                  <i className="fa-solid fa-eye mx-2 fs-4"></i>
                  {intl.formatMessage({
                    id: "ViewJudgmentReport",
                  })}
                </div>
              </Dropdown.Item>
              {/* <Dropdown.Item
                as="button"
                className="menu-link px-3 py-2 my-1 text-muted mx-0"
                onClick={() => setShowAddSessionPopup(true)}
              >
                <div className="text-dark">
                  <i className="fas fa-plus mx-2 fs-4"></i>
                  {intl.formatMessage({
                    id: "AddNewSession",
                  })}
                </div>
              </Dropdown.Item> */}
              <Dropdown.Item
                as="button"
                className="menu-link px-3 py-2 my-1 text-muted mx-0"
                onClick={() => setShowChangeLitigationLevelPopup(true)}
              >
                <div className="text-dark">
                  <i className="fas fa-sync mx-2 fs-4"></i>
                  {intl.formatMessage({
                    id: "AddNewLawsuit",
                  })}
                </div>
              </Dropdown.Item>
              {/* <Dropdown.Item
                as="button"
                className="menu-link px-3 py-2 my-1 text-muted mx-0"
                onClick={() => setShowTerminateCasePopup(true)}
              >
                <div className="text-dark">
                  <i className="fas fa-power-off mx-2 fs-4"></i>
                  {intl.formatMessage({
                    id: "CaseClosure",
                  })}
                </div>
              </Dropdown.Item> */}
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>

      {modalShowjudgmentReport ? (
        <>
          <JudgmentReportModal
            modalShow={modalShowjudgmentReport}
            handleClose={() => setModalShowjudgmentReport(false)}
            id={id}
          />
        </>
      ) : (
        <></>
      )}
      {showAddSessionPopup ? (
        <>
          <AddSessionPopup
            show={showAddSessionPopup}
            handleClose={() => {
              setShowAddSessionPopup(false);
            }}
          />
        </>
      ) : (
        <></>
      )}
      {showTerminateCasePopup ? (
        <>
          <TerminateCasePopup
            show={showTerminateCasePopup}
            handleClose={() => {
              setShowTerminateCasePopup(false);
            }}
            handleTerminate={() => {
              showAlert(true, "TheCaseWasSuccessfullyClosed", intl);
            }}
          />
        </>
      ) : (
        <></>
      )}
      {showChangeLitigationLevelPopup && (
        <AddNewLitigationPopup
          show={showChangeLitigationLevelPopup}
          handleClose={() => {
            setShowChangeLitigationLevelPopup(false);
          }}
          causeId={id}
          comeFrom="list-of-Cases"
          callingData={callingData}
        />
      )}
    </>
  );
};
