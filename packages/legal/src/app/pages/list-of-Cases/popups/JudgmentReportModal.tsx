import { useIntl } from "react-intl";
import { Modal, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { fetchCauseById } from "../../../features/cause";
import { useAppDispatch } from "../../../store/store";
import { fetchCauseStageById } from "../../../features/cause-stage";
import {
  JudgmentRequirementType,
  SessionJedgementStatus,
} from "../../../models/LegalEnums";
import moment from "moment";
import "moment/locale/ar";
type Props = {
  modalShow: boolean;
  handleClose: () => void;
  id?: any;
};
function JudgmentReportModal({ modalShow, handleClose, id }: Props) {
  const intl = useIntl();
  moment.locale("en");
  if (!modalShow) return null;
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [causeStageId, setCauseStageId] = useState<any>(null);
  const [causeStage, setCauseStage] = useState<any>(null);
  const [lastSession, setLastSession] = useState<any>(null);
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      dispatch(fetchCauseById(id as string) as any).then((response: any) => {
        const causeStages = response?.payload?.result?.causeStages;
        const lastCauseStage = Array.isArray(causeStages)
          ? causeStages.slice(-1)[0]
          : null;
        setCauseStageId(lastCauseStage?.id);
      });
    }
  }, [id]);

  useEffect(() => {
    if (causeStageId && modalShow) {
      dispatch(fetchCauseStageById({ causeStageId }) as any).then(
        (res: any) => {
          const result = res?.payload?.result;
          setCauseStage(result);

          const lastSession = Array.isArray(result?.sessions)
            ? result.sessions.slice(-1)[0]
            : null;
          setLastSession(lastSession);
          setIsLoading(false);
        }
      );
    }
  }, [causeStageId, modalShow]);

  let language = intl.locale;

  return (
    <div className="container">
      <Modal
        className={!modalShow ? "inert" : ""}
        size="lg"
        show={modalShow}
        onHide={handleClose}
      >
        {isLoading ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title className="text-center position-relative w-100 mt-3">
                <div>
                  <p className="text-center fs-5 mb-0">
                    {intl.formatMessage({ id: "JudgmentReport" })}
                  </p>
                </div>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className="text-center px-4 pb-5 m-5">
              <div className="d-flex gap-4 justify-content-center align-items-center py-4">
                {intl.formatMessage({ id: "DataIsLoaded..." })}
                <Spinner animation="border" variant="primary" />
              </div>
            </Modal.Body>
          </>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title className="text-center position-relative w-100 mt-3">
                <div>
                  <p className="text-center fs-5 mb-0">
                    {intl.formatMessage({ id: "JudgmentReport" })}
                    <span className="me-2 text-primary fw-bold">
                      {"#"}{" "}
                      {language == "ar"
                        ? causeStage?.lK_Stage?.nameAr
                        : causeStage?.lK_Stage?.nameEn}
                    </span>
                    <span className="me-1 text-gray-600 fw-bold">
                      {lastSession?.sessionNumber}
                    </span>
                  </p>
                </div>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className="text-center px-4 pb-5 m-5">
              <div className="grid row g-8">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 bg-gray-100 rounded p-5 mb-5">
                  <div className="d-flex justify-content-between mb-5">
                    <div className="fs-5 d-flex align-items-center">
                      {intl.formatMessage({ id: "TheJudgment" })} {":"}
                      <p className="fs-5 mb-0 mx-2">
                        {""} {lastSession?.judgement?.judgementTitle}
                      </p>
                    </div>
                    <div>
                      <span className="Case-Table-Span py-3 px-4 bg-light-primary text-primary rounded d-flex align-items-center justify-content-center">
                        <div className="bg-light-success p-3 rounded">
                          <span className="text-success">
                            {lastSession?.sessionJedgementStatus ===
                              SessionJedgementStatus.ForMe &&
                              intl.formatMessage({
                                id: "Favorable",
                              })}
                            {lastSession?.sessionJedgementStatus ===
                              SessionJedgementStatus.Against &&
                              intl.formatMessage({
                                id: "Opponent",
                              })}
                            {lastSession?.sessionJedgementStatus ===
                              SessionJedgementStatus.Equality &&
                              intl.formatMessage({
                                id: "Equal",
                              })}
                          </span>
                        </div>
                      </span>
                    </div>
                  </div>
                  <div
                    className="d-flex justify-content-between mb-5"
                    style={{ marginTop: "30px" }}
                  >
                    <div className="fs-5 d-flex align-items-center">
                      <i className="fas fa-circle mx-2 fs-6"></i>
                      {intl.locale === "ar"
                        ? lastSession?.judgement?.lkJudgementNameAr
                        : lastSession?.judgement?.lkJudgementNameEn}
                    </div>
                    {lastSession?.judgement?.lkJudgementNameAr == "تأجيل" && (
                      <div className="text-gray-600" dir="ltr">
                        {moment(lastSession?.judgement?.nextSession)?.format(
                          "dddd"
                        )}{" "}
                        |{" "}
                        {moment(lastSession?.judgement?.nextSession).format(
                          "DD MMM YYYY"
                        )}{" "}
                        |{" "}
                        {moment(lastSession?.judgement?.nextSession).format(
                          "hh:mm A"
                        )}
                      </div>
                    )}
                    {lastSession?.judgement?.lkJudgementNameAr ==
                      "صدر الحكم" && (
                      <div className="text-gray-600" dir="ltr">
                        {moment(lastSession?.judgement?.judgementDate)?.format(
                          "dddd"
                        )}{" "}
                        |{" "}
                        {moment(lastSession?.judgement?.judgementDate).format(
                          "DD MMM YYYY"
                        )}{" "}
                        |{" "}
                        {moment(lastSession?.judgement?.judgementDate).format(
                          "hh:mm A"
                        )}
                      </div>
                    )}
                  </div>
                  <div className="text-right" style={{ marginTop: "30px" }}>
                    <h6 className="text-gray-600 text-right mb-3 d-flex align-items-start">
                      {" "}
                      {intl.formatMessage({ id: "JudgmentText" })}
                    </h6>
                    <p
                      className="d-flex align-items-start"
                      style={{ textAlign: "right" }}
                    >
                      {lastSession?.judgement?.judgementStatement}{" "}
                    </p>
                  </div>
                </div>
                <div
                  className="col-12 col-sm-12 col-md-6 col-lg-6 bg-gray-100 rounded p-5"
                  style={{ maxWidth: "357px" }}
                >
                  <h4 className="text-gray-600 text-right mb-4 d-flex align-items-start">
                    {" "}
                    {intl.formatMessage({ id: "ClientsRequests" })}
                  </h4>
                  <div className="d-flex flex-column gap-2">
                    {lastSession?.judgementRequirements
                      ?.filter(
                        (requiremnet: any) =>
                          requiremnet?.requirementType ===
                          JudgmentRequirementType.Client
                      )
                      ?.map((requirement: any, index: number) => (
                        <div
                          key={index}
                          className="d-flex gap-3 justify-content-start"
                        >
                          <span>{index + 1}:</span>
                          <span className="text-muted">
                            {" "}
                            {requirement?.text}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
                <div
                  className="col-12 col-sm-12 col-md-6 col-lg-6 bg-gray-100 rounded p-5 me-4"
                  style={{ maxWidth: "357px" }}
                >
                  <h4 className="text-gray-600 text-right mb-5 d-flex align-items-start">
                    {" "}
                    {intl.formatMessage({ id: "AdversariesRequests" })}
                  </h4>
                  <div className="d-flex flex-column gap-2">
                    {lastSession?.judgementRequirements
                      ?.filter(
                        (requiremnet: any) =>
                          requiremnet?.requirementType ===
                          JudgmentRequirementType.Opponent
                      )
                      ?.map((requirement: any, index: number) => (
                        <div
                          key={index}
                          className="d-flex gap-3 justify-content-start flex-wrap"
                        >
                          <span>{index + 1}:</span>
                          <span className="text-muted d-flex flex-wrap">
                            {" "}
                            {requirement?.text}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </div>
  );
}

export default JudgmentReportModal;
