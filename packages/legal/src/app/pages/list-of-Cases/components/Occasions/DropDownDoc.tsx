import { useEffect, useState } from "react";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { Row, Button, Collapse } from "react-bootstrap";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/ar";
import { RootState, useAppDispatch } from "../../../../store/store";
import AddCauseStageDocPopup from "../../popups/AddCauseStageDocPopup";
import {
  deleteCauseStageAttachment,
  fetchAllCauseStageAttachments,
  fetchCauseStageById,
} from "../../../../features/cause-stage";
import { useParams } from "react-router-dom";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import getIconSrcError from "@4eplatform/shared/functions/getIconSrcError";
import { LegalRootUrl } from "@4eplatform/shared/apis/legal";
import { DeletePopup } from "@4eplatform/shared/src/popups/NewDeletePopup";
import { AttachmentType } from "../../../../models/LegalEnums";
import AddDocForSessionPopup from "../../popups/AddDocForSessionPopup";
function DropDownDoc({
  searchQuery,
  lK_AttachmentSourceId,
  date,
  isConsultive,
  isLawyerToTakeAction,
  isDataEntry,
  isOwnerOrSuperVisor,
}: any) {
  const [openSections, setOpenSections] = useState<number[]>([]);
  const intl = useIntl();
  moment.locale("en");
  let { id: caseId } = useParams();
  let dispatch = useAppDispatch();
  let [attachmentId, setAttachmentId] = useState<string>("");
  let [selectedCauseStageId, setSelectedCauseStageId] = useState("");

  useEffect(() => {
    if (selectedCauseStageId) {
      dispatch(fetchCauseStageById({ CauseStageId: selectedCauseStageId }));
    }
  }, [dispatch, selectedCauseStageId]);

  let { causeStageById, loadingForCauseStageById } = useSelector(
    (state: RootState) => {
      return state?.causeStages;
    }
  );

  const handleToggle = (id: any) => {
    setOpenSections((prevState) =>
      prevState.includes(id)
        ? prevState.filter((sectionId) => sectionId !== id)
        : [...prevState, id]
    );
  };

  const [showDelete, setShowDelete] = useState(false);
  const [addShowDoc, setAddShowDoc] = useState(false);
  let [attachmentType, setAttachmentType] = useState<AttachmentType>(
    AttachmentType.Unknown
  );

  const handleGetData = () => {
    let params = {
      ...(caseId && { causeId: caseId }),
      ...(searchQuery && { searchTerm: searchQuery }),
      ...(date && { startDate: date }),
      ...(lK_AttachmentSourceId > -1 && {
        lKAttachmentSourceId: lK_AttachmentSourceId,
      }),
    };
    dispatch(fetchAllCauseStageAttachments(params) as any);
  };

  const handleDeleteItem = () => setShowDelete(true);
  const causeStageAttachments = useSelector((state: RootState) => {
    return state?.causeStages?.causeStageAttachments;
  });

  let mappedSections =
    Array.isArray(causeStageAttachments) &&
    causeStageAttachments?.map((causeStageAttachment, idx) => {
      return {
        num: idx + 1,
        id: causeStageAttachment?.causetageId,
        title:
          intl.locale == "ar"
            ? causeStageAttachment?.lkStageNameAr
            : causeStageAttachment?.lkStageNameEn + "" + "#",
        items:
          Array.isArray(
            causeStageAttachment?.causeStageAttachmentsProtoModel
          ) &&
          causeStageAttachment?.causeStageAttachmentsProtoModel?.map(
            (attachment) => {
              return {
                img: attachment?.filePath,
                doc: attachment?.fileName,
                attachmentName: attachment?.attachmentName,
                session: attachment?.session,
                attachmentCauseStageId: attachment?.id,

                attachmentType: attachment?.attachmentType,

                claim: "Claim#1",
                nextSessionDate: moment(attachment?.createdOn).format(
                  "DD MMM YYYY"
                ),
                nextSessionTime: moment(attachment?.createdOn).format(
                  "HH:mm:ss"
                ),
                createBy: attachment?.createdByName,
                attachmentSource:
                  intl.locale == "ar"
                    ? attachment?.lK_AttachmentSourceNameAr
                    : attachment?.lK_AttachmentSourceNameEn,
              };
            }
          ),
      };
    });

  let deleteAttachment = (id: string, attachmentType: AttachmentType) => {
    dispatch(
      deleteCauseStageAttachment({
        attachmentId: id,
        attachmentTypeenum: attachmentType,
      }) as any
    ).then((res) => {
      if (res?.payload?.statusEnum == 1) {
        showAlert(true, "DeletedSuccessfully", intl, () => {
          setShowDelete(false);
          handleGetData();
        });
      } else if (
        res?.payload?.message == "The SessionAttachment does not exist" ||
        res?.payload?.message == "SessionAttachment not found"
      ) {
        showAlert(
          false,
          intl.formatMessage({ id: "TheSessionAttachmentDoesn'tExist" }),
          intl
        );
      } else if (res?.payload?.message) {
        showAlert(false, res?.payload?.message, intl);
      }
    });
  };
  let notValidNames = [
    "الدراسه",
    "دراسه",
    "الدراسة",
    "دراسة",
    "تسجيل",
    "التسجيل",
  ];

  return (
    <>
      <Row className="p-0 m-0">
        {Array.isArray(mappedSections) && mappedSections.length !== 0 ? (
          mappedSections?.map((section) => (
            <div
              key={section?.id}
              className="d-flex  flex-column justify-content-between  bg-white bg-fix-dark border-fix-dark rounded border border-primary my-4 px-3 mx-3 w-100"
            >
              <div className="d-flex justify-content-between w-100 align-items-center my-3">
                <h3 className="mx-3">
                  {section?.title}{" "}
                  <span className="bg-primary text-white px-2 rounded-3">
                    {section?.items ? section?.items?.length : "0"}
                  </span>
                </h3>
                <div
                  onClick={() => handleToggle(section?.num)}
                  className="cursor-pointer"
                >
                  {(isLawyerToTakeAction ||
                    isOwnerOrSuperVisor ||
                    isDataEntry) && (
                    <Button
                      variant="link"
                      className="text-primary bg-fix-dark "
                      onClick={() => {
                        setAddShowDoc(true);
                        setSelectedCauseStageId(section?.id);
                      }}
                    >
                      <i className="fa-solid fa-circle-plus mb-4 fs-2"></i>
                    </Button>
                  )}
                  <span>
                    {openSections.includes(section?.num) ? (
                      <i className="fa-solid fa-angle-up fs-3"></i>
                    ) : (
                      <i className="fa-solid fa-angle-down fs-3"></i>
                    )}
                  </span>
                </div>
              </div>
              <Collapse
                in={openSections.includes(section?.num)}
                className="h-fit"
              >
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                  {Array.isArray(section.items) &&
                    section.items.map((item, index) => (
                      <div
                        key={index}
                        className=" mb-3 row border-bottom flex-wrap rounded w-100 p-5 bg-white bg-fix-dark  d-flex flex-column flex-sm-row align-items-center"
                      >
                        <div className="col-12 col-sm-3  bg-fix-dark   d-flex justify-content-between mb-3 mb-sm-0 text-truncate">
                          <a
                            href={
                              LegalRootUrl + item.img?.replace("wwwroot/", "")
                            }
                            target="_blank"
                            rel="noreferrer"
                            download
                            className="d-flex justify-content-between"
                          >
                            <div className="d-flex align-items-center">
                              <img
                                alt={item?.doc}
                                src={getIconSrc(
                                  item?.img,
                                  {
                                    filePath: item.img?.replace("wwwroot/", ""),
                                  },
                                  LegalRootUrl
                                )}
                                className="h-40px"
                                onError={(e: any) => {
                                  e.target.src = getIconSrcError(item?.doc);
                                }}
                              />

                              <span className="fw-bolder ms-2">
                                {item?.attachmentName ||
                                  item?.customName ||
                                  item?.doc}
                              </span>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                              <i className="fa-solid fa-download dark-gray"></i>
                            </div>
                          </a>
                        </div>
                        {(isLawyerToTakeAction ||
                          isOwnerOrSuperVisor ||
                          isDataEntry) && (
                          <div className="col-12 col-sm-1 text-center mb-3 mb-sm-0">
                            <div
                              className="text-danger fs-3 mx-5"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handleDeleteItem();
                                setAttachmentId(item?.attachmentCauseStageId);
                                setAttachmentType(item?.attachmentType);
                              }}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </div>
                          </div>
                        )}
                        <div className="col-12 col-sm-5 text-center mb-3 mb-sm-0">
                          <span className="text-primary">
                            {item?.attachmentSource} |
                          </span>
                          {!notValidNames?.includes(section?.title) ? (
                            <span className="mx-3">
                              #{intl.formatMessage({ id: "Session" })}{" "}
                              {item?.session?.sessionNumber}
                            </span>
                          ) : (
                            <></>
                          )}
                          <span>
                            {!notValidNames?.includes(section?.title) && <>|</>}
                            <i className="fa-solid fa-circle-user fs-4 mx-3 text-primary"></i>
                            {item?.createBy}
                          </span>
                        </div>
                        <div className="col-12 col-sm-2 text-end text-sm-end">
                          <div
                            className="dark-gray fw-bolder py-2 px-3 rounded"
                            dir="ltr"
                          >
                            {item?.nextSessionDate} | {item?.nextSessionTime}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </Collapse>
            </div>
          ))
        ) : (
          <div className="text-center fw-bolder mt-8 fs-4">
            {intl.formatMessage({ id: "NoAttachments1" })}
          </div>
        )}
      </Row>

      <AddDocForSessionPopup
        show={addShowDoc}
        handleClose={() => setAddShowDoc(false)}
        causeStageId={selectedCauseStageId}
        sessionId={
          causeStageById?.sessions?.length > 0
            ? causeStageById?.sessions[causeStageById?.sessions?.length - 1]?.id
            : ""
        }
        session={
          causeStageById?.sessions?.length > 0
            ? causeStageById?.sessions[causeStageById?.sessions?.length - 1]
            : null
        }
        handleGetData={() => {
          handleGetData();
        }}
      />
      <DeletePopup
        showDelete={showDelete}
        handleCloseDelete={() => setShowDelete(false)}
        handleDelete={() => {
          deleteAttachment(attachmentId, attachmentType);
        }}
      />
    </>
  );
}

export default DropDownDoc;
