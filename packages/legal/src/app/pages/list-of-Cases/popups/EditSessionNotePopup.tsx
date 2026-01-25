import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useIntl } from "react-intl";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../store/store";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { object, string } from "yup";
import {
  fetchSessionNoteById,
  putSessionNote,
} from "../../../features/session-note";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { useSelector } from "react-redux";
import { fetchCauseStageById } from "../../../features/cause-stage";
import { Spinner } from "react-bootstrap";

interface EditNotePopupProps {
  show: boolean;
  selectedSessionNoteId?: any;
  handleClose: () => void;
}

export const noteValidationSchema = object({
  note: string()
    .required("ThisFelidIsRequired")
    .typeError("ThisFelidIsRequired")
    .test("not-only-whitespace", "InputFieldIsRequried", (value: any) => {
      return value?.trim()?.length > 0;
    }),
});

const EditSessionNotePopup = ({
  show,
  handleClose,
  selectedSessionNoteId,
}: EditNotePopupProps) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  let [loading, setLoading] = useState(false);
  const [attachments, setAttachments] = useState<any[]>([]);
  let [selectedLKSource, setSelectedLKSource] = useState<any>({ id: 1 });

  useEffect(() => {
    if (selectedSessionNoteId) {
      dispatch(fetchSessionNoteById(selectedSessionNoteId) as any);
    }
  }, [selectedSessionNoteId]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(noteValidationSchema),
    mode: "onChange",
  });

  let sessionNoteDetails = useSelector((state: RootState) => {
    return state?.sessionNote?.sessionNote;
  });

  useEffect(() => {
    setValue("note", sessionNoteDetails?.description);
    // Set existing attachments from the attachments array structure
    if (sessionNoteDetails?.attachments) {
      const existingAttachments = sessionNoteDetails.attachments.flatMap(
        (attachment) =>
          attachment.sourceAttachments?.map((sourceAttachment) => ({
            id: sourceAttachment.id,
            attachmentName: sourceAttachment.attachmentName,
            fileName: sourceAttachment.fileName,
            filePath: sourceAttachment.filePath,
            isNew: false,
          })) || []
      );
      setAttachments(existingAttachments);
    }
  }, [sessionNoteDetails]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newAttachments = Array.from(files).map((file) => ({
        attachmentFile: file,
        attachmentName: file.name.split(".")[0], // Use filename without extension as default name
        fileName: file.name,
        isNew: true, // Flag to identify new files
      }));
      setAttachments([...attachments, ...newAttachments]);
    }
    event.target.value = "";
  };

  const removeAttachment = (index: number) => {
    const updatedAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(updatedAttachments);
  };

  const handleAttachmentNameChange = (fileId: string, newName: string) => {
    const updatedAttachments = attachments.map((attachment, index) => {
      const currentId = attachment.id || `new_${index}`;
      return currentId === fileId
        ? { ...attachment, attachmentName: newName }
        : attachment;
    });
    setAttachments(updatedAttachments);
  };

  const getIconSrc = (
    fileName: string,
    file: File | null,
    filePath: string
  ) => {
    if (file) {
      // For new files, determine icon based on file type
      const extension = fileName?.split(".").pop()?.toLowerCase();
      switch (extension) {
        case "pdf":
          return "/path/to/pdf-icon.png"; // Replace with actual path
        case "png":
        case "jpg":
        case "jpeg":
          return URL.createObjectURL(file);
        default:
          return "/path/to/default-icon.png"; // Replace with actual path
      }
    } else {
      // For existing files, use filePath or determine by extension
      const extension = fileName?.split(".").pop()?.toLowerCase();
      switch (extension) {
        case "pdf":
          return "/path/to/pdf-icon.png";
        case "png":
        case "jpg":
        case "jpeg":
          return filePath || "/path/to/image-icon.png";
        default:
          return "/path/to/default-icon.png";
      }
    }
  };

  const handleSubmitNote = (formValues: any) => {
    let formData = new FormData();
    formData.append("id", selectedSessionNoteId as string);
    formData.append("sessionId", sessionNoteDetails?.sessionId as string);
    formData.append("causeId", sessionNoteDetails?.causeId);
    formData.append("causeStageId", sessionNoteDetails?.causeStageId);
    formData.append("description", formValues?.note);

    // Append attachments to FormData
    let globalAttachmentIndex = 0;

    attachments.forEach((attachment) => {
      if (attachment.isNew && attachment.attachmentFile) {
        // New file attachment
        formData.append(
          `sessionNoteAttachmentDtos[${globalAttachmentIndex}].attachmentFile`,
          attachment.attachmentFile
        );
        formData.append(
          `sessionNoteAttachmentDtos[${globalAttachmentIndex}].attachmentName`,
          attachment.attachmentName
        );
        formData.append(
          `sessionNoteAttachmentDtos[${globalAttachmentIndex}].lK_AttachmentSourceId`,
          selectedLKSource.id.toString()
        );
      }

      const removedAttachemets =
        sessionNoteDetails.attachments[0].sourceAttachments.filter(
          (item1) => !attachments.some((item2) => item2.id === item1.id)
        );

      removedAttachemets.forEach((attachment, index) => {
        formData.append(`odAttachmenPaths[${index}]`, attachment.filePath);
      });

      globalAttachmentIndex++;
    });

    setLoading(true);
    dispatch(
      putSessionNote({ id: selectedSessionNoteId, body: formData }) as any
    ).then((res) => {
      if (res?.payload?.statusEnum == 1) {
        setLoading(false);
        showAlert(true, "SavedSuccessfully", intl);
        dispatch(
          fetchCauseStageById({
            CauseStageId: sessionNoteDetails?.causeStageId,
          })
        );
        handleClose();
      } else if (res?.payload?.message == "You can't update session note") {
        showAlert(false, "YouCan'tUpdateSessionNote", intl);
        setLoading(false);
      } else if (res?.payload?.message) {
        showAlert(false, "YouCan'tUpdateSessionNote", intl);
        setLoading(false);
      }
    });
  };

  return (
    <Modal size="lg" show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center position-relative">
          {intl.formatMessage({ id: "EditMemorandum" })}
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(handleSubmitNote)}>
        <Modal.Body>
          <div className="p-1">
            <label className="text-muted required mb-3">
              {intl.formatMessage({ id: "Memo" })}
            </label>
            <div className="bg-light rounded p-2">
              <textarea
                className="form-control"
                rows={10}
                {...register("note")}
                placeholder={intl.formatMessage({ id: "EnterMemo" })}
              />
            </div>
            {DisplayErrorMessage(errors?.note?.message, intl, intl.locale)}
          </div>

          {/* Attachment Section */}
          <div className="p-1 mt-3">
            <label className="text-muted mb-3">
              {intl.formatMessage({ id: "Attachments" })}
            </label>
            <div className="h-fit notice bg-light-primary rounded border-primary border border-dashed p-5">
              <label
                htmlFor="outputAttachment"
                className="form-label dropzone-select uploadFile-style inputAreaHeight"
              >
                <div role="button" className="d-flex align-items-center">
                  <div className="py-auto ps-3">
                    <i className="fa-solid fa-link fs-1 text-primary"></i>
                  </div>
                  <div className="row py-auto">
                    <span className="text-primary fw-bolder">
                      {intl.formatMessage({
                        id: "DragAndDropOrChooseFilesFromComputer",
                      })}
                    </span>
                    <span className="pt-3 pb-2">
                      {intl.formatMessage({
                        id: "SupportFollowingFormats",
                      })}{" "}
                      pdf , png , jpeg
                    </span>
                  </div>
                </div>
              </label>
              <div
                className="dropzone dropzone-queue"
                id="kt_dropzonejs_example_3"
              >
                <div className="dropzone-panel">
                  <input
                    multiple
                    type="file"
                    id="outputAttachment"
                    name="attachments"
                    onChange={handleFileChange}
                    placeholder={intl.formatMessage({ id: "FileUpload" })}
                    className="dropzone-select uploadFile-style inputAreaHeight d-none"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                  />
                </div>
              </div>
              {attachments?.length > 0 && (
                <div className="mt-3 d-flex flex-wrap align-items-center w-100">
                  {attachments?.map((attachment, index) => (
                    <div
                      key={index}
                      className="d-flex justify-content-between align-items-center mt-2 mx-2 w-100"
                    >
                      <div className="d-flex align-items-center flex-grow-1">
                        <img
                          src={getIconSrc(
                            attachment.fileName,
                            attachment.isNew ? attachment.attachmentFile : null,
                            attachment.filePath || ""
                          )}
                          className="w-30px h-30px border-radius-50 me-2"
                          alt={attachment.fileName}
                        />
                        <span className="me-3">{attachment.fileName}</span>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder={
                            intl.formatMessage({ id: "AttachmentName" }) ||
                            "Attachment Name"
                          }
                          value={attachment.attachmentName}
                          onChange={(e) =>
                            handleAttachmentNameChange(
                              attachment.id || `new_${index}`,
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div
                        className="bg-danger w-20px h-20px cursor-pointer border-radius-50 d-flex align-items-center justify-content-center"
                        onClick={() => removeAttachment(index)}
                      >
                        X
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-end gap-2">
          <Button
            variant="light"
            onClick={() => {
              handleClose();
              setLoading(false);
            }}
            className="px-4"
          >
            {intl.formatMessage({ id: "Cancel" })}
          </Button>
          {!loading ? (
            <Button type="submit" className="px-4 btn btn-primary">
              {intl.formatMessage({ id: "Save" })}
            </Button>
          ) : (
            <Button variant="success" disabled className="px-15 w-25">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="mx-2"
              />
              <span>{intl.formatMessage({ id: "Adding" })}</span>
            </Button>
          )}
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default EditSessionNotePopup;
