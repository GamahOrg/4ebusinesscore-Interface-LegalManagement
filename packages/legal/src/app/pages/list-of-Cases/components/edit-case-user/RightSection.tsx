import React, { useState } from "react";
import { Col, Button } from "react-bootstrap";
import { useIntl } from "react-intl";
import DiscountPopup from "./popup/DiscountPopup";
import AddClientsPopup from "./popup/EditClientsPopup";
import ModifyClientsPopup from "./popup/ModifyClientsPopup";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import EditMultiselectClientsPopup from "./popup/EditMultiselectClientsPopup";
export default function RightSection() {
  const intl = useIntl();
  const [showDiscountPopup, setShowDiscountPopup] = useState(false);
  const [showClientsPopup, setShowClientsPopup] = useState(false);
  const [showModifyClientsPopup, setShowModifyClientsPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("Claimant");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  return (
    <>
      {/* right section  */}
      <Col lg={6}>
        <div className="rounded-2 mt-15 mb-5 w-100 mx-2">
          <div className="p-7 bg-gray-100 rounded-2 w-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0 fs-4">
                {intl.formatMessage({ id: "Clients" })}
                <span className="text-danger mx-2">*</span>
              </h5>
              <Button
                variant="link"
                className="p-0"
                onClick={() => setShowClientsPopup(true)}
              >
                <div
                  className="bg-primary rounded-circle d-flex justify-content-center align-items-center"
                  style={{ width: "30px", height: "30px" }}
                >
                  <i className="fas fa-plus text-white fs-5"></i>
                </div>
              </Button>
            </div>
            <div className="card mb-4">
              <div className="d-flex justify-content-between align-items-center p-5 border-fix-dark">
                <span className="fw-bolder">
                  {intl.formatMessage({
                    id: "GeneralAuthorityForRealEstate",
                  })}
                </span>
              </div>
            </div>
            {/*   SaudiNationalAuthority  */}
            <div className="card mb-4">
              <div className="d-flex justify-content-between align-items-center p-5 border-fix-dark">
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="fw-bolder">
                      {intl.formatMessage({ id: "SaudiNationalAuthority" })}
                    </span>
                    <div>
                      <button
                        className="btn m-0 p-0"
                        onClick={() => setShowDeletePopup(true)}
                      >
                        <i className="fas fa-trash text-danger"></i>
                      </button>
                      <button
                        className="btn m-0 p-0"
                        onClick={() => setShowModifyClientsPopup(true)}
                      >
                        <i className="fas fa-pen text-primary mx-3"></i>
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">
                      {intl.formatMessage({ id: "LicenseNumber" })}
                      <span className="mx-1">:</span>
                    </span>

                    <span className="fw-bolder mx-2">4857698457</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="d-flex justify-content-between align-items-center p-5 border-fix-dark">
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="fw-bolder">
                      {intl.formatMessage({ id: "AbdulrahmanFahd" })}
                    </span>
                    <div>
                      <button
                        className="btn m-0 p-0"
                        onClick={() => setShowDeletePopup(true)}
                      >
                        <i className="fas fa-trash text-danger"></i>
                      </button>
                      <button
                        className="btn m-0 p-0"
                        onClick={() => setShowModifyClientsPopup(true)}
                      >
                        <i className="fas fa-pen text-primary mx-3"></i>
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">
                      {intl.formatMessage({ id: "NumberOfResidentID" })}
                      <span className="mx-1">:</span>
                    </span>
                    <span className="fw-bolder mx-2">8759687548</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ClientsStatus  */}
        <div className="p-7 bg-gray-100 rounded-2 w-100 mx-2 rounded-2 mb-5">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-4 fs-4">
              {intl.formatMessage({ id: "ClientsStatus" })}
              <span className="text-danger mx-2">*</span>
            </h5>
          </div>
          <div className="card">
            <div className="d-flex border-fix-dark rounded  p-2 gap-3">
              <div className="d-flex justify-content-start gap-1">
                <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                  <input
                    className="form-check-input widget-9-radio xRadioBg"
                    type="radio"
                    name="authority"
                    id="lawyers"
                    checked={selectedOption === "lawyers"}
                    onChange={() => setSelectedOption("lawyers")}
                  />
                </div>
                <label className="fs-6" htmlFor="lawyers">
                  {intl.formatMessage({ id: "Claimant" })}
                </label>
              </div>
              <div className="d-flex justify-content-start gap-1">
                <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                  <input
                    className="form-check-input widget-9-radio xRadioBg"
                    type="radio"
                    name="authority"
                    id="dayManager"
                    checked={selectedOption === "dayManager"}
                    onChange={() => setSelectedOption("dayManager")}
                  />
                </div>
                <label className="fs-6" htmlFor="dayManager">
                  {intl.formatMessage({ id: "Respondent" })}
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Opponents */}
        <div className="p-7 bg-gray-100 rounded-2 w-100 mx-2 rounded-2">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 fs-4">
              {intl.formatMessage({ id: "Opponents" })}
              <span className="text-danger mx-2">*</span>
            </h5>
            <Button
              variant="link"
              className="p-0"
              onClick={() => setShowDiscountPopup(true)}
            >
              <div
                className="bg-primary rounded-circle d-flex justify-content-center align-items-center"
                style={{ width: "30px", height: "30px" }}
              >
                <i className="fas fa-plus text-white fs-5"></i>
              </div>
            </Button>
          </div>
          <div className="card mb-4">
            <div className="d-flex justify-content-between align-items-center p-5 border-fix-dark">
              <div className="w-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="fw-bolder">
                    {intl.formatMessage({ id: "SaudiMediaAuthority" })}
                  </span>
                  <div>
                    <button
                      className="btn m-0 p-0"
                      onClick={() => setShowDeletePopup(true)}
                    >
                      <i className="fas fa-trash text-danger"></i>
                    </button>
                    <button
                      className="btn m-0 p-0"
                      onClick={() => setShowModifyClientsPopup(true)}
                    >
                      <i className="fas fa-pen text-primary mx-3"></i>
                    </button>
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">
                    {intl.formatMessage({ id: "LicenseNumber" })}
                    <span className="mx-1">:</span>
                  </span>
                  <span className="fw-bolder">4857698457</span>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="d-flex justify-content-between align-items-center p-5 border-fix-dark">
              <div className="w-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="fw-bolder">
                    {intl.formatMessage({ id: "NationalCompany" })}
                  </span>
                  <div>
                    <button
                      className="btn m-0 p-0"
                      onClick={() => setShowDeletePopup(true)}
                    >
                      <i className="fas fa-trash text-danger"></i>
                    </button>
                    <button
                      className="btn m-0 p-0"
                      onClick={() => setShowModifyClientsPopup(true)}
                    >
                      <i className="fas fa-pen text-primary mx-3"></i>
                    </button>
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">
                    {" "}
                    {intl.formatMessage({ id: "CommercialRegistration" })}{" "}
                    <span className="mx-1">:</span>
                  </span>
                  <span className="fw-bolder">8759687548</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
      {/* popups  */}
      <div className="modal fade">
        <DiscountPopup
          show={showDiscountPopup}
          handleClose={() => setShowDiscountPopup(false)}
        />
        <EditMultiselectClientsPopup
          show={showClientsPopup}
          handleClose={() => setShowClientsPopup(false)}
        />
        <ModifyClientsPopup
          show={showModifyClientsPopup}
          handleClose={() => setShowModifyClientsPopup(false)}
        />
        <DeletePopup
          showDelete={showDeletePopup}
          handleCloseDelete={() => setShowDeletePopup(false)}
        />
      </div>
    </>
  );
}
