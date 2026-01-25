import { useState } from "react";
import { useIntl } from "react-intl";
import { Col, Container, Row, Modal, Button, Form } from "react-bootstrap";
import { SendPopup } from "../propus/SendPopup";
import { useNavigate } from "react-router-dom";
import AddSession from "../propus/AddSession";
import { ShowMore } from "../propus/ShowMore";
import Steps from "./Steps";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ViewTheReceivedClaim() {
  const intl = useIntl();
  const handleSendClick = () => {
    setShowSendPopup(true);
  };

  const navigate = useNavigate();
  const [showSendPopup, setShowSendPopup] = useState<boolean>(false);
  const [showNewNoteModal, setShowNewNoteModal] = useState(false);
  const [showNewNoteModal2, setShowNewNoteModal2] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");

  return (
    <>
        {/* start show page two before merge  */}
      <div>
        <div className="d-flex  justify-content-between">
          <h1 className="font-size-17 titleSession">
            {intl.formatMessage({ id: "Sessions" })}
          </h1>
          {(status === "Finished" || status === "consent") && (
            <button
              onClick={() => setShowNewNoteModal(true)}
              className="btn d-flex align-items-center border-0 text-primary"
            >
              <i className="fas fa-plus-circle"></i>
              <span> {intl.formatMessage({ id: "AddAnewSession" })}</span>
            </button>
          )}
        </div>
        {status === "Finished" && (
          <div className="me-8">
            {" "}
            <Steps />
          </div>
        )}

        {(status === "Drafts" || status === "SentStatus") && (
          <>
            <Container className="bg-light rounded w-95 pb-7">
              <Row>
                <Col className="pt-6 ps-2 " lg={12}>
                  <h3>{intl.formatMessage({ id: "Session1" })}</h3>
                </Col>
              </Row>
              <Row>
                <Col lg={4} className="h-auto mt-5">
                  <p className="fs-5 text-grey">
                    {intl.formatMessage({ id: "SessionDate" })}
                  </p>
                  <input
                    type="text"
                    disabled
                    className="custom-input w-100 mt-2"
                    value={`${intl.formatMessage({
                      id: "DateOfTheCaseFollow",
                    })}`}
                  />
                </Col>
                <Col lg={4} className="h-auto mt-5">
                  <p className="fs-5 text-grey">
                    {intl.formatMessage({ id: "SessionDay" })}
                  </p>
                  <input
                    type="text"
                    disabled
                    className="custom-input w-100 mt-2"
                    value={`${intl.formatMessage({ id: "Wednesday" })}`}
                  />
                </Col>
                <Col lg={4} className="h-auto mt-5">
                  <p className="fs-5 text-grey">
                    {intl.formatMessage({ id: "SessionTime" })}
                  </p>

                  <input
                    type="text"
                    disabled
                    className="custom-input w-100 mt-2"
                    value="12:30"
                  />
                </Col>
              </Row>
            </Container>
          </>
        )}
        {status === "SentStatus" && (
          <Container className="bg-light  my-8 w-95 mx-auto pb-7 pt-3 rounded">
            <Row className="mt-5">
              <Col lg={12}>
                <p className="fs-5 text-grey ms-2">
                  {intl.formatMessage({ id: "ReplyNote" })}
                </p>
                <textarea
                  className="custom-textarea w-100 rounded p-3"
                  placeholder={`${intl.formatMessage({
                    id: "EnterTheNoteFollow",
                  })}`}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <p className="fs-5 text-grey ms-2 mt-4 mb-0">
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
          </Container>
        )}

        {(status === "InTrack" ||
          status === "Finished" ||
          status === "Rejected" ||
          status === "consent") && (
          <>
            <div className="main-container-follow">
              <div className="d-flex justify-content-between">
                <h4 className="m-5 Session1Text">
                  {intl.formatMessage({ id: "Session1" })}
                </h4>
                {status === "consent" && (
                  <div className="d-flex justify-content-end align-items-center mt-3">
                    <button
                      onClick={() => setShowNewNoteModal2(true)}
                      className="btn d-flex align-items-center border-0 text-primary"
                    >
                      <i className="fas fa-plus-circle"></i>
                      <span>
                        {" "}
                        {intl.formatMessage({ id: "AddSessionPrompts" })}
                      </span>
                    </button>
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-between w-70 mt-3 mb-3 me-4">
                <div className="d-flex">
                  <p className="text-gray-400">
                    {intl.formatMessage({ id: "SessionDate" })}
                  </p>
                  <span className="ms-2 me-2">:</span>
                  <p className="lawsuit-text-left">
                    {intl.formatMessage({ id: "DateOfTheCase3" })}
                  </p>
                </div>

                <div className="d-flex">
                  <p className="text-gray-400">
                    {intl.formatMessage({ id: "SessionDay" })}
                  </p>
                  <span className="ms-2 me-2">:</span>
                  <p className="lawsuit-text-left">
                    {intl.formatMessage({ id: "Wednesday" })}
                  </p>
                </div>

                <div className="d-flex">
                  <p className="text-gray-400">
                    {intl.formatMessage({ id: "SessionTime" })}
                  </p>
                  <span className="ms-2 me-2">:</span>
                  <p className="lawsuit-text-left">12:23</p>
                </div>
              </div>
              <Container className="bg-white  my-8 w-95 mx-auto pb-7 rounded">
                <div className="d-flex justify-content-between mt-3 align-items-center position-relative pb-4">
                  <h4 className="font-size-16 font-weight-700 line-height-20 pt-5 px-5">
                    {intl.formatMessage({ id: "ReplyNote" })}
                  </h4>
                  <div className="d-flex align-items-center pt-5">
                    {status === "Finished" && (
                      <>
                        <p className="fontSz-6 mx-5">
                          {intl.formatMessage({ id: "NoteCreator" })}
                        </p>
                        <p className="fs-6 fw-bolder">
                          {intl.formatMessage({ id: "MohamedOthman" })}
                        </p>
                        <p className="fontSz-6 mx-5">
                          {intl.formatMessage({ id: "StudyClaimDate" })}
                        </p>
                        <p className="fs-6 fw-bolder">
                          {intl.formatMessage({ id: "DateOfTheNote1" })}
                        </p>
                      </>
                    )}
                    {status === "Rejected" && (
                      <Link to="/view-claims-3?tab=Followup">
                        <div className="btn border-0 text-primary mx-2 p-0">
                          <i className="fas fa-pen fa-2x"></i>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>

                <div className="toggle-content me-3">
                  <div className="d-flex ">
                    {" "}
                    <p className="mx-2 text-dark fw-bold">
                      <p className="lawsuit-text-left">
                        {intl.formatMessage({
                          id: "TextOfTheLawsuitMemorandumIssuedLawsuits",
                        })}
                        <span
                          className="text-primary ms-1"
                          onClick={handleShow}
                          style={{ cursor: "pointer" }}
                        >
                          {intl.formatMessage({ id: "ReadMoreCourse" })}
                        </span>{" "}
                      </p>
                    </p>
                  </div>
                </div>
                <ShowMore
                  show={showModal}
                  handleClose={handleClose}
                  data="Some additional data"
                />
                <div className="d-flex mt-3">
                  <div className=" d-flex bg-light-primary rounded border-primary border border-dashed mb-1 ms-3">
                    <label
                      htmlFor="outputAttachment"
                      className="form-label px-2  fontSz-6 dropzone-select   w-100 uploadFile-style inputAreaHeight"
                    >
                      <div className="d-flex justify-content-center align-items-center text-primary pt-2">
                        <i className="fas fa-paperclip mx-2"></i>
                        {intl.formatMessage({ id: "Attached" })}
                      </div>
                    </label>
                  </div>

                  <div className=" d-flex bg-light-primary rounded border-primary border border-dashed mb-1 ">
                    <label
                      htmlFor="outputAttachment"
                      className="form-label px-2  fontSz-6 dropzone-select   w-100 uploadFile-style inputAreaHeight"
                    >
                      <div className="d-flex justify-content-center align-items-center text-primary pt-2">
                        <i className="fas fa-paperclip mx-2"></i>
                        {intl.formatMessage({ id: "Attached2" })}
                      </div>
                    </label>
                  </div>
                </div>
              </Container>
            </div>
          </>
        )}

        {status === "Finished" && (
          <Container className="bg-light  my-8 w-95 mx-auto pb-7 rounded">
            <div className="d-flex justify-content-between mt-3 align-items-center position-relative pb-4">
              <h4 className="font-size-16 font-weight-700 line-height-20 pt-5 px-5">
                {intl.formatMessage({ id: "ReplyNote" })}
              </h4>
              <div className="d-flex align-items-center pt-5 mx-11">
                <p className="fontSz-6 mx-5">
                  {intl.formatMessage({ id: "NoteCreator" })}
                </p>
                <p className="fs-6 fw-bolder">
                  {intl.formatMessage({ id: "ImanIhab" })}
                </p>
                <p className="fontSz-6 mx-5">
                  {intl.formatMessage({ id: "StudyClaimDate" })}
                </p>
                <p className="fs-6 fw-bolder">
                  {intl.formatMessage({ id: "DateOfTheNote2" })}
                </p>
              </div>
            </div>

            <div className="toggle-content me-3">
              <div className="d-flex ">
                {" "}
                <p className="mx-2 text-dark fw-bold">
                  <p className="lawsuit-text-left">
                    {intl.formatMessage({
                      id: "TextOfTheLawsuitMemorandumIssuedLawsuits",
                    })}
                    <span
                      className="text-primary ms-1"
                      onClick={handleShow}
                      style={{ cursor: "pointer" }}
                    >
                      {intl.formatMessage({ id: "ReadMoreCourse" })}
                    </span>{" "}
                  </p>
                </p>
              </div>
            </div>
            <ShowMore
              show={showModal}
              handleClose={handleClose}
              data="Some additional data"
            />
            <div className="d-flex mt-3">
              <div className=" d-flex bg-light-primary rounded border-primary border border-dashed mb-1 ms-3">
                <label
                  htmlFor="outputAttachment"
                  className="form-label px-2  fontSz-6 dropzone-select   w-100 uploadFile-style inputAreaHeight"
                >
                  <div className="d-flex justify-content-center align-items-center text-primary pt-2">
                    <i className="fas fa-paperclip mx-2"></i>
                    {intl.formatMessage({ id: "Attached" })}
                  </div>
                </label>
              </div>

              <div className=" d-flex bg-light-primary rounded border-primary border border-dashed mb-1 ">
                <label
                  htmlFor="outputAttachment"
                  className="form-label px-2  fontSz-6 dropzone-select   w-100 uploadFile-style inputAreaHeight"
                >
                  <div className="d-flex justify-content-center align-items-center text-primary pt-2">
                    <i className="fas fa-paperclip mx-2"></i>
                    {intl.formatMessage({ id: "Attached2" })}
                  </div>
                </label>
              </div>
            </div>
          </Container>
        )}

        {status === "Finished" && (
          <Container className=" w-95 pe-4 mt-5 bg-light-primary rounded pb-5">
            <div className="d-flex justify-content-between mb-5">
              <h3 className="font-size-16 font-weight-700 line-height-20 pt-10 px-8">
                {intl.formatMessage({ id: "SessionPrompts" })}
              </h3>
            </div>

            <div className="toggle-content me-3">
              <div className="d-flex ">
                {" "}
                <p className="mx-2 text-dark fw-bold">
                  <p className="lawsuit-text-left">
                    {intl.formatMessage({
                      id: "TextOfTheLawsuitMemorandumIssuedLawsuits",
                    })}
                    <span
                      className="text-primary ms-1"
                      onClick={handleShow}
                      style={{ cursor: "pointer" }}
                    >
                      {intl.formatMessage({ id: "ReadMoreCourse" })}
                    </span>{" "}
                  </p>
                </p>
              </div>
            </div>
          </Container>
        )}

        {/* Approvals */}
        {(status === "InTrack" ||
          status === "Finished" ||
          status === "Rejected" ||
          status === "consent") && (
          <div className="main-container-follow">
            <div className="bg-light pt-5 pb-1 px-5 border">
              <div>
                <div className="card-title align-items-start flex-column">
                  <h3 className="card-label fw-bolder fs-4 mb-5 ">
                    {intl.formatMessage({ id: "Approvals" })}
                  </h3>
                </div>
              </div>
              <div className="d-flex pt-2 mb-2 align-items-center">
                <p className="fontSz-6">
                  {intl.formatMessage({ id: "Approvals" })} :{" "}
                </p>
                <p className="px-2 fs-6 fw-bolder">
                  {intl.formatMessage({ id: "Default" })}
                </p>
              </div>

              <div className="style-first-approvals">
                <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center circle-number-approvals">
                  1
                </div>

                <div className="d-flex align-items-center">
                  <p className="fs-6 fw-bolder">
                    {intl.formatMessage({
                      id: "HumanResourcesManagementCourse",
                    })}
                  </p>
                  <p className="fontSz-6 mx-5">
                    {intl.formatMessage({ id: "ExceptionInApprovals" })}
                  </p>
                  <p className="fontSz-6 mx-5">
                    {intl.formatMessage({ id: "ApprovalDated10-14-2020" })}
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <p className="fs-6 fw-bolder">
                    {intl.formatMessage({ id: "AcceptanceReason" })}:
                  </p>
                  <p className="fontSz-6 mx-5">
                    {intl.formatMessage({ id: "paragraphOfLawsuit" })}
                  </p>
                </div>

                <div className="d-flex align-items-center">
                  <p className="fontSz-6">
                    {intl.formatMessage({ id: "ShowSLA" })}
                  </p>
                  <p className="fs-6 fw-bolder">
                    {intl.formatMessage({ id: "No" })}
                  </p>
                </div>
              </div>

              <div className="style-second-approvals">
                <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center circle-number-approvals">
                  2
                </div>
                <div className="d-flex align-items-center">
                  <p className="fs-6 fw-bolder">
                    {intl.formatMessage({
                      id: "HumanResourcesManagementCourse",
                    })}
                  </p>
                  <p className="fontSz-6 mx-5">
                    {intl.formatMessage({ id: "ExceptionInApprovals" })}
                  </p>
                  <p className="fontSz-6 mx-5">
                    {intl.formatMessage({ id: "ApprovalDated10-14-2020" })}
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <p className="fs-6 fw-bolder">
                    {status === "Rejected" || status === "consent"
                      ? intl.formatMessage({ id: "ReasonForRejection" })
                      : intl.formatMessage({ id: "AcceptanceReason" })}
                  </p>
                  <p className="fontSz-6 mx-5">
                    {intl.formatMessage({ id: "paragraphOfLawsuit" })}
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <p className="fontSz-6">
                    {intl.formatMessage({ id: "ShowSLA" })}
                  </p>
                  <p className="fs-6 fw-bolder">
                    {intl.formatMessage({ id: "No" })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <Container>
          <Row>
            <Col lg={12} className="d-flex justify-content-end mt-3">
              {(status === "Drafts" || status === "SentStatus") && (
                <button
                  className="m-2 cancelBtn"
                  onClick={() => navigate("/my-claims")}
                >
                  {" "}
                  {intl.formatMessage({
                    id: "Cancel",
                  })}
                </button>
              )}
              {status === "SentStatus" && (
                <button
                  className="m-2 btn btn-primary"
                  onClick={() => {
                    // showSuccessAlert();
                  }}
                >
                  {intl.formatMessage({ id: "Save" })}
                </button>
              )}
              {(status === "Drafts" || status === "SentStatus") && (
                <button
                  className="m-2 btn btn-success"
                  onClick={handleSendClick}
                >
                  {intl.formatMessage({ id: "Send" })}
                </button>
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <Modal
        show={showNewNoteModal2}
        onHide={() => setShowNewNoteModal2(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            {intl.formatMessage({ id: "AddSessionPrompts" })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                {intl.formatMessage({ id: "SessionPromptsText" })}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={16}
                placeholder={intl.formatMessage({
                  id: "EnterSessionPromptsText",
                })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            variant="secondary"
            onClick={() => setShowNewNoteModal2(false)}
          >
            {intl.formatMessage({ id: "CANCEL" })}
          </Button>
          <Button variant="success" onClick={() => setModalShow(true)}>
            {intl.formatMessage({ id: "Add" })}
          </Button>
        </Modal.Footer>
      </Modal>
      <SendPopup
        show={showSendPopup}
        handleClose={() => setShowSendPopup(false)}
        onConfirm={() => console.log("Send confirmed")}
        title="Send Confirmation"
        text={intl.formatMessage({ id: "AreYouSureYouWantToSend" })}
        confirmText={intl.formatMessage({ id: "Yes" })}
        cancelText={intl.formatMessage({ id: "No" })}
        successText={intl.formatMessage({ id: "SentSuccessfully" })}
      />
      <AddSession
        activeButtonId={0}
        show={showNewNoteModal}
        onHide={() => setShowNewNoteModal(false)}
      />
      <div/>
    </>
  );
}
