import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { EmployeeHierarchyPopup } from "@4eplatform/shared/src/popups/EmployeeHierarchyPopup";
import MultiCheckBoxDropDown from "@4eplatform/gateway/src/app/partials/layout/MultiCheckBoxDropDown";


type Option = {
  id: number;
  name: string;
};
type AddPopupProps = {
  show?: any;
  handleClose?: any;
};
type Props = {
  activeButtonId: number;
};

const FilterApplicantRequestPopup: React.FC<AddPopupProps & Props> = ({
  show,
  handleClose,
  activeButtonId,
}) => {
  const intl = useIntl();

  
  const courtOptions: Option[] = [
    { id: 1, name: intl.formatMessage({ id: "ElementaryCourt" }) },
    { id: 2, name: intl.formatMessage({ id: "Alia" }) },
    { id: 3, name: intl.formatMessage({ id: "Appeal" }) },
  ];

  const showSuccessAlert = () => {
    Swal.fire({
      timer: 2000,
      text: intl.formatMessage({ id: "SavedSuccessfully" }),
      icon: "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
  };

  // State variables for input fields
  const [caseNumber, setCaseNumber] = useState("");
  const [competentCourt, setCompetentCourt] = useState("");
  const [theCreatorOfTheCall, setTheCreatorOfTheCall] = useState("");
  const [defendant, setDefendant] = useState("");
  const [sessionDate, setSessionDate] = useState("");
  const [status, setStatus] = useState(""); // Status as a text input

  const [modalHShow, setModalHShow] = useState<boolean>(false);

  return (
    <>
      <div className="modal fade">
        <Modal
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={handleClose}
        >
          <div className="card">
            <Modal.Header
              closeButton
              style={{
                alignItems: intl.locale === "ar" ? "flex-start" : "center",
                flexDirection: intl.locale === "en" ? "column-reverse" : "row",
              }}
            >
              <div className="card-header w-100 px-1 d-flex justify-content-center pb-2 border-bottom-0 mt-10">
                <Modal.Title>
                  <h3 className="card-title d-flex justify-content-center align-items-center flex-column">
                    <span className="card-label fs-4 my-5">
                      {intl.formatMessage({ id: "DataFiltering" })}
                    </span>
                    <span className="mt-1 fw-semibold fs-6 text-muted my-5">
                      {intl.formatMessage({
                        id: "PleaseEnterTheFollowingData",
                      })}
                    </span>
                  </h3>
                </Modal.Title>
              </div>
            </Modal.Header>
            <Modal.Body>
              <form noValidate className="form outputForm">
                <div className="row">
                  {/* Case Number */}
                  <div className="col-lg-4 mb-2 pt-2 pb-3">
                    <label
                      htmlFor="caseNumber"
                      className="form-label px-2 fontSz-6"
                    >
                      {intl.formatMessage({ id: "CaseNumber" })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="special fas fa-signature"></i>
                        </span>
                      </div>
                      <input
                        id="caseNumber"
                        type="text"
                        className="form-control"
                        placeholder={intl.formatMessage({ id: "CaseNumber" })}
                        value={caseNumber}
                        onChange={(e) => setCaseNumber(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Competent Court */}
                  <div className="col-lg-4 mb-2 pt-2 pb-3">
  <label
    htmlFor="competentCourt"
    className="form-label px-2 fontSz-6"
  >
    {intl.formatMessage({ id: "CompetentCourt" })}
  </label>
  <div>
    <MultiCheckBoxDropDown
      selectedOptions={competentCourt}
      setSelectedOptions={setCompetentCourt}
      options={courtOptions}
    />
  </div>
</div>



                  {/* The Creator of the Call */}
                  <div className="col-lg-4 mb-2 pt-2 pb-3">
                    <label
                      htmlFor="theCreatorOfTheCall"
                      className="form-label px-2 fontSz-6"
                    >
                      {intl.formatMessage({ id: "TheCreatorOfTheCall" })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="special fas fa-user"></i>
                        </span>
                      </div>
                      <input
                        id="theCreatorOfTheCall"
                        type="text"
                        className="form-control"
                        placeholder={intl.formatMessage({
                          id: "TheCreatorOfTheCall",
                        })}
                        value={theCreatorOfTheCall}
                        onChange={(e) =>
                          setTheCreatorOfTheCall(e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Defendant */}
                  <div className="col-lg-4 mb-2 pt-2 pb-3">
                    <label
                      htmlFor="defendant"
                      className="form-label px-2 fontSz-6"
                    >
                      {intl.formatMessage({ id: "Defendant" })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="special fas fa-user"></i>
                        </span>
                      </div>
                      <input
                        id="defendant"
                        type="text"
                        className="form-control"
                        placeholder={intl.formatMessage({ id: "Defendant" })}
                        value={defendant}
                        onChange={(e) => setDefendant(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer className="justify-content-center py-2">
              <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
                <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                  <div className="d-flex justify-content-center align-items-center w-50">
                    <Button
                      variant="secondary"
                      className="mx-1 text-center w-100"
                      onClick={handleClose}
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </Button>
                    <Button
                      variant="success"
                      className="mx-1 text-center w-100"
                      onClick={() => {
                        showSuccessAlert();
                        handleClose();
                      }}
                    >
                      {intl.formatMessage({ id: "Agree" })}
                    </Button>
                  </div>
                </div>
              </div>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
      <div
        className="modal fade"
        id="Rega_modal_viewEmployee_hierarchy"
      >
        <EmployeeHierarchyPopup
          show={modalHShow}
          handleClose={() => setModalHShow(false)}
        />
      </div>
    </>
  );
};

export default FilterApplicantRequestPopup;
