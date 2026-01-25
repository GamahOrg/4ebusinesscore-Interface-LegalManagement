import { Accordion, Button, Dropdown } from "react-bootstrap";
import { useIntl } from "react-intl";
import { Fragment, useEffect, useState } from "react";
import Spinner from "react-bootstrap/esm/Spinner";

import { fetchCauseStageById } from "../../../features/cause-stage";
import { fetchCauseById } from "../../../features/cause";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";
import AssignmentPopup from "../popups/AssignmentPopup";
import EditSessionPopup from "../popups/EditSessionPopup";
import AddSessionPopup from "../popups/AddSessionPopup";
import EditAuthorityPopup from "../popups/EditAuthorityPopup";
import EditSupervisorPopup from "../popups/EditSupervisorPopup";
import AddNotePopup from "../popups/AddNotePopup";
import AddJudgeReportPopup from "../popups/AddJudgeReportPopup";
import TerminateCasePopup from "../popups/TerminateCasePopup";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import "moment/locale/ar";
import moment from "moment";
import { DeleteSessionPopup } from "../popups/DeleteSessionPopup";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import EditSessionNotePopup from "../popups/EditSessionNotePopup";
import { deleteSessionNote } from "../../../features/session-note";
import EditJudgeReportPopup from "../popups/EditJudgeReportPopup";
import { deleteJudgmentGround } from "../../../features/judgement-ground";
import { LegalRootUrl } from "@4eplatform/shared/apis/legal";
import {
  AssignationType,
  CauseStageStatus,
  JudgmentRequirementType,
  LitigantStatus,
  RequirementType,
  SessionJedgementStatus,
} from "../../../models/LegalEnums";
import AddDocForSessionPopup from "../popups/AddDocForSessionPopup";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import getIconSrcError from "@4eplatform/shared/functions/getIconSrcError";
import { deleteSessionAssign } from "../../../features/session-assign";
import { UpdateSession } from "../../../features/session";
import AddJudgmentInstrumentPopup from "../popups/AddJudgmentInstrumentPopup";
import { isArray } from "chart.js/dist/helpers/helpers.core";
const CauseStageDetails = ({
  causeId,
  selectedCauseStageId,
  lastOne,
  isConsultive,
  isLawyerToTakeAction,
  isOwnerOrSuperVisor,
  isDataEntry,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch<AppDispatch>();
  const [showAssignmentPopup, setShowAssignmentPopup] = useState(false);
  const [showEditSessionPopup, setShowEditSessionPopup] = useState(false);
  const [showDeleteJudgementReportPopup, setShowDeleteJudgementReportPopup] =
    useState(false);
  const [showEditJudgementReportPopup, setShowEditJudgementReportPopup] =
    useState(false);
  const [showAddJudgeInstrument, setShowAddJudgeInstrument] = useState(false);
  const [showAddSessionPopup, setShowAddSessionPopup] = useState(false);
  const [showEditAuthorityPopup, setShowEditAuthorityPopup] = useState(false);
  const [showEditSupervisorPopup, setShowEditSupervisorPopup] = useState(false);
  const [showAddNotePopup, setShowAddNotePopup] = useState(false);
  const [showAddJudgeReportPopup, setShowAddJudgeReportPopup] = useState(false);
  const [showTerminateCasePopup, setShowTerminateCasePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showAccordionEdit, setShowAccordionEdit] = useState(false);
  moment.locale("en");
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [selectedSession, setSelectedSession] = useState();

  const [selectedSessionDate, setSelectedSessionDate] = useState("");

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
  const [showEditSessionNote, setShowEditSessionNote] = useState(false);
  const [showdeleteSessionNote, setShowDeleteSessionNote] = useState(false);
  const [selectedSessionNoteId, setSelectedSessionNoteId] = useState(null);
  const [SessionNoteIdDeleted, setSessionNoteIdDeleted] = useState<string>("");
  const [judgementReportId, setJudgementReportId] = useState(null);

  const handleDeleteSessionNote = (
    causeId: string,
    causeStageId: string,
    sessionNoteId: string
  ) => {
    let data = { body: { id: sessionNoteId }, params: { causeId } };
    dispatch(deleteSessionNote(data) as any).then((res) => {
      if (res?.payload?.statusEnum === 1) {
        dispatch(fetchCauseStageById({ causeStageId }));
        showAlert(true, "DeletedSuccessfully", intl);
      } else if (res?.payload?.message === "You can't delete session note") {
        showAlert(false, "YouCan'tDeleteSessionNote", intl);
      } else if (res?.payload?.message) {
        showAlert(false, res?.payload?.message, intl);
      }
    });
  };

  const handleDeleteJudgementReport = (id: string) => {
    let data = {
      body: {
        id: id,
      },
      params: { causeId },
    };
    dispatch(deleteJudgmentGround(data) as any).then((res) => {
      if (res?.payload?.statusEnum === 1) {
        showAlert(true, "DeletedSuccessfully", intl, () => {
          dispatch(fetchCauseStageById({ causeStageId: selectedCauseStageId }));
        });
      } else if (
        res?.payload?.message === "You can't delete judgement ground"
      ) {
        showAlert(false, "YouCan'tDeleteJudgementGround", intl);
      } else if (res?.payload?.message) {
        showAlert(false, res?.payload?.message, intl);
      }
    });
  };

  const [isCauseStageFinished, setIsCauseStageFinished] = useState(false);
  useEffect(() => {
    if (+causeStageById?.status === CauseStageStatus.IsFinished) {
      // صدر حكم
      setIsCauseStageFinished(true);
    } else {
      setIsCauseStageFinished(false);
    }
  }, [causeStageById]);
  const [addShowDoc, setAddShowDoc] = useState(false);
  const getUserRoleInSession = (userId: string, session: any): string => {
    const sessionLawyers = session?.sessionAssigneeDto
      ?.filter(
        (assignee: any) => assignee?.assignationType === AssignationType.Lawyers
      )
      ?.map((user: any) => user?.userId);

    const sessionEntryData = session?.sessionAssigneeDto
      ?.filter(
        (assignee: any) =>
          assignee?.assignationType === AssignationType.DataEntry
      )
      ?.map((user: any) => user?.userId);
    const isLawyer = sessionLawyers?.includes(userId);
    const isDataEntry = sessionEntryData?.includes(userId);

    if (isLawyer && isDataEntry)
      return `(${intl.formatMessage({
        id: "InternalLawyer&&InternalDataEntry",
      })})`;
    if (isLawyer) return `(${intl.formatMessage({ id: "InternalLawyer" })})`;
    if (isDataEntry)
      return `(${intl.formatMessage({ id: "InternalDataEntry" })})`;
    return "";
  };
  let [selectedAssigneeId, setSelectedAssigneeId] = useState("");
  const [showDeleteAssigneePopup, setShowDeleteAssigneePopup] = useState(false);
  let handleDeleteAssignee = (
    assigneeId: string,
    causeId: string,
    causeStageId: string
  ) => {
    let ids = [assigneeId, causeId];
    dispatch(deleteSessionAssign({ ids }) as any).then((res) => {
      if (res?.payload?.statusEnum === 1) {
        dispatch(fetchCauseStageById({ causeStageId }));
        showAlert(true, "DeletedSuccessfully", intl);
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
  let [showDeleteAttachmentPopup, setShowDeleteAttachmentPopup] =
    useState(false);
  let [selectedFilePath, setSelectedFilePath] = useState("");
  let deleteSessionAttachment = (filePath, causeId, causeStageId, session) => {
    let formData = new FormData();
    formData.append("causeId", causeId as string);
    formData.append("causeStageId", causeStageId as string);
    formData.append("sessionDate", session?.sessionDate);
    formData.append("courtName", session?.courtName);
    formData.append("areaName", session?.areaName);
    let sessionAssigneeDto = session?.sessionAssigneeDto?.map((user) => {
      return {
        userId: user?.userId,
        assignationType: user?.assignationType,
      };
    });
    sessionAssigneeDto?.forEach((user, index) => {
      formData.append(`sessionAssigneeDto[${index}].userId`, user?.userId);
      formData.append(
        `sessionAssigneeDto[${index}].assignationType`,
        user?.assignationType
      );
    });
    let oldAttachmentPathes = session?.sessionAttchments
      ?.map((item) => {
        return item?.sourceAttachments;
      })
      ?.flat()
      .map((attach) => {
        return attach.filePath;
      })
      ?.filter((item) => {
        return item != filePath;
      });
    oldAttachmentPathes?.forEach((path, index) => {
      formData.append(`odAttachmenPaths[${index}]`, path);
    });
    let data = { params: { id: session?.id }, body: formData };

    dispatch(UpdateSession(data) as any).then((res) => {
      if (res?.payload?.statusEnum == 1) {
        dispatch(fetchCauseStageById({ causeStageId }));
        showAlert(true, "DeletedSuccessfully", intl, () => {});
      } else if (res?.payload?.message) {
        showAlert(false, "YouCan'tDeleteDoc", intl);
      }
    });
  };

  return (
    <>
      <div className="row row-cols-1 row-cols-lg-2 gy-5 gx-5 mb-5">
        <div className="col col-lg-6">
          <div className="card p-4 shadow-sm h-100 ">
            <div className="d-flex justify-content-between">
              <p className="mb-0 ">
                <span className="mb-0 text-muted">
                  {intl.formatMessage({
                    id: "ThePartyResponsibleForTransferringTheCase",
                  })}
                  :
                </span>{" "}
                <span className="mb-0 fw-bolder">
                  {causeStageById?.redirector === LitigantStatus.Client &&
                    intl.formatMessage({ id: "Clients" })}
                  {causeStageById?.redirector === LitigantStatus.Opponent &&
                    intl.formatMessage({
                      id: "Opponents",
                    })}
                  {!causeStageById?.redirector &&
                    intl.formatMessage({ id: "NotFound" })}
                </span>
              </p>

              <div>
                {lastOne &&
                  (isLawyerToTakeAction ||
                    isOwnerOrSuperVisor ||
                    isDataEntry) && (
                    <i
                      className="fa-solid fa-pen cursor-pointer"
                      onClick={() => setShowEditAuthorityPopup(true)}
                    ></i>
                  )}
              </div>
            </div>
          </div>
        </div>
        <div className="col col-lg-3">
          <div className="card p-4 shadow-sm h-100">
            <div>
              <div className="d-flex justify-content-between">
                <p className="mb-0 ">
                  <span className="mb-0 text-muted">
                    {intl.formatMessage({
                      id: "Managers",
                    })}{" "}
                    :
                  </span>
                  <span className="mb-0 fw-bolder">
                    {causeStageById?.fullName ||
                      intl.formatMessage({ id: "NotFound" })}
                  </span>
                </p>

                <div>
                  {" "}
                  {lastOne &&
                    (isLawyerToTakeAction ||
                      isOwnerOrSuperVisor ||
                      isDataEntry) && (
                      <i
                        className="fa-solid fa-pen cursor-pointer"
                        onClick={() => setShowEditSupervisorPopup(true)}
                      ></i>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-lg-3">
          {causeStageById?.lK_StageId !== 1 &&
            causeStageById?.lK_StageId !== 8 &&
            lastOne &&
            (isLawyerToTakeAction || isOwnerOrSuperVisor || isDataEntry) && (
              <button
                className="btn btn-outline-primary border border-primary bg-white text-dark bg-fix-dark border-fix-dark w-100"
                onClick={() => {
                  setShowAddSessionPopup(true);
                }}
              >
                <i className="fas fa-plus fa-lg"></i>{" "}
                {intl.formatMessage({ id: "AddNewSession" })}
              </button>
            )}
        </div>
      </div>
      {loadingForCauseStageById ? (
        <div className="d-flex gap-4 justify-content-center align-items-center py-4">
          {intl.formatMessage({ id: "DataIsLoaded..." })}
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <div className="w-100">
            {/* {causeStageById?.sessions?.length > 0 */}
            {Array.isArray(causeStageById?.sessions)
              ? causeStageById.sessions?.map((session: any, index: any) => {
                  const isLastSession =
                    index === causeStageById.sessions.length - 1;
                  const isJudgmentWasIssued = [
                    "صدر حكم",
                    "صدر الحكم",
                  ]?.includes(session?.judgement?.lkJudgementNameAr);
                  const sessionDate = new Date(session?.sessionDate);
                  const plus15Days = new Date(sessionDate);
                  plus15Days.setDate(sessionDate.getDate() + 15);
                  const today = new Date();

                  return (
                    <div key={index}>
                      <Accordion defaultActiveKey="0" className="w-100">
                        <Accordion.Item
                          eventKey={index}
                          className="w-100 p-4 dark-bg-color"
                        >
                          <Accordion.Header className="w-100">
                            <div className="d-flex justify-content-between w-100">
                              <div className="d-flex flex-md-row align-items-md-center gap-3 mb-0 flex-column align-items-start">
                                <h4 className=" mb-0">
                                  {intl.formatMessage({ id: "Session" })}
                                </h4>

                                <p className="text-dark mb-0">
                                  {session?.sessionNumber}#
                                </p>
                                <p
                                  className="text-dark my-0"
                                  dir="ltr"
                                  style={{ textAlign: "justify" }}
                                >
                                  {moment(session?.sessionDate).format(
                                    "hh:mm A"
                                  )}{" "}
                                  |{" "}
                                  {moment(session?.sessionDate).format(
                                    "DD MMM YYYY"
                                  )}{" "}
                                  |{" "}
                                  {moment(session?.sessionDate).format("dddd")}
                                </p>
                                <p className="mb-0 text-dark">
                                  <span className="text-primary">
                                    {session?.courtName}
                                  </span>
                                  <span> |</span>{" "}
                                  <span>{session?.areaName} </span>
                                </p>
                              </div>
                              {/* Dropdown */}
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="position-relative"
                              >
                                {isLastSession &&
                                  lastOne &&
                                  (isLawyerToTakeAction ||
                                    isOwnerOrSuperVisor ||
                                    isDataEntry) && (
                                    <>
                                      <Dropdown>
                                        <Dropdown.Toggle
                                          as="div"
                                          id="dropdown-basic"
                                          className="cursor-pointer d-flex justify-content-center align-items-center"
                                        >
                                          <i className="fas fa-ellipsis-h"></i>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                          {(!session?.sessionNotes?.id ||
                                            session?.sessionNotes?.id ==
                                              "00000000-0000-0000-0000-000000000000") &&
                                            isJudgmentWasIssued === false && (
                                              <>
                                                <Dropdown.Item
                                                  onClick={() => {
                                                    setShowAddNotePopup(true);
                                                    setSelectedSessionId(
                                                      session?.id
                                                    );
                                                  }}
                                                >
                                                  <div className="py-2 px-1">
                                                    <i className="fas fa-plus me-2"></i>
                                                    <span>
                                                      {intl.formatMessage({
                                                        id: "AddMemorandum",
                                                      })}
                                                    </span>
                                                  </div>
                                                </Dropdown.Item>
                                              </>
                                            )}
                                          {!session?.judgement &&
                                            isJudgmentWasIssued === false && (
                                              <Dropdown.Item
                                                onClick={() => {
                                                  setSelectedSessionId(
                                                    session?.id
                                                  );
                                                  setShowEditSessionPopup(true);
                                                }}
                                              >
                                                <div className="py-2 px-1">
                                                  <i className="fas fa-edit me-2"></i>
                                                  <span>
                                                    {intl.formatMessage({
                                                      id: "EditSessionData",
                                                    })}
                                                  </span>
                                                </div>
                                              </Dropdown.Item>
                                            )}
                                          {!session?.judgement
                                            ?.jedgementGroundId &&
                                            isJudgmentWasIssued === false && (
                                              <Dropdown.Item
                                                onClick={() => {
                                                  setShowAddJudgeReportPopup(
                                                    true
                                                  );
                                                  setSelectedSessionId(
                                                    session?.id
                                                  );
                                                  setSelectedSessionDate(
                                                    session?.sessionDate
                                                  );
                                                }}
                                              >
                                                <div className="py-2 px-1">
                                                  <i className="fas fa-sync me-2"></i>
                                                  <span>
                                                    {" "}
                                                    {intl.formatMessage({
                                                      id: "AddingTheTermsOfTheSession",
                                                    })}
                                                  </span>
                                                </div>
                                              </Dropdown.Item>
                                            )}
                                          {session?.judgement
                                            ?.jedgementGroundId && (
                                            <>
                                              <Dropdown.Item
                                                onClick={() => {
                                                  setSelectedSessionId(
                                                    session?.id
                                                  );
                                                  setJudgementReportId(
                                                    session?.judgement
                                                      ?.jedgementGroundId
                                                  );
                                                  setShowEditJudgementReportPopup(
                                                    true
                                                  );
                                                  setSelectedSessionDate(
                                                    session?.sessionDate
                                                  );
                                                }}
                                              >
                                                <div className="py-2 px-1">
                                                  <i className="fas fa-edit me-2"></i>
                                                  <span>
                                                    {intl.formatMessage({
                                                      id: "EditSessionReport",
                                                    })}
                                                  </span>
                                                </div>
                                              </Dropdown.Item>
                                            </>
                                          )}
                                          {/* {session?.judgement
                                            ?.jedgementGroundId &&
                                            isJudgmentWasIssued === false && (
                                              <>
                                                <Dropdown.Item
                                                  onClick={() => {
                                                    setSelectedSessionId(
                                                      session?.id
                                                    );
                                                    setJudgementReportId(
                                                      session?.judgement
                                                        ?.jedgementGroundId
                                                    );
                                                    setShowDeleteJudgementReportPopup(
                                                      true
                                                    );
                                                  }}
                                                >
                                                  <div className="py-2 px-1">
                                                    <i className="fas fa-trash me-2"></i>
                                                    <span>
                                                      {intl.formatMessage({
                                                        id: "DeleteJudgementReport",
                                                      })}
                                                    </span>
                                                  </div>
                                                </Dropdown.Item>
                                              </>
                                            )} */}
                                          {/* {(!session?.judgement && isJudgmentWasIssued === false)&&(
                                            <Dropdown.Item
                                              onClick={() => {
                                                setSelectedSessionId(
                                                  session?.id
                                                );
                                                setShowDeletePopup(true);
                                              }}
                                            >
                                              <div className="py-2 px-1">
                                                <i className="fas fa-trash me-2"></i>
                                                <span>
                                                  {intl.formatMessage({
                                                    id: "DeleteSessionData",
                                                  })}
                                                </span>
                                              </div>
                                            </Dropdown.Item>
                                          )} */}
                                          {/* اضافة صك الحكم */}
                                          {session?.judgement
                                            ?.lkJudgementNameAr ===
                                            "صدر الحكم" &&
                                            session?.judgement
                                              ?.lkJudgementNameEn ===
                                              "The verdict has been issued" &&
                                            today >= plus15Days && (
                                              <>
                                                <Dropdown.Item
                                                  onClick={() => {
                                                    setSelectedSessionId(
                                                      session?.id
                                                    );
                                                    setJudgementReportId(
                                                      session?.judgement
                                                        ?.jedgementGroundId
                                                    );
                                                    setShowAddJudgeInstrument(
                                                      true
                                                    );
                                                  }}
                                                >
                                                  <div className="py-2 px-1">
                                                    <i className="fas fa-plus me-2"></i>
                                                    <span>
                                                      {intl.formatMessage({
                                                        id: "AddJudgmentInstrument",
                                                      })}
                                                    </span>
                                                  </div>
                                                </Dropdown.Item>
                                              </>
                                            )}
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </>
                                  )}
                              </div>
                            </div>
                          </Accordion.Header>
                          <Accordion.Body className="w-100">
                            <div className="d-flex flex-column gap-3">
                              <div className="bg-light p-md-5 p-0 rounded">
                                <div className="row h-100">
                                  <div className="col-md-8 col-12 ">
                                    <div className="d-flex flex-column gap-2 h-100">
                                      <div className="card p-3 rounded h-100">
                                        <div className="d-flex justify-content-between">
                                          <h6 className="mb-5 fs-4 fw-bolder">
                                            {intl.formatMessage({
                                              id: "Assign",
                                            })}{" "}
                                          </h6>
                                          {lastOne &&
                                            isLastSession &&
                                            !isJudgmentWasIssued &&
                                            !isCauseStageFinished &&
                                            (isLawyerToTakeAction ||
                                              isOwnerOrSuperVisor ||
                                              isDataEntry) && (
                                              <Button
                                                variant="link"
                                                className="p-0"
                                                onClick={() => {
                                                  setShowAssignmentPopup(true);
                                                  setSelectedSession(session);
                                                  setSelectedSessionId(
                                                    session?.id
                                                  );
                                                }}
                                              >
                                                <div
                                                  className="bg-primary rounded-circle d-flex justify-content-center align-items-center"
                                                  style={{
                                                    width: "30px",
                                                    height: "30px",
                                                  }}
                                                >
                                                  <i className="fas fa-plus text-white fs-5"></i>
                                                </div>
                                              </Button>
                                            )}
                                        </div>
                                        {session?.sessionAssigneeDto?.length ===
                                          0 && (
                                          <p>
                                            {intl.formatMessage({
                                              id: "NotFound",
                                            })}{" "}
                                          </p>
                                        )}
                                        <div className="session-note-scroller">
                                          {session?.sessionAssigneeDto?.map(
                                            (assignee: any, index: number) => (
                                              <div
                                                key={index}
                                                className="d-flex align-items-center justify-content-between"
                                              >
                                                <div className="d-flex align-items-center gap-2 my-2">
                                                  <img
                                                    alt=""
                                                    src={
                                                      assignee?.userImage
                                                        ? UserManagmentRootUrl +
                                                          assignee?.userImage
                                                        : UserManagmentRootUrl +
                                                          assignee?.userImage
                                                    }
                                                    onError={(e: any) => {
                                                      e.target.src =
                                                        toAbsoluteUrl(
                                                          "/media/avatars/300-1.jpg"
                                                        );
                                                    }}
                                                    style={{
                                                      width: "40px",
                                                      height: "40px",
                                                      borderRadius: "50%",
                                                    }}
                                                  />
                                                  <p className="mb-0">
                                                    {assignee?.userName}
                                                  </p>
                                                  <p className="text-muted mb-0">
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
                                                {lastOne &&
                                                  isLastSession &&
                                                  !isJudgmentWasIssued &&
                                                  !isCauseStageFinished &&
                                                  (isLawyerToTakeAction ||
                                                    isOwnerOrSuperVisor ||
                                                    isDataEntry) && (
                                                    <i
                                                      onClick={() => {
                                                        setShowDeleteAssigneePopup(
                                                          true
                                                        );
                                                        setSelectedAssigneeId(
                                                          assignee?.id ||
                                                            assignee?.userId
                                                        );
                                                      }}
                                                      className="fa-solid fa-trash mx-2 fs-4 text-danger cursor-pointer"
                                                    ></i>
                                                  )}
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>

                                      {session?.sessionNotes?.id !==
                                        "00000000-0000-0000-0000-000000000000" && (
                                        <div className="card p-3 rounded h-100">
                                          <div className="d-flex justify-content-between align-items-center">
                                            <h6 className="mb-5 fs-4 fw-bolder">
                                              {intl.formatMessage({
                                                id: "SessionNote",
                                              })}{" "}
                                            </h6>
                                            {/* wait response from back to add condition */}
                                            {lastOne &&
                                              isLastSession &&
                                              !isJudgmentWasIssued &&
                                              !isCauseStageFinished &&
                                              session?.sessionNotes?.id &&
                                              (isLawyerToTakeAction ||
                                                isOwnerOrSuperVisor ||
                                                isDataEntry) && (
                                                <div className="d-flex">
                                                  <div
                                                    className="px-2 py-2 my-1 text-muted mx-0 cursor-pointer"
                                                    onClick={() => {
                                                      setSessionNoteIdDeleted(
                                                        session?.sessionNotes
                                                          ?.id
                                                      );
                                                      setShowDeleteSessionNote(
                                                        true
                                                      );
                                                    }}
                                                  >
                                                    <i className="fa-solid fa-trash mx-2 fs-4"></i>
                                                  </div>
                                                  <div
                                                    className="px-2 py-2 my-1 text-muted mx-0"
                                                    onClick={() => {
                                                      setShowEditSessionNote(
                                                        true
                                                      );
                                                      setSelectedSessionNoteId(
                                                        session?.sessionNotes
                                                          ?.id
                                                      );
                                                    }}
                                                  >
                                                    <i className="fa-solid fa-pen-to-square fs-4 mx-2 cursor-pointer"></i>
                                                  </div>
                                                </div>
                                              )}
                                          </div>
                                          <div className="bg-light p-3 rounded">
                                            {session?.sessionNotes
                                              ?.description && (
                                              <>
                                                <div className="d-flex justify-content-between align-items-center">
                                                  <div className="d-flex align-items-center gap-2 mb-0">
                                                    {" "}
                                                    <img
                                                      alt={
                                                        session?.sessionNotes
                                                          ?.userImage
                                                      }
                                                      onError={(e: any) =>
                                                        (e.target.src =
                                                          toAbsoluteUrl(
                                                            "/media/avatars/300-1.jpg"
                                                          ))
                                                      }
                                                      src={
                                                        session?.sessionNotes
                                                          ?.userImage
                                                          ? UserManagmentRootUrl +
                                                            session
                                                              ?.sessionNotes
                                                              ?.userImage
                                                          : toAbsoluteUrl(
                                                              "/media/avatars/user.jpeg"
                                                            )
                                                      }
                                                      style={{
                                                        width: "40px",
                                                        height: "40px",
                                                        borderRadius: "50%",
                                                      }}
                                                    />
                                                    <p className="mb-0">
                                                      {
                                                        session?.sessionNotes
                                                          ?.userName
                                                      }
                                                    </p>
                                                    <p className="text-muted mb-0">
                                                      {getUserRoleInSession(
                                                        session?.sessionNotes
                                                          ?.createdBy,
                                                        session
                                                      )}
                                                    </p>
                                                  </div>
                                                  <p className="mb-0" dir="ltr">
                                                    {moment(
                                                      session?.sessionNotes
                                                        ?.createdOn
                                                    )?.format("dddd")}{" "}
                                                    |{" "}
                                                    {moment(
                                                      session?.sessionNotes
                                                        ?.createdOn
                                                    ).format(
                                                      "DD MMM YYYY"
                                                    )}{" "}
                                                    |{" "}
                                                    {moment(
                                                      session?.sessionNotes
                                                        ?.createdOn
                                                    ).format("hh:mm A")}
                                                  </p>
                                                </div>
                                              </>
                                            )}

                                            <p className="session-note-scroller">
                                              {session?.sessionNotes
                                                ?.description ||
                                                intl.formatMessage({
                                                  id: "NotFound",
                                                })}{" "}
                                            </p>

                                            <div>
                                              {Array.isArray(
                                                session?.sessionNotes
                                                  ?.attachmentSessioNoteDTO
                                              ) &&
                                                session.sessionNotes
                                                  .attachmentSessioNoteDTO
                                                  .length > 0 && (
                                                  <>
                                                    <h6 className="mb-5 fs-4 fw-bolder">
                                                      {intl.formatMessage({
                                                        id: "Documents",
                                                      })}{" "}
                                                    </h6>
                                                    <div className="attachments-scroller">
                                                      {session?.sessionNotes?.attachmentSessioNoteDTO?.map(
                                                        (doc, index) => {
                                                          return (
                                                            <Fragment
                                                              key={index}
                                                            >
                                                              <div className="p-3 rounded bg-white bg-fix-dark border-fix-dark my-2">
                                                                {/* <p className="d-flex gap-1">
                                                                    <span className="text-muted">
                                                                      {intl.formatMessage(
                                                                        {
                                                                          id: "Source",
                                                                        }
                                                                      )}
                                                                      :{" "}
                                                                    </span>{" "}
                                                                    <span>
                                                                      {intl.locale ===
                                                                      "ar"
                                                                        ? doc?.lK_AttachmentSourceNameAr
                                                                        : doc?.lK_AttachmentSourceNameEn}
                                                                    </span>
                                                                  </p> */}
                                                                <div className="d-flex align-items-center gap-5">
                                                                  <a
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    download={
                                                                      doc?.attachmentName ||
                                                                      doc?.fileName
                                                                    }
                                                                    href={
                                                                      LegalRootUrl +
                                                                      doc?.filePath?.replace(
                                                                        "wwwroot",
                                                                        ""
                                                                      )
                                                                    }
                                                                  >
                                                                    <i className="fas fa-download"></i>
                                                                  </a>
                                                                  <div className="">
                                                                    <img
                                                                      src={getIconSrc(
                                                                        doc?.fileName,
                                                                        {
                                                                          filePath:
                                                                            doc?.filePath?.replace(
                                                                              "wwwroot/",
                                                                              ""
                                                                            ),
                                                                        },
                                                                        LegalRootUrl
                                                                      )}
                                                                      onError={(
                                                                        e: any
                                                                      ) => {
                                                                        e.target.src =
                                                                          getIconSrcError(
                                                                            doc?.fileName
                                                                          );
                                                                      }}
                                                                      className="w-40px h-40px"
                                                                      alt={
                                                                        doc?.fileName as string
                                                                      }
                                                                    />
                                                                    <span className="mx-3 fs-6">
                                                                      {doc?.attachmentName ||
                                                                        doc?.fileName}
                                                                    </span>
                                                                  </div>
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
                                      )}
                                    </div>
                                  </div>

                                  <div className="col-md-4 col-12">
                                    <div className="card p-3 rounded h-100">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <h6 className="mb-5 fs-4 fw-bolder">
                                          {intl.formatMessage({
                                            id: "Documents",
                                          })}{" "}
                                        </h6>
                                        {lastOne &&
                                          !isJudgmentWasIssued &&
                                          isLastSession &&
                                          (isLawyerToTakeAction ||
                                            isOwnerOrSuperVisor ||
                                            isDataEntry) && (
                                            <>
                                              <Button
                                                variant="link"
                                                className="p-0"
                                                onClick={() => {
                                                  setAddShowDoc(true);
                                                  setSelectedSession(session);
                                                  setSelectedSessionId(
                                                    session?.id
                                                  );
                                                }}
                                              >
                                                <div
                                                  className="bg-primary rounded-circle d-flex justify-content-center align-items-center"
                                                  style={{
                                                    width: "30px",
                                                    height: "30px",
                                                  }}
                                                >
                                                  <i className="fas fa-plus text-white fs-5"></i>
                                                </div>
                                              </Button>
                                            </>
                                          )}
                                      </div>
                                      <div className="d-flex flex-column gap-3">
                                        {session?.sessionAttchments?.length ===
                                          0 && (
                                          <p>
                                            {intl.formatMessage({
                                              id: "NotFound",
                                            })}{" "}
                                          </p>
                                        )}

                                        {session?.sessionAttchments?.length >
                                          0 && (
                                          <>
                                            <div className="attachments-scroller">
                                              {session?.sessionAttchments?.map(
                                                (doc, index) => {
                                                  return (
                                                    <Fragment key={index}>
                                                      <div className="rounded p-3  card card-shadow2 my-5">
                                                        <p className="d-flex gap-1">
                                                          <span className="text-muted">
                                                            {intl.formatMessage(
                                                              {
                                                                id: "Source",
                                                              }
                                                            )}
                                                            :{" "}
                                                          </span>{" "}
                                                          <span>
                                                            {intl.locale ===
                                                            "ar"
                                                              ? doc?.lK_SourceNameAr
                                                              : doc?.lK_SourceNameEn}
                                                          </span>
                                                        </p>
                                                        {doc?.sourceAttachments
                                                          ?.length > 0 && (
                                                          <>
                                                            {doc?.sourceAttachments?.map(
                                                              (attach) => (
                                                                <div
                                                                  className="row bg-light rounded my-3 p-4"
                                                                  key={
                                                                    attach?.id
                                                                  }
                                                                >
                                                                  <div className="my-2  d-flex justify-content-between align-items-center p-3 ">
                                                                    <div className="w-90">
                                                                      <img
                                                                        src={getIconSrc(
                                                                          attach?.fileName,
                                                                          {
                                                                            filePath:
                                                                              attach?.filePath?.replace(
                                                                                "wwwroot/",
                                                                                ""
                                                                              ),
                                                                          },
                                                                          LegalRootUrl
                                                                        )}
                                                                        onError={(
                                                                          e: any
                                                                        ) => {
                                                                          e.target.src =
                                                                            getIconSrcError(
                                                                              attach?.fileName
                                                                            );
                                                                        }}
                                                                        className="w-40px h-40px"
                                                                        alt={
                                                                          attach?.attachmentName as string
                                                                        }
                                                                      />
                                                                      <span className="mx-3 fs-6">
                                                                        {attach?.attachmentName &&
                                                                        attach?.attachmentName !==
                                                                          ""
                                                                          ? attach?.attachmentName
                                                                          : attach?.fileName}
                                                                      </span>
                                                                    </div>

                                                                    <a
                                                                      target="_blank"
                                                                      rel="noreferrer"
                                                                      download={
                                                                        attach?.attachmentName ||
                                                                        attach?.fileName
                                                                      }
                                                                      href={
                                                                        LegalRootUrl +
                                                                        attach?.filePath?.replace(
                                                                          "wwwroot",
                                                                          ""
                                                                        )
                                                                      }
                                                                    >
                                                                      <i className="fas fa-download"></i>
                                                                    </a>
                                                                  </div>
                                                                  {lastOne &&
                                                                    isLastSession &&
                                                                    !isJudgmentWasIssued &&
                                                                    !isCauseStageFinished &&
                                                                    (isLawyerToTakeAction ||
                                                                      isOwnerOrSuperVisor ||
                                                                      isDataEntry) && (
                                                                      <>
                                                                        <i
                                                                          onClick={() => {
                                                                            setSelectedFilePath(
                                                                              attach?.filePath
                                                                            );
                                                                            setSelectedSession(
                                                                              session
                                                                            );
                                                                            setShowDeleteAttachmentPopup(
                                                                              true
                                                                            );
                                                                          }}
                                                                          className="fa-solid fa-trash mx-2 fs-4 text-danger cursor-pointer text-align-end"
                                                                        ></i>
                                                                      </>
                                                                    )}
                                                                </div>
                                                              )
                                                            )}
                                                          </>
                                                        )}
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

                              {session?.judgement && (
                                <div className="bg-light p-5 mb-5 rounded">
                                  <h4 className="mb-5 fs-2 fw-bolder">
                                    {intl.formatMessage({
                                      id: "ReportOnTheTermsOfTheSession",
                                    })}
                                  </h4>

                                  <div
                                    className="container-fluid px-4"
                                    style={{
                                      maxWidth: "1400px",
                                      margin: "0 auto",
                                    }}
                                  >
                                    <div className="row row-cols-1 row-cols-lg-2 gy-5 gx-5">
                                      <div className="col">
                                        <div className="card p-4 shadow-sm h-100">
                                          <div className="d-flex justify-content-between align-items-center mb-5">
                                            <h5 className="mb-0 fs-4 fw-bolder">
                                              {intl.formatMessage({
                                                id: "TitleOnTheTermsOfTheSession",
                                              })}
                                            </h5>
                                            <div className="bg-light-success p-3 rounded">
                                              <span className="text-success">
                                                {session?.sessionJedgementStatus ===
                                                  SessionJedgementStatus.ForMe &&
                                                  intl.formatMessage({
                                                    id: "ForTheAuthority",
                                                  })}
                                                {session?.sessionJedgementStatus ===
                                                  SessionJedgementStatus.Against &&
                                                  intl.formatMessage({
                                                    id: "AgainstTheAuthority",
                                                  })}
                                                {session?.sessionJedgementStatus ===
                                                  SessionJedgementStatus.Equality &&
                                                  intl.formatMessage({
                                                    id: "EndTheDispute",
                                                  })}
                                              </span>
                                            </div>
                                          </div>
                                          <p className="fs-5">
                                            {session?.judgement?.judgementTitle}
                                          </p>
                                          <div className="d-flex align-items-center gap-2 mb-5">
                                            <div
                                              className="rounded-circle bg-primary"
                                              style={{
                                                width: "20px",
                                                height: "20px",
                                                borderRadius: "50%",
                                              }}
                                            ></div>
                                            <p className="mb-0">
                                              {intl.locale === "ar"
                                                ? session?.judgement
                                                    ?.lkJudgementNameAr
                                                : session?.judgement
                                                    ?.lkJudgementNameEn}
                                            </p>
                                          </div>

                                          {(() => {
                                            const dateValue =
                                              session?.judgement
                                                ?.judgementDate ||
                                              session?.judgement?.nextSession;
                                            const m = dateValue
                                              ? moment(dateValue)
                                              : null;
                                            return m && m.isValid() ? (
                                              <p dir="ltr">
                                                {m.format("dddd")} {" | "}
                                                {m.format("DD MMM YYYY")}{" "}
                                                {" | "}
                                                {m.format("hh:mm A")}
                                              </p>
                                            ) : null;
                                          })()}

                                          <div className="session-note-scroller">
                                            {Array.isArray(
                                              session?.judgement
                                                ?.judgementAttchments
                                            ) &&
                                              session?.judgement?.judgementAttchments?.map(
                                                (doc: any, index) => (
                                                  <div
                                                    key={index}
                                                    className="bg-light rounded  d-flex justify-content-between align-items-center p-3 mb-2"
                                                  >
                                                    <div>
                                                      <span>
                                                        {doc?.attachmentName ||
                                                          doc?.fileName}
                                                      </span>
                                                    </div>
                                                    <a
                                                      target="_blank"
                                                      rel="noreferrer"
                                                      download={
                                                        doc?.attachmentName ||
                                                        doc?.fileName
                                                      }
                                                      href={
                                                        LegalRootUrl +
                                                        doc?.filePath?.replace(
                                                          "wwwroot",
                                                          ""
                                                        )
                                                      }
                                                    >
                                                      <i className="fas fa-download"></i>
                                                    </a>
                                                  </div>
                                                )
                                              )}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col">
                                        <div className="card p-4 shadow-sm h-100">
                                          <div className="d-flex justify-content-between mb-5">
                                            <h5 className="mb-0 fs-4 fw-bolder">
                                              {intl.formatMessage({
                                                id: "TextOnTheTermsOfTheSession",
                                              })}
                                            </h5>
                                          </div>
                                          <p
                                            className="session-note-scroller"
                                            style={{ maxHeight: "450px" }}
                                          >
                                            {
                                              session?.judgement
                                                ?.judgementStatement
                                            }{" "}
                                          </p>
                                        </div>
                                      </div>

                                      {session?.judgementRequirements?.filter(
                                        (requiremnet: any) =>
                                          requiremnet?.requirementType ===
                                          JudgmentRequirementType.Client
                                      )?.length > 0 && (
                                        <div className="col">
                                          <div className="card p-6 shadow-sm h-100">
                                            <div className="d-flex justify-content-between mb-5">
                                              <h5 className="mb-0 fs-4 fw-bolder">
                                                {intl.formatMessage({
                                                  id: "PrincipalsRequests",
                                                })}
                                              </h5>
                                            </div>

                                            <div className="d-flex flex-column gap-2">
                                              {session?.judgementRequirements
                                                ?.filter(
                                                  (requiremnet: any) =>
                                                    requiremnet?.requirementType ===
                                                    JudgmentRequirementType.Client
                                                )
                                                ?.map(
                                                  (
                                                    requirement: any,
                                                    index: number
                                                  ) => (
                                                    <div
                                                      key={index}
                                                      className="d-flex gap-3 justify-content-start"
                                                    >
                                                      <span>{index + 1}:</span>
                                                      <span className="text-muted">
                                                        {" "}
                                                        {requirement?.text}
                                                      </span>
                                                      {/* <span
                                              className="text-primary"
                                              style={{ cursor: "pointer" }}
                                            >
                                              {intl.formatMessage({
                                                id: "ReadMore",
                                              })}
                                            </span> */}
                                                    </div>
                                                  )
                                                )}
                                            </div>
                                          </div>
                                        </div>
                                      )}

                                      {/* Adversaries Requests Section */}
                                      {session?.judgementRequirements?.filter(
                                        (requiremnet: any) =>
                                          requiremnet?.requirementType ===
                                          JudgmentRequirementType.Opponent
                                      )?.length > 0 && (
                                        <div className="col">
                                          <div className="card p-6 shadow-sm h-100">
                                            <div className="d-flex justify-content-between mb-5">
                                              <h5 className="mb-0 fs-4 fw-bolder">
                                                {intl.formatMessage({
                                                  id: "AdversariesRequests",
                                                })}
                                              </h5>
                                            </div>
                                            <div className="d-flex flex-column gap-2">
                                              {session?.judgementRequirements
                                                ?.filter(
                                                  (requiremnet: any) =>
                                                    requiremnet?.requirementType ===
                                                    JudgmentRequirementType.Opponent
                                                )
                                                ?.map(
                                                  (
                                                    requirement: any,
                                                    index: number
                                                  ) => (
                                                    <div
                                                      key={index}
                                                      className="d-flex gap-3 justify-content-start flex-wrap"
                                                    >
                                                      <span>{index + 1}:</span>
                                                      <span className="text-muted d-flex flex-wrap">
                                                        {" "}
                                                        {requirement?.text}
                                                      </span>
                                                      {/* <span
                                              className="text-primary"
                                              style={{ cursor: "pointer" }}
                                            >
                                              {intl.formatMessage({
                                                id: "ReadMore",
                                              })}
                                            </span> */}
                                                    </div>
                                                  )
                                                )}
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {/*  صك الحكم*/}
                              {session?.sessionJudgemnetRefernce && (
                                <div className="bg-light p-5 mb-5 rounded">
                                  <h4 className="mb-5 fs-2 fw-bolder">
                                    {intl.formatMessage({
                                      id: "JudgmentInstrument",
                                    })}
                                  </h4>

                                  <div
                                    className="container-fluid px-4"
                                    style={{
                                      maxWidth: "1400px",
                                      margin: "0 auto",
                                    }}
                                  >
                                    <div className="row row-cols-1 row-cols-lg-2 gy-5 gx-5">
                                      <div className="col">
                                        <div className="card p-4 shadow-sm h-100">
                                          <div className="d-flex my-3">
                                            <h5 className="fs-5 fw-bolder">
                                              {intl.formatMessage({
                                                id: "JudgmentInstrument",
                                              })}
                                              {" : "}
                                            </h5>
                                            <span className="fs-6 mx-4">
                                              {
                                                session
                                                  ?.sessionJudgemnetRefernce
                                                  ?.judgementDocment
                                              }
                                            </span>
                                          </div>
                                          <div className="d-flex my-3">
                                            <h5 className="fs-5 fw-bolder">
                                              {intl.formatMessage({
                                                id: "JudgmentInstrumentNumber",
                                              })}
                                              {" : "}
                                            </h5>
                                            <span className="fs-6 mx-4">
                                              {
                                                session
                                                  ?.sessionJudgemnetRefernce
                                                  ?.judgementNumber
                                              }
                                            </span>
                                          </div>
                                          <div>
                                            <p dir="ltr">
                                              {moment(
                                                session
                                                  ?.sessionJudgemnetRefernce
                                                  ?.createdOn
                                              )?.format("dddd")}{" "}
                                              |{" "}
                                              {moment(
                                                session
                                                  ?.sessionJudgemnetRefernce
                                                  ?.createdOn
                                              ).format("DD MMM YYYY")}{" "}
                                              |{" "}
                                              {moment(
                                                session
                                                  ?.sessionJudgemnetRefernce
                                                  ?.createdOn
                                              ).format("hh:mm A")}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  );
                })
              : (causeStageById?.lK_StageId === 0 ||
                  causeStageById?.lK_StageId === -1) && (
                  <p className="text-center fs-5">
                    {intl.formatMessage({ id: "NoAvailableSessions" })}
                  </p>
                )}
          </div>

          {causeStageById?.sessions?.length === 0 &&
            causeStageById?.lK_StageId !== 0 &&
            causeStageById?.lK_StageId !== -1 && (
              <div
                className="bg-white bg-fix-dark border-fix-dark  rounded shadow-sm mt-3 p-4 h-100"
                style={{ minHeight: "300px" }}
              >
                <div className="d-flex flex-column align-items-center justify-content-center h-100">
                  {/* Icon Container */}
                  <div className="mb-4 position-relative">
                    <img
                      src={toAbsoluteUrl("/media/extensions/empty-form.webp")}
                      alt=""
                      style={{ height: "200px", width: "200px" }}
                    />
                  </div>

                  <p className="text-muted mb-4" dir="rtl">
                    {intl.formatMessage({
                      id: "NoAvailableSessionsInThisStage",
                    })}
                  </p>
                  {lastOne &&
                    (isLawyerToTakeAction ||
                      isOwnerOrSuperVisor ||
                      isDataEntry) && (
                      <button
                        onClick={() => {
                          setShowAddSessionPopup(true);
                        }}
                        className="btn btn-primary text-white d-flex align-items-center gap-2"
                      >
                        <span className="fs-5">+</span>
                        <span>
                          {intl.formatMessage({ id: "AddNewSession" })}
                        </span>
                      </button>
                    )}
                </div>
              </div>
            )}
        </>
      )}
      {/* Actions Modals */}
      <AssignmentPopup
        show={showAssignmentPopup}
        handleClose={() => {
          setShowAssignmentPopup(false);
        }}
        causeId={causeId}
        selectedCauseStageId={selectedCauseStageId}
        selectedSessionId={selectedSessionId}
        selectedSession={selectedSession}
      />
      {showEditSessionPopup && (
        <EditSessionPopup
          show={showEditSessionPopup}
          handleClose={() => {
            setShowEditSessionPopup(false);
          }}
          sessionId={selectedSessionId}
          causeId={causeId}
          causeStageId={selectedCauseStageId}
        />
      )}
      <AddSessionPopup
        show={showAddSessionPopup}
        handleClose={() => {
          setShowAddSessionPopup(false);
        }}
        setShowAccordionEdit={setShowAccordionEdit}
        causeId={causeId}
        causeStageId={selectedCauseStageId}
      />
      <EditAuthorityPopup
        causeId={causeId}
        causeStageId={selectedCauseStageId}
        redirector={causeStageById?.redirector}
        show={showEditAuthorityPopup}
        handleClose={() => {
          setShowEditAuthorityPopup(false);
        }}
      />
      <EditSupervisorPopup
        show={showEditSupervisorPopup}
        handleClose={() => {
          setShowEditSupervisorPopup(false);
        }}
        supervisor={causeStageById?.userId}
        causeStageId={selectedCauseStageId}
      />
      <AddNotePopup
        show={showAddNotePopup}
        handleClose={() => {
          setShowAddNotePopup(false);
        }}
        causeStageId={selectedCauseStageId}
        sessionId={selectedSessionId}
      />
      <AddDocForSessionPopup
        show={addShowDoc}
        handleClose={() => {
          setAddShowDoc(false);
        }}
        causeStageId={selectedCauseStageId}
        sessionId={selectedSessionId}
        session={selectedSession}
      />
      <AddJudgeReportPopup
        show={showAddJudgeReportPopup}
        handleClose={() => {
          setShowAddJudgeReportPopup(false);
        }}
        causeStageId={selectedCauseStageId}
        sessionId={selectedSessionId}
        selectedSessionDate={selectedSessionDate}
      />
      <TerminateCasePopup
        show={showTerminateCasePopup}
        handleClose={() => {
          setShowTerminateCasePopup(false);
        }}
        handleTerminate={() => {
          showAlert(true, "TheCaseWasSuccessfullyClosed", intl);
        }}
      />
      {/* {comeFrom != "/litigation-management" && (
        <AddNewLitigationPopup
          causeId={+caseData?.id}
          show={showChangeLitigationLevelPopup}
          handleClose={() => {
            setShowChangeLitigationLevelPopup(false);
          }}
        />
      )}
      {comeFrom == "/litigation-management" && (
        <ChangeLitigationLevelPopup
          show={showChangeLitigationLevelPopup}
          handleClose={() => {
            setShowChangeLitigationLevelPopup(false);
          }}
        />
      )} */}
      <DeleteSessionPopup
        showDelete={showDeletePopup}
        handleCloseDelete={() => {
          setShowDeletePopup(false);
        }}
        id={selectedSessionId}
        selectedCauseStageId={selectedCauseStageId}
      />
      {showEditJudgementReportPopup && (
        <EditJudgeReportPopup
          show={showEditJudgementReportPopup}
          handleClose={() => setShowEditJudgementReportPopup(false)}
          judgmentId={judgementReportId as unknown as string}
          sessionId={selectedSessionId}
          causeStageId={selectedCauseStageId}
          selectedSessionDate={selectedSessionDate}
        />
      )}

      <DeletePopup
        showDelete={showdeleteSessionNote}
        handleCloseDelete={() => {
          setShowDeleteSessionNote(false);
        }}
        id={SessionNoteIdDeleted}
        handleDelete={() =>
          handleDeleteSessionNote(
            causeId,
            selectedCauseStageId,
            SessionNoteIdDeleted as string
          )
        }
      />
      <DeletePopup
        showDelete={showDeleteJudgementReportPopup}
        handleCloseDelete={() => {
          setShowDeleteJudgementReportPopup(false);
        }}
        id={judgementReportId}
        handleDelete={() =>
          handleDeleteJudgementReport(judgementReportId as unknown as string)
        }
      />
      <DeletePopup
        showDelete={showDeleteAssigneePopup}
        handleCloseDelete={() => {
          setShowDeleteAssigneePopup(false);
        }}
        id={selectedAssigneeId}
        handleDelete={() =>
          handleDeleteAssignee(
            selectedAssigneeId,
            causeId,
            selectedCauseStageId
          )
        }
      />
      <DeletePopup
        showDelete={showDeleteAttachmentPopup}
        handleCloseDelete={() => {
          setShowDeleteAttachmentPopup(false);
        }}
        handleDelete={() =>
          deleteSessionAttachment(
            selectedFilePath,
            causeId,
            selectedCauseStageId,
            selectedSession
          )
        }
      />
      <EditSessionNotePopup
        show={showEditSessionNote}
        handleClose={() => {
          setShowEditSessionNote(false);
        }}
        selectedSessionNoteId={selectedSessionNoteId}
      />
      {showAddJudgeInstrument && (
        <AddJudgmentInstrumentPopup
          show={showAddJudgeInstrument}
          handleClose={() => {
            setShowAddJudgeInstrument(false);
          }}
          sessionId={selectedSessionId}
          causeId={causeId}
          judgmentId={judgementReportId}
          causeStageId={selectedCauseStageId}
          onSuccess={() => {
            if (causeId) {
              dispatch(fetchCauseById(causeId) as any);
            }
            if (selectedCauseStageId) {
              dispatch(
                fetchCauseStageById({ causeStageId: selectedCauseStageId })
              );
            }
          }}
        />
      )}
    </>
  );
};

export default CauseStageDetails;
