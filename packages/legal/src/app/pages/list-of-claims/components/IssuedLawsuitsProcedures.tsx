import React, { FC } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { ButtonGroup, Dropdown } from "react-bootstrap";

interface ActionHandler {
  action: () => void;
  usePopup?: boolean;
  PopupComponent?: React.ComponentType<any>;
  popupProps?: any;
}

interface Action {
  id: string;
  label: string;
  icon: string;
  className: string;
  handler: ActionHandler;
  isLink?: boolean;
  linkTo?: string;
}

interface ActionProps {
  rowIndex: number;
}

export const IssuedLawsuitsProcedures: FC<ActionProps> = ({ rowIndex }) => {
  const intl = useIntl();
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
        <Dropdown.Menu className="py-2">
          <Dropdown.Item as="button" className="py-3" key="show">
            <Link to="/view-claims-list-cliams" className="menu-link px-3 mb-2 text-dark">
              <i className="fa-solid fa-eye mx-2 fs-4"></i>
              <span>{intl.formatMessage({ id: "Show" })}</span>
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
