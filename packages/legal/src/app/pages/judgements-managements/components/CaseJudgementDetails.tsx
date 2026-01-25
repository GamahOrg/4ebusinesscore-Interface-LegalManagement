import { useIntl } from "react-intl";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchJudgementById } from "../../../features/judgement-ground";
import { FaDownload } from "react-icons/fa";
import moment from "moment";
import { LegalRootUrl } from "@4eplatform/shared/apis/legal";
import { fetchCauseById } from "../../../features/cause";
import { JudgmentRequirementType } from "../../../models/LegalEnums";
import NewcauseStageStatusMapping from "@4eplatform/shared/functions/NewcauseStageStatusMapping";
import { getStyleByStatus, getStyleByStatusCauseStages } from "@4eplatform/shared/functions/getStyleByStatus";
import { getStyleByStatusToJudgements } from "@4eplatform/shared/functions/getStyleByStatusToJudgements";
import { causeStageStatus } from "@4eplatform/shared/functions/causeStatus";

interface CaseJudgementDetailsProps {
  onDataLoaded: (data: any) => void;
}

const CaseJudgementDetails = ({ onDataLoaded }: CaseJudgementDetailsProps) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const judgeData = useAppSelector(
    (state) => state.judgementGround.judgementGroundsById
  );
  
  const loading = useAppSelector((state) => state.judgementGround.loading);
  const { id: ID } = useParams<{ id: string }>();
  const caseId = judgeData?.causeId;
  useEffect(() => {
    if (caseId) {
      
      dispatch(fetchCauseById(caseId as string) as any);
    }
  }, [dispatch, caseId]);
  
  useEffect(() => {
    if (ID) {
    
      dispatch(fetchJudgementById(ID) as any);
    }
  }, [dispatch, ID]);

  useEffect(() => {
    if (!loading && judgeData) {
      onDataLoaded(judgeData);
    }
  }, [loading, judgeData, onDataLoaded]);
  const getAdjudmentdByStatus = (status: number, intl: any) => {
    switch (status) {
      case 1:
        return {
          text: intl.formatMessage({ id: "InSessions" }),
          className: "danger",
        };
      case 2:
        return {
          text: intl.formatMessage({ id: "AjudgmentIssued" }),
          className: "warning",
        };
    }
  };

  const renderStatus = () => {
    if (!judgeData?.caseStatus) return null;
    const statusInfo = getAdjudmentdByStatus(
      Number(judgeData.caseStatus),
      intl
    );
    return (
      <div className="d-flex align-items-center gap-2 mb-5">
        <div className={`status-circle bg-${statusInfo?.className}`}></div>
        <span className="Case-Table-Span fw-bolder mb-1 fs-7 rounded-2 px-2 py-1">
          {statusInfo?.text}
        </span>
      </div>
    );
  };

  const renderAttachments = () => {
    if (loading) return "loading...";
    if (!judgeData?.attachments || judgeData.attachments.length === 0) {
      return intl.formatMessage({ id: "NoFiles" });
    }

    return judgeData.attachments.map((attachment) => (
      <div
        key={attachment.id}
        className="bg-light-primary border border-primary border-fix-dark rounded text-primary d-flex justify-content-between align-items-center p-3 mb-2 w-100"
      >
        <div className="w-400px">
          <p >{attachment.attchmentName? attachment.attchmentName : attachment.fileName ||
            attachment.attchmentName === "" ? attachment.fileName : attachment.fileName 
            }</p>
          {/* <span>{attachment.attchmentName || attachment.fileName}</span> */}
        </div>
        <a
          href={`${LegalRootUrl}${attachment.filePath}`}
          download
          className="d-flex align-items-center gap-2"
        >
          <FaDownload size={14} />
        </a>
      </div>
    ));
  };

  const renderRequirements = (type: number) => {
    if (loading) return "Loading...";
    if (
      !Array.isArray(judgeData?.judgementRequirementsDto) ||
      judgeData.judgementRequirementsDto.length === 0
    ) {
      return intl.formatMessage({ id: "JudgeRequirements" });
    }

    const requirement = judgeData.judgementRequirementsDto.find(
      (req) => req.requirementType === type
    );
    return (
      requirement?.requirementsText ||
      intl.formatMessage({ id: "JudgeRequirements" })
    );
  };

  const caseData = useAppSelector((state) => state.causes.causeById);
  let theme = localStorage.getItem("Theme");
  let shadow = true;
  const location = useLocation();
  const comeFrom = location.state?.comeFrom;
console.log(judgeData?.caseStatus);

  
  return (
    <div className="container card card-xl-stretch mb-xl-8">
      <div className="mt-5">
        <div
          className={`p-4 ${
            shadow ? "shadow" : "bg-body"
          } rounded-2 mb-8 d-flex justify-content-between align-items-center`}
        >
          <div className="text-dark fw-bolder fs-5">
            <span>
              {" "}
              {caseData?.title}
              {""}
            </span>{" "}
            {"  "}
            <span className="text-gray-500 fw-normal fs-6 mx-1">
              {caseData?.causeNumber === "------" ? " " : caseData?.causeNumber}
            </span>
          </div>
          <div className="d-flex justify-content-center align-items-center gap-4">
            <div
              className={`${theme == "light" ? " bg-white" : "border"}
          p-3 fw-bolder fs-6 d-flex justify-content-center align-items-center rounded-2 text-primary
          `}
            >
              {intl.formatMessage({ id: "TheLawsuit" })}
              {" #"}
              {comeFrom === "judgements-managements"
                ? intl.locale === "ar"
                  ? location?.state?.item?.stageNameAr
                  : location?.state?.item?.stageNameEn
                : ""}
            </div>
            <div
              className={`bg-${getStyleByStatusCauseStages(
                causeStageStatus(judgeData?.caseStatus, intl)
                  ?.statusEnum as number
              )} p-3 fw-bolder fs-6 d-flex justify-content-center align-items-center rounded-2`}
            >
              {(() => {
               
                const mapping = causeStageStatus(judgeData?.caseStatus, intl);                                                
                return mapping?.name || 'Unknown Status';
              })()}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-6 my-6 rounded">
        <div className="d-flex justify-content-start align-items-center gap-3 mb-5 flex-wrap">
          <h2 className="mb-0">
            {intl.formatMessage({ id: "Session" })} #{judgeData.sessionNumber}
          </h2>
          <br></br>
          <p className="text-dark mb-0">
            {loading
              ? "Loading..."
              : judgeData?.sessionDate
              ? moment(judgeData.sessionDate).format("LLLL")
              : intl.formatMessage({ id: "NoDate" })}
          </p>
          <br />
          <p className="mb-0  text-dark">
            <span className="text-primary">
              {loading
                ? "Loading..."
                : judgeData?.courtName ||
                  intl.formatMessage({ id: "CurtName" })}
            </span>

            <span> | </span>
            <span>
              {loading
                ? "Loading..."
                : judgeData?.areaName || intl.formatMessage({ id: "AreaName" })}
            </span>
          </p>
        </div>

        <div className="card p-5">
          <p className="mb-5 h4 fw-bolder">
            {intl.formatMessage({ id: "JudgmentReport" })}
          </p>

          <div className="row row-cols-1 row-cols-lg-2 gy-5 gx-5">
            <div className="col">
              <div className="card bg-light p-4 border border-secondary h-100">
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <p className="h5 mb-0 fs-4 fw-bolder">
                    {intl.formatMessage({ id: "JudgmentTitle" })}
                  </p>
                  <div className="bg-light-success p-3 rounded">
                    <span className="text-success">
                      {loading
                        ? "Loading..."
                        : judgeData?.titleJudement ||
                          intl.formatMessage({ id: "JudmentTitle" })}
                    </span>
                  </div>
                </div>

                {renderStatus()}

                <p>
                  {judgeData?.createOn &&
                    moment(judgeData.createOn).format("LLLL")}
                </p>

                <div className="text-primary p-3 mb-2 d-flex flex-column w-100">
                  {renderAttachments()}
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card bg-light p-4 border border-secondary h-100">
                <div className="d-flex justify-content-between mb-5">
                  <p className="h5 mb-0 fs-4 fw-bolder">
                    {intl.formatMessage({ id: "JudgmentText" })}
                  </p>
                </div>
                <p>
                  {loading
                    ? "Loading..."
                    : judgeData?.judgementStatement ||
                      intl.formatMessage({ id: "JudgeMessage" })}
                </p>
              </div>
            </div>

            {/* <div className="col">
              <div className="card bg-light p-4 border border-secondary shadow-sm h-100">
                <div className="d-flex justify-content-between mb-5">
                  <p className="h5 mb-0 fs-4 fw-bolder">
                    {intl.formatMessage({ id: "PrincipalsRequests" })}
                  </p>
                </div>
                <div className="d-flex flex-column gap-2">
                  {renderRequirements(JudgmentRequirementType.Client)}
                </div>
              </div>
            </div> */}

            {/* <div className="col">
              <div className="card bg-light p-4 border border-secondary shadow-sm h-100">
                <div className="d-flex justify-content-between mb-5">
                  <p className="h5 mb-0 fs-4 fw-bolder">
                    {intl.formatMessage({ id: "AdversariesRequests" })}
                  </p>
                </div>
                <div className="d-flex flex-column gap-2">
                  {renderRequirements(JudgmentRequirementType.Opponent)}
                </div>
              </div>
            </div>
             */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseJudgementDetails;
