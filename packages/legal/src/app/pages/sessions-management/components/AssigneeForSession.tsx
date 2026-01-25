import { useState, Fragment } from "react";
import { useIntl } from "react-intl";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import AddAssigneePopup from "../popups/AddAssigneePopup";
import { useLocation, useParams } from "react-router-dom";
import { ShowMore } from "../popups/ShowMore";
import { SessionModel } from "../../../models/SessionModel";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import moment from "moment";
import "moment/locale/ar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { deleteSessionAssign } from "../../../features/session-assign";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";
import { fetchSessionByIdParams } from "../../../features/session";
import getIconSrcError from "@4eplatform/shared/functions/getIconSrcError";
import { LegalRootUrl } from "@4eplatform/shared/apis/legal";
import { AssignationType } from "../../../models/LegalEnums";

interface AssigneeForSessionProps {
  session: SessionModel;
  setSession: any;
}

function AssigneeForSession({ session, setSession }: AssigneeForSessionProps) {
  let intl = useIntl();
  moment.locale("en");
  const [showDelete, setShowDelete] = useState(false);
  let [selectedId, setSelectedId] = useState("");
  let location = useLocation();
  const [addAssigneeModal, setAddAssigneeModal] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [popupTitle, setPopupTitle] = useState("");

  let theme = localStorage.getItem("Theme");
  let [selectedAssigneeId, setSelectedAssigneeId] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams();
  let handleDeleteAssignee = (
    assigneeId: string,
    causeId: string,
    causeStageId: string
  ) => {
    let ids = [assigneeId, causeId];
    dispatch(deleteSessionAssign({ ids }) as any).then((res) => {
      if (res?.payload?.statusEnum === 1) {
        showAlert(true, "DeletedSuccessfully", intl);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        // const data = {
        //   id: id,
        //   params: {
        //     CauseId: causeId,
        //   },
        // };
        // dispatch(fetchSessionByIdParams(data) as any).then((res) => {
        //   setSession(res?.payload?.result);
        // });
      } else if (res?.payload?.message === "Session Assign Is Not Found") {
        showAlert(false, "SessionAssignIsNotFound", intl);
      } else if (
        res?.payload?.message ===
        "There should be at least one lawyer and one data entry."
      ) {
        showAlert(false, "ThereShouldBeAtLeastOneLawyerAndOneDataEntry", intl);
      } else if (res?.payload?.message) {
        showAlert(false, res?.payload?.message, intl);
      }
    });
  };

  return (
    <>
      {/* Assign Section */}
      <div className="col-md-6 rounded-2 h-100">
        <div
          className={`rounded mt-5 ${
            session?.judgementGroundDto.length > 0 ? "h-100" : ""
          }`}
        >
          <div
            className={`card p-4 shadow-sm rounded mx-0 ${
              session?.judgementGroundDto.length > 0 ? "h-97 p-2" : "p-4"
            }`}
          >
            <div className="mb-4 p-3  rounded">
              <div className="d-flex align-items-center justify-content-between mb-1">
                <h6 className="mb-5 fs-4 fw-bolder">
                  {intl.formatMessage({
                    id: "Assign",
                  })}{" "}
                </h6>
                {!location?.pathname?.includes("/session-details") &&
                  session?.judgementGroundDto.length > 0 && (
                    <button
                      onClick={() => setAddAssigneeModal(true)}
                      className="w-30px h-30px border-radius-50 border-none bg-primary fs-3 d-flex align-items-center justify-content-center text-white"
                    >
                      +
                    </button>
                  )}
              </div>
              {(() => {
                const filteredAssignees =
                  session?.sessionAssigneeDto?.filter(
                    (assignee) =>
                      assignee.isChecked &&
                      (assignee.assignationType === 3 ||
                        assignee.assignationType === 4)
                  ) || [];

                if (filteredAssignees.length === 0) {
                  return (
                    <p>{intl.formatMessage({ id: "NoAvailableAssignees" })}</p>
                  );
                }

                return filteredAssignees.map((assignee) => (
                  <div
                    key={assignee.userId}
                    className="d-flex align-items-center justify-content-between"
                  >
                    <div className="d-flex align-items-center">
                      <div className="text-end d-flex justify-content-between align-items-center my-2">
                        <img
                          alt="operator"
                          className="rounded-circle"
                          style={{ width: "40px", height: "40px" }}
                          onError={(e: any) =>
                            (e.target.src = toAbsoluteUrl(
                              "/media/avatars/user.jpeg"
                            ))
                          }
                          src={getIconSrc(
                            assignee?.userImage,
                            { filePath: assignee?.userImage },
                            UserManagmentRootUrl
                          )}
                        />

                        <span
                          className={`fw-bold fs-5 pt-1 mx-2 text-${
                            theme === "dark" ? "white" : "black"
                          }`}
                        >
                          {assignee.userName}
                        </span>

                        <p className="text-muted mb-0 mx-2">
                          (
                          {assignee?.assignationType ===
                            AssignationType.Owner &&
                            intl.formatMessage({
                              id: "Clients",
                            })}
                          {assignee?.assignationType ===
                            AssignationType.Supervisor &&
                            intl.formatMessage({
                              id: "Supervisors",
                            })}
                          {assignee?.assignationType ===
                            AssignationType.Lawyers &&
                            intl.formatMessage({
                              id: "Lawyers",
                            })}
                          {assignee?.assignationType ===
                            AssignationType.DataEntry &&
                            intl.formatMessage({
                              id: "DataEntries",
                            })}
                          )
                        </p>
                      </div>
                    </div>
                    {session?.judgementGroundDto.length == 0 && (
                      <i
                        className="fa-solid fa-trash mx-3 text-danger fs-4 cursor-pointer"
                        onClick={() => {
                          setShowDelete(true);
                          setSelectedAssigneeId(
                            assignee?.id || assignee?.userId
                          );
                        }}
                      ></i>
                    )}
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Session Note Section */}
      {session?.sessionNotes?.length > 0 && (
        <div className="col-md-6 rounded-2 h-100">
          <div className="rounded mt-5">
            <div className="card p-4 shadow-sm rounded">
              <h6 className="mb-5 fs-4 fw-bolder">
                {intl.formatMessage({
                  id: "SessionNote",
                })}{" "}
              </h6>
              <div className="bg-light p-3 rounded">
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <div className="d-flex align-items-center gap-2 mb-0">
                    <img
                      onError={(e: any) =>
                        (e.target.src = toAbsoluteUrl(
                          "/media/avatars/user.jpeg"
                        ))
                      }
                      src={
                        session?.sessionNotes?.at(0)?.userImage
                          ? getIconSrc(
                              session?.sessionNotes?.at(0)?.userImage,
                              {
                                filePath:
                                  session?.sessionNotes?.at(0)?.userImage,
                              },
                              UserManagmentRootUrl
                            )
                          : toAbsoluteUrl("/media/avatars/user.jpeg")
                      }
                      alt="lawyer"
                      className="rounded-circle"
                      style={{ width: "25px", height: "25px" }}
                    />
                    <p className="mb-0">
                      {" "}
                      {session?.sessionNotes?.at(0)?.userName}
                    </p>
                  </div>
                  <p className="mb-0" dir="ltr">
                    {" "}
                    {moment(session?.sessionNotes?.at(0)?.createdOn).format(
                      "hh:mm A"
                    )}{" "}
                    |{" "}
                    {moment(session?.sessionNotes?.at(0)?.createdOn).format(
                      "DD MMM YYYY"
                    )}{" "}
                    |{" "}
                    {moment(session?.sessionNotes?.at(0)?.createdOn).format(
                      "dddd"
                    )}
                  </p>
                </div>
                <p>{session?.sessionNotes[0]?.description}</p>
                <div>
                  {Array.isArray(
                    session?.sessionNotes[0]?.attachmentSessioNoteDTO
                  ) &&
                    session.sessionNotes[0].attachmentSessioNoteDTO.length >
                      0 && (
                      <>
                        <h6 className="mb-5 fs-4 fw-bolder">
                          {intl.formatMessage({
                            id: "Documents",
                          })}{" "}
                        </h6>
                        <div className="attachments-scroller">
                          {session?.sessionNotes[0]?.attachmentSessioNoteDTO?.map(
                            (doc, index) => {
                              return (
                                <Fragment key={index}>
                                  <div className="p-3 rounded bg-white bg-fix-dark border-fix-dark my-2">
                                    {/* <p className="d-flex gap-1">
                                      <span className="text-muted">
                                        {intl.formatMessage({
                                          id: "Source",
                                        })}
                                        :{" "}
                                      </span>{" "}
                                      <span>
                                        {intl.locale === "ar"
                                          ? doc?.lK_AttachmentSourceNameAr
                                          : doc?.lK_AttachmentSourceNameEn}
                                      </span>
                                    </p> */}
                                    <div className="my-2  rounded d-flex justify-content-between align-items-center p-3 w-100">
                                      <div className="w-90">
                                        <img
                                          src={getIconSrc(
                                            doc?.fileName,
                                            {
                                              filePath: doc?.filePath?.replace(
                                                "wwwroot/",
                                                ""
                                              ),
                                            },
                                            LegalRootUrl
                                          )}
                                          onError={(e: any) => {
                                            e.target.src = getIconSrcError(
                                              doc?.fileName
                                            );
                                          }}
                                          className="w-40px h-40px"
                                          alt={doc?.fileName as string}
                                        />
                                        <span className="mx-3 fs-6">
                                          {doc?.attachmentName}
                                        </span>
                                      </div>

                                      <a
                                        target="_blank"
                                        rel="noreferrer"
                                        download={doc?.fileName}
                                        href={
                                          LegalRootUrl +
                                          doc?.filePath?.replace("wwwroot", "")
                                        }
                                      >
                                        <i className="fas fa-download"></i>
                                      </a>
                                    </div>
                                  </div>
                                </Fragment>
                              );
                            }
                          )}
                        </div>
                      </>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDelete && (
        <DeletePopup
          showDelete={showDelete}
          handleCloseDelete={() => setShowDelete(false)}
          handleDelete={() =>
            handleDeleteAssignee(
              selectedAssigneeId,
              session?.causeId,
              session?.causeStageId
            )
          }
          id={selectedAssigneeId}
        />
      )}

      {addAssigneeModal && (
        <AddAssigneePopup
          show={addAssigneeModal}
          handleClose={() => {
            setAddAssigneeModal(false);
          }}
          lawyers={session?.sessionAssigneeDto?.filter(
            (assignee: any) => assignee.assignationType === 3
          )}
          dataEntryOperators={session?.sessionAssigneeDto?.filter(
            (assignee: any) => assignee.assignationType === 4
          )}
        />
      )}

      {showMore && (
        <ShowMore
          show={showMore}
          handleClose={() => setShowMore(false)}
          data={popupContent}
          title={popupTitle}
        />
      )}
    </>
  );
}

export default AssigneeForSession;
