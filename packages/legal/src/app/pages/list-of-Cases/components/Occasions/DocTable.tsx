import React, { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../../store/store";
import moment from "moment";
import "moment/locale/ar";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import getIconSrcError from "@4eplatform/shared/functions/getIconSrcError";
import { LegalRootUrl } from "@4eplatform/shared/apis/legal";
import { DeletePopup } from "@4eplatform/shared/src/popups/NewDeletePopup";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import {
  deleteCauseStageAttachment,
  fetchAllCauseStageAttachments,
} from "../../../../features/cause-stage";
import { AttachmentType } from "../../../../models/LegalEnums";

function DocTable({ searchQuery, lK_AttachmentSourceId, date , isConsultive , isLawyerToTakeAction  , isDataEntry,
                isOwnerOrSuperVisor,}: any) {
  const intl = useIntl();
  moment.locale("en");
  const navigate = useNavigate();
  let dispatch = useAppDispatch();

  let [attachmentId, setAttachmentId] = useState<string>("");
  let [attachmentType, setAttachmentType] = useState<AttachmentType>(
    AttachmentType.Unknown
  );
  let { id: caseId } = useParams();

  const causeStageAttachments = useSelector((state: RootState) => {
    return state?.causeStages?.causeStageAttachments;
  });
  const [showDelete, setShowDelete] = useState(false);

  const handleDeleteItem = () => setShowDelete(true);

  const handleNavigate = (item: any) => {
    navigate(`/cases-view/list-of-cases/${item?.id}`, { state: { item } });
  };

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
          let params = {
            ...(caseId && { causeId: caseId }),
            ...(searchQuery && { searchTerm: searchQuery }),
            ...(date && { startDate: date }),
            ...(lK_AttachmentSourceId > -1 && {
              lKAttachmentSourceId: lK_AttachmentSourceId,
            }),
          };
          dispatch(fetchAllCauseStageAttachments(params) as any);
        });
      } else if (
        res?.payload?.message == "The SessionAttachment does not exist"
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
  return (
    <>
      {Array.isArray(causeStageAttachments) &&
      causeStageAttachments?.length !== 0 ? (
        <div className="table-responsive mb-3 ">
          <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4 ">
            <thead>
              <tr className="fw-bolder projectSecColor">
                <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-350px">
                  {intl.formatMessage({ id: "Doc" })}
                </th>
                <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-350px">
                  {intl.formatMessage({ id: "Source" })}
                </th>
                <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-350px">
                  {intl.formatMessage({ id: "TheLawsuit" })}
                </th>
                <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-200px">
                  {intl.formatMessage({ id: "Session" })}
                </th>
                <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-200px">
                  {intl.formatMessage({ id: "DocumentCreator" })}
                </th>
                <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-200px">
                  {intl.formatMessage({ id: "EstablishedDate" })}
                </th>
                {(isLawyerToTakeAction || isOwnerOrSuperVisor || isDataEntry) && (
                <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-200px">
                  {intl.formatMessage({ id: "Procedures" })}
                </th>
                )}
              </tr>
            </thead>
            <tbody>
              {causeStageAttachments?.map((ele) => {
                return (
                  <Fragment key={Math.random() * 1000}>
                    {Array.isArray(ele?.causeStageAttachmentsProtoModel) &&
                      ele?.causeStageAttachmentsProtoModel?.map((item) => {
                        return (
                          <tr key={item?.id}>
                            <td>
                              <a
                                href={
                                  LegalRootUrl +
                                  item?.filePath?.replace("wwwroot/", "")
                                }
                                target="_blank"
                                rel="noreferrer"
                                download
                              >
                                <img
                                  src={getIconSrc(
                                    item?.fileName,
                                    {
                                      filePath: item?.filePath?.replace(
                                        "wwwroot/",
                                        ""
                                      ),
                                    },
                                    LegalRootUrl
                                  )}
                                  onError={(e: any) => {
                                    e.target.src = getIconSrcError(
                                      item?.fileName
                                    );
                                  }}
                                  className="h-30px me-2"
                                  style={{ cursor: "pointer" }}
                                  // onClick={() => handleNavigate(item)}
                                  alt={item?.fileName}
                                />
                              </a>
                              {item?.fileName}
                            </td>
                            <td>
                              {intl.locale == "ar"
                                ? item?.lK_AttachmentSourceNameAr
                                : item?.lK_AttachmentSourceNameEn}
                            </td>
                            <td>
                              #
                              {intl.locale == "ar"
                                ? ele?.lkStageNameAr
                                : ele?.lkStageNameEn}
                            </td>
                            <td>#{item?.session?.sessionNumber}</td>
                            <td>{item?.createdByName}</td>
                            <td dir="ltr">
                              {" "}
                              {moment(item?.createdOn).format("DD MMM YYYY")}
                            </td>
                            {( isLawyerToTakeAction || isOwnerOrSuperVisor || isDataEntry ) &&(
                             <td>
                              <div
                                className="text-danger fs-3 mx-5"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  handleDeleteItem();
                                  setAttachmentId(item?.id);
                                  setAttachmentType(item?.attachmentType);
                                }}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </div>
                            </td>
                            )}
                          </tr>
                        );
                      })}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center fw-bolder mt-8 fs-4">
          {intl.formatMessage({ id: "NoAttachments1" })}
        </div>
      )}

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

export default DocTable;
