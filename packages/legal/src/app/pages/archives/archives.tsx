import { FC, useState } from "react";
import { useIntl } from "react-intl";

import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import { SystemPagination } from "@4eplatform/shared/src/popups/SystemPagination";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { useLocation } from "react-router";
import FilterApplicantRequestPopup from "./popups/FilterApplicantRequestPopup";
import IncomingClaims from "./components/IncomingClaims";
import IssuedLawsuits from "./components/IssuedLawsuits";
import FilterApplicantRequestPopup2 from "./popups/FilterApplicantRequestPopup2";

const Archives: FC = () => {
  const intl = useIntl();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [activeButtonId, setActiveButtonId] = useState<number>(1);

  const buttons: any = [
    {
      id: 1,
      name: "IssuedLawsuits",
    },
    {
      id: 2,
      name: "IncomingClaims",
    },
  ];

  const [activeButton, setActiveButton] = useState<any>(buttons[0]);

  const handleButtonClick = (button: any) => {
    setActiveButton(button);
    setActiveButtonId(button.id);
  };

  const ActivatedUserDetailsTab = () => {
    switch (activeButton.id) {
      case 1:
        return (
          <>
            <IncomingClaims />
            <FilterApplicantRequestPopup
              handleClose={handleClose}
              show={show}
              activeButtonId={activeButtonId}
            />
          </>
        );
      case 2:
        return (
          <>
            <IssuedLawsuits />
            <FilterApplicantRequestPopup2
              handleClose={handleClose}
              show={show}
              activeButtonId={activeButtonId}
              options={[]}
              selectedOptions={[]}
              setSelectedOptions={function (
                options: { id: number; name: string }[]
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <GenericToolbar list={[{ key: "Archives", value: "" }]} />
      <div className="card card-xl-stretch mb-xl-8">
        <div className="card-Systems-Header d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column">
            <h1 className="text-right">
              <span className="fs-2 mt-3 mb-1">
                {intl.formatMessage({ id: "Archives" })}
              </span>
            </h1>
            <h1 className="card-title">
              <span className="fw-semibold fs-6 text-muted">
                {intl.formatMessage({ id: "WeShowYouAllArchivedClaims" })}
              </span>
            </h1>
          </div>
          <div className="d-flex align-items-center">
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
            <div className="me-4">
              <button
                className="btn d-flex justify-content-center align-items-center btn-secondary btn-flex fw-bolder"
                style={{ color: "#3f4254" }}
                onClick={(event) => {
                  event.preventDefault();
                  handleShow();
                }}
              >
                <span className="svg-icon svg-icon-5 svg-icon-gray-500 me-1">
                  <KTSVG
                    path="/media/icons/duotune/general/gen107_filter.svg"
                    className="svg-icon-4 me-1"
                  />
                </span>
                {intl.formatMessage({ id: "Filtering" })}
              </button>
            </div>
            {activeButton.id === 1 ? (
              <FilterApplicantRequestPopup
                handleClose={handleClose}
                show={show}
                activeButtonId={activeButtonId}
              />
            ) : (
              <FilterApplicantRequestPopup2
                handleClose={handleClose}
                show={show}
                activeButtonId={activeButtonId}
                options={[]}
                selectedOptions={[]}
                setSelectedOptions={function (
                  options: { id: number; name: string }[]
                ): void {
                  throw new Error("Function not implemented.");
                }}
              />
            )}
          </div>
        </div>
        <div>
          <>
            <div className="d-flex">
              <div className="card-Systems-Header pb-0 w-100 d-flex gap-6 mb-5">
                {buttons.map((button: any) => (
                  <button
                    key={button.id}
                    className={`btn btn-active-color-primary rounded-0 bg-transparent border-0 p-5 fs-6 fw-bolder border border-bottom border-white border-2 ${
                      activeButton.id === button.id
                        ? "active text-dark"
                        : "text-muted"
                    } rounded-0 px-0 fw-bolder`}
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
          </>
        </div>
        <div className="px-5 mx-5" style={{ margin: "20px 0px" }}>
          <SystemPagination />
        </div>
      </div>
    </>
  );
};

export default Archives;
