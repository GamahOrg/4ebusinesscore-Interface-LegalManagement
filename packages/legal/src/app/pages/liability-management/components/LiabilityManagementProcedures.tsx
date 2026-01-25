import React, { FC, useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import { DeletePopup } from "../popups/DeletePopup";


const AddDiscountPopup = React.lazy(() => import("../popups/AddDiscountPopup"));
const ModifyDiscountPopup = React.lazy(() => import("../popups/ModifyDiscountPopup"));
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
  id: number;
  searchQuery?: string;
  clientType?: string;
  pageIndex?: number;
  pageSize?: number;
}

const LiabilityManagementProceduresComponent: FC<ActionProps> = ({
  rowIndex, id, searchQuery, clientType, pageIndex, pageSize
}) => {
  const intl = useIntl();
  const [showAddDiscount, setShowAddDiscount] = useState<boolean>(false);
  const [showModifyDiscount, setShowModifyDiscount] = useState<boolean>(false);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const handleShowModifyDiscount = useCallback(() => {
    setShowModifyDiscount(true);
  }, []);

  const handleShowDeletePopup = useCallback(() => {
    setShowDeletePopup(true);
  }, []);

  const handleCloseModifyDiscount = useCallback(() => {
    setShowModifyDiscount(false);
  }, []);

  const handleCloseDeletePopup = useCallback(() => {
    setShowDeletePopup(false);
  }, []);

  const handleCloseAddDiscount = useCallback(() => {
    setShowAddDiscount(false);
  }, []);

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
          <Dropdown.Item as="button" className="py-3" key="Edit" onClick={() => { handleShowModifyDiscount() }}
          >
            <div
              className="menu-link px-3 mb-2 text-primary"
            >
              <i className="fa-solid fa-pen mx-2 fs-4"></i>
              <span>{intl.formatMessage({ id: "Edit" })}</span>
            </div>
          </Dropdown.Item>
          <Dropdown.Item as="button" className="py-3" key="Delete">
            <div
              className="menu-link px-3 mb-2 text-danger"
              onClick={() => handleShowDeletePopup()}
            >
              <i className="fas fa-trash mx-2 fs-4"></i>
              <span>{intl.formatMessage({ id: "Delete" })}</span>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className="modal fade" aria-hidden="true">
        <React.Suspense fallback={null}>
          {showAddDiscount && (
            <AddDiscountPopup
              searchQuery={searchQuery}
              clientType={clientType}
              pageIndex={pageIndex}
              pageSize={pageSize}
              show={showAddDiscount}
              handleClose={handleCloseAddDiscount}
            />
          )}

          {showModifyDiscount && (
            <ModifyDiscountPopup
              searchQuery={searchQuery}
              clientType={clientType}
              pageIndex={pageIndex}
              pageSize={pageSize}
              id={id}
              show={showModifyDiscount}
              handleClose={handleCloseModifyDiscount}
            />
          )}

        </React.Suspense>
        {showDeletePopup && (
          <DeletePopup
            searchQuery={searchQuery}
            clientType={clientType}
            pageIndex={pageIndex}
            pageSize={pageSize}
            id={id}
            showDelete={showDeletePopup}
            handleCloseDelete={handleCloseDeletePopup}
          />
        )}
      </div>
    </>
  );
};
export const LiabilityManagementProcedures = React.memo(LiabilityManagementProceduresComponent);
