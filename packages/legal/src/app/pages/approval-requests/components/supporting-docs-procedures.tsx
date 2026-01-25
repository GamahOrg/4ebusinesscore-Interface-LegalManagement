import { Dropdown, ButtonGroup } from "react-bootstrap";
import { useIntl } from "react-intl";
import { FC,  } from "react";
import { Link } from "react-router-dom";

interface ActionProps {
  rowIndex: number;
}

const SupportDocsProcedures: FC<ActionProps> = ({ rowIndex }) => {
  const intl = useIntl();

  return (
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
        <Dropdown.Item as="button" className="py-1">
          <Link to="/view-claims" className={`text-dark px-3 mb-2 `}>
            <i className={`fa-solid fa-eye mx-2 fs-4`}></i>
            {intl.formatMessage({ id: "Show" })}
          </Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SupportDocsProcedures;
