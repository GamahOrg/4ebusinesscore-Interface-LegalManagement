import { useState } from "react";

import { useIntl } from "react-intl";
import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import { Link } from "react-router-dom";

export default function LawsuitDataEdit() {
  const intl = useIntl();
  const [modalDShow, setModalDShow] = useState<boolean>(false);

  return (
    <>
      <GenericToolbar
        list={[
          { key: "ListOfClaims", value: "/list-of-claims" },
          { key: "ViewLawsuit", value: "" },
        ]}
      />
      <div className="card card-xl-stretch mb-xl-8">
        <div className="card-Systems-Header d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column mt-5">
            <h1 className="text-right">
              <span className="fs-2 mt-3 mb-1">
                {intl.formatMessage({ id: "ViewLawsuit" })}
              </span>
            </h1>
            <h1 className="card-title">
              <span className="fw-semibold fs-6 text-muted">
                {intl.formatMessage({
                  id: "WeShowYouAllTheDataOfTheReceivedClaim",
                })}
              </span>
            </h1>
          </div>

          <div className="d-flex justify-content-between">
            <button
              className="btn border-0 text-danger mx-3 p-0"
              onClick={() => setModalDShow(true)}
            >
              <i className="fas fa-trash fs-4"></i>
            </button>
            <Link to="/edit-incoming-claim">
              <button className="btn btn-primary">
                <i className="fas fa-pen mx-2 fs-4"></i>
                {intl.formatMessage({ id: "Edit" })}
              </button>
            </Link>
          </div>
        </div>
        <div>
          <div className="main-container-followLawsuits p-7">
            <h4 className="main-title-lawsuit">
              {intl.formatMessage({ id: "Lawist" })}
            </h4>

            <div className="d-flex flex-column w-70 mt-3">
              <div className="row">
                <div className="col-12 mb-3">
                  <div className="row">
                    <div className="col-4">
                      <div className="d-flex align-items-center">
                        <p className="text-gray-400 mb-0">
                          {intl.formatMessage({ id: "CaseNumber" })}
                        </p>
                        <span className="ms-2 me-2 align-middle">:</span>
                        <p className="lawsuit-text-left mb-0">746578345</p>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="d-flex align-items-center">
                        <p className="text-gray-400 mb-0">
                          {intl.formatMessage({ id: "DateOfTheCase" })}
                        </p>
                        <span className="ms-2 me-2 align-middle">:</span>
                        <p className="lawsuit-text-left mb-0">23/8/2024</p>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="d-flex align-items-center">
                        <p className="text-gray-400 mb-0">
                          {intl.formatMessage({ id: "Gender" })}
                        </p>
                        <span className="ms-2 me-2 align-middle">:</span>
                        <p className="lawsuit-text-left mb-0">
                          {intl.formatMessage({ id: "administrative" })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="row">
                    <div className="col-4">
                      <div className="d-flex align-items-center">
                        <p className="text-gray-400 mb-0">
                          {intl.formatMessage({ id: "TheCourt" })}
                        </p>
                        <span className="ms-2 me-2 align-middle">:</span>
                        <p className="lawsuit-text-left mb-0">
                          {intl.formatMessage({ id: "Alia" })}
                        </p>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="d-flex align-items-center">
                        <p className="text-gray-400 mb-0">
                          {intl.formatMessage({ id: "TheCircle" })}
                        </p>
                        <span className="ms-2 me-2 align-middle">:</span>
                        <p className="lawsuit-text-left mb-0">
                          {intl.formatMessage({ id: "Fifteen" })}
                        </p>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="d-flex align-items-center">
                        <p className="text-gray-400 mb-0">
                          {intl.formatMessage({ id: "TypeOfLawsuit" })}
                        </p>
                        <span className="ms-2 me-2 align-middle">:</span>
                        <p className="lawsuit-text-left mb-0">
                          {intl.formatMessage({
                            id: "ObjectionToAnAdministrativeDecision",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 mb-9">
              <p className="text-gray-400">
                {intl.formatMessage({ id: "SubjectOfTheLawsuit" })}
              </p>
              <p className="lawsuit-text-left">
                {intl.formatMessage({ id: "paragraphOfLawsuit" })}
              </p>
            </div>
          </div>

          <div className="main-container-followLawsuits mb-9 mt-6 p-7">
            <h4 className="main-title-lawsuit">
              {intl.formatMessage({ id: "Defendant2" })}
            </h4>

            <div className="d-flex mb-6 mt-3">
              <p className="text-gray-400 mb-0">
                {intl.formatMessage({ id: "DefendantName2" })}
              </p>
              <span className="ms-2 me-2 align-middle">:</span>
              <p className="lawsuit-text-left mb-0">
                {intl.formatMessage({ id: "AbdullahFaisalAlGhamdi" })}
              </p>
            </div>
          </div>
          <div className="main-container-followLawsuits mb-9 mt-6 p-7">
            <h4 className="main-title-lawsuit">
              {intl.formatMessage({ id: "Imputation" })}
            </h4>

            <div className="d-flex mb-6 mt-3">
              <p className="text-gray-400 mb-0">
                {intl.formatMessage({ id: "ResponsibleOfficer" })}
              </p>
              <span className="ms-2 me-2 align-middle">:</span>
              <p className="lawsuit-text-left mb-0">
                {intl.formatMessage({ id: "AbdulazizAlNasr" })}
              </p>
            </div>
          </div>
          <div className="main-container-followLawsuits mb-9 mt-6 p-7">
            <h4 className="main-title-lawsuit">
              {intl.formatMessage({ id: "Session" })}
            </h4>
            <div className="d-flex flex-column w-70 mt-3">
              <div className="row">
                <div className="col-12 mb-3">
                  <div className="row">
                    <div className="col-4">
                      <div className="d-flex align-items-center">
                        <p className="text-gray-400 mb-0">
                          {intl.formatMessage({ id: "SessionDate" })}
                        </p>
                        <span className="ms-2 me-2 align-middle">:</span>
                        <p className="lawsuit-text-left mb-0">23/8/2024</p>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="d-flex align-items-center">
                        <p className="text-gray-400 mb-0">
                          {intl.formatMessage({ id: "SessionDay" })}
                        </p>
                        <span className="ms-2 me-2 align-middle">:</span>
                        <p className="lawsuit-text-left mb-0">
                          {intl.formatMessage({ id: "Wednesday" })}
                        </p>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="d-flex align-items-center">
                        <p className="text-gray-400 mb-0">
                          {intl.formatMessage({ id: "SessionTime" })}
                        </p>
                        <span className="ms-2 me-2 align-middle">:</span>
                        <p className="lawsuit-text-left mb-0">1:20</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade">
        <DeletePopup
          handleCloseDelete={() => setModalDShow(false)}
          showDelete={modalDShow}
        />
      </div>
    </>
  );
}
