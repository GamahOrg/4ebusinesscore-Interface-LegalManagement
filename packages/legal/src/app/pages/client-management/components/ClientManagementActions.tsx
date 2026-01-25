import { useState } from "react";
import { useIntl } from "react-intl";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import EditClient from "../popups/EditClient";
import { DeleteLitigantPopup } from "../../list-of-Cases/popups/DeleteLitigantPopup";

export const ClientManagementActions = ({
  id,
  canEdit,
  pageSize,
  pageIndex,
  clientType,
  searchQuery,
}) => {
  const intl = useIntl();

  const [showEditClient, setShowEditClient] = useState<boolean>(false);
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
          <i className="bi bi-three-dots fs-2 text-gray-700"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="p-1">
          {canEdit ? (
            <>
              <Dropdown.Item
                as="button"
                className="menu-link px-3 py-2 my-1 text-muted mx-0"
                onClick={() => {
                  setShowEditClient(true);
                }}
              >
                <div className="text-dark">
                  <i className="fa-solid fa-pen-to-square fs-4 mx-2"></i>
                  {intl.formatMessage({
                    id: "Edit",
                  })}
                </div>
              </Dropdown.Item>
            </>
          ) : (
            <></>
          )}

          <Dropdown.Item
            as="button"
            className="menu-link px-3 py-2 my-1 text-muted mx-0"
            onClick={(e) => {
              (e.currentTarget as HTMLElement).blur();
              setShowDeletePopup(true);
            }}
          >
            <div className="text-danger">
              <i className="fa-solid fa-trash mx-2 fs-4"></i>
              {intl.formatMessage({
                id: "Delete",
              })}
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {showEditClient && (
        <EditClient
          selectedClientId={id}
          show={showEditClient}
          handleClose={() => {
            setShowEditClient(false);
          }}
          pageSize={pageSize}
          pageIndex={pageIndex}
          clientType={clientType}
          searchQuery={searchQuery}
        />
      )}
      {showDeletePopup && (
        <DeleteLitigantPopup
          id={id}
          showDelete={showDeletePopup}
          handleCloseDelete={() => setShowDeletePopup(false)}
          pageSize={pageSize}
          pageIndex={pageIndex}
          clientType={clientType}
          searchQuery={searchQuery}
        />
      )}
    </>
  );
};
