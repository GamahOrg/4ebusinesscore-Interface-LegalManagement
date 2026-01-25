import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import CaseCard from "./CaseCard";
import CaseCardContent from "./CaseCardContent";
import CaseInfo from "./CaseInfo";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppSelector } from "../../../store/store";
import { fetchCauseHistories } from "../../../features/cause";
import { fetchAllLKStage } from "../../../features/stage";
import moment from "moment";
import "moment/locale/ar";
import { LitigantStatus } from "../../../models/LegalEnums";
import Spinner from "react-bootstrap/esm/Spinner";
import { fetchAllLKJudgement } from "../../../features/lk-judgement-controllers";

const CaseArchive = () => {
  const intl = useIntl();
  moment.locale("en");
  let { id: caseId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState<string | number>("");
  const MODIFICATIONS = "modifications";
  const CHANGES = "changes";
  const dispatch = useDispatch();

  let caseHistories = useSelector((state: RootState) => {
    return state?.causes?.causeHistories;
  });
  let loadingForArchive = useSelector((state: RootState) => {
    return state?.causes?.loadingForArchive;
  });
  let allLKStageIds = useSelector((state: RootState) => {
    return state?.lkSatge.lkStages;
  });
  let [date, setDate] = useState("");
  const lKJudgement = useAppSelector((state) => state.lKJudgement?.lKJudgement);

  useEffect(() => {
    dispatch(fetchAllLKStage({ pageSize: "10000" }) as any);
    dispatch(fetchAllLKJudgement({}) as any);
  }, []);

  const insertKeywords = new Set([
    "اضافه",
    "إضافه",
    "اضافة",
    "إضافة",
    "insert",
    "Insert",
    "Add",
    "add",
  ]);
  const updateKeywords = new Set([
    "تعديل",
    "تغيير",
    "تحديث",
    "Modify",
    "modify",
    "Update",
    "update",
    "Change",
    "change",
  ]);
  const deleteKeywords = new Set(["حذف", "Delete", "delete"]);

  const mappedSearch = (query) => {
    if (insertKeywords.has(query)) return "Insert";
    if (updateKeywords.has(query)) return "update";
    if (deleteKeywords.has(query)) return "delete";
    return query;
  };
  useEffect(() => {
    let params = {
      ...(caseId && { causeId: caseId }),
      ...(mappedSearch(searchQuery) && {
        searchWord: mappedSearch(searchQuery),
      }),
      ...(selectedStage != "" && { lK_StageId: selectedStage }),
      ...(date && { createdOn: `${date}T00:00:00` }),
    };
    dispatch(fetchCauseHistories(params) as any);
  }, [searchQuery, selectedStage, date, caseId]);
  const actionMap = {
    "Insert Session": {
      bgColor: "primary",
      icon: "fas fa-plus",
      caseTitleId: "AddSession",
    },
    "Insert SessionAttachment": {
      bgColor: "primary",
      icon: "fas fa-pencil-alt",
      caseTitleId: "SessionAttachment",
    },
    "Insert SessionAssignee": {
      bgColor: "primary",
      icon: "fas fa-plus",
      caseTitleId: "AssignCase",
    },
    "Insert CauseStage": {
      bgColor: "primary",
      icon: "fas fa-plus",
      caseTitleId: "AddStage",
    },
    "Insert SessionNote": {
      bgColor: "primary",
      icon: "fas fa-plus",
      caseTitleId: "AddSessionNote",
    },
    "Insert JudgementGround": {
      bgColor: "primary",
      icon: "fas fa-plus",
      caseTitleId: "AddJudgementGround",
    },
    "Delete Session": {
      bgColor: "primary",
      icon: "bi bi-trash3",
      caseTitleId: "DeleteSession",
    },
    "Delete SessionAttachment": {
      bgColor: "primary",
      icon: "bi bi-trash3",
      caseTitleId: "DeleteSessionAttachment",
    },
    "Delete SessionAssignee": {
      bgColor: "primary",
      icon: "bi bi-trash3",
      caseTitleId: "DeleteAssignCase",
    },
    "Delete CauseStage": {
      bgColor: "primary",
      icon: "bi bi-trash3",
      caseTitleId: "DeleteStage",
    },
    "Delete SessionNote": {
      bgColor: "primary",
      icon: "bi bi-trash3",
      caseTitleId: "DeleteSessionNote",
    },
    "Delete JudgementGround": {
      bgColor: "primary",
      icon: "bi bi-trash3",
      caseTitleId: "DeleteJudgementGround",
    },
    "update Session": {
      bgColor: "success",
      icon: "fas fa-pencil-alt",
      caseTitleId: "UpdateSession",
      additionalData: MODIFICATIONS,
    },
    "update CauseStage": {
      bgColor: "success",
      icon: "fas fa-sync-alt",
      caseTitleId: "UpdateStage",
      additionalData: CHANGES,
    },
    "update SessionAttachment": {
      bgColor: "success",
      icon: "fas fa-pencil-alt",
      caseTitleId: "UpdateSessionAttachment",
      additionalData: MODIFICATIONS,
    },
    "update SessionAssignee": {
      bgColor: "success",
      icon: "fas fa-pencil-alt",
      caseTitleId: "UpdateSessionAssignee",
      additionalData: MODIFICATIONS,
    },
    "update SessionNote": {
      bgColor: "success",
      icon: "fas fa-pencil-alt",
      caseTitleId: "UpdateSessionNote",
      additionalData: MODIFICATIONS,
    },
    "update JudgementGround": {
      bgColor: "success",
      icon: "fas fa-pencil-alt",
      caseTitleId: "UpdateJudgementGround",
      additionalData: MODIFICATIONS,
    },
  };

  const formatSchedule = (date) => ({
    day:
      intl.locale === "ar"
        ? moment(date).locale("en").format("dddd")
        : moment(date).locale("en").format("dddd"),
    date:
      intl.locale === "ar"
        ? moment(date).locale("en").format("DD MMM YYYY")
        : moment(date).locale("en").format("DD MMM YYYY"),
    time:
      intl.locale === "ar"
        ? moment(date).locale("en").format("HH:mm:ss")
        : moment(date).locale("en").format("HH:mm:ss"),
  });

  let mappedArchive = Array.isArray(caseHistories)
    ? caseHistories?.map((item) => {
        const key = `${item?.action} ${item?.tableName}`;
        const actionConfig = actionMap[key];
        if (!actionConfig) return null;

        const parsedOld = JSON.parse(item?.oldValue || "{}");
        const parsedNew = JSON.parse(item?.newValue || "{}");

        let additionalData;
        if (
          key === "update Session" ||
          key === "update SessionAttachment" ||
          key === "update SessionAssignee" ||
          key === "update SessionNote" ||
          key === "update JudgementGround"
        ) {
          additionalData = {
            type: MODIFICATIONS,
            title: intl.formatMessage({ id: "Modifications" }),
            firstCase: `${intl.formatMessage({ id: "SessionPrompts" })}:`,
            secondCase: `${intl.formatMessage({ id: "SessionPrompts" })}:`,
            firstContent: [
              parsedOld?.Description,
              parsedOld?.JudgementStatement,
              parsedOld?.UpdatedOn &&
                `${intl.formatMessage({ id: "UpdateDate" })} : ${moment(
                  parsedOld?.UpdatedOn
                ).format("DD MMM YYYY")}`,
              parsedOld?.LK_JudgementId && intl.locale === "ar"
                ? lKJudgement?.find(
                    (item) => item?.id === parsedOld?.LK_JudgementId
                  )?.nameAr
                : lKJudgement?.find(
                    (item) => item?.id === parsedOld?.LK_JudgementId
                  )?.nameEn,
              parsedOld?.NextSession &&
                `${intl.formatMessage({ id: "NextSession" })} : ${moment(
                  parsedOld?.NextSession
                ).format("DD MMM YYYY")}`,
              parsedOld?.SessionDate &&
                `${intl.formatMessage({ id: "SessionDate" })} : ${moment(
                  parsedOld?.SessionDate
                ).format("DD MMM YYYY")}`,
              parsedOld?.SessionJedgementStatus != null &&
                (parsedOld?.SessionJedgementStatus === 1
                  ? intl.formatMessage({ id: "pointer" })
                  : parsedOld?.SessionJedgementStatus === 2
                  ? intl.formatMessage({ id: "Opponent" })
                  : intl.formatMessage({ id: "Equal" })),
            ]
              .filter(Boolean)
              .join(" - "),

            secondContent: [
              parsedNew?.Description,
              parsedNew?.JudgementStatement,
              parsedNew?.UpdatedOn &&
                `${intl.formatMessage({ id: "UpdateDate" })} : ${moment(
                  parsedNew?.UpdatedOn
                ).format("DD MMM YYYY")}`,
              parsedNew?.LK_JudgementId && intl.locale === "ar"
                ? lKJudgement?.find(
                    (item) => item?.id === parsedNew?.LK_JudgementId
                  )?.nameAr
                : lKJudgement?.find(
                    (item) => item?.id === parsedNew?.LK_JudgementId
                  )?.nameEn,
              parsedNew?.NextSession &&
                `${intl.formatMessage({ id: "NextSession" })} : ${moment(
                  parsedNew?.NextSession
                ).format("DD MMM YYYY")}`,
              parsedNew?.SessionDate &&
                `${intl.formatMessage({ id: "SessionDate" })} : ${moment(
                  parsedNew?.SessionDate
                ).format("DD MMM YYYY")}`,
              parsedNew?.SessionJedgementStatus != null &&
                (parsedNew?.SessionJedgementStatus === 1
                  ? intl.formatMessage({ id: "pointer" })
                  : parsedNew?.SessionJedgementStatus === 2
                  ? intl.formatMessage({ id: "Opponent" })
                  : intl.formatMessage({ id: "Equal" })),
            ]
              .filter(Boolean)
              .join(" - "),
            // firstContent:
            //   JSON.parse(item?.oldValue)?.Description ||
            //   JSON.parse(item?.oldValue)?.JudgementStatement ||
            //   JSON.parse(item?.oldValue)?.LK_JudgementId ||
            //   JSON.parse(item?.oldValue)?.UpdatedOn ||
            //   JSON.parse(item?.oldValue)?.NextSession,
            // secondContent:
            //   JSON.parse(item?.newValue)?.Description ||
            //   JSON.parse(item?.newValue)?.JudgementStatement ||
            //   JSON.parse(item?.newValue)?.LK_JudgementId ||
            //   JSON.parse(item?.newValue)?.UpdatedOn ||
            //   JSON.parse(item?.newValue)?.NextSession,
          };
        } else if (key === "update CauseStage") {
          additionalData = {
            type: CHANGES,
            title: intl.formatMessage({ id: "TheChange" }),
            firstCase:
              JSON.parse(item?.oldValue)?.Status === LitigantStatus.Client
                ? intl.formatMessage({ id: "Clients" })
                : intl.formatMessage({ id: "Opponents" }),
            secondCase:
              JSON.parse(item?.newValue)?.Status === LitigantStatus.Client
                ? intl.formatMessage({ id: "Clients" })
                : intl.formatMessage({ id: "Opponents" }),
          };
        }

        return {
          bgColor: actionConfig.bgColor,
          caseTitle: intl.formatMessage({ id: actionConfig.caseTitleId }),
          caseNumber:
            intl.locale == "ar"
              ? "# " + item?.lk_Stage?.nameAr
              : "# " + item?.lk_Stage?.nameEn,
          icon: <i className={actionConfig.icon}></i>,
          responsibleInfo: {
            name: item?.fullName,
            department: item?.createdByOrg,
          },
          scheduleInfo: formatSchedule(item?.createdOn),
          additionalData,
        };
      })
    : [];
  return (
    <div>
      <CaseInfo
      // color="gray-100"
      // caseTitle="نزاع أرض الرياض"
      // caseNumber="#5645645"
      // caseName="الدعوى #7"
      // caseStatus="منتهية"
      />
      <div className="min-h-screen bg-gray-100 p-6 rounded-2">
        <div className="d-flex flex-column mb-8">
          <h4 className="fw-bolder mb-8">
            {intl.formatMessage({ id: "CaseArchive" })}
          </h4>

          <div className="d-flex gap-4 flex-md-nowrap flex-wrap">
            <div className="w-md-50 w-100">
              <div className="d-flex align-items-center bg-white bg-fix-dark border-fix-dark  position-relative w-100 rounded-3">
                <span className="svg-icon svg-icon-1 position-absolute text-muted mx-3">
                  <KTSVG path="/media/icons/duotune/general/gen114_search.svg" />
                </span>
                <input
                  type="text"
                  data-kt-filemanager-table-filter="search"
                  className="form-control form-control-solid border-0 border-danger px-11 bg-body rounded-2"
                  placeholder={intl.formatMessage({ id: "Search" })}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="w-md-50 w-100 d-flex flex-sm-nowrap flex-wrap gap-4">
              <div className="w-sm-50 w-100">
                <div className="input-group">
                  <select
                    onChange={(e) => setSelectedStage(e.target.value)}
                    className="rounded-2 w-100 form-select"
                    value={selectedStage}
                    aria-label={intl.formatMessage({ id: "StageSelection" })}
                  >
                    <option value="">
                      {intl.formatMessage({ id: "All" })}
                    </option>
                    {allLKStageIds?.map((item) => (
                      <option key={item?.id} value={item?.id}>
                        {intl.locale == "ar" ? item?.nameAr : item?.nameEn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="w-sm-50 w-100">
                <input
                  type="date"
                  className="px-4 rounded-2 w-100 form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="تاريخ"
                  onClick={(e) => {
                    const target = e.currentTarget as HTMLInputElement;
                    if (target && typeof target.showPicker === "function") {
                      target.showPicker();
                    } else {
                      target.focus();
                      target.click();
                    }
                  }}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        </div>
        {loadingForArchive ? (
          <div className="d-flex gap-4 justify-content-center align-items-center py-4">
            {intl.formatMessage({ id: "DataIsLoaded..." })}
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            <Row>
              {mappedArchive &&
                mappedArchive?.map((item, idx) => (
                  <React.Fragment key={`${item?.caseNumber}-${idx}`}>
                    <Col key={`timeline-icon-${item?.caseNumber}-${idx}`}>
                      <div
                        className={
                          idx + 1 !== mappedArchive?.length
                            ? "timeline-new"
                            : "timeline-new-last-item"
                        }
                      >
                        <div className="timeline-new-item">
                          <div className="timeline-new-icon bg-body">
                            {item?.icon}
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col
                      md={11}
                      key={`timeline-content-${item?.caseNumber}-${idx}`}
                      className="mb-3 flex-grow-1"
                    >
                      <CaseCard
                        bgColor={item?.bgColor}
                        caseTitle={item?.caseTitle}
                        caseNumber={item?.caseNumber}
                        responsibleInfo={item?.responsibleInfo}
                        scheduleInfo={item?.scheduleInfo}
                        AdditionalData={
                          item?.additionalData?.type ? (
                            <CaseCardContent
                              type={
                                item?.additionalData?.type as
                                  | typeof MODIFICATIONS
                                  | typeof CHANGES
                              }
                              title={item?.additionalData?.title}
                              firstCase={item?.additionalData?.firstCase}
                              secondCase={item?.additionalData?.secondCase}
                              firstContent={item?.additionalData?.firstContent}
                              secondContent={
                                item?.additionalData?.secondContent
                              }
                            />
                          ) : (
                            false
                          )
                        }
                      />
                    </Col>
                  </React.Fragment>
                ))}
            </Row>
          </>
        )}
      </div>
    </div>
  );
};

export default CaseArchive;
