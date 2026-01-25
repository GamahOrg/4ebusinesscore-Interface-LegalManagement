import React from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
type PopupProps = {
  show?: boolean;
  handleClose?: () => void;
  session?: any;
};

const EditSessionPopup: React.FC<PopupProps> = ({
  show,
  handleClose,
  session,
}) => {
  const intl = useIntl();
  let theme = localStorage.getItem("Theme");
  let lawyers = [
    { id: "123", name: "محمد احمد", img: "", type: "داخلي" },
    { id: "124", name: "محمد احمد", img: "", type: "داخلي" },
    { id: "125", name: "محمد احمد", img: "", type: "حارجي" },
    { id: "126", name: "محمد احمد", img: "", type: "خارجي" },
    { id: "127", name: "محمد احمد", img: "", type: "خارجي" },
  ];
  let dataEntries = [
    { id: "123", name: "محمد احمد", img: "" },
    { id: "124", name: "محمد احمد", img: "" },
    { id: "125", name: "محمد احمد", img: "" },
    { id: "126", name: "محمد احمد", img: "" },
    { id: "127", name: "محمد احمد", img: "" },
  ];

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
      className={!show ? "inert" : ""}
    >
      <div className="card">
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            <h1>{intl.formatMessage({ id: "EditSessionData" })}</h1>{" "}
          </Modal.Title>
        </Modal.Header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Modal.Body className="px-5 py-4">
            <div className="rounded me-1 ms-3 mt-5">
              <div
                className={`main-container-followLawsuits p-7 bg-${
                  theme == "dark" ? "light" : ""
                }`}
              >
                <h4
                  className={`main-title-lawsuit required text-${
                    theme == "dark" ? "white" : "black"
                  }`}
                >
                  {intl.formatMessage({ id: "SessionData" })}
                </h4>
                <div className="row">
                  <div className="col-md-6 col-sm-12 my-2">
                    <label
                      htmlFor="SessionDate"
                      className="form-label px-2 fontSz-6 required"
                    >
                      {intl.formatMessage({ id: "SessionDate" })}
                    </label>
                    <input
                      id="SessionDate"
                      placeholder={intl.formatMessage({ id: "EnterDate" })}
                      type="date"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 col-sm-12 my-2">
                    <label
                      htmlFor="SessionTime"
                      className="form-label px-2 fontSz-6 required"
                    >
                      {intl.formatMessage({ id: "SessionTime" })}
                    </label>
                    <input
                      id="SessionTime"
                      placeholder={intl.formatMessage({ id: "EnterTime" })}
                      type="time"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 col-sm-12 my-2">
                    <label
                      htmlFor="CompetentCourt"
                      className="form-label px-2 fontSz-6 required"
                    >
                      {intl.formatMessage({ id: "CompetentCourt" })}
                    </label>
                    <div
                      className={`input-group bg-${
                        theme == "dark" ? "light" : "white"
                      }`}
                    >
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="special fas fa-layer-group"></i>
                        </span>
                      </div>
                      <input
                        id="CompetentCourt"
                        type="text"
                        className="form-control"
                        placeholder={intl.formatMessage({ id: "EnterCourt" })}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 my-2">
                    <label
                      htmlFor="Circle"
                      className="form-label px-2 fontSz-6 required"
                    >
                      {intl.formatMessage({ id: "Circle" })}
                    </label>
                    <div
                      className={`input-group bg-${
                        theme == "dark" ? "light" : "white"
                      }`}
                    >
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="special fas fa-layer-group"></i>
                        </span>
                      </div>
                      <input
                        id="Circle"
                        type="text"
                        className="form-control"
                        placeholder={intl.formatMessage({ id: "EnterCircle" })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded me-1 ms-3 mt-5 mb-5">
              <div
                className={`main-container-followLawsuits p-4 bg-${
                  theme == "dark" ? "light" : ""
                }`}
              >
                <h4
                  className={`main-title-lawsuit required mb-3 text-${
                    theme == "dark" ? "white" : "black"
                  }`}
                >
                  {intl.formatMessage({ id: "Assign" })}
                </h4>
                <div className="row">
                  <div className="mb-4 p-3 col-md-6 col-12">
                    <label className="mb-2">
                      {intl.formatMessage({ id: "Lawyers" })}
                    </label>
                    <div
                      className={`border rounded p-3 bg-${
                        theme == "dark" ? "light" : "white"
                      } my-3`}
                    >
                      {lawyers.map((layer) => (
                        <div
                          key={layer?.id}
                          className="d-flex align-items-center mb-2"
                        >
                          <input type="checkbox" className="form-check-input" />

                          <div className="d-flex align-items-center">
                            <div className="text-end">
                              <i className="fa-solid fa-circle-user fs-3 text-primary mx-3"></i>
                              <span className="fw-bold fs-5">
                                {layer?.name}
                              </span>
                              <span className="text-muted ms-2 fs-5">
                                ({layer?.type})
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4 p-3 col-md-6 col-12">
                    <label className="mb-2">
                      {intl.formatMessage({ id: "DataEntries" })}
                    </label>
                    <div
                      className={`border rounded p-3 bg-${
                        theme == "dark" ? "light" : "white"
                      } my-3`}
                    >
                      {dataEntries.map((entrier) => (
                        <div
                          key={entrier?.id}
                          className="d-flex align-items-center mb-2"
                        >
                          <input type="checkbox" className="form-check-input" />

                          <div className="d-flex align-items-center">
                            <div className="text-end">
                              <i className="fa-solid fa-circle-user fs-3 text-primary mx-3"></i>
                              <span className="fw-bold fs-5">
                                {entrier?.name}
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

            <button type="submit" className="btn btn-primary">
              {intl.formatMessage({ id: "Save" })}
            </button>
          </Modal.Footer>
        </form>
      </div>
    </Modal>
  );
};

export default EditSessionPopup;
