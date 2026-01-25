import { FC, Fragment, useEffect, useState } from "react";
import { Modal, Row, Button, Col, Spinner } from "react-bootstrap";
import { useIntl } from "react-intl";
import { ConfirmationNotePopup } from "./ConfirmationNotePopup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import getIconSrcError from "@4eplatform/shared/functions/getIconSrcError";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import {
  SessionNoteProps,
  SessionNoteSchema,
} from "../../../validations/add-session-note-validation";
import { RootState } from "../../../store/store";
import {
  fetchSessionNoteById,
  putSessionNote,
} from "../../../features/session-note";
import { fetchCauseStageNameByCauseId } from "../../../features/cause-stage";
import { CauseStageStatus } from "../../../models/LegalEnums";
import AddNoteDocPopup from "./AddNoteDocPopup";
import { SessionNoteModel } from "../../../models/SessionNoteModel";
import { LegalRootUrl } from "@4eplatform/shared/apis/legal";
import { DeletePopup } from "@4eplatform/shared/src/popups/NewDeletePopup";
import {
  fetchActiveSession,
  fetchAllSessionNotes,
} from "../../../features/session";
import { fetchAllLkAttachmentSources } from "../../../features/attachment-source";
import { CauseStageNameModel } from "../../../models/CauseStageNameModel";

type AddNotePopupProps = {
  show: boolean;
  handleClose: any;
  id: string;
  item?: SessionNoteModel;
  pageIndex?: number;
  setPageIndex?: any;
  pageSize?: number;
  setPageSize?: any;
  selectedDegree?: any;
  selectedCase?: any;
  setSelectedCase?: any;
  setSelectedDegree?: any;
  searchTerm?: string;
  setSearchTerm?: any;
};
const EditNotePopup: FC<AddNotePopupProps> = ({
  show,
  handleClose,
  id,
  item,
  pageIndex,
  setPageIndex,
  pageSize,
  setPageSize,
  selectedDegree,
  selectedCase,
  setSelectedCase,
  setSelectedDegree,
  searchTerm,
  setSearchTerm,
}) => {
  const intl = useIntl();
  let [documents, setDocuments] = useState<any>([]);
  let lkAttachmentSources = useSelector((state: RootState) => {
    return state?.attachmentSource?.lkAttachmentSources;
  });
  let [selectedLKSource, setSelectedLKSource] = useState<any>({});
  useEffect(() => {
    setValue("attachments", documents);
    if (documents?.length) {
      trigger("attachments");
    }
  }, [documents]);
  let [loading, setLoading] = useState(false);
  let [causeStage, setCauseStage] = useState<any>({ id: "", name: "" });
  let [causeStages, setCauseStages] = useState<any>([]);
  let dispatch = useDispatch();
  const [modalShow, setModalShow] = useState<boolean>(false);
  useEffect(() => {
    dispatch(
      fetchAllLkAttachmentSources({
        pageSize: "10000",
      }) as any
    );
  }, []);
  useEffect(() => {
    dispatch(fetchSessionNoteById(id) as any);
  }, [id]);
  let sessionNoteDetails = useSelector((state: RootState) => {
    return state?.sessionNote?.sessionNote;
  });
  let causes = useSelector(
    (state: RootState) => state?.causesData?.causeTitles
  );

  useEffect(() => {
    setValue("description", sessionNoteDetails?.description);
    setValue("attachments", sessionNoteDetails?.attachments);
    setValue("causeId", sessionNoteDetails?.causeId);
    setCauseStage({
      id: sessionNoteDetails?.causeStageId,
      name: sessionNoteDetails?.causeStageNumber
        ? `${intl.formatMessage({ id: "CaseNumber" })} ${
            sessionNoteDetails?.causeStageNumber
          }`
        : "",
    });
    setDocuments(
      sessionNoteDetails?.attachments?.map((doc: any) => {
        return {
          lK_AttachmentSourceId: doc?.lK_AttachmentSourceId,
          lK_AttachmentSourceName: "",
          attachments: doc?.sourceAttachments?.map((attachment) => {
            return {
              id: attachment?.id,
              filePath: attachment?.filePath,
              fileAsBinary: {
                filePath: attachment?.filePath?.replace("wwwroot/", ""),
              },
              fileAsBase64: "",
              fileName: attachment?.fileName,
            };
          }),
        };
      }) || []
    );
  }, [sessionNoteDetails]);
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SessionNoteProps>({
    resolver: yupResolver(SessionNoteSchema),
    mode: "all",
    reValidateMode: "onSubmit",
  });
  let formValues = watch();
  useEffect(() => {
    if (formValues?.causeId) {
      dispatch(fetchCauseStageNameByCauseId(formValues?.causeId) as any).then(
        (res) => {
          setCauseStages(
            res?.payload?.result?.map((causeStage: CauseStageNameModel) => {
              return {
                id: causeStage?.caseStageId,
                name:
                  intl.locale == "ar"
                    ? causeStage?.lk_StageNameAr
                    : causeStage?.lk_StageNameEn,
                status: causeStage?.causeStageStatus,
              };
            })
          );
        }
      );
    }
  }, [formValues?.causeId]);
  useEffect(() => {
    if (formValues?.causeStageId) {
      dispatch(
        fetchActiveSession(formValues?.causeStageId as string) as any
      ).then((res) => {
        setValue("sessionId", res?.payload?.result?.id);
        setValue("sessionNumber", res?.payload?.result?.sessionNumber);
        trigger(["sessionId", "sessionNumber"]);
      });
    }
  }, [formValues?.causeStageId]);
  useEffect(() => {
    if (formValues?.causeId) {
      let lastOpenedCauseStage = causeStages
        ?.filter((cause) => {
          return cause?.status == CauseStageStatus?.IsActive;
        })
        ?.reverse()[0];
      if (lastOpenedCauseStage?.id) {
        setCauseStage(lastOpenedCauseStage);
        setValue("causeStageId", lastOpenedCauseStage?.id);
        trigger("causeStageId");
      } else {
        setCauseStage({ id: "", name: "" });
        setValue("causeStageId", "");
        setValue("sessionNumber", "");
        setValue("sessionId", "");
        trigger(["sessionId", "sessionNumber", "causeStageId"]);
      }
    }
  }, [causeStages, formValues?.causeId]);
  let language = intl.locale;
  const [addShowDoc, setAddShowDoc] = useState(false);

  let theme = localStorage.getItem("Theme");
  let addNote = (formValues: SessionNoteProps) => {
    setLoading(true);
    
    
    const newAttachmentsWithoutNames = documents?.some((document) =>
      document?.attachments?.some((attachment) => 
        attachment?.filePath === "" && !attachment?.attachmentName?.trim()
      )
    );
    
    // if (newAttachmentsWithoutNames) {
    //   showAlert(false, "AllAttachmentsMustHaveNames", intl);
    //   setLoading(false);
    //   return;
    // }
    
    let formData = new FormData();
    formData.append("id", id as string);
    formData.append("sessionId", formValues?.sessionId as string);
    formData.append("causeId", formValues?.causeId);
    formData.append("causeStageId", formValues?.causeStageId);
    const documentsWithNewAttachments = documents?.filter((doc) =>
      doc?.attachments?.some((att) => att?.filePath === "")
    );
    documentsWithNewAttachments?.forEach((document, filteredIndex) => {
      const validAttachments = document?.attachments?.filter(
        (attachment) => attachment?.filePath === ""
      );

      validAttachments?.forEach((attachment) => {
        formData.append(
          `sessionNoteAttachmentDtos[${filteredIndex}].attachmentFile`,
          attachment.fileAsBinary
        );
        formData.append(
          `sessionNoteAttachmentDtos[${filteredIndex}].attachmentName`,
          attachment?.attachmentName || attachment?.fileName || ""
        );
      });

      if (validAttachments?.length > 0) {
        formData.append(
          `sessionNoteAttachmentDtos[${filteredIndex}].LK_AttachmentSourceId`,
          document?.lK_AttachmentSourceId
        );
      }
    });
    let oldAttachments = documents
      ?.map((doc) => {
        return doc?.attachments;
      })
      ?.flat()
      .filter((attach) => {
        return attach?.filePath != "";
      });
    oldAttachments?.forEach((item, index) => {
      formData.append(
        `OdAttachmenPaths[${index}]`,
        item?.filePath?.includes("wwwroot/")
          ? item?.filePath
          // : "wwwroot/" + item?.filePath
          :  item?.filePath
      );
    });
    formData.append("description", formValues?.description);
    dispatch(putSessionNote({ id, body: formData }) as any).then((res) => {
      if (res?.payload?.statusEnum == 1) {
        setLoading(false);
        showAlert(true, "SavedSuccessfully", intl, () => {
          dispatch(
            fetchAllSessionNotes({
              search: searchTerm,
              pageNumber: pageIndex,
              pageSize,
              lK_Stage: selectedDegree,
              cuaseid: selectedCase,
            }) as any
          );
          handleClose();
        });
      } else if (res?.payload?.message == "You can't update session note") {
        setLoading(false);
        showAlert(false, "YouCan'tUpdateSessionNote", intl);
      } else if (res?.payload?.message == '["Session Already Has Notes!"]') {
        showAlert(false, "SessionAlreadyHasNotes", intl);
        setLoading(false);
      } else if (res?.payload?.message == "نوع الملف غير مسموح.") {
        showAlert(false, "FileTypeNotAllowed", intl);
        setLoading(false);
      } else if (res?.payload?.message) {
        setLoading(false);
        showAlert(false, "YouCan'tUpdateSessionNote", intl);
      }
    });
  };
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
  let [selectedId, setSelectedId] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  return (
    <Modal show={show} onHide={handleClose} centered size="xl">
      <Modal.Header
        closeButton
        style={{
          alignItems: intl.locale === "ar" ? "flex-start" : "start",
          flexDirection: intl.locale === "en" ? "column-reverse" : "row",
        }}
        className="pb-0"
      >
        <div className=" d-flex justify-content-center w-100 px-4">
          <Row className="justify-content-center my-4">
            <Modal.Title id="contained-modal-title-vcenter">
              <div className="text-center">
                <h2>
                  {intl.formatMessage({
                    id: "EditNote",
                  })}
                </h2>
              </div>
            </Modal.Title>
          </Row>
        </div>
      </Modal.Header>
      <form onSubmit={handleSubmit(addNote)}>
        <Modal.Body className="pb-0 px-8">
          <div className="bg-gray-100 p-5 border-note my-4">
            <Row className="">
              <h5 className="fw-bolder required fs-3">
                {intl.formatMessage({
                  id: "TheCase",
                })}
              </h5>
            </Row>
            <Row>
              <div className="col-12 col-md-6 col-lg-4">
                <div className="my-4">
                  <label
                    htmlFor="caseName"
                    className="form-label mb-3 required fs-5 fw-bold"
                  >
                    {intl.formatMessage({ id: "CaseName/Number" })}
                  </label>
                  <select
                    id="caseName"
                    className="form-select"
                    {...register("causeId")}
                  >
                    <option value={""} disabled>
                      {intl.formatMessage({ id: "Choose" })}
                    </option>
                    {causes?.map((option: any, index: number) => (
                      <option key={index} value={option?.id}>
                        {option?.title}
                      </option>
                    ))}
                  </select>
                  {DisplayErrorMessage(
                    errors?.causeId?.message,
                    intl,
                    language
                  )}
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <div className="my-4">
                  <label
                    htmlFor="degreeName"
                    className="form-label mb-3 required fs-5 fw-bold"
                  >
                    {intl.formatMessage({ id: "TheLawsuit" })}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={causeStage?.name}
                    readOnly
                    title={intl.formatMessage({ id: "TheLawsuit" })}
                    placeholder={`${intl.formatMessage({
                      id: "CauseStage1",
                    })}`}
                  />
                  {DisplayErrorMessage(
                    errors?.causeStageId?.message,
                    intl,
                    language
                  )}
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <div className="my-4">
                  <label
                    htmlFor="degreeName"
                    className="form-label mb-3 required fs-5 fw-bold"
                  >
                    {intl.formatMessage({ id: "Session" })}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("sessionNumber")}
                    readOnly
                    placeholder={`1`}
                  />
                  {DisplayErrorMessage(
                    errors?.sessionNumber?.message,
                    intl,
                    language
                  )}
                </div>
              </div>
            </Row>
          </div>
          <Row>
            <Col md={6} sm={12}>
              <h5 className="fw-bolder required fs-3 my-4">
                {intl.formatMessage({
                  id: "TheNote",
                })}
              </h5>
              <textarea
                rows={15}
                {...register("description")}
                className="form-control form-control-solid "
                placeholder={intl.formatMessage({ id: "EnterNotces" })}
              />
              {DisplayErrorMessage(
                errors?.description?.message,
                intl,
                language
              )}
            </Col>
            <Col md={6} sm={12}>
              <h4
                className={`main-title-lawsuit mt-2 mb-0 text-${
                  theme == "dark" ? "white" : "black"
                }`}
              >
                {intl.formatMessage({ id: "Docs" })}
              </h4>

              <div className="bg-gray-100 border-note  bg-fix-dark border-fix-dark rounded-2">
                {lkAttachmentSources?.map((source, index) => {
                  return (
                    <Fragment key={index}>
                      <div className="rounded mt-5 p-5">
                        <div
                          className={`bg-${
                            theme == "dark" ? "light" : "white"
                          } mx-0 p-3 border-note`}
                        >
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <h5 className="text-end">
                              <span className="fw-bold">
                                {intl.formatMessage({ id: "Source" })}:
                              </span>{" "}
                              {intl.locale == "ar"
                                ? source?.nameAr
                                : source?.nameEn}
                            </h5>
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
                              className="cursor-pointer w-30px h-30px border-radius-50 border-none bg-primary fs-3 d-flex align-items-center justify-content-center text-white"
                            >
                              +
                            </div>
                          </div>
                          <div>
                            {documents
                              ?.filter((document) => {
                                return (
                                  document?.lK_AttachmentSourceId == source?.id
                                );
                              })
                              ?.map((document, index) => {
                                return (
                                  <Fragment key={index}>
                                    <div
                                      className={`mb-4 border rounded p-3 bg-${
                                        theme == "dark" ? "light" : "white"
                                      }`}
                                    >
                                      {document?.attachments?.map(
                                        (doc, index) => (
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
                                                    doc?.fileAsBinary?.size
                                                      ? ""
                                                      : LegalRootUrl
                                                  )}
                                                  onError={(e: any) => {
                                                    e.target.src =
                                                      getIconSrcError(
                                                        doc?.fileName
                                                      );
                                                  }}
                                                  alt={doc?.fileName}
                                                  className="w-50px h-50px border-radius-50 mx-2"
                                                />
                                                <div className="d-flex flex-column flex-grow-1 me-3">
                                                  <span className="mb-1">
                                                    {index + 1}# {doc?.attachmentName || doc?.fileName}
                                                  </span>
                                                  {doc?.filePath === "" ? (
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
                                                  ) : (
                                                    <div className="text-muted small">
                                                      {doc?.attachmentName || doc?.fileName}
                                                    </div>
                                                  )}
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
                                            {selectedId == doc?.id &&
                                              showDeletePopup && (
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
                                        )
                                      )}
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
            </Col>
          </Row>
        </Modal.Body>

        <div className="row">
          <div className="col-12 mx-auto mb-12 mt-5">
            <div className="outputCard card-diff-toolbar  mt-3 d-flex justify-content-end">
              <Modal.Footer className="justify-content-between w-100 py-2 border-0">
                <div className="mt-5 mb-5 col-12 w-100 mx-auto">
                  <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-end">
                    <div className="d-flex justify-content-end w-75 align-items-center">
                      <Button
                        variant="secondary"
                        className="mx-1 text-center  w-25 py-4 "
                        onClick={handleClose}
                      >
                        {intl.formatMessage({ id: "Cancel" })}
                      </Button>
                      {!loading ? (
                        <Button
                          variant="success"
                          className="mx-1 text-center w-25 p-4"
                          type="submit"
                        >
                          {intl.formatMessage({ id: "EditNote" })}
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          disabled
                          className="px-15 w-25"
                        >
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="mx-2"
                          />
                          <span>{intl.formatMessage({ id: "Editing" })}</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Modal.Footer>
            </div>
          </div>
        </div>
      </form>

      <div className="modal fade">
        <ConfirmationNotePopup
          show={modalShow}
          handleClose={() => {
            setModalShow(false);
          }}
          handleCloseMainPopup={() => handleClose()}
        />
      </div>
      <AddNoteDocPopup
        setDocuments={setDocuments}
        show={addShowDoc}
        handleClose={() => setAddShowDoc(false)}
        selectedLKSource={selectedLKSource}
      />
    </Modal>
  );
};

export default EditNotePopup;
