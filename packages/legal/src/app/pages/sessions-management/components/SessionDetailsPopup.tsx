import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import moment from "moment";
import "moment/locale/ar";
import {
  getStyleByStatusCauseStages,
} from "@4eplatform/shared/functions/getStyleByStatus";
import {
  causeStageStatus,
} from "@4eplatform/shared/functions/causeStatus";

interface SessionDetailsPopupProps {
  session: any;
  isOpen: boolean;
  onClose: () => void;
}

const SessionDetailsPopup: React.FC<SessionDetailsPopupProps> = ({
  session,
  isOpen,
  onClose,
}) => {
  const intl = useIntl();
  moment.locale("en");

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);

      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !session) return null;
  const hasSessionNote =
    session?.isHasSessionNote ?? session?.IsHasSessionNote ?? false;
  const sessionsLawyers =
    Array.isArray(session?.sessionsLawyersDto) &&
    session?.sessionsLawyersDto?.length
      ? session.sessionsLawyersDto
      : Array.isArray(session?.SessionsLawyersDto) &&
        session?.SessionsLawyersDto?.length
        ? session.SessionsLawyersDto
        : [];
  const lawyersDisplay = sessionsLawyers
    .map((lawyer: any) => lawyer?.lawyerName?.trim() || "------")
    .filter((name: string) => name && name !== "");
  const hasLawyers = lawyersDisplay.length > 0;
  const lawyersList = hasLawyers ? lawyersDisplay : ["------"];

  return (
    <>
      <div
        className="modal-backdrop fade show"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1040,
        }}
        onClick={onClose}
      ></div>

      <div
        className="modal fade show"
        style={{
          display: "block",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1050,
        }}
        tabIndex={-1}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          style={{ marginTop: "5vh" }}
        >
          <div
            className="modal-content"
            style={{ maxHeight: "85vh", overflowY: "auto" }}
          >
            <div className="modal-header">
              <h5 className="modal-title">
                {intl.formatMessage({ id: "SessionDetails" })} - #
                {session.sessionNumber}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="row g-4">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="card-title mb-0">
                        {intl.formatMessage({ id: "CaseeTitle" })}
                      </h6>
                    </div>
                    <div className="card-body">
                      <h5 className="text-primary mb-2">
                        {session.causeTitle}
                      </h5>
                      <p className="text-muted mb-0">
                        {intl.formatMessage({ id: "CaseeNumber" })}:{" "}
                        {session.causeNumber}#
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="card-title mb-0">
                        {intl.formatMessage({ id: "SessionInfo" })}
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="d-flex flex-column gap-2">
                        <div>
                          <span className="fw-bold">
                            {intl.formatMessage({ id: "SessionNumber" })}:
                          </span>
                          <span className="ms-2 text-primary">
                            {session.sessionNumber}#
                          </span>
                        </div>
                        <div>
                          <span className="fw-bold">
                            {intl.formatMessage({ id: "SessionDate" })}:
                          </span>
                          <span className="ms-2" dir="ltr">
                            {moment(session.sessionDate).format("DD MMM YYYY")}
                          </span>
                        </div>
                        <div>
                          <span className="fw-bold">
                            {intl.formatMessage({ id: "SessionTime" })}:
                          </span>
                          <span className="ms-2">
                            {moment(session.sessionDate).format("h:mm A")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="card-title mb-0">
                        {intl.formatMessage({ id: "CompetentCourt" })}
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="d-flex flex-column gap-2">
                        <div>
                          <span className="fw-bold">
                            {intl.formatMessage({ id: "CompetentCourt" })}:
                          </span>
                          <span className="ms-2">
                            {session.courtName ||
                              intl.formatMessage({ id: "NotFound" })}
                          </span>
                        </div>
                        <div>
                          <span className="fw-bold">
                            {intl.formatMessage({ id: "TheLawsuit" })}:
                          </span>
                          <span className="ms-2 text-primary">
                            {intl.locale === "ar"
                              ? session.lkStageNameAr
                              : session.lkStageNameEn}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="card-title mb-0">
                        {intl.formatMessage({ id: "ClientsCondition" })}
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="d-flex flex-column gap-2">
                        <div>
                          <span className="fw-bold">
                            {intl.formatMessage({ id: "ClientsCondition" })}:
                          </span>
                          <span className="ms-2">
                            {session.clientType === 1 &&
                              intl.formatMessage({ id: "Plaintiff1" })}
                            {session.clientType === 2 &&
                              intl.formatMessage({ id: "Respondent" })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="card-title mb-0">
                        {intl.formatMessage({ id: "Opponent" })}
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="d-flex flex-column gap-2">
                        {!Array.isArray(session.opponentName) ||
                        session.opponentName.length === 0 ? (
                          <span className="text-muted">
                            {intl.formatMessage({ id: "NotFound" })}
                          </span>
                        ) : (
                          <div>
                            <span className="fw-bold">
                              {intl.formatMessage({ id: "Opponent" })}:
                            </span>
                            <div className="ms-2">
                              {session.opponentName.map(
                                (opponent: string, index: number) => (
                                  <div key={index} className="mb-1">
                                    {opponent}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="card-title mb-0">
                        {intl.formatMessage({ id: "LitigationStatus" })}
                      </h6>
                    </div>
                    <div className="card-body">
                      <span
                        className={`badge-${getStyleByStatusCauseStages(
                          causeStageStatus(session?.causeStageStatus, intl)
                            ?.statusEnum as number
                        )} fw-bolder fs-7 rounded-3 px-4 py-2`}
                      >
                        {causeStageStatus(session?.causeStageStatus, intl)?.name}
                      </span>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header">
                      <h6 className="card-title mb-0">
                        {intl.formatMessage({ id: "Counselor" })}
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="d-flex flex-column gap-3">
                        <div className="d-flex gap-2 flex-wrap">
                          <span className="fw-semibold">
                            {intl.formatMessage({ id: "Counselor" })}
                          </span>
                          <span>:</span>
                          <div className="d-flex flex-column gap-1">
                            <span>{lawyersList[0]}</span>
                            {lawyersList.slice(1).map((name: string, idx: number) => (
                              <span key={`${name}-${idx + 1}`}>{name}</span>
                            ))}
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-3 flex-wrap">
                          <div className="d-flex align-items-center gap-2">
                            <span className="fw-semibold">
                              {intl.formatMessage({ id: "IsHasSessionNote" })}
                            </span>
                            <span>:</span>
                          </div>
                          <div className="d-flex gap-4 mt-1">
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={hasSessionNote === true}
                                disabled
                              />
                              <label className="form-check-label">
                                {intl.formatMessage({ id: "Yes" })}
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={!hasSessionNote}
                                disabled
                              />
                              <label className="form-check-label">
                                {intl.formatMessage({ id: "No" })}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                {intl.formatMessage({ id: "Close" })}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionDetailsPopup;
