import { FC, useState } from "react";
import { useIntl } from "react-intl";

import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import FilterApplicantRequestPopup2 from "./propus/FilterApplicantRequestPopup2";
import { SystemPagination } from "@4eplatform/shared/src/popups/SystemPagination";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { Link } from "react-router-dom";
import OutgoingClaims from "./components/OutgoingClaims";
import IncomingClaims from "./components/IncomingClaims";

type ButtonTypes = {
  id: number;
  name: string;
};
type Props = {
  activeButtonId: number;
  setActiveButtonId: (id: number) => void;
};

const MyClaims: FC = () => {
  const intl = useIntl();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [activeButtonId, setActiveButtonId] = useState<number>(1);

  const buttons: ButtonTypes[] = [
    {
      id: 1,
      name: "IssuedLawsuits",
    },
    {
      id: 2,
      name: "IncomingClaims",
    },
  ];

  const [activeButton, setActiveButton] = useState<ButtonTypes>(buttons[0]);

  const handleButtonClick = (button: ButtonTypes) => {
    setActiveButton(button);
    setActiveButtonId(button.id);
  };
  const ActivatedUserDetailsTab = () => {
    switch (activeButton.id) {
      case 1:
        return <OutgoingClaims />;
      case 2:
        return <IncomingClaims />;
    }
  };
  return (
    <>
      <div className="d-flex justify-content-between">
        {" "}
        <GenericToolbar list={[{ key: "MyClaims", value: "" }]} />
        <div className="d-flex align-items-center py-3 py-md-1 gap-3">
          <div className="d-flex align-items-center py-3 py-md-1">
            <div className="toolbar">
              <a
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
              </a>
              <Link to="/add-lawsuit" className="btn btn-light">
                {intl.formatMessage({ id: "AddLawsuit" })}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="card card-xl-stretch mb-xl-8">
        <div className="card-Systems-Header d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column mt-5">
            <h1 className="text-right">
              <span className="fs-2 mt-3 mb-1">
                {intl.formatMessage({ id: "MyClaims" })}
              </span>
            </h1>
            <h1 className="card-title">
              <span className="fw-semibold fs-6 text-muted">
                {intl.formatMessage({
                  id: "WeShowYouAllTheClaimsThatHaveBeenAdded",
                })}
              </span>
            </h1>
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
            <FilterApplicantRequestPopup2
              handleClose={handleClose}
              show={show}
              activeButtonId={activeButtonId}
            />
          </div>
        </div>
        <div>
          <div className="d-flex">
            <div className="card-Systems-Header pb-0 w-100 d-flex gap-6 mb-5">
              {buttons.map((button) => (
                <button
                  key={button.id}
                  className={`btn  btn-active-color-primary rounded-0 bg-transparent border-0 p-5 fs-6  fw-bolder  border border-bottom border-white border-2 ${
                    activeButton.id === button.id
                      ? "active text-dark"
                      : "text-muted"
                  }   rounded-0 px-0 fw-bolder`}
                  onClick={() => handleButtonClick(button)}
                >
                  {intl.formatMessage({
                    id: button.name,
                  })}
                </button>
              ))}
            </div>
          </div>
          {ActivatedUserDetailsTab()}
        </div>
        <div className="px-5 mx-5" style={{ margin: "20px 0px" }}>
          <SystemPagination />
        </div>
      </div>
    </>
  );
};
export default MyClaims;
