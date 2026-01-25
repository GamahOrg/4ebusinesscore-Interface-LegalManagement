import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { CasesTableActions } from "./CasesTableActions";
import { getStyleByStatus } from "./../../../../../../shared/functions/getStyleByStatus";
import { CauseModel } from "../../../models/CauseModel";
import causeStatus from "./../../../../../../shared/functions/causeStatus";
import convertNullString from "../../../../../../shared/functions/convertNullString";
import moment from "moment";
import { ClientType } from "../../../models/LegalEnums";
function CaseViewTable({
  causes,
  callingData,
}: {
  causes?: CauseModel[];
  callingData?: any;
}) {
  const intl = useIntl();
  const navigate = useNavigate();
  const handleNavigate = (item: any) => {
    navigate(`/cases-view/list-of-cases/${item?.id}`, {
      state: { item: item, source: "CaseViewTable", comeFrom: "cases-list" },
    });
  };
  let language = intl.locale;
  return (
    <>
      <div className="table-responsive mb-3">
        <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-3 text-center">
          <thead>
            <tr className="fw-bolder projectSecColor">
              <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-350px">
                {intl.formatMessage({ id: "UnifiedNumber" })}
              </th>
              <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-200px">
                {intl.formatMessage({ id: "CauseStageNumber" })}
              </th>
              <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-200px">
                {intl.formatMessage({ id: "Judiciary" })}
              </th>
              {/* <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-350px">
                {intl.formatMessage({ id: "CaseTitle" })}
              </th> */}
              <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-350px">
                {intl.formatMessage({ id: "TheLawsuit2" })}
              </th>

              <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-200px">
                {intl.formatMessage({ id: "CauseStatus" })}
              </th>
              <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-200px no-whitespace-wrap">
                {intl.formatMessage({ id: "CauseType" })}
              </th>

              <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-200px">
                {intl.formatMessage({ id: "02" })}
              </th>
              {/* <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-200px no-whitespace-wrap">
                {intl.formatMessage({ id: "ClientsConditions" })}
              </th> */}
              <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-200px">
                {intl.formatMessage({ id: "Defendant" })}
              </th>

              <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-200px">
                {intl.formatMessage({ id: "Counselor" })}
              </th>

              <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-200px">
                {intl.formatMessage({ id: "nextSessionDate" })}
              </th>
              <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-200px">
                {intl.formatMessage({ id: "Procedures" })}
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(causes) &&
              causes?.map((cause: any) => {
                let allAssignees = cause?.lawyers?.filter(
                  (assignee) =>
                    assignee && assignee?.firstName && assignee?.secondName
                );
                return (
                  <tr key={cause?.id}>
                    <td className="Case-Table-Content">
                      <div
                        onClick={() => handleNavigate(cause)}
                        className="case-Menu-link px-4 py-2 text-muted cursor-pointer"
                      >
                        <span className="cause-number-title text-primary fw-bold">
                          {cause?.causeNumber ? cause?.causeNumber : "____"}
                        </span>
                      </div>
                    </td>

                    <td className="Case-Table-Content">
                      <div className="px-2 py-1">
                        <span className="text-muted fw-bold fs-6 no-whitespace-wrap text-truncate d-block">
                          {cause?.causeStageNumber &&
                          cause?.causeStageNumber !== "null"
                            ? cause?.causeStageNumber
                            : "---------"}
                        </span>
                      </div>
                    </td>

                    <td className="Case-Table-Content">
                      <div className="px-2 py-1">
                        <p className="text-muted no-whitespace-wrap text-truncate mw-100px mb-0">
                          {language === "ar"
                            ? cause?.lK_TypeJudiciaryNameAr || "____"
                            : cause?.lK_TypeJudiciaryNameEn || "____"}
                        </p>
                      </div>
                    </td>

                    {/* <td className="Case-Table-Content">
                      <div
                        onClick={() => handleNavigate(cause)}
                        className="case-Menu-link px-2 py-1 text-muted cursor-pointer text-start"
                      >
                        <p 
                        className="text-muted text-hover-primary no-whitespace-wrap text-truncate mw-100px mb-0"
                          title={cause?.title} 
                        >
                          {cause?.title}
                        </p>
                      </div>
                    </td> */}

                    <td className="Case-Table-Content">
                      <div className="px-2 py-1">
                        <span className="d-inline-block no-whitespace-wrap w-fit fix-causestage-bg Case-Table-Span fs-7 py-1 px-3 text-center rounded-3">
                          {language == "ar"
                            ? cause?.lk_StageNameAr
                            : cause?.lk_StageNameEn}
                        </span>
                      </div>
                    </td>

                    {/* <td>
                      <span
                        className={`Case-Table-Span no-whitespace-wrap fw-bolder mb-1 fs-7 rounded-3 px-4 py-1 badge-${getStyleByStatus(
                          causeStatus(cause?.causeStatus, intl)
                            ?.statusEnum as number
                        )}`}
                      >
                        {causeStatus(cause?.causeStatus, intl)?.name}
                      </span>
                    </td> */}
                    <td className="Case-Table-Content">
                      <div className="px-2 py-1">
                        <span
                          className={`Case-Table-Span no-whitespace-wrap fw-bolder mb-1 fs-7 rounded-3 px-4 py-1 badge-${getStyleByStatus(
                            causeStatus(cause?.causeStatus, intl)
                              ?.statusEnum as number
                          )}`}
                        >
                          {causeStatus(cause?.causeStatus, intl)?.name}
                        </span>
                      </div>
                    </td>

                    <td className="Case-Table-Content">
                      <div className="px-2 py-1">
                        <p className="text-muted no-whitespace-wrap text-truncate mw-100px mb-0 fs-7">
                          {intl.locale === "ar"
                            ? cause?.lK_CauseCategoriesNameAr
                            : cause?.lK_CauseCategoriesNameEn}
                        </p>
                      </div>
                    </td>

                    <td className="Case-Table-Content">
                      <div className="px-2 py-1">
                        {cause?.client?.length > 0 ? (
                          <div className="d-flex min-width-160px gap-2 align-items-center justify-content-center">
                            <span className="text-dark fw-bolder w-100px fs-7 text-center">
                              {convertNullString(cause?.opponent[0])}
                            </span>
                            {cause?.client?.length > 1 ? (
                              <div className="small-circle bg-primary text-white">
                                {`${cause?.client?.length - 1} +`}
                              </div>
                            ) : (
                              <div className="small-circle text-transparent bg-transparent">
                                0
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted">_________</span>
                        )}
                      </div>
                    </td>
                    <td className="Case-Table-Content">
                      <div className="px-2 py-1">
                        {cause?.client?.length > 0 ? (
                          <div className="d-flex min-width-160px gap-2 align-items-center justify-content-center">
                            <span className="text-dark fw-bolder w-100px fs-7 text-center">
                              {convertNullString(cause?.client[0])}
                            </span>
                            {cause?.client?.length > 1 ? (
                              <div className="small-circle bg-primary text-white">
                                {`${cause?.client?.length - 1} +`}
                              </div>
                            ) : (
                              <div className="small-circle text-transparent bg-transparent">
                                0
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted">_________</span>
                        )}
                      </div>
                    </td>
                    {/* <td className="Case-Table-Content text-center">
                      <div className="px-2 py-1">
                        <p className="text-muted no-whitespace-wrap mb-0 fs-7">
                          {cause?.clientType === ClientType.Plaintiff
                            ? intl.formatMessage({ id: "Plaintiff" })
                            : intl.formatMessage({ id: "Defendant" })}
                        </p>
                      </div>
                    </td> */}
                    {/* <td className="Case-Table-Content"> */}
                    {/* <div className="px-2 py-1">
                        {cause?.opponent?.length > 0 ? (
                          <div className="d-flex min-width-160px gap-2 align-items-center justify-content-center">
                            <span className="text-dark fw-bolder w-100px fs-7">
                              {convertNullString(cause?.opponent[0])}
                            </span>
                            {cause?.opponent?.length > 1 ? (
                              <div className="small-circle bg-primary text-white">
                                {`${cause?.opponent?.length - 1} +`}
                              </div>
                            ) : (
                              <div className="small-circle text-transparent bg-transparent">
                                0
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted">_________</span>
                        )}
                      </div>
                    </td> */}

                    <td className="Case-Table-Content">
                      <div className="px-2 py-1">
                        {allAssignees && allAssignees?.length > 0 ? (
                          <div className="d-flex min-width-160px gap-2 align-items-center justify-content-center">
                            <span className="text-dark fw-bolder fs-7">
                              {(
                                convertNullString(allAssignees[0]?.firstName) +
                                " " +
                                convertNullString(allAssignees[0]?.secondName)
                              ).trim()}
                            </span>
                            {allAssignees?.length > 1 && (
                              <div className="small-circle bg-primary text-white">
                                {`${allAssignees?.length - 1} +`}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted">_________</span>
                        )}
                      </div>
                    </td>

                    <td className="Case-Table-Content">
                      <div className="px-2 py-1">
                        <p className="text-muted no-whitespace-wrap mb-0 fs-7">
                          {cause?.nextSessionDate &&
                          cause?.nextSessionDate !== "0001-01-01T00:00:00"
                            ? moment(cause?.nextSessionDate)
                                .locale(intl.locale)
                                .format("DD MMM YYYY")
                            : "-----"}
                        </p>
                      </div>
                    </td>
                    <td className="Case-Table-Content">
                      <div className="px-2 py-1">
                        <CasesTableActions
                          id={cause?.id}
                          handleNavigate={() => handleNavigate(cause)}
                          status={
                            causeStatus(cause?.causeStatus, intl)
                              ?.name as string
                          }
                          callingData={callingData}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CaseViewTable;
