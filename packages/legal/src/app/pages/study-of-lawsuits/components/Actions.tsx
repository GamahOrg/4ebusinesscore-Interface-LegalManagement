import { AcceptPopup } from "@4eplatform/shared/src/popups/AcceptPopup";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import { RejectPopup } from "@4eplatform/shared/src/popups/RejectPopup";
import { FC, useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
type ActionProps = {
  id?: number;
  status?: string;
};

export const Actions: FC<ActionProps> = ({ id, status }) => {
  const intl = useIntl();
  const [modalReject, setModalReject] = useState<boolean>(false);
  const [modalAccept, setModalAccept] = useState<boolean>(false);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);

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
          <Link
  to={{
    pathname: `/study-of-lawsuits/details`,
    search: `?status=${status}`, 
  }}
          >
            <Dropdown.Item as="button">
              <div
                className="menu-link p-3 text-muted text-left"
                style={{ textAlign: "right" }}
              >
                <i className="fas fa-eye mx-2 fs-4 text-muted"></i>
                {intl.formatMessage({ id: "ViewDetails" })}
              </div>
            </Dropdown.Item>
          </Link>

          {/* Uncomment if status-based actions are needed */}
          {/* {status === "InTrack" && (
            <>
              <Dropdown.Item as="button" onClick={() => setModalAccept(true)}>
                <div
                  className="menu-link p-3 text-success text-left"
                  style={{ textAlign: "right" }}
                >
                  <i className="fa-regular fa-circle-check mx-2 fs-4"></i>
                  {intl.formatMessage({ id: "Accept" })}
                </div>
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => setModalReject(true)}>
                <div
                  className="menu-link p-3 text-danger text-left"
                  style={{ textAlign: "right" }}
                >
                  <i className="fa-regular fa-circle-xmark mx-2 fs-4"></i>
                  {intl.formatMessage({ id: "Reject" })}
                </div>
              </Dropdown.Item>
            </>
          )} */}

          {status === "Drafts" && (
            <>
              <Dropdown.Item as="button">
                <Link
                  to="/edit-claim-study"
                  className="menu-link p-3 text-primary text-left"
                  style={{ textAlign: "right" }}
                >
                  <i className="fa-solid fa-pen mx-2 fs-4"></i>
                  {intl.formatMessage({ id: "Edit" })}
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                onClick={() => setShowDeletePopup(true)}
              >
                <div
                  className="menu-link p-3 text-danger text-left"
                  style={{ textAlign: "right" }}
                >
                  <i className="fa-solid fa-trash mx-2 fs-4"></i>
                  {intl.formatMessage({ id: "Delete" })}
                </div>
              </Dropdown.Item>
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>

      <div className="modal fade" id="Rega_modal_Reject">
        <RejectPopup
          handleClose={() => setModalReject(false)}
          show={modalReject}
        />
      </div>
      <div className="modal fade" id="Rega_modal_Accept">
        <AcceptPopup
          handleClose={() => setModalAccept(false)}
          show={modalAccept}
        />
      </div>
      <div className="modal fade" id="Rega_modal_Accept">
        <DeletePopup
          showDelete={showDeletePopup}
          handleCloseDelete={() => setShowDeletePopup(false)}
          id={id}
        />
      </div>
    </>
  );
};
