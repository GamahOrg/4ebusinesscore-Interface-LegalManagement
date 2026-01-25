import { Dropdown, ButtonGroup } from "react-bootstrap";
import { useIntl } from "react-intl";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { ArchivePopup } from "../propus/ArchivePopup";
type ActionProps = {
  id?: number;
  status?: string;
};

export const IncomingClaimsProcedures: FC<ActionProps> = ({ id, status }) => {
  const intl = useIntl();
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [modalArchiveShow, setModalArchiveShow] = useState<boolean>(false);

  const showEditAndDelete = status === "Drafts";

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
              pathname: `/view-claims`,
              search: `?status=${status}`,
            }}
          >
            <Dropdown.Item as="button">
              <div
                className="menu-link p-3 text-muted text-left"
                style={{ textAlign: "right" }}
              >
                <i className="fas fa-eye mx-2 fs-4 text-muted"></i>
                {intl.formatMessage({ id: "Show" })}
              </div>
            </Dropdown.Item>
          </Link>
          {status === "Finished" && (
            <Dropdown.Item
              as="button"
              onClick={() => setModalArchiveShow(true)}
            >
              <div
                className="menu-link p-3 text-dark text-left"
                style={{ textAlign: "right" }}
              >
                <i className="fa-solid fa-archive mx-2 fs-4"></i>
                {intl.formatMessage({ id: "ArchiveIt" })}
              </div>
            </Dropdown.Item>
          )}
          {showEditAndDelete && (
            <>
              <Dropdown.Item as="button">
                <Link
                  to="/modify-claim"
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
      <div className="modal fade" id="Rega_modal_Accept" aria-hidden="true">
        <DeletePopup
          showDelete={showDeletePopup}
          handleCloseDelete={() => setShowDeletePopup(false)}
          id={id}
        />
      </div>
      <div className="modal fade" aria-hidden="true">
        <ArchivePopup
          handleCloseArchive={() => setModalArchiveShow(false)}
          showArchive={modalArchiveShow}
        />
      </div>
    </>
  );
};

export default IncomingClaimsProcedures;
