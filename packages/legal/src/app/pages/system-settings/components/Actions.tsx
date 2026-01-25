import { useState } from "react";
import { useIntl } from "react-intl";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { EditBasicDataPopup } from "@4eplatform/shared/src/popups/edit-basicData-popup";
import { useNavigate } from "react-router-dom";

interface ActionsProps {
  actions?: string[] | undefined;
  editUrl?: string;
  showUrl?: string;
  onShow?: () => void;
  onEdit?: () => void;
}
export const Actions = ({
  actions = ["delete", "edit"],
  showUrl = "",
  editUrl = "",
  onEdit = () => {},
  onShow = () => {},
}: ActionsProps) => {
  const intl = useIntl();
  const [modalDShow, setModalDShow] = useState<boolean>(false);
  const [modalEShow, setModalEShow] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle
          split
          variant="none"
          className=" p-0 text-center"
          id="dropdown-custom-2"
        >
          <i className="bi bi-three-dots fs-2" style={{ color: "#7e8299" }}></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {actions?.includes("show") && (
            <Dropdown.Item
              as="button"
              onClick={() => {
                showUrl ? navigate(showUrl) : onShow();
              }}
            >
              <div
                className="menu-link p-3 text-muted text-left"
                style={{ textAlign: "right" }}
              >
                <i className="fas fa-eye mx-2 fs-4 text-muted"></i>
                {intl.formatMessage({ id: "Show" })}
              </div>
            </Dropdown.Item>
          )}
          {actions?.includes("edit") && (
            <Dropdown.Item
              as="button"
              onClick={() => {
                editUrl ? navigate(editUrl) : onEdit();
              }}
            >
              <div className="menu-link p-3 text-primary ">
                <i className="fas fa-pen mx-2 fs-4 text-primary"></i>
                {intl.formatMessage({ id: "Edit" })}
              </div>
            </Dropdown.Item>
          )}
          {actions?.includes("delete") && (
            <Dropdown.Item as="button" onClick={() => setModalDShow(true)}>
              <div className="menu-link p-3 text-danger ">
                <i className="fas fa-trash mx-2 fs-4 text-danger "></i>

                {intl.formatMessage({ id: "Delete" })}
              </div>
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>

      <div className="modal fade" id="Rega_modal_Delete">
        <DeletePopup
          handleCloseDelete={() => setModalDShow(false)}
          showDelete={modalDShow}
        />
      </div>
      <div className="modal fade" id="Rega_modal_Delete">
        <EditBasicDataPopup
          handleClose={() => setModalEShow(false)}
          showAdd={modalEShow}
        />
      </div>
    </>
  );
};
