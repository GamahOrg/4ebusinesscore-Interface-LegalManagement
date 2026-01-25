import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { EmployeeHierarchyPopup } from "@4eplatform/shared/src/popups/EmployeeHierarchyPopup";

type AddPopupProps = {
    show: boolean;
    onHide: () => void;
    onAgree: () => void; // Updated type for onAgree
};

type Props = {
  activeButtonId: number;
};

const AddSession: React.FC<AddPopupProps & Props> = ({
  show,
  onHide,
  onAgree, // Accepting onAgree prop
  activeButtonId,
}) => {
  const intl = useIntl();

  const [AccreditationStatus, setAccreditationStatus] = useState([]);
  const AccreditationStatusOptions = [
    { id: 1, name: `${intl.formatMessage({ id: "UnderSettlement" })}` },
    { id: 2, name: `${intl.formatMessage({ id: "Finished" })}` },
    { id: 3, name: `${intl.formatMessage({ id: "InTrack" })}` },
    { id: 4, name: `${intl.formatMessage({ id: "Rejected" })}` },
  ];

  const [CompetentCourt, SetCompetentCourt] = useState([]);
  const CompetentCourtOptions = [
    { id: 1, name: `${intl.formatMessage({ id: "Alia" })}` },
    { id: 2, name: `${intl.formatMessage({ id: "ElementaryCourt" })}` },
    { id: 3, name: `${intl.formatMessage({ id: "Appeal" })}` },
  ];

  const showSuccessAlert = () => {
    Swal.fire({
      timer: 2000,
      text: intl.formatMessage({ id: "SavedSuccessfully" }),
      icon: "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: { confirmButton: "btn btn-primary" },
    });
  };

  const [modalHShow, setModalHShow] = useState<boolean>(false);

  return (
    <>
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={onHide}
      >
        <div className="card">
          <Modal.Header closeButton>
            <Modal.Title>
              <h3 className="card-title text-center d-block mx-auto">
                {intl.formatMessage({ id: "AddSession" })}
              </h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate className="form outputForm">
              <Row>
                <Col lg={4} className="h-auto mt-5">
                  <Form.Group controlId="caseNumberInput">
                    <Form.Label className="mb-3">
                      {intl.formatMessage({ id: "SessionDate" })}
                    </Form.Label>
                    <div className="input-group bg-light">
                      <Form.Control
                        type="date"
                        className="bg-white"
                        placeholder={intl.formatMessage({ id: "SessionDate" })}
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col lg={4} className="h-auto mt-5">
                  <Form.Group controlId="caseDaySelect bg-light">
                    <Form.Label className="mb-3">
                      {intl.formatMessage({ id: "SessionDay" })}
                    </Form.Label>
                    <div className="input-group">
                      <Form.Select className="form-select bg-light">
                        <option value="sunday">
                          {intl.formatMessage({ id: "Sunday" })}
                        </option>
                        <option value="monday">
                          {intl.formatMessage({ id: "Monday" })}
                        </option>
                        <option value="tuesday">
                          {intl.formatMessage({ id: "Tuesday" })}
                        </option>
                        <option value="wednesday">
                          {intl.formatMessage({ id: "Wednesday" })}
                        </option>
                        <option value="thursday">
                          {intl.formatMessage({ id: "Thursday" })}
                        </option>
                        <option value="friday">
                          {intl.formatMessage({ id: "Friday" })}
                        </option>
                        <option value="saturday">
                          {intl.formatMessage({ id: "Saturday" })}
                        </option>
                      </Form.Select>
                    </div>
                  </Form.Group>
                </Col>
                <Col lg={4} className="h-auto mt-5">
                  <Form.Group controlId="caseTimeInput ">
                    <Form.Label className="mb-3">
                      {intl.formatMessage({ id: "SessionTime" })}
                    </Form.Label>
                    <div className="input-group bg-light">
                      <Form.Control
                        type="time"
                        className="bg-white"
                        placeholder={intl.formatMessage({ id: "SessionTime" })}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col lg={12}>
                  <p className="fs-5 text-grey ms-2">
                    {intl.formatMessage({ id: "ReplyNote" })}
                  </p>
                  <textarea className="custom-textarea bg-light w-100 rounded" />
                </Col>
              </Row>
              <Row className="mt-5">
                <Col lg={12}>
                  <p className="fs-5 text-grey ms-2 mb-0">
                    {intl.formatMessage({ id: "ATTACHMENTS" })}
                  </p>
                  <div className="d-flex align-items-center mt-0">
                    <div className="w-100 py-5 mx-auto">
                      <div className="notice bg-light-primary rounded border border-primary border-dashed mb-1">
                        <label
                          htmlFor="outputAttachment"
                          className="form-label px-2 fontSz-6 my-5 w-100 uploadFile-style inputAreaHeight d-flex justify-content-center align-items-center text-primary"
                        >
                          <i className="fas fa-paperclip mx-2"></i>
                          {intl.formatMessage({ id: "AttachDocument" })}
                        </label>
                        <input
                          multiple
                          type="file"
                          accept="image/*"
                          id="outputAttachment"
                          name="attachments"
                          className="d-none"
                        />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer className="justify-content-center py-2">
            <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
              <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                <div className="d-flex justify-content-center align-items-center w-50">
                  <Button
                    variant="secondary"
                    className="mx-1 text-center w-100"
                    onClick={onHide}
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </Button>
                  <Button
                    variant="success"
                    className="mx-1 text-center w-100"
                    onClick={() => {
                      onAgree(); // Call onAgree prop
                      showSuccessAlert();
                      onHide();
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

      <EmployeeHierarchyPopup
        show={modalHShow}
        handleClose={() => setModalHShow(false)}
      />
    </>
  );
};

export default AddSession;
