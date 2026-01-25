import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import AddNotePopup from "../popups/AddNotePopup";
import EditSessionPopup from "../popups/EditSessionPopup";
import AddSessionJudgementPopup from "../popups/AddSessionJudgementPopup";
type ActionProps = {};

export const SessionActions: FC<ActionProps> = ({}) => {
  const [modalDShow, setModalDShow] = useState<boolean>(false);
  const [modalAddNoteShow, setModalAddNoteShow] = useState<boolean>(false);
  const [modalEditSessionShow, setModalEditSessionShow] =
    useState<boolean>(false);
  const [modalAddJudgementShow, setModalAddJudgementShow] =
    useState<boolean>(false);

  const intl = useIntl();
  return (
    <>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle
          split
          variant="none"
          className="p-0 text-right"
          id="dropdown-custom-2"
        >
          <i className="bi bi-three-dots fs-2" style={{ color: "#7e8299" }}></i>
        </Dropdown.Toggle>
        <Dropdown.Menu align="start">
          <Dropdown.Item as="button">
            <div
              onClick={() => setModalAddNoteShow(true)}
              className="menu-link px-3 text-success"
            >
              <i className="bi bi-plus-lg fs-4 mx-2"></i>
              {intl.formatMessage({ id: "AddANote" })}
            </div>
          </Dropdown.Item>
          <Dropdown.Item as="button">
            <div
              onClick={() => setModalEditSessionShow(true)}
              className="menu-link px-3 text-primary"
            >
              <i className="fa-solid fa-pen-to-square fs-4 mx-2"></i>
              {intl.formatMessage({ id: "EditSessionData" })}
            </div>
          </Dropdown.Item>
          <Dropdown.Item as="button">
            <div
              onClick={() => setModalAddJudgementShow(true)}
              className="menu-link px-3 text-muted"
            >
              <i className="bi bi-plus-lg fs-4 mx-2"></i>
              {intl.formatMessage({ id: "AddingTheDetailsOfTheSession" })}
            </div>
          </Dropdown.Item>
          <Dropdown.Item as="button">
            <div
              onClick={() => setModalDShow(true)}
              className="menu-link px-3 text-danger"
            >
              <span className="svg-icon svg-icon-3 mx-2">
                <KTSVG path="/media/icons/duotune/general/gen088.svg" />
              </span>
              {intl.formatMessage({ id: "DeleteSession" })}
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {modalDShow && (
        <DeletePopup
          handleCloseDelete={() => setModalDShow(false)}
          showDelete={modalDShow}
        />
      )}
      {modalAddNoteShow && (
        <AddNotePopup
          show={modalAddNoteShow}
          handleClose={() => {
            setModalAddNoteShow(false);
          }}
        />
      )}
      {modalAddJudgementShow && (
        <AddSessionJudgementPopup
          show={modalAddJudgementShow}
          handleClose={() => {
            setModalAddJudgementShow(false);
          }}
        />
      )}
      {modalEditSessionShow && (
        <EditSessionPopup
          show={modalEditSessionShow}
          session={{}}
          handleClose={() => {
            setModalEditSessionShow(false);
          }}
        />
      )}
    </>
  );
};
