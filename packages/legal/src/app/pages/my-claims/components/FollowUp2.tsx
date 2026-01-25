import { useState } from "react";
import { useIntl } from "react-intl";
import { Container, Modal, Form, Button } from "react-bootstrap";
import { ShowMore } from "../../study-of-lawsuits/popup/ShowMore";
import { AddPopup } from "@4eplatform/shared/src/popups/AddPopup";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import AddSession from "../propus/AddSession";
import Steps from "./Steps";
import { useLocation } from "react-router-dom";

export default function FollowUp2() {
  const intl = useIntl();
  const [showModel, setShowModel] = useState(false);
  const [showNewNoteModal, setShowNewNoteModal] = useState(false);
  const [showNewNoteModal2, setShowNewNoteModal2] = useState(false);
  const [showEditNoteModal, setShowEditNoteModal] = useState(false);
  const [modalDShow, setModalDShow] = useState<boolean>(false);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const study = {
    id: 2541851,
    info: `الموضوع: مذكرة رد على الدعوى العمالية المقدمة من المدعي (اسم المدعي) ضد المدعى المقدمة من المدعي (اسم المدعي) ضد المدعى عليه اسم المدعى علي الموضوع: مذكرة رد على الدعوى العمالية المقدمة من المدعي (اسم المدعي) ضد المدعى عليه اسم المدعى عليه الموضوع: مذكرة رد على الدعوى العمالية المقدمة من المدعي (اسم المدعي) ضد المدعى عليه اسم المدعى عليه`,
    created_at: "2022-01-01",
    status: "UnderSettlement",
  };

  return (
    <>
      <div className="d-flex  justify-content-between">
        <h3 className="font-size-17 titleSession">
          {intl.formatMessage({ id: "Sessions" })}
        </h3>
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
                <span> {intl.formatMessage({ id: "AddSessionPrompts" })}</span>
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
            {status === "Finished" && (
              <div className="d-flex align-items-center pt-5">
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
              </div>
            )}
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
        {status === "Finished" && (
          <Container className="bg-white  my-8 w-95 mx-auto pb-7 rounded">
            <div className="d-flex justify-content-between mt-3 align-items-center position-relative pb-4">
              <h4 className="font-size-16 font-weight-700 line-height-20 pt-5 px-5">
                {intl.formatMessage({ id: "ReplyNote" })}
              </h4>
              <div className="d-flex align-items-center pt-5">
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
      </div>
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
                  {intl.formatMessage({ id: "HumanResourcesManagementCourse" })}
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
                  {intl.formatMessage({ id: "HumanResourcesManagementCourse" })}
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
      <Modal centered>
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            {intl.formatMessage({ id: "AddSession" })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                {intl.formatMessage({ id: "SessionText" })}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={16}
                placeholder={intl.formatMessage({
                  id: "EnterTheTextOfTheSession",
                })}
              />
            </Form.Group>
            <div className="mt-3 col-12 my-5">
              <p className="text-mute my-3">
                {intl.formatMessage({ id: "ATTACHMENTS" })}
              </p>
              <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed mb-1 ">
                <label
                  htmlFor="outputAttachment"
                  className="form-label px-2  fontSz-6 dropzone-select   w-100 uploadFile-style inputAreaHeight"
                >
                  <div className="d-flex justify-content-center align-items-center text-primary pt-2">
                    <i className="fas fa-paperclip mx-2"></i>
                    {intl.formatMessage({ id: "AttachDocument" })}
                  </div>
                </label>
                <div
                  className="dropzone dropzone-queue mb-2"
                  id="kt_dropzonejs_example_3"
                >
                  <div className="dropzone-panel mb-lg-0 mb-2">
                    <input
                      multiple
                      type="file"
                      accept="image/*"
                      id="outputAttachment"
                      name="attachments"
                      placeholder="رفع الملفات"
                      className="dropzone-select w-100 uploadFile-style inputAreaHeight d-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            variant="secondary"
            onClick={() => setShowNewNoteModal(false)}
          >
            {intl.formatMessage({ id: "CANCEL" })}
          </Button>
          <Button variant="success" onClick={() => setModalShow(true)}>
            {intl.formatMessage({ id: "Add" })}
          </Button>
        </Modal.Footer>
      </Modal>
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
      {/* popup Edit new note */}
      <Modal
        show={showEditNoteModal}
        onHide={() => setShowEditNoteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            {intl.formatMessage({ id: "SessionPromptsEdit" })}
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
            onClick={() => setShowEditNoteModal(false)}
          >
            {intl.formatMessage({ id: "CANCEL" })}
          </Button>
          <Button variant="primary" onClick={() => setShowEditNoteModal(false)}>
            {intl.formatMessage({ id: "Save" })}
          </Button>
        </Modal.Footer>
      </Modal>
      {showModel && (
        <div className="modal fade" aria-hidden="true">
          <ShowMore
            show={showModel}
            handleClose={() => setShowModel(false)}
            data={study?.info}
          />
        </div>
      )}
      <div className="modal fade" id="Rega_modal_Delete" aria-hidden="true">
        <DeletePopup
          handleCloseDelete={() => setModalDShow(false)}
          showDelete={modalDShow}
        />
      </div>
      <div className="modal fade" aria-hidden="true">
        <AddPopup show={modalShow} handleClose={() => setModalShow(false)} />
      </div>
      <AddSession
        activeButtonId={0}
        show={showNewNoteModal}
        onHide={() => setShowNewNoteModal(false)}
      />{" "}
    </>
  );
}
