import { useIntl } from "react-intl";
import { SystemPagination } from "@4eplatform/shared/src/popups/SystemPagination";
import StudyClaimsTable from "./StudyClaimsTable";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";

const StudyClaimsTableList = () => {
  const intl = useIntl();

  return (
    <div
      id="kt_content_container"
      className="d-flex flex-column-fluid align-items-start container-xxl p-0"
    >
      <div className="content flex-row-fluid" id="kt_content">
        <div
          className="flex-lg-row-fluid"
          data-select2-id="select2-data-129-tmo1"
        >
          <div className="card mb-5 mb-xl-8">
          <div className="card-Systems-Header d-flex justify-content-between align-items-center">
                <div>
                  <h2 className="text-dark mb-3 fs-2 mt-10">
                    {intl.formatMessage({ id: "StudyOfLawsuits" })}
                  </h2>
                  <span className="text-muted fs-6">
                    {intl.formatMessage({
                      id: "WeDisplayAllStudyClaims",
                    })}
                  </span>
                </div>
                <div className="d-flex align-items-center position-relative w-300px ">
                  <span className={`svg-icon svg-icon-1 position-absolute mx-2`}>
                    <KTSVG path="/media/icons/duotune/general/gen114_search.svg" />
                  </span>
                  <input
                    type="text"
                    data-kt-filemanager-table-filter="search"
                    className={`form-control form-control-solid`}
                    placeholder={intl.formatMessage({
                      id: "Search",
                    })}
                  />
                </div>
          </div>
            <div className="card-body">
            
              <StudyClaimsTable />
              <SystemPagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyClaimsTableList;
