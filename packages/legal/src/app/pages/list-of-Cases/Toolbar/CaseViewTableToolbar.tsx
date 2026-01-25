import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import FilterCasesPopup from "../popups/FilterCasesPopup";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { useLocation } from "react-router-dom";

type PopupProps = {
  setFilter?: any;
  filter?: any;
  setPageIndex?: any;
  pageSize?: any;
  pageIndex?: any;
  setCauses?: any;
  searchTerm?: any;
  clientTypiesFilter?: any;
  isConsultive?:any;
  isLawyerToTakeAction?:any;
  isDataEntry?:any;
  isOwnerOrSuperVisor?:any;

};
const CaseViewTableToolbar: FC<PopupProps> = ({
  setFilter,
  filter,
  setPageIndex,
  pageSize,
  pageIndex,
  setCauses,
  searchTerm,
  clientTypiesFilter,
  isConsultive,
  isLawyerToTakeAction,
  isDataEntry,
  isOwnerOrSuperVisor,

}) => {
  const intl = useIntl();
  const [showFilter, setShowFilter] = useState(false);
  const location = useLocation();
  let cardName = location?.state?.cardTitle;
  let cardId = location?.state?.cardId;
  let partTitle = location?.state?.partTitle || location?.state?.extraState;
  let serviceName = location?.state?.serviceName;

  const breadcrumbItems = [
    {
      path: "",
      defaultName: "ListOfCases",
      name: cardName || serviceName,
    },
  ];

  return (
    <div className="toolbar" id="kt_toolbar">
      <div
        id="kt_toolbar_container"
        className="container-xxl d-flex flex-stack flex-wrap p-0"
      >
        <DynamicToolbar
          defaultTitle={"ListOfCases"}
          extraTitle={""}
          breadcrumbItems={breadcrumbItems}
          showWorkspace={true}
          cardId={cardId}
          cardOption={cardName || serviceName}
          extraState={partTitle}
        />

        <div className="d-flex align-items-center py-3 py-md-1 gap-3">
          <div className="d-flex align-items-center py-3 py-md-1">
            <div className="toolbar">
              <Link
                className="btn btn-custom btn-active-white btn-flex btn-color-white btn-active-color-primary fw-bolder me-3"
                data-kt-menu-trigger="click"
                data-kt-menu-placement="bottom-end"
                onClick={() => setShowFilter(true)}
                to={""}
              >
                <span className="svg-icon svg-icon-5 svg-icon-gray-500 me-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                {intl.formatMessage({ id: "Filtering" })}
              </Link>
              {  (isOwnerOrSuperVisor || isDataEntry)  && (
              <Link to="/cases-view/add-case-user" className="btn btn-light">
                {intl.formatMessage({ id: "AddCase" })}
              </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <FilterCasesPopup
        show={showFilter}
        handleClose={() => setShowFilter(false)}
        setFilter={setFilter}
        filter={filter}
        setPageIndex={setPageIndex}
        pageSize={pageSize}
        pageIndex={pageIndex}
        setCauses={setCauses}
        searchTerm={searchTerm}
        clientTypiesFilter={clientTypiesFilter}
      />
    </div>
  );
};

export default CaseViewTableToolbar;
