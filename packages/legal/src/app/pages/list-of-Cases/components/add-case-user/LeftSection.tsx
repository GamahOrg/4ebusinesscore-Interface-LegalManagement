import React, { Fragment, useEffect, useState, FC } from "react";
import { Col, Button } from "react-bootstrap";
import { useIntl } from "react-intl";
import DiscountPopup2 from "./popup/DiscountPopup2";
import AddClientsPopup from "./popup/AddClientsPopup";
import AddCourtPopup from "./popup/AddCourtPopup";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import AddNoteDocPopup from "../../../legal-notes/popups/AddNoteDocPopup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { fetchAllLkAttachmentSources } from "../../../../features/attachment-source";
import AddCauseDocPopup from "./popup/AddCauseDocPopup";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";

type LeftSectionProps = {
  setValue?: any;
  trigger?: any;
  documents?: any;
  setDocuments?: any;
  errors?:any;
};
const LeftSection: FC<LeftSectionProps> = ({
  setValue,
  trigger,
  documents,
  setDocuments,
  errors,
}) => {
  const intl = useIntl();
  let theme = localStorage.getItem("Theme");
  let lkAttachmentSources = useSelector((state: RootState) => {
    return state?.attachmentSource?.lkAttachmentSources;
  });
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchAllLkAttachmentSources({
        pageSize: "10000",
      }) as any
    );
  }, []);
  const [addShowDoc, setAddShowDoc] = useState(false);
  let [selectedLKSource, setSelectedLKSource] = useState<any>({});

  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  let [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    setValue("attachments", documents);
    if (documents?.length) {
      trigger("attachments");
    }
  }, [documents]);
  const deleteDoc = (sourceId: number, attachmentId: string) => {
    setDocuments?.((prev) => {
      return prev.map((doc) => {
        if (doc?.lK_AttachmentSourceId === sourceId) {
          return {
            ...doc,
            attachments: doc.attachments.filter(
              (att) => att?.id !== attachmentId
            ),
          };
        }
        return doc;
      });
    });
    showAlert(true, "DeletedSuccessfully", intl);
  };
  let language = intl.locale;

  return (
    <>
      {/* left section  */}
      <div  className="col-lg-6 col-12">
  <div className="w-100 mx-2 bg-gray-100 py-5 px-10 mt-15 rounded-2  ">
          <div className="d-flex align-items-center   justify-content-between">
            <p
              className={`main-title-lawsuit   mt-2 mb-0 custom-title-attachments add-cause-subtitle`}
            >
              {intl.formatMessage({ id: "Docs" })}
            </p>
          </div>
          {lkAttachmentSources?.map((source) => {
            return (
              <Fragment key={source?.id}>
                <div className="rounded mt-5 mb-5">
                  <div
                    className={`custom-bg-attachments mx-0 p-2`}
                  >
                    <div className="d-flex  align-items-center justify-content-between mb-5">
                      <p className=" add-cause-subtitle text-truncate w-90">
                        <span className="fw-bold text-muted">
                          {intl.formatMessage({ id: "Source" })}:
                        </span>{" "}
                        <span className="text-muted">{intl.locale == "ar" ? source?.nameAr : source?.nameEn}</span>
                        
                      </p>
                      <div
                        onClick={() => {
                          setAddShowDoc(true);
                          setSelectedLKSource({
                            id: source?.id,
                            name:
                              intl.locale == "ar"
                                ? source?.nameAr
                                : source?.nameEn,
                          });
                        }}
                        aria-label="Source"
                        className="cursor-pointer  w-30px h-30px border-radius-50 border-none bg-primary fs-3 d-flex align-items-center justify-content-center text-white"
                      >
                        +
                      </div>
                    </div>
                    <div className="custom-input-bg max-custom-height">
                      {documents
                        ?.filter((document) => {
                          return document?.lK_AttachmentSourceId == source?.id;
                        })
                        ?.map((document, index) => {
                          return (
                            <Fragment key={index}>
                              <div
                                className={`mb-4 border rounded p-3 bg-${
                                  theme == "dark" ? "#1b1b29" : "light"
                                }`}
                              >
                                {document?.attachments?.map((doc, index) => (
                                  <div
                                    key={doc?.id}
                                    className="d-flex align-items-center justify-content-between mb-2"
                                  >
                                    <div
                                      className={`d-flex justify-content-between align-items-center border rounded p-2 w-${"100"} bg-gray-100`}
                                    >
                                      <div className="d-flex align-items-center flex-grow-1">
                                                <img
                                                  src={getIconSrc(
                                                    doc?.fileName,
                                                    doc?.fileAsBinary,
                                                    ""
                                                  )}
                                                  alt={doc?.fileName}
                                                  className="w-50px h-50px border-radius-50 mx-2"
                                                />
                                                <div className="d-flex flex-column flex-grow-1 me-3">
                                                  <span className="mb-1 text-muted ">
                                                    {index + 1}# {doc?.attachmentName || doc?.fileName}
                                                  </span>
                                                  <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    placeholder={intl.formatMessage({ id: "AttachmentName" }) || "Attachment Name"}
                                                    value={doc?.attachmentName || ""}
                                                    onChange={(e) => {
                                                      setDocuments((prev) => {
                                                        return prev.map((documentItem) => {
                                                          if (documentItem?.lK_AttachmentSourceId === document?.lK_AttachmentSourceId) {
                                                            return {
                                                              ...documentItem,
                                                              attachments: documentItem.attachments.map((att) => {
                                                                if (att?.id === doc?.id) {
                                                                  return {
                                                                    ...att,
                                                                    attachmentName: e.target.value
                                                                  };
                                                                }
                                                                return att;
                                                              })
                                                            };
                                                          }
                                                          return documentItem;
                                                        });
                                                      });
                                                    }}
                                                  />
                                                </div>
                                              </div>
                                      <i
                                        onClick={() => {
                                          setShowDeletePopup(true);
                                          setSelectedId(doc?.id);
                                        }}
                                        className="fa-solid fa-trash mx-2 fs-4 text-danger cursor-pointer"
                                      ></i>
                                    </div>
                                    {selectedId == doc?.id && showDeletePopup && (
                                      <DeletePopup
                                        showDelete={showDeletePopup}
                                        handleCloseDelete={() =>
                                          setShowDeletePopup(false)
                                        }
                                        handleDelete={() => {
                                          deleteDoc(
                                            document?.lK_AttachmentSourceId,
                                            doc?.id
                                          );
                                        }}
                                      />
                                    )}
                                  </div>
                                ))}
                              </div>
                            </Fragment>
                          );
                        })}
                    </div>
                  </div>
          
                </div>
                
              </Fragment>
            );
          })}
  </div>
      </div>

      <div className="modal fade">
        <AddCauseDocPopup
          setDocuments={setDocuments}
          show={addShowDoc}
          handleClose={() => setAddShowDoc(false)}
          selectedLKSource={selectedLKSource}
        />
      </div>
    </>
  );
};

export default LeftSection;
