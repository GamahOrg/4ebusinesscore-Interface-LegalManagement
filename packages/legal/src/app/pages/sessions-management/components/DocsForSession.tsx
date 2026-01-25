import { useState } from "react";
import { useIntl } from "react-intl";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import { useLocation } from "react-router-dom";
import AddDocPopup from "../../list-of-Cases/popups/AddDoc";

function DocsForSession({ session }) {
  let intl = useIntl();

  const [showDelete, setShowDelete] = useState(false);
  const [addShowDoc, setAddShowDoc] = useState(false);

  let location = useLocation();

  const baseURL = (window as any)._env_?.REACT_APP_API_Legal_Url;

  return (
    <>
      <div className="col-md-12 col-sm-12">
        <div className="  mt-5">
          {session?.sessionAttachmentDto?.length > 0 && (
            <div className="p-7 bg-light rounded mx-0">
              <h4 className="main-title-lawsuit text-gray-900">
                {intl.formatMessage({ id: "Docs" })}
              </h4>

              <div className="d-flex flex-wrap gap-3">
                {session?.sessionAttachmentDto?.filter(
                  (doc) => doc?.lK_AttachmentSourceId === 1
                )?.length > 0 && (
                  <div className="mb-4 border col-md-4 rounded p-4 bg-light searchBorder">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h5 className="text-end">
                        <span className="fw-bold text-gray-700">
                          {intl.formatMessage({ id: "Source" })}:
                        </span>{" "}
                        {intl.formatMessage({ id: "Principals" })}
                      </h5>
                      {location.pathname?.includes("add") ? (
                        <>
                          <button
                            onClick={() => {
                              setAddShowDoc(true);
                            }}
                            className="w-30px h-30px border-radius-50 border-none bg-primary fs-3 d-flex align-items-center justify-content-center text-white"
                          >
                            +
                          </button>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    {session?.sessionAttachmentDto
                      ?.filter((doc) => doc?.lK_AttachmentSourceId === 1)
                      ?.map((doc, index) => (
                        <div
                          key={index}
                          className="d-flex align-items-center justify-content-between mb-3"
                        >
                          <div
                            className="d-flex align-items-center justify-content-between border rounded p-2 w-100 bg-light-primary border-primary text-primary overflow-hidden"
                          >
                            <span
                              className="flex-grow-1 me-3"
                              style={{
                                minWidth: 0,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                // wordBreak: "break-all",
                                overflowWrap: "anywhere",
                              }}
                            >
                              {index + 1}# {doc?.fileName}
                            </span>
                            <a
                              target="_blank"
                              rel="noreferrer"
                              download
                              href={baseURL + "/" + doc?.filePath}
                              className="flex-shrink-0 ms-auto"
                            >
                              <i className="fa-solid fa-download text-primary cursor-pointer"></i>
                            </a>
                          </div>

                          {location.pathname?.includes("add") ? (
                            <>
                              {" "}
                              <i
                                className="fa-solid fa-trash mx-3 text-danger fs-4 cursor-pointer"
                                onClick={() => {
                                  setShowDelete(true);
                                }}
                              ></i>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      ))}
                  </div>
                )}

                {session?.sessionAttachmentDto?.filter(
                  (doc) => doc?.lK_AttachmentSourceId === 2
                )?.length > 0 && (
                  <div className="mb-4 border col-md-4 rounded p-4 bg-light searchBorder">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h5 className="text-end">
                        <span className="fw-bold text-gray-700">
                          {intl.formatMessage({ id: "Source" })}:
                        </span>{" "}
                        {intl.formatMessage({ id: "Opponents" })}
                      </h5>
                      {location.pathname?.includes("add") ? (
                        <>
                          <button
                            onClick={() => {
                              setAddShowDoc(true);
                            }}
                            className="w-30px h-30px border-radius-50 border-none bg-primary fs-3 d-flex align-items-center justify-content-center text-white"
                          >
                            +
                          </button>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    {session?.sessionAttachmentDto
                      ?.filter((doc) => doc?.lK_AttachmentSourceId === 2)
                      ?.map((doc, index) => (
                        <div
                          key={index}
                          className="d-flex align-items-center justify-content-between mb-3"
                        >
                          <div
                            className="d-flex align-items-center justify-content-between border rounded p-2 w-100 bg-light-primary border-primary text-primary overflow-hidden"
                          >
                            <span
                              className="flex-grow-1 me-3"
                              style={{
                                minWidth: 0,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                wordBreak: "break-all",
                                overflowWrap: "anywhere",
                              }}
                            >
                              {index + 1}# {doc?.fileName}
                            </span>
                            <a
                              target="_blank"
                              rel="noreferrer"
                              download
                              href={baseURL + "/" + doc?.filePath}
                              className="flex-shrink-0 ms-auto"
                            >
                              <i className="fa-solid fa-download text-primary cursor-pointer"></i>
                            </a>
                          </div>

                          {location.pathname?.includes("add") ? (
                            <>
                              {" "}
                              <i
                                className="fa-solid fa-trash mx-3 text-danger fs-4 cursor-pointer"
                                onClick={() => {
                                  setShowDelete(true);
                                }}
                              ></i>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      ))}
                  </div>
                )}
                {session?.sessionAttachmentDto?.filter(
                  (doc) => doc?.lK_AttachmentSourceId === 3
                )?.length > 0 && (
                  <div className="mb-4 border col-md-4 rounded p-4 bg-light searchBorder">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h5 className="text-end">
                        <span className="fw-bold text-gray-700">
                          {intl.formatMessage({ id: "Source" })}:
                        </span>{" "}
                        {intl.formatMessage({ id: "Court" })}
                      </h5>
                      {location.pathname?.includes("add") ? (
                        <>
                          <button
                            onClick={() => {
                              setAddShowDoc(true);
                            }}
                            className="w-30px h-30px border-radius-50 border-none bg-primary fs-3 d-flex align-items-center justify-content-center text-white"
                          >
                            +
                          </button>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    {session?.sessionAttachmentDto
                      ?.filter((doc) => doc?.lK_AttachmentSourceId === 3)
                      ?.map((doc, index) => (
                        <div
                          key={index}
                          className="d-flex align-items-center justify-content-between mb-3"
                        >
                          <div
                            className="d-flex align-items-center justify-content-between border rounded p-2 w-100 bg-light-primary border-primary text-primary overflow-hidden"
                          >
                            <span
                              className="flex-grow-1 me-3"
                              style={{
                                minWidth: 0,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                wordBreak: "break-all",
                                overflowWrap: "anywhere",
                              }}
                            >
                              {index + 1}# {doc?.fileName}
                            </span>
                            <a
                              target="_blank"
                              rel="noreferrer"
                              download
                              href={baseURL + "/" + doc?.filePath}
                              className="flex-shrink-0 ms-auto"
                            >
                              <i className="fa-solid fa-download text-primary cursor-pointer"></i>
                            </a>
                          </div>

                          {location.pathname?.includes("add") ? (
                            <>
                              {" "}
                              <i
                                className="fa-solid fa-trash mx-3 text-danger fs-4 cursor-pointer"
                                onClick={() => {
                                  setShowDelete(true);
                                }}
                              ></i>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {showDelete && (
        <DeletePopup
          showDelete={showDelete}
          handleCloseDelete={() => setShowDelete(false)}
          handleDelete={() => {}}
        />
      )}
      {addShowDoc && (
        <AddDocPopup
          show={addShowDoc}
          handleClose={() => setAddShowDoc(false)}
        />
      )}
    </>
  );
}

export default DocsForSession;
