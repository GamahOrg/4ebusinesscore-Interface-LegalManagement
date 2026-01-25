import { EditPopup } from "@4eplatform/shared/src/popups/EditPopup";
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useIntl } from "react-intl";

type Props = {
  editNoteModal: boolean;
  setEditNoteModal: any;
  setIsAdded?: (isAdded: boolean) => void;
};
const EditNote: React.FC<Props> = ({
  editNoteModal,
  setEditNoteModal,


}) => {
  const intl = useIntl();
  const [modalShow, setShowEditNoteModal] = useState<boolean>(false);

  return (
    <>
      <Modal
        show={editNoteModal}
        onHide={setEditNoteModal}
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
            onClick={setEditNoteModal}
          >
            {intl.formatMessage({ id: "CANCEL" })}
          </Button>
          <Button variant="primary" onClick={() => setShowEditNoteModal(true)}>
            {intl.formatMessage({ id: "Save" })}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="modal fade" aria-hidden="true">
        <EditPopup
          showEdit={modalShow}
          handleCloseEdit={() => {
            setShowEditNoteModal(false);
            setEditNoteModal();
          }}
        />
      </div>
    </>
  );
};

export default EditNote;
