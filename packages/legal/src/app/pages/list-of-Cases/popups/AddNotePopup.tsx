import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useIntl } from "react-intl";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RootState, useAppDispatch } from "../../../store/store";
import { useParams } from "react-router-dom";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { mixed, object, string } from "yup";
import { postSessionNote } from "../../../features/session-note";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { Spinner } from "react-bootstrap";
import { fetchCauseStageById } from "../../../features/cause-stage";
import { v4 as uuidv4 } from "uuid";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import { useSelector } from "react-redux";
import { fetchAllLkAttachmentSources } from "../../../features/attachment-source";

interface AddNotePopupProps {
  show: boolean;
  causeStageId: string;
  sessionId: string;
  handleClose: () => void;
}

export const noteValidationSchema = object({
  note: string()
    .required("ThisFelidIsRequired")
    .typeError("ThisFelidIsRequired")
    .test("not-only-whitespace", "InputFieldIsRequried", (value: any) => {
      return value?.trim()?.length > 0;
    }),
  attachments: mixed().optional().nullable(),
});

const AddNotePopup = ({
  show,
  handleClose,
  causeStageId,
  sessionId,
}: AddNotePopupProps) => {
  const intl = useIntl();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  let language = intl.locale;
  let [loading, setLoading] = useState(false);
  let [documents, setDocuments] = useState<any>([]);
  let [selectedLKSource, setSelectedLKSource] = useState<any>({ id: 1 });
  const [attachments, setAttachments] = useState<
    {
      fileAsBinary: File;
      fileAsBase64: string;
      id: string;
      attachmentName: string;
    }[]
  >([]);

  let lkAttachmentSources: any = useSelector((state: RootState) => {
    return state?.attachmentSource?.lkAttachmentSources;
  });

  useEffect(() => {
    dispatch(
      fetchAllLkAttachmentSources({
        pageSize: "10000",
      }) as any
    );
  }, []);

  console.log(lkAttachmentSources);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newAttachments: {
        fileAsBinary: File;
        fileAsBase64: string;
        id: string;
        attachmentName: string;
      }[] = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          newAttachments.push({
            id: uuidv4(),
            fileAsBinary: file,
            fileAsBase64: reader.result as string,
            attachmentName: "", // Empty by default
          });
          if (newAttachments.length === files.length) {
            setAttachments((prevAttachments) => [
              ...prevAttachments,
              ...newAttachments,
            ]);
          }
        };
      });
    }
  };

  useEffect(() => {
    setValue(
      "attachments",
      attachments?.map((attachment) => {
        return attachment?.fileAsBinary;
      })
    );
    if (attachments?.length) {
      trigger("attachments");
    }
  }, [attachments]);

  const handleAttachmentNameChange = (id: string, name: string) => {
    setAttachments((prevAttachments) =>
      prevAttachments.map((attachment) =>
        attachment.id === id
          ? { ...attachment, attachmentName: name }
          : attachment
      )
    );
  };

  const removeFile = (index: number) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((_, i) => i !== index)
    );
  };

  const addDoc = () => {
    const newAttachments = attachments.map((attachment) => ({
      id: attachment?.id || uuidv4(),
      filePath: "",
      fileAsBinary: attachment?.fileAsBinary,
      fileName: attachment?.fileAsBinary?.name,
      fileAsBase64: attachment?.fileAsBase64,
      attachmentName: attachment?.attachmentName,
    }));

    setDocuments((prev) => {
      const existingDoc = prev?.find(
        (doc) => doc.lK_AttachmentSourceId === selectedLKSource?.id
      );

      if (existingDoc) {
        return prev.map((doc) =>
          doc.lK_AttachmentSourceId === selectedLKSource?.id
            ? { ...doc, attachments: [...doc.attachments, ...newAttachments] }
            : doc
        );
      } else {
        return [
          ...prev,
          {
            lK_AttachmentSourceId: selectedLKSource?.id,
            lK_AttachmentSourceName: selectedLKSource?.name,
            attachments: newAttachments,
          },
        ];
      }
    });
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(noteValidationSchema),
    defaultValues: {
      note: "",
      attachments: null,
    },
    mode: "onChange",
  });

  const handleSubmitNote = ({
    data,
    newAttachments,
  }: {
    data: any;
    newAttachments: any[];
  }) => {
    const formData = new FormData();
    formData.append("causeId", String(id));
    formData.append("causeStageId", causeStageId);
    formData.append("sessionId", sessionId);
    formData.append("description", data?.note);
    // formData.append("sessionNoteAttachmentDtos", data?.image?.[0]);
    // Append each attachment in the correct structure
    let globalAttachmentIndex = 0;
    newAttachments?.forEach((document) => {
      document?.attachments?.forEach((attachment) => {
        formData.append(
          `sessionNoteAttachmentDtos[${globalAttachmentIndex}].attachmentFile`,
          attachment?.fileAsBinary
        );

        formData.append(
          `sessionNoteAttachmentDtos[${globalAttachmentIndex}].lK_AttachmentSourceId`,
          document?.lK_AttachmentSourceId
        );

        formData.append(
          `sessionNoteAttachmentDtos[${globalAttachmentIndex}].attachmentName`,
          attachment?.attachmentName
        );

        globalAttachmentIndex++;
      });
    });
    setLoading(true);
    dispatch(postSessionNote(formData)).then((res: any) => {
      if (
        res?.payload?.message === "SessionNoteIsAddedSuccessfully" ||
        res?.payload?.statusEnum === 1
      ) {
        setLoading(false);
        dispatch(fetchCauseStageById({ causeStageId }));
        showAlert(true, "AddedSuccessfully", intl);
      } else if (res?.payload?.message == "نوع الملف غير مسموح.") {
        showAlert(false, "FileTypeNotAllowed", intl);
        setLoading(false);
      } else {
        setLoading(false);
        showAlert(false, "AnErrorOccurred", intl);
      }
      reset();
      handleClose();
      setDocuments([]);
      setAttachments([]);
    });
  };

  return (
    <Modal size="lg" show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center position-relative">
          {intl.formatMessage({ id: "AddMemorandum" })}
        </Modal.Title>
      </Modal.Header>
      <form
        onSubmit={handleSubmit((data) => {
          // Build the documents structure directly
          const newAttachments = attachments.map((attachment) => ({
            id: attachment?.id || uuidv4(),
            filePath: "",
            fileAsBinary: attachment?.fileAsBinary,
            fileName: attachment?.fileAsBinary?.name,
            fileAsBase64: attachment?.fileAsBase64,
            attachmentName: attachment?.attachmentName,
          }));

          // Build the complete documents structure
          const updatedDocuments = (() => {
            const existingDoc = documents?.find(
              (doc) => doc.lK_AttachmentSourceId === selectedLKSource?.id
            );

            if (existingDoc) {
              return documents.map((doc) =>
                doc.lK_AttachmentSourceId === selectedLKSource?.id
                  ? {
                      ...doc,
                      attachments: [...doc.attachments, ...newAttachments],
                    }
                  : doc
              );
            } else {
              return [
                ...documents,
                {
                  lK_AttachmentSourceId: selectedLKSource?.id,
                  lK_AttachmentSourceName: selectedLKSource?.name,
                  attachments: newAttachments,
                },
              ];
            }
          })();

          // Update the state for UI purposes
          setDocuments(updatedDocuments);

          // Submit with the built documents structure
          return handleSubmitNote({
            data,
            newAttachments: updatedDocuments,
          });
        })}
      >
        <Modal.Body>
          <div className="p-1">
            <label className="text-muted required mb-3">
              {" "}
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
          <div className="row">
            <h5 className="mb-5 mx-1 mt-2 required">
              {intl.formatMessage({
                id: "Documents",
              })}
            </h5>

            <div className="h-fit notice bg-light-primary rounded border-primary border border-dashed p-5">
              <label
                htmlFor="outputAttachment"
                className="form-label  dropzone-select  uploadFile-style inputAreaHeight"
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
                      {" "}
                      {intl.formatMessage({
                        id: "SupportFollowingFormats",
                      })}{" "}
                      pdf , png , jpeg
                    </span>
                  </div>
                </div>
              </label>
              <div
                className="dropzone dropzone-queue "
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
                    className="dropzone-select  uploadFile-style inputAreaHeight d-none"
                  />
                </div>
              </div>
              {attachments?.length > 0 && (
                <div className="mt-3 d-flex flex-wrap align-items-center w-100">
                  {attachments?.map((file, index) => (
                    <div
                      key={index}
                      className="d-flex justify-content-between align-items-center mt-2 mx-2 w-100"
                    >
                      <div className="d-flex align-items-center flex-grow-1">
                        <img
                          src={getIconSrc(
                            file?.fileAsBinary?.name,
                            file?.fileAsBinary,
                            ""
                          )}
                          className="w-30px h-30px border-radius-50 me-2"
                          alt={file?.fileAsBinary?.name}
                        />
                        <span className="me-3">{file?.fileAsBinary?.name}</span>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder={
                            intl.formatMessage({ id: "AttachmentName" }) ||
                            "Attachment Name"
                          }
                          value={file.attachmentName}
                          onChange={(e) =>
                            handleAttachmentNameChange(file.id, e.target.value)
                          }
                        />
                      </div>

                      <div
                        className="bg-danger w-20px h-20px cursor-pointer border-radius-50 mx-1 p-1 d-flex align-items-center justify-content-center"
                        onClick={() => removeFile(index)}
                      >
                        X
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {DisplayErrorMessage(errors?.attachments?.message, intl, language)}
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-end gap-2">
          <Button variant="light" onClick={handleClose} className="px-4">
            {intl.formatMessage({ id: "Cancel" })}
          </Button>
          {!loading ? (
            <Button type="submit" className="px-4 btn btn-primary">
              {intl.formatMessage({ id: "Save" })}{" "}
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

export default AddNotePopup;
