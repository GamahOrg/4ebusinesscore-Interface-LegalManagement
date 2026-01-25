import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import { useIntl } from "react-intl";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { RootState } from "../../../../../store/store";
import { fetchAllLkAttachmentSources } from "../../../../../features/attachment-source";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import getIconSrcError from "@4eplatform/shared/functions/getIconSrcError";
import { LegalRootUrl } from "@4eplatform/shared/apis/legal";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { AddCauseDocProps, AddCauseDocSchema } from "../../../../../validations/add-cause-doc-validation";
import { yupResolver } from "@hookform/resolvers/yup";

type AddDocToEditCausePopupProps = {
  show?: any;
  handleClose?: any;
  setSelectedFilesForAttachments?: any;
  selectedFilesForAttachments?: any;
};

const AddDocToEditCausePopup: React.FC<AddDocToEditCausePopupProps> = ({
  show,
  handleClose,
  setSelectedFilesForAttachments,
  selectedFilesForAttachments,
}) => {
  const intl = useIntl();
  let language = intl.locale;
  let dispatch = useDispatch();

  let lkAttachmentSources = useSelector((state: RootState) => {
    return state?.attachmentSource?.lkAttachmentSources;
  });
  let [selectedLKSource, setSelectedLKSource] = useState<any>(null);

  let theme = localStorage.getItem("Theme");
  useEffect(() => {
    dispatch(
      fetchAllLkAttachmentSources({
        pageSize: "10000",
      }) as any
    );
  }, []);
  const [pendingFiles, setPendingFiles] = useState<any[]>([]);
  const [attachmentNames, setAttachmentNames] = useState<{ [key: number]: string }>({});

  const handleFileInputChange = (event: any) => {
    const files = Array.from(event?.target?.files);
    setPendingFiles(files);
   
    const newAttachmentNames: { [key: number]: string } = {};
    files.forEach((_, index) => {
      newAttachmentNames[index] = '';
    });
    setAttachmentNames(newAttachmentNames);
  };

  const handleAttachmentNameChange = (index: number, name: string) => {
    setAttachmentNames(prev => ({
      ...prev,
      [index]: name
    }));
  };

  const {
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<AddCauseDocProps>({
    resolver: yupResolver(AddCauseDocSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    setValue(
      "attachments",
      pendingFiles?.map((attachment) => {
        return attachment;
      })
    );
    if (pendingFiles?.length) {
      trigger("attachments");
    }
  }, [pendingFiles, setValue, trigger]);

  const handleDeletePendingAttachment = (indexToRemove: any) => {
    const updatedFiles = pendingFiles?.filter(
      (file: any, index: any) => index !== indexToRemove
    );
    setPendingFiles(updatedFiles);
    
    
    const updatedNames: { [key: number]: string } = {};
    updatedFiles.forEach((_, index) => {
      updatedNames[index] = attachmentNames[index] || '';
    });
    setAttachmentNames(updatedNames);
    
    trigger("attachments");
  };

  const handleAddFiles = (data: any) => {
    try {
      if (pendingFiles.length !== 0 && !selectedLKSource) {
        showAlert(false, "ChooseTheSources", intl);
        return;
      } else if (pendingFiles?.length > 0 && selectedLKSource) {
        
        const selectedSource = lkAttachmentSources?.find(
          (source: any) => source.id === selectedLKSource
        );
        const structuredPendingFiles = pendingFiles?.map((file: File, index: number) => ({
          attachment: file,
          attachmentFile: file, 
          attachmentName: attachmentNames[index] || file.name, 
          lK_AttachmentSourceId: selectedLKSource,
          lK_AttachmentSourceName: language == "ar" ? selectedSource?.nameAr : selectedSource?.nameEn || '',
        }));
    
               setSelectedFilesForAttachments([
           ...(selectedFilesForAttachments || []),
           ...structuredPendingFiles,
         ]);
        setPendingFiles([]);
        setAttachmentNames({});
        setSelectedLKSource(null);
        handleClose();
        setValue("attachments", []);
        showAlert(true, "AddedSuccessfully", intl);
      } else {
        handleClose();
      }
    } catch (error) {
      console.error('Error in handleAddFiles:', error);
      showAlert(false, "AnErrorOccurred", intl);
    }
  };

  return (
    <>
      <Modal
        aria-labelledby="contained-modal-title-center"
        centered
        show={show}
        onHide={handleClose}
        enforceFocus={false}
        backdrop={false}
        keyboard={false}
      >
        <div className="card">
          <Modal.Header
            closeButton
            style={{
              alignItems: intl.locale === "ar" ? "flex-start" : "end",
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
          <Modal.Body>
            <form noValidate className="form outputForm">
              <div className="row">
                <h5 className="mb-5 mx-1 mt-2">
                  {intl.formatMessage({
                    id: "Documents",
                  })}
                </h5>

                <div className="notice  bg-light-primary rounded border-primary border border-dashed p-5">
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
                        onChange={handleFileInputChange}
                        type="file"                        
                        id="outputAttachment"
                        name="attachments"
                        placeholder={intl.formatMessage({ id: "FileUpload" })}
                        className="dropzone-select  uploadFile-style inputAreaHeight d-none"
                      />

                      <ul className="d-flex align-items-center flex-wrap">
                        {pendingFiles?.map((file: any, index: number) => (
                          <li
                            key={index}
                            className="d-flex align-items-center my-2 mx-2 position-relative w-100"
                          >
                            <div className="d-flex align-items-center flex-wrap w-100">
                              <img
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                }}
                                src={getIconSrc(file?.name, file, LegalRootUrl)}
                                onError={(e: any) =>
                                  (e.target.src = getIconSrcError(file?.name))
                                }
                              />
                              <div className="mx-1 text-truncate flex-grow-1">{file.name}</div>
                              <input
                                type="text"
                                placeholder={intl.formatMessage({ id: "AttachmentName" }) || "Attachment Name"}
                                value={attachmentNames[index] || ''}
                                onChange={(e) => handleAttachmentNameChange(index, e.target.value)}
                                className="form-control mx-2"
                                style={{ minWidth: "150px", maxWidth: "200px" }}
                              />
                              <div
                                style={{
                                  position: "absolute",
                                  top: "-10px",
                                  left: "-10px",
                                  height: "15px",
                                  width: "15px",
                                  borderRadius: "50%",
                                  backgroundColor: "red",
                                  display: "flex",
                                  color: "black",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handleDeletePendingAttachment(index)
                                }
                              >
                                x
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
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
                      className="form-check d-flex align-items-center me-1 mb-3 w-100"
                    >
                      <input
                        type="radio"
                        onChange={() => {
                          setSelectedLKSource(lkAttachmentSource?.id);
                        }}
                        id={`lkAttachmentSource-${lkAttachmentSource?.id}`}
                        name="lkAttachmentSource"
                        className="form-check-input me-2"
                      />
                      <label
                        htmlFor={`lkAttachmentSource-${lkAttachmentSource?.id}`}
                        className="form-check-label text-truncate w-90"
                      >
                        {intl.locale == "ar"
                          ? lkAttachmentSource?.nameAr
                          : lkAttachmentSource?.nameEn}
                      </label>
                    </div>
                  ))}
                </div>
                {/* {DisplayErrorMessage(
                    errors?.lK_AttachmentSourceId?.message,
                    intl,
                    language
                  )} */}
              </Col>
            </Row>
            </form>
          </Modal.Body>

          <Modal.Footer className="justify-content-center py-2">
            <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
              <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                <div className="d-flex gap-3 justify-content-center align-items-center w-50">
                  <div
                    data-bs-dismiss="modal"
                    className="btn btn-secondary text-center px-15"
                    onClick={() => {
                      handleClose();
                      setValue("attachments", []);
                      setPendingFiles([]);
                      setAttachmentNames({});
                    }}
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      try {
                        handleSubmit(handleAddFiles)();
                      } catch (error) {
                        console.error('Error in form submission:', error);
                        showAlert(false, "AnErrorOccurred", intl);
                      }
                    }}
                    className="btn btn-success text-center px-15"
                  >
                    {intl.formatMessage({ id: "Agree" })}
                  </button>
                </div>
              </div>
            </div>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default AddDocToEditCausePopup;
