import React from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { RootState, useAppSelector } from "../../../store/store";

type PopupProps = {
  show?: boolean;
  handleClose?: () => void;
  lawyers: any;
  dataEntryOperators: any;
};

const AddAssigneePopup: React.FC<PopupProps> = ({
  show,
  handleClose,
  lawyers,
  dataEntryOperators,
}) => {
  const intl = useIntl();

  let theme = localStorage.getItem("Theme");

  const { sessionById: session } = useAppSelector(
    (state: RootState) => state.session
  );

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      className={!show ? "inert" : ""}
      onHide={handleClose}
    >
      <div className="card">
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            <h1>{intl.formatMessage({ id: "Assign" })}</h1>{" "}
          </Modal.Title>
        </Modal.Header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Modal.Body className="px-5 py-4">
            <div className="rounded me-1 ms-3 mt-5 mb-5">
              <div
                className={`main-container-followLawsuits p-4 bg-${
                  theme === "dark" ? "light" : "white"
                }`}
              >
                <h4
                  className={`main-title-lawsuit required mb-3 text-${
                    theme === "dark" ? "white" : "black"
                  }`}
                >
                  {intl.formatMessage({ id: "Assign" })}
                </h4>
                <div className="row">
                  <div className="mb-4 p-3 col-lg-6 col-sm-12">
                    <label className="mb-2">
                      {intl.formatMessage({ id: "Lawyers" })}
                    </label>
                    <div
                      className={`border rounded p-3 bg-${
                        theme === "dark" ? "light" : "white"
                      } my-3 pb-3`}
                    >
                      {lawyers.map((lawyer) => (
                        <div
                          key={lawyer?.userId}
                          className="d-flex align-items-center mb-2"
                        >
                          <input type="checkbox" className="form-check-input" />

                          <div className="d-flex align-items-center">
                            <div className="text-end">
                              <i className="fa-solid fa-circle-user fs-3 text-primary mx-3"></i>
                              <span className="fw-bold fs-5">
                                {lawyer?.userName}
                              </span>
                              {/* <span className="text-muted ms-2 fs-5">
                                ({layer?.type})
                              </span> */}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4 p-3 col-lg-6 col-sm-12">
                    <label className="mb-2">
                      {intl.formatMessage({ id: "DataEntries" })}
                    </label>
                    <div
                      className={`border rounded p-3 bg-${
                        theme === "dark" ? "light" : "white"
                      } my-3 pb-3`}
                    >
                      {dataEntryOperators?.map((entrier) => (
                        <div
                          key={entrier?.useId}
                          className="d-flex align-items-center mb-2"
                        >
                          <input type="checkbox" className="form-check-input" />

                          <div className="d-flex align-items-center">
                            <div className="text-end">
                              <i className="fa-solid fa-circle-user fs-3 text-primary mx-3"></i>
                              <span className="fw-bold fs-5">
                                {entrier?.userName}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer className="d-flex justify-content-end px-5 pb-4 mb-5">
            <div className="me-3 btn btn-secondary" onClick={handleClose}>
              {intl.formatMessage({ id: "Cancel" })}
            </div>
            <button className="btn btn-success" type="submit">
              {intl.formatMessage({ id: "Add" })}
            </button>
          </Modal.Footer>
        </form>
      </div>
    </Modal>
  );
};

export default AddAssigneePopup;
