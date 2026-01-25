import React, { useState } from "react";
import { Row, Col, Button, Collapse, Spinner } from "react-bootstrap";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { LegalRootUrl } from "@4eplatform/shared/apis/legal";
import AddDocToEditCausePopup from "./popups/AddDocToEditCause";
import { DeletePopup } from "./popups/DeletePopup";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import getIconSrcError from "@4eplatform/shared/functions/getIconSrcError";

type EditDocumentProps = {
  setSelectedFilesForAttachments?: any;
  selectedFilesForAttachments?: any;
  loading?:boolean;
  onBack?:any;
  onSubmit?: () => void;
};
const EditDocument: React.FC<EditDocumentProps> = ({
  selectedFilesForAttachments,
  setSelectedFilesForAttachments,
  loading,
  onBack,
  onSubmit,
}) => {

  const [isSectionOpen, setIsSectionOpen] = useState(true);
  const [showDocPopup, setShowDocPopup] = useState(false);
  let navigate = useNavigate();

  const intl = useIntl();

  const handleToggle = () => {
    setIsSectionOpen((prev) => !prev);
  };
  const [indexFile, setIndexFile] = useState<any>(null);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);

  const handleFileDelete = (indexToRemove: any) => {
    const updatedFiles = selectedFilesForAttachments?.filter(
      (file: any, index: any) => index !== indexToRemove
    );
    setSelectedFilesForAttachments(updatedFiles);
  };

  const handleDownload = (filePath: string) => {
    const fileURL = `${LegalRootUrl}${filePath}`;
      const a = document.createElement("a");
    a.href = fileURL;
    a.setAttribute("download", filePath.split("/").pop() || "downloaded-file");
    a.style.display = 'none'; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  return (
    <>
    <div className="bg-gray-100 p-2 p-md-5 rounded">
      <Row>
        <div
          className="d-flex flex-column justify-content-between bg-white bg-fix-dark border-fix-dark  rounded my-4 px-3 mx-auto col-12"
          style={{ border: "1px solid #CCD5DD", borderRadius: "8px" }}
        >
          <div className="d-flex justify-content-between w-100 align-items-center my-3">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mx-3">
                {intl.formatMessage({ id: "Registration" })}
              </h2>
              <span className="badge badge-light-primary rounded fs-5">
                {selectedFilesForAttachments?.length
                  ? selectedFilesForAttachments?.length
                  : ""}
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <Button
                onClick={() => setShowDocPopup(true)}
                variant="link"
                className="text-white transparent-button"
              >
                <i className="fa-solid fs-1 text-primary fa-circle-plus"></i>
              </Button>
              <Button variant="link" onClick={handleToggle} className="transparent-button">
                <span
                  className={`arrow ${
                    isSectionOpen ? "arrow-open" : "arrow-closed"
                  }`}
                >
                  <i className="fa-solid fa-angle-up fs-3"></i>
                </span>
              </Button>
            </div>
          </div>
          <Collapse in={isSectionOpen}>
            <div>
              {selectedFilesForAttachments?.map((attachment: any, index) => {
                const isNew = !attachment.path;
                return (
                  <div
                    key={attachment.id || index}
                    className="mb-4 rounded w-100 p-3 bg-white bg-fix-dark border-fix-dark d-flex flex-column flex-sm-row align-items-center"
                  >
                    <Col className="col-12 col-sm-5 bg-light py-2 px-3 d-flex justify-content-between mb-3 mb-sm-0 flex-wrap">
                      <div className="d-flex align-items-center flex-wrap w-80">
                        <img
                          src={
                            isNew
                              ? (() => {
                                  try {
                                    return URL.createObjectURL(attachment?.attachmentFile || attachment?.attachment);
                                  } catch (error) {
                                    console.error('Error creating object URL:', error);
                                    return getIconSrcError(attachment?.name || attachment?.attachmentName || attachment?.attachment?.name);
                                  }
                                })()
                              : LegalRootUrl +
                                attachment?.path?.replace("wwwroot/", "")
                          }
                          alt=""
                          className="h-40px"
                          onError={(e: any) => {
                            e.target.src = getIconSrcError(attachment?.name || attachment?.attachmentName || attachment?.attachment?.name);
                          }}
                        />
                        <span className="fw-bolder ms-2 text-truncate">
                          {isNew
                            ? attachment?.attachmentName || attachment?.attachmentFile?.name || attachment?.attachment?.name
                            : attachment.name}
                        </span>
                      </div>
                      {!isNew && (
                        <Button
                        variant="link"
                        onClick={()=>{
                          handleDownload(attachment?.path?.replace("wwwroot/", ""))
                        }
                      }
                        className="p-0"
                      >
                        <i className="fa-solid fa-download dark-gray fs-4 mt-2"></i>
                      </Button>
                      )}
                    </Col>

                    <span
                      className="mx-3 text-danger cursor-pointer"
                      onClick={() => {
                        setIndexFile(index);
                        setShowDeletePopup(true);
                      }}
                    >
                      <i className="fa-regular fs-3 fa-trash-can"></i>
                    </span>

                    <Col className="col-12 col-sm-4 text-center mb-3 mb-sm-0 text-truncate">
                      {!isNew ?(
                        <>
                          {intl.locale === "ar"
                            ? attachment.attachmentSource?.nameAr
                            : attachment.attachmentSource?.nameEn}
                          <span>
                            {" "}
                            |{" "}
                            <i className="fa-solid fa-circle-user fs-4 mx-3 text-primary"></i>
                            {attachment.createdByName}
                          </span>
                        </>
                      ) : <>
                         {
                            attachment.lK_AttachmentSourceName
                            }
                         
                      </>}
                    </Col>

                    <Col className="col-12 col-sm-3 text-end text-sm-end">
                      <div className="dark-gray fw-bolder py-2 px-20 rounded">
                        {!isNew ? attachment.createdOn : ""}
                      </div>
                    </Col>
                  </div>
                );
              })}
            </div>
          </Collapse>
        </div>
        {showDocPopup && (
          <AddDocToEditCausePopup
            show={showDocPopup}
            handleClose={() => setShowDocPopup(false)}
            setSelectedFilesForAttachments={setSelectedFilesForAttachments}
            selectedFilesForAttachments={selectedFilesForAttachments}
          />
        )}

        {showDeletePopup && (
          <div className="modal fade" id="Rega_modal_Accept" aria-hidden="true">
            <DeletePopup
              showDelete={showDeletePopup}
              handleCloseDelete={() => setShowDeletePopup(false)}
              id={indexFile}
              handleDelete={handleFileDelete}
            />
          </div>
        )}
      </Row>
      </div>
      <div className="d-flex justify-content-end px-5 pb-4 mx-5 mt-3 flex-wrap">
        <Button
          variant="secondary"
          className="me-3 mb-3"
         onClick={onBack}
        >
          {intl.formatMessage({ id: "Cancel" })}
        </Button>

                  {!loading ? (
                    <button 
                      type="button" 
                      className="btn btn-primary text-center  mb-3"
                      onClick={onSubmit}
                    >
                      {intl.formatMessage({ id: "Save" })}
                    </button>
                  ) : (
                    <Button variant="primary" disabled className="px-20 mb-3">
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="mx-2"
                      />
                      <span>{intl.formatMessage({ id: "DataIsLoaded..." })}</span>
                    </Button>
                  )}
      </div>
    </>
  );
};

export default EditDocument;
