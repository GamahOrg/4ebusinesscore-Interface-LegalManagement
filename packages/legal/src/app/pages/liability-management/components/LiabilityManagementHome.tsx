import { useIntl } from "react-intl";
import { FC } from "react";
import LiabilityManagementTable from "./LiabilityManagementTable";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { ClientType } from "../../../models/LegalEnums";

interface LiabilityManagementHome {
  pageIndex?: number;
  pageSize?: number;
  setPageIndex?: any;
  setPageSize?: any;
  searchQuery?: any;
  setSearchQuery?: any;
  selectedClientTypes?: any;
  setSelectedClientTypes?: any;
  clientType?: any;
  setClientType?: any;
}
const LiabilityManagementHome: FC<LiabilityManagementHome> = ({
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
  searchQuery,
  setSearchQuery,
  selectedClientTypes,
  setSelectedClientTypes,
  clientType,
  setClientType,
}) => {
  const intl = useIntl();

  const handleLawyerTypeChange = (type: number, checked: boolean) => {
    let updatedTypes = [...selectedClientTypes];

    if (checked) {
      if (!updatedTypes.includes(type)) {
        updatedTypes.push(type);
      }
    } else {
      updatedTypes = updatedTypes.filter((t) => t !== type);
    }

    setSelectedClientTypes(updatedTypes);

    if (updatedTypes.length === 2 || updatedTypes.length === 0) {
      setClientType(null);
    } else {
      setClientType(updatedTypes[0]);
    }
  };

  return (
    <>
      <div className="container card table-dark card-xl-stretch mb-xl-8">
        <div className="row py-4 px-4 mb-2 mt-8 w-100">
          <div className="d-flex  justify-content-between align-items-center">
            {/* Title right */}
            <div className="d-flex flex-column col-md-6 mb-3 mb-md-0">
              <h1 className="fs-2 mb-1">
                {intl.formatMessage({ id: "LiabilityManagement" })}
              </h1>
              <span className="fw-semibold fs-6 text-muted">
                {intl.formatMessage({ id: "ViewAllOpponents" })}
              </span>
            </div>

            {/* Search and Checkboxes left */}
            <div className="d-flex flex-wrap justify-content-end mb-3 align-items-center gap-5 w-100 w-md-auto">
              {/* Search */}
              <div className="d-flex align-items-center position-relative flex-grow-1 flex-md-grow-0">
                <span className="svg-icon svg-icon-1 position-absolute text-muted mx-3">
                  <KTSVG path="/media/icons/duotune/general/gen114_search.svg" />
                </span>
                <input
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  data-kt-filemanager-table-filter="search"
                  className="form-control form-control-solid px-11 w-100 w-md-auto"
                  placeholder={intl.formatMessage({ id: "Search" })}
                />
              </div>

              {/* Checkboxes */}
              {/* Hide it upon client request */}
              {/* <div className="bg-gray-200 px-3 py-4 rounded d-flex flex-wrap align-items-center gap-2">
                <div className="d-flex align-items-center gap-2">
                  <input
                    onChange={(e) =>
                    {
                      handleLawyerTypeChange(
                        ClientType.Plaintiff,
                        e.target.checked
                      )
                    }

                    }
                    checked={selectedClientTypes?.includes(ClientType.Plaintiff)}
                    className="form-check-input w-20px h-20px"
                    type="checkbox"
                  />
                  <label className="fs-8 text-primary fa-solid">
                    {intl.formatMessage({ id: "Claimant" })}
                  </label>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <input
                    onChange={(e) =>
                    {
                      handleLawyerTypeChange(
                        ClientType.Defendant,
                        e.target.checked
                      )
                    }
                    }
                    checked={selectedClientTypes.includes(ClientType.Defendant)}
                    className="form-check-input w-20px h-20px"
                    type="checkbox"
                  />
                  <label className="fs-8 text-primary fa-solid">
                    {intl.formatMessage({ id: "Defendant" })}
                  </label>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="px-4">
          <LiabilityManagementTable
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
            clientType={clientType}
            setClientType={setClientType}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPageIndex={setPageIndex}
            setPageSize={setPageSize}
          />
        </div>

        {/* Pagination */}
      </div>
    </>
  );
};

export default LiabilityManagementHome;
