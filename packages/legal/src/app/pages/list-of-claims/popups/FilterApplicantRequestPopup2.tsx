import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { EmployeeHierarchyPopup } from "@4eplatform/shared/src/popups/EmployeeHierarchyPopup";
import CheckBoxDropDown from "@4eplatform/shared/src/popups/CheckBoxDropDown";



type AddPopupProps = {
  show?: any;
  handleClose?: any;
};

type Props = {
  activeButtonId: number;
};

const FilterApplicantRequestPopup2: React.FC<AddPopupProps & Props> = ({
  show,
  handleClose,
  activeButtonId,
}) => {
  const intl = useIntl();
  const [CompetentCourt, SetCompetentCourt] = useState([]);

  const CompetentCourtOptions = [
    {
      id: 1,
      name: `${intl.formatMessage({
        id: "Alia",
      })}`,
    },
    {
      id: 2,
      name: `${intl.formatMessage({
        id: "ElementaryCourt",
      })}`,
    },
    {
      id: 3,
      name: `${intl.formatMessage({
        id: "Appeal",
      })}`,
    },
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

  const [caseNumber, setCaseNumber] = useState("");
  const [defendant, setDefendant] = useState("");
  const [modalHShow, setModalHShow] = useState<boolean>(false);

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

                <div className="col-lg-4 mb-2 pt-2 pb-3">
                  <div className="mb-2">
                    <label className="form-label px-2  fs-6 text-gray-700">
                      {intl.formatMessage({ id: "CompetentCourt" })}
                    </label>
                    <div className="mx-auto">
                      <CheckBoxDropDown
                        selectedOptions={CompetentCourt}
                        setSelectedOptions={SetCompetentCourt}
                        options={CompetentCourtOptions}
                      />
                    </div>
                  </div>
                </div>

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
