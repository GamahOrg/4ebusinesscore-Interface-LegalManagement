import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { yupResolver } from "@hookform/resolvers/yup";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import {
  AddDocProps,
  AddDocSchema,
} from "../../../validations/add-doc-validation";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";

type AddNoteDocPopupProps = {
  show?: any;
  handleClose?: any;
  setDocuments?: any;
  selectedLKSource?: any;
};

const AddNoteDocPopup: React.FC<AddNoteDocPopupProps> = ({
  show,
  handleClose,
  setDocuments,
  selectedLKSource,
}) => {
  const intl = useIntl();
  const [attachments, setAttachments] = useState<
    { fileAsBinary: File; fileAsBase64: string; id: string; attachmentName: string }[]
  >([]);

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
             attachmentName: "", 
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

  const handleAttachmentNameChange = (id: string, name: string) => {
    setAttachments((prevAttachments) =>
      prevAttachments.map((attachment) =>
        attachment.id === id ? { ...attachment, attachmentName: name } : attachment
      )
    );
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

  const removeFile = (index: number) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((_, i) => i !== index)
    );
  };
  let language = intl.locale;
  const {
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<AddDocProps>({
    resolver: yupResolver(AddDocSchema),
    mode: "all",
    reValidateMode: "onSubmit",
  });
  const addDoc = () => {
    setDocuments?.((prev) => {
      const existingDoc = prev?.find(
        (doc) => doc.lK_AttachmentSourceId === selectedLKSource?.id
      );

      if (existingDoc) {
        return prev.map((doc) =>
          doc.lK_AttachmentSourceId === selectedLKSource?.id
            ? {
                ...doc,
                attachments: [
                  ...doc.attachments,
                  ...attachments.map((attachment) => ({
                    id: attachment?.id || uuidv4(),
                    filePath: "",
                    fileAsBinary: attachment?.fileAsBinary,
                    fileName: attachment?.fileAsBinary?.name,
                    fileAsBase64: attachment?.fileAsBase64,
                    attachmentName: attachment?.attachmentName,
                  })),
                ],
              }
            : doc
        );
      } else {
        return [
          ...prev,
          {
            lK_AttachmentSourceId: selectedLKSource?.id,
            lK_AttachmentSourceName: selectedLKSource?.name,
            attachments: attachments.map((attachment) => ({
              id: attachment?.id,
              filePath: "",
              fileAsBinary: attachment?.fileAsBinary,
              fileName: attachment?.fileAsBinary?.name,
              fileAsBase64: attachment?.fileAsBase64,
              attachmentName: attachment?.attachmentName,
            })),
          },
        ];
      }
    });

    showAlert(true, "AddedSuccessfully", intl, () => {
      handleClose();
      setValue("attachments", []);
      setAttachments([]);
    });
  };
  const [modalSize, setModalSize] = useState<"sm" | "lg" | "xl">("lg");
  useEffect(() => {
    const setSize = () => {
      const width = window.innerWidth;
      if (width < 576) {
        setModalSize("sm");
      } else if (width >= 576 && width < 992) {
        setModalSize("lg");
      } else {
        setModalSize("lg");
      }
    };

    setSize();
    window.addEventListener("resize", setSize);
    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, []);
  return (
    <>
      <Modal
        aria-labelledby="contained-modal-title-center"
        centered
        show={show}
        className={!show ? "inert" : ""}
        onHide={handleClose}
        size={modalSize}
        style={{ zIndex: 9999 }}
      >
        <div className="card w-100">
          <Modal.Header
            closeButton
            style={{
              alignItems: intl.locale === "ar" ? "flex-start" : "center",
              flexDirection: intl.locale === "en" ? "column-reverse" : "row",
            }}
          >
            <div className="card-header w-100 px-1 d-flex justify-content-center pb-2  border-bottom-0">
              <Modal.Title>
                <h3 className="card-title d-flex justify-content-center align-items-center flex-column">
                  <span className="card-label fs-4 my-5 fw-bolder">
                    {intl.formatMessage({
                      id: "Add",
                    })}{" "}
                    {intl.formatMessage({
                      id: "Doc",
                    })}
                  </span>
                </h3>
              </Modal.Title>
            </div>
          </Modal.Header>
          <form onSubmit={handleSubmit(addDoc)} className="form outputForm">
            <Modal.Body>
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
                    <div className="mt-3 d-flex flex-wrap align-items-center">
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
                             <span className="me-3">
                               {file?.fileAsBinary?.name}
                             </span>
                             <input
                               type="text"
                               className="form-control form-control-sm "
                               placeholder={intl.formatMessage({ id: "AttachmentName" }) || "Attachment Name"}
                               value={file.attachmentName}
                               onChange={(e) => handleAttachmentNameChange(file.id, e.target.value)}
                             />
                           </div>

                          <div
                            className="bg-danger w-20px h-20px cursor-pointer border-radius-50 d-flex align-items-center justify-content-center"
                            onClick={() => removeFile(index)}
                          >
                            X
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {DisplayErrorMessage(
                  errors?.attachments?.message,
                  intl,
                  language
                )}
              </div>
            </Modal.Body>

            <Modal.Footer className="justify-content-center py-2">
              <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
                <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                  <div className="d-flex gap-3 justify-content-center align-items-center w-50">
                    <div
                      className="btn btn-secondary text-center px-15"
                      onClick={() => {
                        handleClose();
                        setValue("attachments", []);
                        setAttachments([]);
                      }}
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </div>
                    <button
                      type="submit"
                      className="btn btn-success text-center px-15"
                    >
                      {intl.formatMessage({ id: "Agree" })}
                    </button>
                  </div>
                </div>
              </div>
            </Modal.Footer>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddNoteDocPopup;
