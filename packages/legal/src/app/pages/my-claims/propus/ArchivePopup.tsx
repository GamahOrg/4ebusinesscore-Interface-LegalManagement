import { FC } from "react";
import { useIntl } from "react-intl";
import { Row } from "react-bootstrap";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";

type ArchivePopupProps = {
  id?: Number;
  handleArchive?: (id?: Number, additionalData?: {}) => void;
  additionalData?: {};
  showArchive?: any;
  handleCloseArchive?: any;
};

export const ArchivePopup: FC<ArchivePopupProps> = ({
  showArchive,
  handleCloseArchive,
  id = 0,
  handleArchive = null,
  additionalData = {},
}) => {
  const intl = useIntl();
  const showSuccessAlert = () => {
    Swal.fire({
      timer: 2000,
      text: intl.formatMessage({ id: "ArchivedSuccessfully" }),
      icon: "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
  };

  return (
    <div className="modal-dialog modal-dialog-centered ">
      <Modal centered show={showArchive} onHide={handleCloseArchive}>
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale === "ar" ? "flex-start" : "center",
            flexDirection: intl.locale === "en" ? "column-reverse" : "row",
          }}
        >
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="justify-content-center my-5 pb-4">
            <div className="text-center">
              <h3> {intl.formatMessage({ id: "ConfirmArchiving" })}</h3>
            </div>
          </Row>

          <Row className="justify-content-center mb-5">
            <div className="text-center">
              <h5>
                {intl.formatMessage({
                  id: "AreYouSureYouWantToArchiveThisClaim",
                })}
              </h5>
            </div>
          </Row>
        </Modal.Body>

        <Modal.Footer className="justify-content-center py-2">
          <div className="row">
            <div className="col-12 col-lg-7 mx-auto my-2 pb-2">
              <div className="outputCard card-diff-toolbar w-100 d-flex justify-content-center">
                <div className="d-flex justify-content-center align-items-center w-100">
                  <button
                    type="reset"
                    className="btn btn-secondary me-3 w-100"
                    onClick={handleCloseArchive}
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>
                  <div
                    onClick={() => {
                      handleCloseArchive();
                      showSuccessAlert();
                      if (handleArchive) {
                        handleArchive(id, additionalData);
                      }
                    }}
                    className="btn btn-success me-5 w-100 "
                  >
                    <span className="indicator-label">
                      {intl.formatMessage({ id: "Acceptance" })}
                    </span>
                    <span className="indicator-progress">
                      {intl.formatMessage({ id: "Deleting" })}
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
