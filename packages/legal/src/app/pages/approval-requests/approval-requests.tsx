import { FC, useState } from "react";

import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import ApprovalContent from "./approval-content";
import FilterApplicantRequestPopup from "./propus/FilterApplicantRequestPopup";
import { useIntl } from "react-intl";

const ApprovalRequests: FC = () => {
  const intl = useIntl();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="d-flex w-100 align-items-center justify-content-between py-3 py-md-1 gap-3">
        <GenericToolbar list={[{ key: "ApprovalRequests", value: "" }]} />
        <div className="d-flex align-items-center jus py-3 py-md-1">
          <div className="toolbar">
            <span
              className="btn btn-custom btn-active-white btn-flex btn-color-white btn-active-color-primary fw-bolder me-3"
              data-kt-menu-trigger="click"
              data-kt-menu-placement="bottom-end"
              onClick={(event) => {
                event.preventDefault();
                handleShow();
              }}
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
            </span>
          </div>
        </div>
      </div>
      <ApprovalContent />

      <FilterApplicantRequestPopup handleClose={handleClose} show={show} />
    </>
  );
};
export default ApprovalRequests;
