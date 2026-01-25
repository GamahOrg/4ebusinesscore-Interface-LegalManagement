import React, { useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import MultiCheckBoxDropDown from "@4eplatform/gateway/src/app/partials/layout/MultiCheckBoxDropDown";

type PopupProps = {
  show?: any;
  handleClose?: any;
};
const FilterPopup: React.FC<PopupProps> = ({ show, handleClose }) => {
  const intl = useIntl();
  const [Section, setSection] = useState([]);
  const sectionsOptions = [
    {
      id: 1,
      name: intl.formatMessage({ id: "Drafts" }),
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "InTrack" }),
    },
    {
      id: 3,
      name: intl.formatMessage({ id: "Rejected" }),
    },
    {
      id: 4,
      name: intl.formatMessage({ id: "Agreement" }),
    },
  ];
  return (
    <>
      <div className="modal-dialog">
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={handleClose}
        >
          <div className="card">
            <Modal.Header
              closeButton
              style={{
                alignItems: intl.locale == "ar" ? "flex-start" : "center",
                flexDirection: intl.locale == "en" ? "column-reverse" : "row",
              }}
            >
              <div className="card-header w-100 px-1 d-flex justify-content-center pb-2  border-bottom-0 mt-10">
                <Modal.Title>
                  <div className="mb-9 text-center">
                    <h1 className="mb-3">
                      {intl.formatMessage({ id: "DataFiltering" })}
                    </h1>
                    <h6 className="mb-2 text-muted">
                      {intl.formatMessage({
                        id: "PleaseChooseDataClassification",
                      })}
                    </h6>
                  </div>
                </Modal.Title>
              </div>
            </Modal.Header>

            <form
              className="d-block w-100"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {" "}
              <Modal.Body>
                <div className="row w-100 mb-3">
                  <div className="col-sm-6 col-12">
                    <div className="mb-2 pt-2 pb-3 ">
                      <label
                        htmlFor="title"
                        className="form-label px-2 fontSz-6"
                      >
                        {intl.formatMessage({
                          id: "StudyClaimNumber",
                        })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa-solid fa-file"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          id="title"
                          placeholder={intl.formatMessage({
                            id: "StudyClaimNumber",
                          })}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6 col-12">
                    <div className="mb-2 pt-2 pb-3 ">
                      <label
                        htmlFor="title"
                        className="form-label px-2 fontSz-6"
                      >
                        {intl.formatMessage({
                          id: "TheCreatorOfTheCall",
                        })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa-solid fa-user"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          id="title"
                          placeholder={intl.formatMessage({
                            id: "TheCreatorOfTheCall",
                          })}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-sm-6 col-12">
                    <div className="mb-2 pt-2 pb-3 ">
                      <label
                        htmlFor="Defendant"
                        className="form-label px-2 fontSz-6"
                      >
                        {intl.formatMessage({
                          id: "Defendant",
                        })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa-solid fa-user"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          id="title"
                          placeholder={intl.formatMessage({
                            id: "Defendant",
                          })}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-12">
                    <div className="mb-2 pt-2 pb-3 ">
                      <label
                        htmlFor="title"
                        className="form-label px-2 fontSz-6"
                      >
                        {intl.formatMessage({
                          id: "Status",
                        })}
                      </label>
                      <div className="input-group">
                        <div style={{ width: "100%" }}>
                          <MultiCheckBoxDropDown
                            selectedOptions={Section}
                            setSelectedOptions={setSection}
                            options={sectionsOptions}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6 col-12">
                    <div className="mb-2 pt-2 pb-3 ">
                      <label
                        htmlFor="date"
                        className="form-label px-2 fontSz-6"
                      >
                        {intl.formatMessage({
                          id: "From",
                        })}
                      </label>
                      <input
                        type="date"
                        id="date"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-2 "
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-12">
                    <div className="mb-2 pt-2 pb-3 ">
                      <label
                        htmlFor="date"
                        className="form-label px-2 fontSz-6"
                      >
                        {intl.formatMessage({
                          id: "To",
                        })}
                      </label>
                      <input
                        type="date"
                        id="date"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-2 "
                      />
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className="justify-content-center py-2">
                <div className="mt-5 mb-5 col-12 col-lg-8 mx-auto">
                  <div className="outputCard card-diff-toolbar pt-5 w-100 mt-3 d-flex justify-content-center">
                    <div className="d-flex justify-content-center align-items-center w-50">
                      <div
                        onClick={handleClose}
                        className="btn btn-secondary mx-3 text-center w-100"
                      >
                        {intl.formatMessage({ id: "Cancel" })}
                      </div>
                      <button
                        type="button"
                        data-bs-dismiss="modal"
                        className="btn btn-success mx-3 text-center w-100"
                        style={{ border: "none" }}
                        onClick={() => {
                          handleClose();
                        }}
                      >
                        {intl.formatMessage({ id: "Agree" })}
                      </button>
                    </div>
                  </div>
                </div>
              </Modal.Footer>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default FilterPopup;
