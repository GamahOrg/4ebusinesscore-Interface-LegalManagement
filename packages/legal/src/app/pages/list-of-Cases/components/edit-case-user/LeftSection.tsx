import React, { useState } from "react";
import { Col, Button } from "react-bootstrap";
import { useIntl } from "react-intl";
import DiscountPopup2 from "./popup/DiscountPopup2";
import AddClientsPopup from "./popup/EditClientsPopup";
import AddCourtPopup from "./popup/AddCourtPopup";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";

export default function LeftSection() {
  const intl = useIntl();
  const [showDiscountPopup2, setShowDiscountPopup2] = useState(false);
  const [showClientsPopup, setShowClientsPopup] = useState(false);
  const [showCourtPopup, setShowCourtPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);

  return (
    <>
      {/* left section  */}
      <Col lg={6}>
        <div className="rounded-2 mt-15 mb-10 w-100 mx-2 case-document-section-responsive">
          <div className="p-7 bg-gray-100 rounded-2 w-100 case-document-edit-section-style">
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-4 fs-4">
                  {intl.formatMessage({ id: "CaseDocuments" })}
                </h5>
              </div>
              <div>
                {/* Source Clients */}
                <div className="p-5 border border-2 rounded-4 mb-5">
                  <div className="d-flex justify-content-between align-items-center mb-3 border-fix-dark">
                    <div className="d-flex align-items-center w-100">
                      <div className="d-flex align-items-center">
                        <span className="me-2 text-gray-500">
                          {intl.formatMessage({ id: "Source" })}
                        </span>
                        :
                        <span className="ms-2 fw-bolder">
                          {intl.formatMessage({ id: "Clients" })}
                        </span>
                      </div>
                      <Button
                        variant="link"
                        className="p-0 me-auto"
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
                  </div>
                  <div className="d-flex align-items-center mt-3">
                    <div className="d-flex align-items-center w-90 bg-light">
                      <img
                        src={toAbsoluteUrl("/media/img/reports/excel.png")}
                        alt=""
                        className="h-30px me-2"
                      />
                      <span className="fw-bolder">
                        {intl.formatMessage({ id: "Document#1" })}
                      </span>
                      <div className="me-auto">
                        <button className="btn m-0 p-0">
                          <i className="fas fa-download text-primary me-2"></i>
                        </button>
                      </div>
                    </div>
                    <button
                      className="btn m-0 p-0"
                      onClick={() => setShowDeletePopup(true)}
                    >
                      <i className="fas fa-trash text-danger mx-3"></i>
                    </button>
                  </div>

                  <div className="d-flex align-items-center mt-3">
                    <div className="d-flex align-items-center w-90 bg-light">
                      <img
                        src={toAbsoluteUrl("/media/img/reports/pdf.png")}
                        alt=""
                        className="h-30px me-2"
                      />
                      <span className="fw-bolder">
                        {intl.formatMessage({ id: "Document#2" })}
                      </span>
                      <div className="me-auto">
                        <button className="btn m-0 p-0">
                          <i className="fas fa-download text-primary me-2"></i>
                        </button>
                      </div>
                    </div>
                    <button
                      className="btn m-0 p-0"
                      onClick={() => setShowDeletePopup(true)}
                    >
                      <i className="fas fa-trash text-danger mx-3"></i>
                    </button>
                  </div>
                </div>
                {/* Source Opponents */}
                <div className="d-flex justify-content-between align-items-center mb-5 p-5 border border-2 rounded-4">
                  <div className="d-flex align-items-center border-fix-dark">
                    <span className="me-2 text-gray-500">
                      {intl.formatMessage({ id: "Source" })}
                    </span>
                    :
                    <span className="ms-2 fw-bolder">
                      {intl.formatMessage({ id: "Opponents" })}
                    </span>
                  </div>
                  <Button
                    variant="link"
                    className="p-0"
                    onClick={() => setShowDiscountPopup2(true)}
                  >
                    <div
                      className="bg-primary rounded-circle d-flex justify-content-center align-items-center"
                      style={{ width: "30px", height: "30px" }}
                    >
                      <i className="fas fa-plus text-white fs-5"></i>
                    </div>
                  </Button>
                </div>
                {/*  Source TheCourt */}
                <div className="d-flex justify-content-between align-items-center mb-5 p-5 border border-2 rounded-4">
                  <div className="d-flex align-items-center border-fix-dark">
                    <span className="me-2 text-gray-500">
                      {intl.formatMessage({ id: "Source" })}
                    </span>
                    :
                    <span className="ms-2 fw-bolder">
                      {intl.formatMessage({ id: "TheCourt" })}
                    </span>
                  </div>
                  <Button
                    variant="link"
                    className="p-0"
                    onClick={() => setShowCourtPopup(true)}
                  >
                    <div
                      className="bg-primary rounded-circle d-flex justify-content-center align-items-center"
                      style={{ width: "30px", height: "30px" }}
                    >
                      <i className="fas fa-plus text-white fs-5"></i>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
      {/* popups  */}
      <div className="modal fade">
        <DiscountPopup2
          show={showDiscountPopup2}
          handleClose={() => setShowDiscountPopup2(false)}
        />
        <AddClientsPopup
          show={showClientsPopup}
          handleClose={() => setShowClientsPopup(false)}
        />
        <AddCourtPopup
          show={showCourtPopup}
          handleClose={() => setShowCourtPopup(false)}
        />
        <DeletePopup
          showDelete={showDeletePopup}
          handleCloseDelete={() => setShowDeletePopup(false)}
        />
      </div>
    </>
  );
}
