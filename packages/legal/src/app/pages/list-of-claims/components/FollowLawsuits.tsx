import  { useState } from "react";
import { useIntl } from "react-intl";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { ShowMore } from "../../study-of-lawsuits/popup/ShowMore";
import { Container, Button, Modal, Form } from "react-bootstrap";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import { AddPopup } from "@4eplatform/shared/src/popups/AddPopup";
import Swal from "sweetalert2";
export default function FollowLawsuits() {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(true);
  const [isOpen2, setIsOpen2] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showNewNoteModal, setShowNewNoteModal] = useState(false);
  const [showEditNoteModal, setShowEditNoteModal] = useState(false);
  const [modalDShow, setModalDShow] = useState<boolean>(false);
  const [modalShow, setModalShow] = useState<boolean>(false);

  const study = {
    id: 2541851,
    info: `الموضوع: مذكرة رد على الدعوى العمالية المقدمة من المدعي (اسم المدعي) ضد المدعى المقدمة من المدعي (اسم المدعي) ضد المدعى عليه اسم المدعى علي الموضوع: مذكرة رد على الدعوى العمالية المقدمة من المدعي (اسم المدعي) ضد المدعى عليه اسم المدعى عليه الموضوع: مذكرة رد على الدعوى العمالية المقدمة من المدعي (اسم المدعي) ضد المدعى عليه اسم المدعى عليه`,
    created_at: "2022-01-01",
    status: "UnderSettlement",
  };
  const toggleContainer = () => {
    setIsOpen(!isOpen);
  };

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

  const showAddSuccessAlert = () => {
    Swal.fire({
      timer: 2000,
      text: intl.formatMessage({ id: "AddedSuccessfully" }),
      icon: "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
  };
  const handleNewAdd = () => {
    showAddSuccessAlert();
    setShowNewNoteModal(false);
  };
  const handleNewEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowEditNoteModal(true);
    e.stopPropagation();
  };

  const handleSaveTheEdit = () => {
    setShowEditNoteModal(false);
    showSuccessAlert();
  };

  const toggleContainer2 = (e: React.MouseEvent<HTMLElement>) => {
    const isButtonClick = (e.target as HTMLElement).closest("button");
    if (!isButtonClick) {
      setIsOpen2(!isOpen2);
    }
  };
  
  



  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    setModalDShow(true);

    e.stopPropagation();
  };

  return (
    <>
      <div>
        <h3 className="follow-title font-size-17 mx-9">
          {intl.formatMessage({ id: "SessionsAndResponseNotes" })}
        </h3>
      </div>

      <div className="main-container-follow">
        <h4 className="m-5 Session1Text">
          {intl.formatMessage({ id: "Session1" })}
        </h4>

        <div className="d-flex justify-content-between w-70 mt-3 mb-3 mx-5">
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

        <div className="bg-white my-8 w-95 mx-auto pb-7 rounded">
          <div className="d-flex justify-content-between align-items-center px-8 pt-10">
            <h4 className="font-size-16 font-weight-700 line-height-20">
              {intl.formatMessage({ id: "ReplyNote" })}
            </h4>

            <button
              onClick={() => setShowNewNoteModal(true)}
              className="btn d-flex align-items-center border-0 text-primary"
            >
              <i className="fas fa-plus-circle"></i>
              <span> {intl.formatMessage({ id: "AddANewNote" })}</span>
            </button>
          </div>

          <Container className="bg-light position-relative mt-8 mb-5 w-95 pe-4 rounded">
            <div
              className="d-flex justify-content-between align-items-center position-relative pb-4"
              style={{ cursor: "pointer" }}
              onClick={toggleContainer}
            >
              <div
                className="arrow-toggle position-absolute pt-5"
                style={{ left: "20px", top: "5px" }}
              >
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              <h4 className="font-size-16 font-weight-700  pt-5 line-height-20">
                {intl.formatMessage({ id: "NoteOne" })}
              </h4>
            </div>

            {isOpen && (
              <div className="toggle-content mt-3  pt-5">
                <div className="black-text d-flex">
                  <p className="text-gray-500">
                    {intl.formatMessage({ id: "NoteCreator" })}
                  </p>
                  <span className="mx-2">:</span>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="32"
                      height="32"
                      rx="16"
                      fill="#009EF7"
                      fillOpacity="0.1"
                    />
                    <path
                      d="M15.9999 6C13.3799 6 11.2499 8.13 11.2499 10.75C11.2499 13.32 13.2599 15.4 15.8799 15.49C15.9599 15.48 16.0399 15.48 16.0999 15.49C16.1199 15.49 16.1299 15.49 16.1499 15.49C16.1599 15.49 16.1599 15.49 16.1699 15.49C18.7299 15.4 20.7399 13.32 20.7499 10.75C20.7499 8.13 18.6199 6 15.9999 6Z"
                      fill="#009EF7"
                    />
                    <path
                      d="M21.08 18.1499C18.29 16.2899 13.74 16.2899 10.93 18.1499C9.65996 18.9999 8.95996 20.1499 8.95996 21.3799C8.95996 22.6099 9.65996 23.7499 10.92 24.5899C12.32 25.5299 14.16 25.9999 16 25.9999C17.84 25.9999 19.68 25.5299 21.08 24.5899C22.34 23.7399 23.04 22.5999 23.04 21.3599C23.03 20.1299 22.34 18.9899 21.08 18.1499Z"
                      fill="#009EF7"
                    />
                  </svg>
                  <h3 className="lawsuit-text-left me-3">
                    {intl.formatMessage({ id: "FahdAbdullah" })}
                  </h3>
                </div>
                <div className="mt-8 mb-3">
                  <p>
                    {intl.formatMessage({
                      id: "HonorableJudge/RespectedHeadoftheLaborAuthority",
                    })}
                  </p>
                  <p>
                    {intl.formatMessage({
                      id: "Maythepeace,mercy,andblessingsofGodbeuponyou.",
                    })}
                  </p>

                  <div className="d-flex ">
                    {" "}
                    <p className="mx-2 text-dark fw-bold">
                      {study?.info?.slice(0, 200)}

                      {study?.info?.length > 200 && (
                        <span
                          className="mx-2 text-primary fw-bold cursor-pointer"
                          onClick={() => setShowModel(true)}
                        >
                          {intl.formatMessage({ id: "ReadMore" })}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Container>

          <Container className="position-relative mt-8 mb-5 w-95 pe-4 secCon rounded">
            <div
              className="d-flex justify-content-between align-items-center position-relative py-4"
              onClick={toggleContainer2}
            >
              <h4 className="font-size-16 font-weight-700 line-height-20">
                {intl.formatMessage({ id: "NoteTwo" })}
              </h4>

              <div className="d-flex align-items-center">
                <button
                  className="btn border-0 text-primary mx-1 p-0"
                  onClick={handleNewEdit}
                >
                  <i className="fas fa-pen"></i>
                </button>

                <button
                  className="btn border-0 text-danger mx-3 p-0"
                  onClick={handleDelete}
                >
                  <i className="fas fa-trash"></i>
                </button>

                <div className="arrow-toggle mx-2">
                  {isOpen2 ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
            </div>

            {isOpen2 && (
              <div className="toggle-content mt-3  pt-5">
                <div className="black-text d-flex">
                  <p className="text-gray-400">
                    {intl.formatMessage({ id: "NoteCreator" })}
                  </p>
                  <span className="mx-2">:</span>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="32"
                      height="32"
                      rx="16"
                      fill="#009EF7"
                      fillOpacity="0.1"
                    />
                    <path
                      d="M15.9999 6C13.3799 6 11.2499 8.13 11.2499 10.75C11.2499 13.32 13.2599 15.4 15.8799 15.49C15.9599 15.48 16.0399 15.48 16.0999 15.49C16.1199 15.49 16.1299 15.49 16.1499 15.49C16.1599 15.49 16.1599 15.49 16.1699 15.49C18.7299 15.4 20.7399 13.32 20.7499 10.75C20.7499 8.13 18.6199 6 15.9999 6Z"
                      fill="#009EF7"
                    />
                    <path
                      d="M21.08 18.1499C18.29 16.2899 13.74 16.2899 10.93 18.1499C9.65996 18.9999 8.95996 20.1499 8.95996 21.3799C8.95996 22.6099 9.65996 23.7499 10.92 24.5899C12.32 25.5299 14.16 25.9999 16 25.9999C17.84 25.9999 19.68 25.5299 21.08 24.5899C22.34 23.7399 23.04 22.5999 23.04 21.3599C23.03 20.1299 22.34 18.9899 21.08 18.1499Z"
                      fill="#009EF7"
                    />
                  </svg>
                  <h3 className="lawsuit-text-left me-3">
                    {intl.formatMessage({ id: "FahdAbdullah" })}
                  </h3>
                </div>
                <div className="mt-8">
                  <p>
                    {intl.formatMessage({
                      id: "HonorableJudge/RespectedHeadoftheLaborAuthority",
                    })}
                  </p>
                  <p>
                    {intl.formatMessage({
                      id: "Maythepeace,mercy,andblessingsofGodbeuponyou.",
                    })}
                  </p>

                  <div className="d-flex">
                    {" "}
                    <p className="mx-2 text-dark fw-bold">
                      {study?.info?.slice(0, 200)}

                      {study?.info?.length > 200 && (
                        <span
                          className="mx-2 text-primary fw-bold cursor-pointer"
                          onClick={() => setShowModel(true)}
                        >
                          {intl.formatMessage({ id: "ReadMore" })}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Container>
        </div>

        <div className="bg-white my-8 w-95 mx-auto pb-7 rounded">
          <h3 className="font-size-16 font-weight-700 line-height-20 pt-10 px-8">
            {intl.formatMessage({ id: "SessionPrompts" })}
          </h3>
          <p className="font-size-16 font-weight-700 line-height-20 px-8 pt-5">
            {intl.formatMessage({ id: "SessionPromptsp" })}
          </p>
          <p className="font-size-16 font-weight-700 line-height-20 px-8">
            {" "}
            {intl.formatMessage({ id: "SessionPromptsp2" })}
          </p>
        </div>
      </div>
      {/* popup add new note */}
      <Modal
        show={showNewNoteModal}
        onHide={() => setShowNewNoteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            {intl.formatMessage({ id: "AddANote" })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                {intl.formatMessage({ id: "TextOfTheMemo" })}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={16}
                placeholder={intl.formatMessage({
                  id: "EnterTheTextOfTheNote",
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
            {intl.formatMessage({ id: "Cancel" })}
          </Button>
          <Button variant="success" onClick={handleNewAdd}>
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
            {intl.formatMessage({ id: "EditMemo" })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                {intl.formatMessage({ id: "TextOfTheMemo" })}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={16}
                placeholder={intl.formatMessage({
                  id: "EnterTheTextOfTheNote",
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
            onClick={() => setShowEditNoteModal(false)}
          >
            {intl.formatMessage({ id: "Cancel" })}
          </Button>
          <Button variant="primary" onClick={handleSaveTheEdit}>
            {intl.formatMessage({ id: "Save" })}
          </Button>
        </Modal.Footer>
      </Modal>
      {showModel && (
        <div className="modal fade">
          <ShowMore
            show={showModel}
            handleClose={() => setShowModel(false)}
            data={study?.info}
          />
        </div>
      )}
      <div className="modal fade" id="Rega_modal_Delete">
        <DeletePopup
          handleCloseDelete={() => setModalDShow(false)}
          showDelete={modalDShow}
        />
      </div>
      <div className="modal fade">
        <AddPopup show={modalShow} handleClose={() => setModalShow(false)} />
      </div>
    </>
  );
}
