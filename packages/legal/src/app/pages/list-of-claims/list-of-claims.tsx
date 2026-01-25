import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import { SystemPagination } from "@4eplatform/shared/src/popups/SystemPagination";
import FilterApplicantRequestPopup from "./popups/FilterApplicantRequestPopup";
import FilterApplicantRequestPopup2 from "./popups/FilterApplicantRequestPopup2";
import IncomingClaims from "./components/IncomingClaims";
import IssuedLawsuits from "./components/IssuedLawsuits";

type ButtonTypes = {
  id: number;
  name: string;
};

const ListOfClaims: FC = () => {
  const intl = useIntl();

  const [activeButton, setActiveButton] = useState<ButtonTypes>({
    id: 1,
    name: "IssuedLawsuits",
  });

  const [show, setShow] = useState(false);

  const buttons: ButtonTypes[] = [
    { id: 1, name: "IssuedLawsuits" },
    { id: 2, name: "IncomingClaims" },
  ];

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleButtonClick = (button: ButtonTypes) => setActiveButton(button);

  const renderActiveTab = () => {
    switch (activeButton.id) {
      case 1:
        return <IssuedLawsuits />;
      case 2:
        return <IncomingClaims />;
      default:
        return null;
    }
  };

  const renderFilterPopup = () => {
    if (activeButton.id === 1) {
      return (
        <FilterApplicantRequestPopup
          handleClose={handleClose}
          show={show}
          activeButtonId={activeButton.id}
        />
      );
    }
    if (activeButton.id === 2) {
      return (
        <FilterApplicantRequestPopup2
          handleClose={handleClose}
          show={show}
          activeButtonId={activeButton.id}
        />
      );
    }
    return null;
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <GenericToolbar list={[{ key: "ListOfClaims", value: "" }]} />
        <div className="toolbar"></div>
      </div>

      <div className="card card-xl-stretch mb-xl-8">
        <div className="card-Systems-Header d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column mt-5 col-md-6">
            <h1 className="text-right">
              <span className="fs-2 mt-3 mb-1">
                {intl.formatMessage({ id: "ListOfClaims" })}
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
          <div className="d-flex">
            <div className="d-flex align-items-centecr justify-content-end  py-3 py-md-1">
              <div className="d-flex align-items-center position-relative w-300px">
                <span className="svg-icon svg-icon-1 position-absolute text-muted mx-3">
                  <KTSVG path="/media/icons/duotune/general/gen114_search.svg" />
                </span>
                <input
                  type="text"
                  data-kt-filemanager-table-filter="search"
                  className="form-control form-control-solid px-11"
                  placeholder={intl.formatMessage({ id: "Search" })}
                />
              </div>
            </div>
            <div className="mt-1">
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
              </button>{" "}
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex">
            <div className="card-Systems-Header pb-0 w-100 d-flex gap-6 mb-5">
              {renderFilterPopup()}
              {buttons.map((button) => (
                <button
                  key={button.id}
                  className={`btn btn-active-color-primary rounded-0 bg-transparent border-0 p-5 fs-6 fw-bolder border border-bottom border-white border-2 ${
                    activeButton.id === button.id
                      ? "active text-dark"
                      : "text-muted"
                  }`}
                  onClick={() => handleButtonClick(button)}
                >
                  {intl.formatMessage({ id: button.name })}
                </button>
              ))}
            </div>
          </div>
          {renderActiveTab()}
        </div>
        <div className="px-5 mx-5" style={{ margin: "20px 0px" }}>
          <SystemPagination />
        </div>
      </div>
    </>
  );
};

export default ListOfClaims;
