import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useIntl } from "react-intl";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { postSessionNote } from "../../../features/session-note";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Button, Spinner } from "react-bootstrap";
import {
  CauseStageDocProps,
  CauseStageDocSchema,
} from "../../../validations/add-cause-stage-doc-validation";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchAllCauseStageAttachments } from "../../../features/cause-stage";
import { AttachmentSourceModel } from "../../../models/AttachmentSourceModel";

type AddDocPopupProps = {
  show?: any;
  handleClose?: any;
  causeStageId?: string;
};

const AddCauseStageDocPopup: React.FC<AddDocPopupProps> = ({
  show,
  handleClose,
  causeStageId,
}) => {
  const intl = useIntl();
  let language = intl.locale;
  let { id: caseId } = useParams();
  const [attachments, setAttachments] = useState<
    {
      fileAsBinary: File;
      fileAsBase64: string;
      id: string;
      attachmentName?: string;
    }[]
  >([]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newAttachments: {
        fileAsBinary: File;
        fileAsBase64: string;
        id: string;
        attachmentName?: string;
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
  const removeFile = (sourceIds: number[], attachmentId: string) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((attachment) => attachment?.id !== attachmentId)
    );
    setDocuments((prevDocs) =>
      prevDocs.map((doc) => {
        if (sourceIds.includes(doc.lK_AttachmentSourceId)) {
          return {
            ...doc,
            attachments: doc.attachments.filter(
              (att) => att.id !== attachmentId
            ),
          };
        }
        return doc;
      })
    );
  };

  const handleAttachmentNameChange = (
    attachmentId: string,
    newName: string
  ) => {
    setAttachments((prevAttachments) =>
      prevAttachments.map((attachment) =>
        attachment.id === attachmentId
          ? { ...attachment, attachmentName: newName }
          : attachment
      )
    );
  };
  let [loading, setLoading] = useState(false);
  let dispatch = useDispatch();
  let [documents, setDocuments] = useState<any>([]);
  let lkAttachmentSources = useSelector((state: RootState) => {
    return state?.attachmentSource?.lkAttachmentSources;
  });
  const [selectedLKSources, setSelectedLKSources] = useState<
    AttachmentSourceModel[]
  >([]);

  const handleCheckboxChange = (
    source: AttachmentSourceModel,
    isChecked: boolean
  ) => {
    if (isChecked) {
      setSelectedLKSources((prev) => [...prev, source]);
    } else {
      setSelectedLKSources((prev) =>
        prev.filter((item) => item.id !== source.id)
      );
    }

    const selectedIds = isChecked
      ? [...selectedLKSources.map((s) => s.id), source.id]
      : selectedLKSources.filter((s) => s.id !== source.id).map((s) => s.id);

    setValue("lK_AttachmentSourceIds", selectedIds);
    trigger("lK_AttachmentSourceIds");
  };
  useEffect(() => {
    setDocuments((prev) => {
      return selectedLKSources?.map((source) => {
        return {
          lK_AttachmentSourceId: source?.id,
          lK_AttachmentSourceName:
            intl.locale == "ar" ? source?.nameAr : source?.nameEn,
          attachments: prev?.attachments?.length
            ? [...prev?.attachments]
            : attachments,
        };
      });
    });
  }, [selectedLKSources]);
  useEffect(() => {
    setDocuments((prev) => {
      return selectedLKSources?.map((source: AttachmentSourceModel) => {
        return {
          lK_AttachmentSourceId: source?.id,
          lK_AttachmentSourceName:
            intl.locale == "ar" ? source?.nameAr : source?.nameEn,
          attachments,
        };
      });
    });
  }, [attachments]);
  const {
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<CauseStageDocProps>({
    resolver: yupResolver(CauseStageDocSchema),
    mode: "all",
    reValidateMode: "onSubmit",
  });
  let theme = localStorage.getItem("Theme");
  let addNote = (formValues: CauseStageDocProps) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("causeId", caseId as string);
    if (causeStageId) {
      formData.append("causeStageId", causeStageId as string);
    }
    formData.append("description", "test");
    documents?.forEach((document, documentIndex) => {
      let mappedAttachments = document?.attachments?.map((attachment) => {
        return attachment?.fileAsBinary;
      });
      mappedAttachments?.forEach((attachment, attachmentIndex) => {
        formData.append(
          `sessionNoteAttachmentDtos[${documentIndex}].attachmentFile`,
          attachment
        );

        const attachmentWithName = document?.attachments?.[attachmentIndex];
        formData.append(
          `sessionNoteAttachmentDtos[${documentIndex}].attachmentName`,
          attachmentWithName?.attachmentName || ""
        );
      });
      let documentsForLKAttachmentSourceId = documents?.filter((doc) => {
        return doc?.lK_AttachmentSourceId == document?.lK_AttachmentSourceId;
      });
      if (
        documentsForLKAttachmentSourceId
          ?.map((item) => {
            return item?.attachments;
          })
          ?.flat()?.length > 0
      ) {
        formData.append(
          `sessionNoteAttachmentDtos[${documentIndex}].LK_AttachmentSourceId`,
          document?.lK_AttachmentSourceId
        );
      }
    });

    dispatch(postSessionNote(formData) as any).then((res) => {
      if (res?.payload?.statusEnum == 1) {
        showAlert(true, "AddedSuccessfully", intl, () => {
          setLoading(false);
          handleClose();
          setValue("attachments", []);
          setValue("lK_AttachmentSourceIds", []);
          setSelectedLKSources([]);
          setAttachments([]);
          setDocuments([]);
          let params = {
            causeId: caseId,
          };
          dispatch(fetchAllCauseStageAttachments(params) as any);
        });
      } else if (res?.payload?.message == "You can't add session note") {
        setLoading(false);
        showAlert(false, "YouCan'tAddDoc", intl);
      } else if (res?.payload?.message) {
        setLoading(false);
        showAlert(false, "YouCan'tAddDoc", intl);
      }
    });
  };
  let handleReset = () => {
    setValue("attachments", []);
    setValue("lK_AttachmentSourceIds", []);
    setAttachments([]);
    setDocuments([]);
    handleClose();
    setSelectedLKSources([]);
  };
  return (
    <>
      <Modal
        aria-labelledby="contained-modal-title-center"
        centered
        show={show}
        className={!show ? "inert" : ""}
        onHide={handleClose}
      >
        <div className="card w-600px">
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
          <form className="form outputForm" onSubmit={handleSubmit(addNote)}>
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
                    <div className="mt-3 d-flex flex-column gap-3">
                      {attachments?.map((file, index) => (
                        <div
                          key={index}
                          className="d-flex flex-column border rounded p-3"
                        >
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <div className="d-flex align-items-center">
                              <img
                                src={getIconSrc(
                                  file?.fileAsBinary?.name,
                                  file?.fileAsBinary,
                                  ""
                                )}
                                className="w-30px h-30px border-radius-50 me-2"
                                alt=""
                              />
                              <span className="me-2">
                                {file?.fileAsBinary?.name}
                              </span>
                            </div>

                            <div
                              className="bg-danger w-20px h-20px cursor-pointer border-radius-50 d-flex align-items-center justify-content-center"
                              onClick={() =>
                                removeFile(
                                  selectedLKSources?.map((item) => {
                                    return item?.id;
                                  }),
                                  file?.id
                                )
                              }
                            >
                              X
                            </div>
                          </div>

                          <div className="mt-2">
                            <label className="form-label text-muted small">
                              {intl.formatMessage({ id: "AttachmentName" }) ||
                                "Attachment Name"}
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder={
                                intl.formatMessage({
                                  id: "EnterAttachmentName",
                                }) || "Enter attachment name"
                              }
                              value={file?.attachmentName || ""}
                              onChange={(e) =>
                                handleAttachmentNameChange(
                                  file?.id,
                                  e.target.value
                                )
                              }
                            />
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
              <Row className="mt-4">
                <Col xs={12} md={12} lg={12} className="mt-5 mb-lg-0">
                  <h5 className="mb-5 mx-1 mt-2 required">
                    {intl.formatMessage({
                      id: "Sources",
                    })}
                  </h5>
                  <div
                    className={`d-flex  bg-${
                      theme == "dark" ? "light" : "white"
                    } p-3 rounded border flex-wrap  searchBorder align-items-center`}
                  >
                    {lkAttachmentSources?.map((lkAttachmentSource, index) => (
                      <div
                        key={lkAttachmentSource?.id}
                        className="form-check d-flex align-items-center me-1 mb-3"
                      >
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            handleCheckboxChange(
                              lkAttachmentSource,
                              e.target.checked
                            )
                          }
                          id={`lkAttachmentSource-${lkAttachmentSource?.id}`}
                          name="lkAttachmentSource"
                          className="form-check-input me-2"
                          checked={selectedLKSources?.some(
                            (s) => s.id === lkAttachmentSource.id
                          )}
                        />
                        <label
                          htmlFor={`lkAttachmentSource-${lkAttachmentSource?.id}`}
                          className="form-check-label"
                        >
                          {intl.locale == "ar"
                            ? lkAttachmentSource?.nameAr
                            : lkAttachmentSource?.nameEn}
                        </label>
                      </div>
                    ))}
                  </div>
                  {DisplayErrorMessage(
                    errors?.lK_AttachmentSourceIds?.message,
                    intl,
                    language
                  )}
                </Col>
              </Row>
            </Modal.Body>

            <Modal.Footer className="justify-content-center py-2">
              <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
                <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                  <div className="d-flex gap-3 justify-content-center align-items-center w-50">
                    <div
                      className="btn btn-secondary text-center px-15"
                      onClick={handleReset}
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </div>
                    {!loading ? (
                      <button
                        type="submit"
                        className="btn btn-success text-center px-15"
                      >
                        {intl.formatMessage({ id: "Agree" })}
                      </button>
                    ) : (
                      <Button
                        variant="success"
                        disabled
                        className="px-15 w-100"
                      >
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

export default AddCauseStageDocPopup;
