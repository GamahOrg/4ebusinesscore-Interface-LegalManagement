import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useParams } from "react-router-dom";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { StopPopup } from "@4eplatform/shared/src/popups/StopPopup";
import { ButtonGroup, Dropdown } from "react-bootstrap";

type ActionProps = {
  id: Number;
};

export const ViewAllcardsCardActions: FC<ActionProps> = ({ id }) => {
  const intl = useIntl();
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const [showStop, setShowStop] = useState(false);
  const handleCloseStop = () => setShowStop(false);
  const handleShowStop = () => setShowStop(true);
  const { workspaceName } = useParams();
  return (
    <>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle
          split
          variant="none"
          className="p-0 text-center btn btn-sm btn-icon btn-light"
          id="dropdown-custom-2"
        >
          <i className="bi bi-three-dots fs-2"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="py-0">
          <Link to={`/training-system-settings/edit-service/${workspaceName}`}>
            <Dropdown.Item as="button" className="text-primary py-2">
              <span className="svg-icon svg-icon-3 mx-2">
                <KTSVG path="/media/icons/duotune/general/gen087.svg" />
              </span>{" "}
              {intl.formatMessage({ id: "Edit" })}
            </Dropdown.Item>
          </Link>
          <Dropdown.Item
            as="button"
            onClick={handleShowDelete}
            className="py-2"
          >
            <div className="px-1 text-danger">
              <span className="svg-icon svg-icon-3 mx-2">
                <KTSVG path="/media/icons/duotune/general/gen088.svg" />
              </span>{" "}
              {intl.formatMessage({ id: "Delete" })}
            </div>
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={handleShowStop} className="py-2">
            <span className="px-1 text-gray">
              <i className="fa-solid fa-ban fa-fw mx-2"></i>
              {intl.formatMessage({ id: "Stop" })}
            </span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div className="modal fade" aria-hidden="true">
        <DeletePopup
          handleCloseDelete={handleCloseDelete}
          showDelete={showDelete}
        />
      </div>
      <div className="modal fade">
        <StopPopup handleCloseStop={handleCloseStop} showStop={showStop} />
      </div>
    </>
  );
};
