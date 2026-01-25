import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../../store/store";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { useParams } from "react-router-dom";
import {
  editCauseComment,
  fetchAllCauseComments,
  fetchCouseCommentById,
} from "../../../features/cause-comments";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  EditCauseCommentProps,
  EditCauseCommentSchema,
} from "../validations/EditCauseCommentSchema";
interface EditCauseCommentPopupProps {
  show: boolean;
  handleClose: () => void;
  pageSize?: number;
  pageIndex?: number;
  selectedComment?: string;
}
interface Attachment {
  id: string;
  filePath: string;
  fileName: string;
  attchmentName?: string;
}
interface CombinedAttachment {
  file?: File;
  id?: string;
  fileName: string;
  isExisting?: boolean;
  filePath?: string;
  attchmentName?: string;
}

const EditCauseCommentPopup = ({
  show,
  handleClose,
  pageSize,
  pageIndex,
  selectedComment,
}: EditCauseCommentPopupProps) => {
  const dispatch = useAppDispatch();
  const intl = useIntl();
  let { id: caseId } = useParams();
  const FetchDataById = () => {
    dispatch(fetchCouseCommentById({ Id: selectedComment }) as any);
  };
  useEffect(() => {
    if (selectedComment) FetchDataById();
  }, []);
  const commentData = useSelector(
    (state: RootState) => state?.causecomments?.comment
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    trigger,
    setError,
  } = useForm<EditCauseCommentProps>({
    resolver: yupResolver(EditCauseCommentSchema),
    mode: "all",
    defaultValues: {
      attachments: [],
      comment: "",
    },
  });
  useEffect(() => {
    if (commentData) {
      setValue("comment", commentData?.comment);
      setAttachments(
        commentData?.attchments
          ? commentData?.attchments.map((att) => ({
              fileName: att.fileName,
              filePath: att.filePath,
              isExisting: true,
            }))
          : []
      );
    }
  }, [commentData]);
  useEffect(() => {
    register("attachments");
  }, [register]);
  const [attachments, setAttachments] = useState<CombinedAttachment[]>([]);
 
  function handleCustomNameChange(index: number, newName: string) {
    const updated = [...attachments];
    updated[index].attchmentName = newName;
    setAttachments(updated);
   
    const formAttachments = updated.map(att => ({
      file: att.file,
      fileName: att.attchmentName || att.fileName,
      isExisting: att.isExisting || false
    }));
    setValue("attachments", formAttachments, { shouldValidate: true });
  }
  
  const removeAttachment = (index: number) => {
    setAttachments((prev) => {
      const newAttachments = prev.filter((_, i) => i !== index);
      
      const formAttachments = newAttachments.map(att => ({
        file: att.file,
        fileName: att.attchmentName || att.fileName,
        isExisting: att.isExisting || false
      }));
      setValue("attachments", formAttachments);
      return newAttachments;
    });
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesUploaded = event.target.files;
    if (filesUploaded) {
      const files = Array.from(filesUploaded);
      setAttachments((prevAttachments) => {
        const newAttachments = [
          ...prevAttachments,
          ...files.map((file) => ({
            file,
            fileName: file.name,
            isExisting: false,
          })),
        ];
      
        const formAttachments = newAttachments.map(att => ({
          file: att.file,
          fileName: (att as CombinedAttachment).attchmentName || att.fileName,
          isExisting: att.isExisting || false
        }));
        setValue("attachments", formAttachments);
        return newAttachments;
      });
    }
  };

  const onSubmit = async (data: any) => {
    const existingAttachments = attachments.filter((att) => att.isExisting);
    const newAttachments = attachments.filter((att) => !att.isExisting);
   
    let hasError = false;
    newAttachments.forEach((att, index) => {
      if (!att.attchmentName || att.attchmentName.trim() === "") {
        setError(`attachments.${index}.fileName`, {
          type: "manual",
          message: "AttachmentNameIsRequired",
        });
        hasError = true;
      }
    });

    if (hasError) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("Id", selectedComment || "");
      formData.append("CauseId", caseId || "");
      formData.append("Comment", data?.comment);
    
      if (existingAttachments.length > 0) {
        existingAttachments.forEach((att) => {
          formData.append("OldAttachmentsPaths", att.filePath as string);
        });
      } else {
       
        formData.append("OldAttachmentsPaths", "");
      }
      newAttachments?.forEach((att, index: number) => {
        if (att?.file) {
          formData.append(`Attachments[${index}].file`, att.file);
        }
        if (att?.attchmentName) {
          formData.append(`Attachments[${index}].fileName`, att.attchmentName);
        }
      });
      const response = (await dispatch(editCauseComment(formData))) as any;
      if (
        response?.payload?.message == "UpdatedSuccessfully" ||
        response?.payload?.statusEnum == 1
      ) {
        showAlert(
          true,
          intl.formatMessage({ id: "ModifiedSuccessfully" }),
          intl
        );
        handleClose();
        reset();
        dispatch(
          fetchAllCauseComments({
            PageSize: pageSize,
            PageNumber: pageIndex,
            CauseId: caseId,
          }) as any
        );
      } else {
        showAlert(false, intl.formatMessage({ id: "AnErrorOccurred" }), intl);
      }
    } catch (error) {
      console.error("Error updating judgment:", error);
      showAlert(false, "AnErrorOccurred", intl);
    }
  };
  return (
    <>
      <Modal
        className={!show ? "inert" : ""}
        size="lg"
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center w-100">
            {" "}
            {intl.formatMessage({ id: "EditComment" })}
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="py-5">
              <div className="row">
                <div className="col-12  mb-5">
                  <div className="mb-3">
                    <label className="form-label required text-muted">
                      {" "}
                      {intl.formatMessage({ id: "TheComment" })}{" "}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="special fas fa-gavel"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className={`form-control`}
                        placeholder={intl.formatMessage({
                          id: "TheComment",
                        })}
                        {...register("comment")}
                      />
                    </div>
                    {errors?.comment &&
                      DisplayErrorMessage(
                        errors?.comment?.message,
                        intl,
                        intl.locale
                      )}
                  </div>
                </div>
                <div className="col-12 mt-3 mb-3">
                  <label className="mb-2 form-label text-muted small required">
                    {intl.formatMessage({ id: "Document" })}
                  </label>

                  <div className="notice d-flex flex-column bg-light-primary rounded border-primary border border-dashed p-5">
                    <label
                      htmlFor="outputAttachment"
                      className="form-label  dropzone-select  uploadFile-style inputAreaHeight w-100"
                    >
                      {Array.isArray(attachments) && attachments?.length > 0 ? (
                        <>
                          <div
                            role="button"
                            className="d-flex align-items-center h-100 mt-1"
                          >
                            <div className="py-auto ps-3">
                              <i className="fa-solid fa-link fs-1 text-primary"></i>
                            </div>
                            <div className="row py-auto flex-wrap my-3">
                              {attachments?.map((attachment, index) => {
                                const newIndex = attachments
                                  .filter((a) => !a.isExisting)
                                  .findIndex((a) => a === attachment);
                                return (
                                  <div
                                    className="d-flex align-items-center justify-content-between my-3"
                                    key={index}
                                  >
                                    <span className="text-primary fw-bolder me-2  w-40">
                                      {attachment?.file?.name ||
                                        attachment?.fileName}
                                    </span>
                                    
                                    {!attachment?.isExisting && (
                                      <div>
                                        <input
                                          type="text"
                                          className="form-control form-control-sm me-2 w-100 my-4 "
                                          placeholder={intl.formatMessage({
                                            id: "EnterAttachmentName",
                                          })}
                                          value={
                                            attachment.isExisting
                                              ? attachment.fileName
                                              : attachment?.attchmentName
                                          }
                                          onChange={(e) =>
                                            handleCustomNameChange(
                                              index,
                                              e.target.value
                                            )
                                          }
                                        />
                                        {errors?.attachments?.[newIndex]
                                          ?.fileName &&
                                          DisplayErrorMessage(
                                            errors.attachments[newIndex]
                                              ?.fileName?.message,
                                            intl,
                                            intl.locale
                                          )}
                                      </div>
                                    )}

                                    <button
                                      type="button"
                                      className="btn btn-link text-danger p-0 flex-shrink-0"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        removeAttachment(index);
                                      }}
                                    >
                                      <i className="fas fa-trash"></i>
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            role="button"
                            className="d-flex align-items-center"
                          >
                            <div className="py-auto px-3">
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
                        </>
                      )}
                    </label>
                    <div
                      className="dropzone drropzone-queue "
                      id="kt_dropzonejs_example_3"
                    >
                      <div className="dropzone-panel">
                        <input
                          multiple
                          type="file"
                          id="outputAttachment"
                          name="attachments"
                          onChange={(e) => handleFileChange(e)}
                          placeholder={intl.formatMessage({ id: "FileUpload" })}
                          className="dropzone-select  uploadFile-style inputAreaHeight d-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-end gap-2 border-0">
            <button
              type="button"
              onClick={() => {
                handleClose();
              }}
              className="btn btn-secondary px-5"
              style={{
                borderRadius: "8px",
                minWidth: "120px",
              }}
            >
              {intl.formatMessage({ id: "Cancel" })}
            </button>
            <button
              className="btn px-5 btn btn-primary text-white"
              type="submit"
              style={{
                borderRadius: "8px",
                minWidth: "120px",
              }}
            >
              {intl.formatMessage({ id: "Save" })}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
export default EditCauseCommentPopup;
