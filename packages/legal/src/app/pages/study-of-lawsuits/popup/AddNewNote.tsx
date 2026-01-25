import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import Swal from "sweetalert2";

type Props = {
  showNewNoteModal: boolean;
  setShowNewNoteModal: any;
  setIsAdded?: (isAdded: boolean) => void;
};
const AddNewNote: React.FC<Props> = ({
  showNewNoteModal,
  setShowNewNoteModal,
  setIsAdded,

}) => {
  const intl = useIntl();

  const showSuccessAlert = () => {
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


  return (
    <>
      <Modal show={showNewNoteModal} onHide={setShowNewNoteModal} centered>
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
          <Button variant="secondary" onClick={setShowNewNoteModal}>
            {intl.formatMessage({ id: "CANCEL" })}
          </Button>
          <Button
            variant="success"
            onClick={() => {
              showSuccessAlert();
              setShowNewNoteModal()
              setIsAdded?.(true)
            }}
          >
            {intl.formatMessage({ id: "Add" })}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddNewNote;
