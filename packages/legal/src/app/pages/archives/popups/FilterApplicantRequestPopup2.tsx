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
  show?: boolean;
  handleClose?: () => void;
};

type Props = {
  activeButtonId: number;
  options: Option[];
  selectedOptions: Option[];
  setSelectedOptions: (options: Option[]) => void;
};

const FilterApplicantRequestPopup2: React.FC<AddPopupProps & Props> = ({
  show,
  handleClose,
  activeButtonId,
}) => {
  const intl = useIntl();

  // Correctly defined court options
  const courtOptions: Option[] = [
    { id: 1, name: intl.formatMessage({ id: "ElementaryCourt" }) },
    { id: 2, name: intl.formatMessage({ id: "Alia" }) },
    { id: 3, name: intl.formatMessage({ id: "Appeal" }) },
  ];

  // SweetAlert success notification
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

  const [caseNumber, setCaseNumber] = useState("");
  const [theCreatorOfTheCall, setTheCreatorOfTheCall] = useState("");
  const [defendant, setDefendant] = useState("");
  const [sessionDate, setSessionDate] = useState("");
  const [typeOfLawsuit, setTypeOfLawsuit] = useState<Option[]>([]);
  const [competentCourt, setCompetentCourt] = useState<Option[]>([]);
  const [modalHShow, setModalHShow] = useState<boolean>(false);

  const lawsuitOptions: Option[] = [
    { id: 1, name: intl.formatMessage({ id: "ObjectionToAnAdministrativeDecision" }) },
    { id: 2, name: intl.formatMessage({ id: "RealEstateContribution" }) },
    { id: 3, name: intl.formatMessage({ id: "SaleAndRentOnTheMap" }) },
    { id: 4, name: intl.formatMessage({ id: "StateProperties" }) },
    { id: 5, name: intl.formatMessage({ id: "Rent" }) },
  ];

  return (
    <>
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
            <div className="card-header w-100 d-flex justify-content-center pb-2 border-bottom-0 mt-10">
              <Modal.Title>
                <h3 className="card-title d-flex justify-content-center align-items-center flex-column">
                  <span className="card-label fs-4 my-5">
                    {intl.formatMessage({ id: "DataFiltering" })}
                  </span>
                  <span className="mt-1 fw-semibold fs-6 text-muted my-5">
                    {intl.formatMessage({ id: "PleaseEnterTheFollowingData" })}
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
                      name="caseNumber"
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

                {/* Predicate */}
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
                        <i className="fas fa-user special"></i>
                      </span>
                    </div>
                    <input
                      id="theCreatorOfTheCall"
                      name="theCreatorOfTheCall"
                      type="text"
                      className="form-control"
                      placeholder={intl.formatMessage({
                        id: "TheCreatorOfTheCall",
                      })}
                      value={theCreatorOfTheCall}
                      onChange={(e) => setTheCreatorOfTheCall(e.target.value)}
                    />
                  </div>
                </div>

                {/* Defendant */}
                <div className="col-lg-4 mb-2 pt-2 pb-3">
                  <label
                    htmlFor="defendant"
                    className="form-label px-2 fontSz-6"
                  >
                    {intl.formatMessage({ id: "Defendant2" })}
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="special fas fa-user"></i>
                      </span>
                    </div>
                    <input
                      id="defendant"
                      name="defendant"
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
    handleClose?.(); 
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

export default FilterApplicantRequestPopup2;
