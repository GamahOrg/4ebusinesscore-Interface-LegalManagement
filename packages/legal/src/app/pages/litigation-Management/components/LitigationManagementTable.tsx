import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import {
  getStyleByStatus,
  getStyleByStatusCauseStages,
} from "../../../../../../shared/functions/getStyleByStatus";
import { CauseStatus, ClientType } from "../../../models/LegalEnums";
import { CauseStagesModel } from "../../../models/CauseStagesModel";
import { LKStage } from "../../../models/CauseHistoryModel";
import convertNullString from "@4eplatform/shared/functions/convertNullString";
import { causeStageStatus } from "@4eplatform/shared/functions/causeStatus";

function LitigationManagementTable({
  causeStages,
}: {
  causeStages: CauseStagesModel[];
}) {
  const intl = useIntl();
  const navigate = useNavigate();

  const handleNavigate = (
    item: CauseStagesModel,
    specificTab = false,
    hideOtherTabs = false,
    specificClaim = false
  ) => {
    navigate(
      `/litigation-management/list-of-cases/${item?.causeId}${
        specificTab ? "#lawsuits" : ""
      }`,
      {
        state: {
          item: item,
          hideOtherTabs,
          comeFrom: "/litigation-management",
          specificClaim,
        },
      }
    );
  };

  return (
    <div>
      <>
        <div className="table-responsive mb-3">
          <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4 text-center">
            <thead>
              <tr className="fw-bolder projectSecColor">
                <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-350px">
                  {intl.formatMessage({ id: "Casenumber" })}
                </th>
                <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-350px">
                  {intl.formatMessage({ id: "CaseTitle" })}
                </th>
                <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-350px">
                  {intl.formatMessage({ id: "TheLawsuit" })}
                </th>
                <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-200px">
                  {intl.formatMessage({ id: "ClientsStatus" })}
                </th>
                <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-200px">
                  {intl.formatMessage({ id: "Opponent" })}
                </th>
                <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-200px">
                  {intl.formatMessage({ id: "LitigationStatus" })}
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(causeStages) &&
                causeStages?.map((causeStage: CauseStagesModel) => {
                  return (
                    <tr key={causeStage?.causeId + Math.random() * 1000}>
                      <td className="Case-Table-Content">
                        <div
                          className="px-3 cursor-pointer text-primary case-Menu-link"
                          onClick={() => handleNavigate(causeStage)}
                        >
                          <div>
                            {causeStage?.causeStageNumber &&
                            causeStage?.causeStageNumber !== "null"
                              ? causeStage?.causeStageNumber
                              : "--------------"}
                          </div>
                        </div>
                      </td>
                      <td className="Case-Table-Content d-flex justify-content-center ">
                        <p
                          className="text-muted text-hover-primary text-truncate  text-center cursor-pointer mw-150px  overflow-hidden whitespace-nowrap"
                          title={causeStage?.causeTitle}
                        >
                          {causeStage?.causeTitle}
                        </p>
                      </td>
                      <td>
                        <span
                          onClick={() => {
                            if (causeStage?.status != CauseStatus.NewCause) {
                              handleNavigate(causeStage, true, true, true);
                            }
                          }}
                          className={`${
                            causeStage?.status != CauseStatus.NewCause
                              ? "case-Menu-link cursor-pointer"
                              : "text-decoration-none"
                          } Case-Table-Span fs-7 py-1 px-4 text-center text-primary`}
                        >
                          {intl.locale === "en"
                            ? (causeStage?.lK_Stage as LKStage)?.nameEn
                            : (causeStage?.lK_Stage as LKStage)?.nameAr}
                        </span>
                      </td>
                      <td>
                        <p className="text-muted mb-0">
                          {intl.formatMessage({
                            id:
                              causeStage?.clientType == ClientType.Plaintiff
                                ? "Plaintiff"
                                : causeStage?.clientType == ClientType.Defendant
                                ? "Defendant"
                                : "Unknown",
                          })}
                        </p>
                      </td>
                      <td className="Case-Table-Content">
                        <div className="d-flex justify-content-center align-items-center w-150px my-0 mx-auto">
                          <div
                            className="text-muted mx-1 mb-0 d-flex align-items-center justify-content-between"
                            style={{ whiteSpace: "wrap" }}
                          >
                            {Array.isArray(causeStage?.opponents) &&
                            causeStage?.opponents?.length > 0 ? (
                              <>
                                <span className="text-dark fw-bolder ">
                                  {convertNullString(
                                    causeStage?.opponents[0]?.opponentName
                                  )}
                                </span>
                                {causeStage?.opponents?.length > 1 && (
                                  <div className="small-circle bg-primary text-white mx-2">
                                    {`${causeStage?.opponents?.length - 1} +`}
                                  </div>
                                )}
                              </>
                            ) : (
                              "_________"
                            )}
                          </div>
                        </div>
                      </td>
                      {causeStage?.lK_Stage?.nameAr !== "الدراسة" &&
                      causeStage?.lK_Stage?.nameEn !== "Study" ? (
                        <td className="Case-Table-Content">
                          <span
                            className={`Case-Table-Span fw-bolder mb-1 fs-7 rounded-3 px-4 py-1 badge-${getStyleByStatusCauseStages(
                              causeStageStatus(
                                // causeStage?.lK_Stage?.nameAr,
                                causeStage?.causeStageStatus,
                                intl
                              )?.statusEnum as number
                            )}`}
                          >
                            {
                              causeStageStatus(
                                // causeStage?.lK_Stage?.nameAr,
                                causeStage?.causeStageStatus,
                                intl
                              )?.name
                            }
                          </span>
                        </td>
                      ) : (
                        <td className="Case-Table-Content">
                          <span
                            className={`Case-Table-Span fw-bolder mb-1 fs-7 rounded-3 px-4 py-1 badge-light-primary text-primary`}
                          >
                            {intl.formatMessage({ id: "New" })}
                          </span>
                        </td>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
}

export default LitigationManagementTable;
