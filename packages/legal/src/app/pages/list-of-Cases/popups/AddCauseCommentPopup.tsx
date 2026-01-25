import { AddPopup } from "@4eplatform/shared/src/popups/AddPopup";
import { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../../store/store";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { object, string, InferType, array, mixed } from "yup";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { useParams } from "react-router-dom";
import {
  addCauseComments,
  fetchAllCauseComments,
} from "../../../features/cause-comments";
interface AddCauseCommentPopupProps {
  show: boolean;
  handleClose: () => void;
  pageSize: number;
  pageIndex: number;
}
interface AttachmentItem {
  file: File;
  fileName: string;
}
export const AddCauseCommentSchema = object({
  comment: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  attachments: array().of(
    object({
      file: mixed<File>().required(),
      fileName: string(),
    })
  ),
});
export type AddCauseCommentProps = InferType<typeof AddCauseCommentSchema>;
const AddCauseCommentPopup = ({
  show,
  handleClose,
  pageSize,
  pageIndex,
}: AddCauseCommentPopupProps) => {
  const dispatch = useAppDispatch();
  const intl = useIntl();
  const [attachments, setAttachments] = useState<AttachmentItem[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  let { id: caseId } = useParams();
  let language = intl.locale;
  const fileInputRef = useRef<HTMLInputElement>(null);
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const filesUploaded = event.target.files;
    if (filesUploaded) {
      const filesArray = Array.from(filesUploaded);
      const uniqueFiles = filesArray.filter(
        (newFile) =>
          !attachments.some(
            (existingFile) =>
              existingFile.file.name === newFile.name &&
              existingFile.file.size === newFile.size
          )
      );
      const newAttachments: AttachmentItem[] = [
        ...attachments,
        ...uniqueFiles.map((file) => ({ file, fileName: file.name })),
      ];
      setAttachments(newAttachments);
      setValue("attachments", newAttachments, { shouldValidate: true });
    }
  }
  function handleCustomNameChange(index: number, newName: string) {
    const updated = [...attachments];
  updated[index].fileName = newName; 
    setAttachments(updated);
    setValue("attachments", updated, { shouldValidate: true });
  }
  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
    setValue("attachments", newAttachments, { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<AddCauseCommentProps>({
    resolver: yupResolver(AddCauseCommentSchema),
    mode: "all",
    defaultValues: {
      attachments: [],
      comment: "",
    },
  });

  const onSubmit = async (formValues: AddCauseCommentProps) => {
    let formData = new FormData();
    formData.append("CauseId", caseId || "");
    formData.append("Comment", formValues?.comment);
    attachments?.length > 0 &&
      attachments?.forEach((attach, index: number) => {
        formData.append(`Attachments[${index}].file`, attach?.file);
        formData.append(`Attachments[${index}].fileName`, attach?.fileName);
      });
    dispatch(addCauseComments(formData) as any).then((res) => {
      if (
        res?.payload?.statusEnum === 1 ||
        res?.payload?.message === "SavedSuccessfully"
      ) {
        showAlert(true, "AddedSuccessfully", intl);
        handleClose();
        reset();
        dispatch(
          fetchAllCauseComments({
            PageSize: pageSize,
            PageNumber: pageIndex,
            CauseId: caseId,
          }) as any
        );
      }else if (
         res?.payload?.statusEnum === 0 &&
        res?.payload?.message === "You can't add Comment "
      )
       {
        showAlert(false, "YouDontHavePermission", intl);
      }
      else {
        showAlert(false, "AnErrorOccurred", intl);
      }
    });
  };
  console.log(attachments);
  console.log(errors);

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center w-100">
            {" "}
            {intl.formatMessage({ id: "AddComment2" })}
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
                  <label className="mb-2 form-label text-muted small">
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
                              {attachments?.map((attachment, index) => (
                                <div
                                  className="d-flex align-items-center"
                                  key={attachment?.file?.name}
                                >
                                  <span className="text-primary fw-bolder me-2  w-40">
                                    {attachment?.file?.name}
                                  </span>
                                  {/* input لاسم مخصص */}
                                  <input
                                    type="text"
                                    className="form-control form-control-sm me-2 w-50 my-4 custom-bg"
                                    placeholder={intl.formatMessage({
                                      id: "EnterAttachmentName",
                                    })}
                                    value={attachment.fileName}
                                    onChange={(e) =>
                                      handleCustomNameChange(
                                        index,
                                        e.target.value
                                      )
                                    }
                                  />
                                  {errors?.attachments?.[index]?.fileName &&
                                    DisplayErrorMessage(
                                      errors.attachments[index]?.fileName
                                        ?.message,
                                      intl,
                                      intl.locale
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
                              ))}
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
                          ref={fileInputRef}
                          onChange={(e) => handleFileChange(e)}
                          placeholder={intl.formatMessage({ id: "FileUpload" })}
                          className="dropzone-select  uploadFile-style inputAreaHeight d-none"
                        />
                      </div>
                    </div>
                  </div>
                  <div></div>
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
              className="btn px-5 btn btn-success text-white"
              type="submit"
              style={{
                borderRadius: "8px",
                minWidth: "120px",
              }}
            >
              {intl.formatMessage({ id: "Add" })}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
      {modalShow && (
        <div className="modal fade">
          <AddPopup
            show={modalShow}
            handleClose={() => setModalShow(false)}
            handleCloseMainPopup={() => handleClose()}
          />
        </div>
      )}
    </>
  );
};
export default AddCauseCommentPopup;
