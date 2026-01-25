import { useIntl } from "react-intl";
import ApprovalTabs from "./components/approval-tabs";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { SystemPagination } from "@4eplatform/shared/src/popups/SystemPagination";

const ApprovalContent = () => {
  const intl = useIntl();

  return (
    <>
      
      <div className="card p-10">
        <div className=" d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column align-content-start">
            <h3>{intl.formatMessage({ id: "ApprovalRequests" })}</h3>
            <p className="text-gray-400 pt-2">
              {intl.formatMessage({ id: "showAllApprovals" })}
            </p>
          </div>
          <div className="d-flex align-items-center py-3 py-md-1">
            <div className="d-flex align-items-center position-relative w-300px ">
              <span className={`svg-icon svg-icon-1 position-absolute me-6`}>
                <KTSVG path="/media/icons/duotune/general/gen114_search.svg" />
              </span>
              <input
                type="text"
                data-kt-filemanager-table-filter="search"
                className={`form-control form-control-solid ps-2 pe-14`}
                placeholder={intl.formatMessage({
                  id: "Search",
                })}
              />
            </div>
          </div>
        </div>
        <ApprovalTabs />
        <div className=" px-5 mx-5" style={{ margin: "20px 0px" }}>
          <SystemPagination />
        </div> 
      </div>
    </>
  );
};

export default ApprovalContent;
