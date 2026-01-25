import { useState, FC } from "react";
import { useIntl } from "react-intl";
import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import AddClient from "../popups/AddClient";

interface ClientManagementToolbarProps {
  pageIndex?: any;
  pageSize?: any;
  clientType?: any;
  searchQuery?: any;
}
const ClientManagementToolbar: FC<ClientManagementToolbarProps> = ({
  pageIndex,
  pageSize,
  clientType,
  searchQuery,
}) => {
  const intl = useIntl();
  const [showAddSessionPopup, setShowAddSessionPopup] =
    useState<boolean>(false);

  return (
    <div
      id="kt_toolbar_container"
      className="container d-flex flex-stack flex-wrap p-0"
    >
      <GenericToolbar list={[{ key: "ClientManagement", value: "" }]} />

      <div
        className="btn btn-light text-gray-800 mb-sm-0 mb-3"
        onClick={() => {
          setShowAddSessionPopup(true);
        }}
      >
        {intl.formatMessage({ id: "AddClient" })}
      </div>

      {showAddSessionPopup && (
        <AddClient
          show={showAddSessionPopup}
          handleClose={() => {
            setShowAddSessionPopup(false);
          }}
          pageIndex={pageIndex}
          pageSize={pageSize}
          clientType={clientType}
          searchQuery={searchQuery}
        />
      )}
    </div>
  );
};

export default ClientManagementToolbar;
