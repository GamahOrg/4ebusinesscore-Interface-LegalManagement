import { ChangeEvent, FC, useState } from "react";
import { useIntl } from "react-intl";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";

type PopupProps = {
  show: boolean;
  handleClose: () => void;
  withReason?: boolean;
  reasonRequired?: boolean;
  onConfirm?: () => void;
  title?: string;
  text?: string;
  confirmText?: string;
  cancelText?: string;
  successText?: string;
};

export const Prompts: FC<PopupProps> = ({
  show,
  handleClose,
  withReason = false,
  reasonRequired = false,
  onConfirm,
  title,
  text,
  confirmText,
  cancelText,
  successText,
}) => {
  const intl = useIntl();
  const [reason, setReason] = useState("");
  const [requiredValidation, setRequiredValidation] = useState(false);

  const handleReasonChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
    if (requiredValidation) setRequiredValidation(false);
  };

  const showSuccessAlert = () => {
    if (onConfirm) onConfirm();
    Swal.fire({
      timer: 2000,
      text: intl.formatMessage({ id: successText || "AddedSuccessfully" }),
      icon: "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: { confirmButton: "btn btn-primary" },
    });
  };

  const handleConfirm = () => {
    if (reasonRequired && !reason) {
      setRequiredValidation(true);
      return;
    }
    handleClose(); // Close the modal after confirmation
    showSuccessAlert();
  };

  const formatMessage = (id: string = "", defaultMessage: string) =>
    intl.formatMessage({ id: id || defaultMessage });

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="pb-0 border-bottom-0">
        <div className="w-100 text-center">
          <h2>{formatMessage(title, "AddPromptsSeesuion")}</h2>
        </div>
      </Modal.Header>

      <Modal.Body className="pb-0">
        <textarea
          className="form-control bg-light mb-3"
          placeholder={intl.formatMessage({ id: "AddPrompts" })}
          rows={8}
          value={reason}
          onChange={handleReasonChange}
        />
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
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-center border-top-0">
        <button
          type="button"
          className="btn btn-secondary me-3"
          onClick={handleClose} // Close the modal on cancel
        >
          {formatMessage(cancelText, "Cancel")}
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleConfirm} // Close and show success alert on confirm
        >
          {formatMessage(confirmText, "Add")}
        </button>
      </Modal.Footer>
    </Modal>
  );
};
