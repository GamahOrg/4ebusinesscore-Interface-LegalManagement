import { useEffect, useState, useRef, FC } from "react";
import { useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { TableActions } from "./TableActions";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchAllJudgementGrounds } from "../../../features/judgement-ground";
import { fetchCauseTitles } from "../../../features/causes";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { KTSVG, toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";
import Spinner from "react-bootstrap/esm/Spinner";
import { fetchCauseStageNameByCauseId } from "../../../features/cause-stage";
import { fetchAllLKStage } from "../../../features/stage";
import { StageModel } from "../../../models/StageModel";
import { ClientType } from "../../../models/LegalEnums";
import { getStyleByStatusToJudgements } from "@4eplatform/shared/functions/getStyleByStatusToJudgements";
import { causeStageStatus } from "@4eplatform/shared/functions/causeStatus";
import { getStyleByStatusCauseStages } from "@4eplatform/shared/functions/getStyleByStatus";

type JudgementsManagementsTableProps = {
  pageNumber: number;
  pageSize: number;
  searchTerm: string;
  selectedCause: string;
  selectedDegree: string;
  setPageNumber: any;
  setSelectedDegree: any;
  setSelectedCause: any;
  setSearchTerm: any;
  setPageSize: any;
};

const JudgementsManagementsTable: FC<JudgementsManagementsTableProps> = ({
  pageNumber,
  pageSize,
  searchTerm,
  selectedCause,
  selectedDegree,
  setPageNumber,
  setSelectedDegree,
  setSelectedCause,
  setSearchTerm,
  setPageSize,
}) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { judgementGrounds, loading, pagination } = useAppSelector(
    (state) => state.judgementGround
  );

  const { causeTitles } = useAppSelector((state) => state.causesData);

  let [lkStages, setLkStages] = useState<any[]>([]);

  const prevSearchTermRef = useRef<string>("");
  const prevCauseTermRef = useRef<string>("");
  const prevDegreeTermRef = useRef<string>("");

  useEffect(() => {
    if (prevSearchTermRef.current !== searchTerm) {
      setPageNumber(1);
    }
    prevSearchTermRef.current = searchTerm;
  }, [searchTerm]);

  useEffect(() => {
    if (prevCauseTermRef.current !== selectedCause) {
      setPageNumber(1);
    }
    prevCauseTermRef.current = selectedCause;
  }, [selectedCause]);

  useEffect(() => {
    if (prevDegreeTermRef.current !== selectedDegree) {
      setPageNumber(1);
    }
    prevDegreeTermRef.current = selectedDegree;
  }, [selectedDegree]);

  const fetchData = () => {
    dispatch(
      fetchAllJudgementGrounds({
        pageNumber: pageNumber,
        PageSize: pageSize,
        SearchItem: searchTerm,
        CauseId: selectedCause || undefined,
        lkStageId: selectedDegree || undefined,
      }) as any
    );
  };

  useEffect(() => {
    dispatch(fetchCauseTitles({}) as any);
  }, [dispatch]);

  useEffect(() => {
    if (selectedCause) {
      dispatch(fetchCauseStageNameByCauseId(selectedCause) as any).then(
        (res) => {
          // Normalize the data structure to ensure consistent property names
          const normalizedStages = res?.payload?.result?.map((item: any) => {
            return {
              lkStageId: item?.lkStageId || item?.lk_StageId || item?.id,
              lk_StageNameAr: item?.lk_StageNameAr || item?.nameAr,
              lk_StageNameEn: item?.lk_StageNameEn || item?.nameEn,
            };
          }) || [];
          setLkStages(normalizedStages);
        }
      );
    } else {
      fetchLkStages();
    }
  }, [selectedCause, dispatch]);

  useEffect(() => {
    fetchData();
  }, [pageNumber, pageSize, searchTerm, selectedCause, selectedDegree]);

  let fetchLkStages = async () => {
    await dispatch(fetchAllLKStage({}) as any).then((res) => {
      // Normalize the data structure to ensure consistent property names
      const normalizedStages = res?.payload?.result?.map((item: StageModel) => {
        return {
          lkStageId: item?.id, // Always use item.id as the lkStageId
          lk_StageNameAr: item?.nameAr,
          lk_StageNameEn: item?.nameEn,
        };
      }) || [];
      setLkStages(normalizedStages);
    });
  };

  const handleChangeDegree = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDegree(event?.target?.value);
  };

  const handleChangeCase = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCause(event.target.value);
  };

  const handleNavigate = (item: any) => {
    navigate(`/judgements-managements/case-judgement/${item?.id}`, {
      state: { item: item, comeFrom: "judgements-managements" },
    });
  };

  const mapJudgementToTableFormat = (judgement: any) => {
    // Now we can safely use lkStageId since all data is normalized
    const stageInfo = lkStages?.find((stage) => {
      return stage.lkStageId === judgement.lkStageId;
    }) || {};

    return {
      id: judgement.id,
      caseNumber: judgement.causeNumber || "------",
      caseSubject: judgement.causeTitle || "------",
      stageNameAr: stageInfo?.lk_StageNameAr || "------",
      stageNameEn: stageInfo?.lk_StageNameEn || "------",
      judgementTitle: judgement.judgementTitle || "------",
      caseStatusById: judgement.causeStatus,
      assignment: judgement.opponentName || "-----",
      clients:
        judgement?.clientType == ClientType.Plaintiff
          ? "Claimant"
          : judgement?.clientType == ClientType.Defendant
          ? "Respondent"
          : "------",
      nextSessionDate:
        judgement.nextSessionDate &&
        judgement.nextSessionDate !== "0001-01-01T00:00:00"
          ? new Date(judgement.nextSessionDate).toLocaleDateString()
          : "------",
      judgementDate:
        judgement.judgementDate &&
        judgement.judgementDate !== "0001-01-01T00:00:00"
          ? new Date(judgement.judgementDate).toLocaleDateString()
          : "------",
      JudgementFor: getJudgementForText(judgement.sessionJedgementStatus),
      litigationStatus: causeStageStatus(judgement?.causeStatus, intl)?.name,
      judgementStatus: judgement.sessionJedgementStatus,
    };
  };

  console.log(judgementGrounds);

  const getJudgementForText = (statusId: number) => {
    switch (statusId) {
      case 2:
        return intl.formatMessage({ id: "ForTheAuthority" });
      case 1:
        return intl.formatMessage({ id: "AgainstTheAuthority" });
      case 3:
        return intl.formatMessage({ id: "EndTheDispute" });
      default:
        return intl.formatMessage({ id: "EndTheDispute" });
    }
  };

  const getLitigationStatusText = (statusId: number) => {
    switch (statusId) {
      case 1:
        return intl.formatMessage({ id: "InTheSessions" });
      default:
        return intl.formatMessage({ id: "JudgmentWasIssued" });
    }
  };

  const getStyleByCauseStatus = (status: number) => {
    switch (status) {
      case 1:
        return "light-danger text-danger";
      case 2:
        return "light-warning text-warning";
      case 3:
        return "light-warning text-warning";
      default:
        return "light-warning text-warning";
    }
  };

  const [selectedJudgement, setSelectedJudgement] = useState<any>(null);

  return (
    <>
      <div className="row mt-10 mb-4 py-2 mx-0">
        <div className="col-12 col-lg-3">
          <div className="col-12">
            <div className="d-flex flex-column">
              <h1>
                <span className="fs-2 mt-3 mb-1">
                  {intl.formatMessage({ id: "JudgmentAdministration" })}
                </span>
              </h1>
              <h1 className="card-title">
                <span className="fw-semibold fs-6 text-muted">
                  {intl.formatMessage({
                    id: "ViewAllJudgements",
                  })}
                </span>
              </h1>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-9">
          <div className="row mx-0 justify-content-start justify-content-lg-end">
            <div className="col-12 col-md-4 mb-3 mb-md-0">
              <div className="d-flex align-items-center position-relative">
                <span className="svg-icon svg-icon-1 position-absolute text-muted mx-3">
                  <KTSVG path="/media/icons/duotune/general/gen114_search.svg" />
                </span>
                <input
                  type="text"
                  data-kt-filemanager-table-filter="search"
                  className="form-control form-control-solid px-14 searchBorder"
                  placeholder={intl.formatMessage({ id: "Search" })}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  value={searchTerm}
                />
              </div>
            </div>
            <div className="col-12 col-md-4 mb-3 mb-md-0">
              <select
                className="form-select"
                value={selectedCause}
                onChange={handleChangeCase}
                title={intl.formatMessage({ id: "CauseSelection" })}
              >
                <option value="">
                  {intl.formatMessage({ id: "AllCases" })}
                </option>
                {causeTitles &&
                  causeTitles.length > 0 &&
                  causeTitles.map((cause: any, index: number) => {
                    const title = cause?.title || "";
                    const shortTitle =
                      title.length > 10 ? `${title.slice(0, 15)}...` : title;

                    return (
                      <option key={index} value={cause.id} title={title}>
                        {shortTitle}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="col-12 col-md-4 mb-3 mb-md-0">
              <label
                htmlFor="stage-select"
                className="form-label visually-hidden"
              >
                {intl.formatMessage({ id: "SelectStage" })}
              </label>
              <select
                id="stage-select"
                className="form-select"
                value={selectedDegree}
                onChange={handleChangeDegree}
              >
                <option value="">
                  {intl.formatMessage({ id: "AllCauseStages" })}
                </option>
                {Array.isArray(lkStages) &&
                  lkStages.map((option: any, index: number) => {
                    const label =
                      intl.locale === "ar"
                        ? option?.lk_StageNameAr
                        : option?.lk_StageNameEn;

                    const shortLabel =
                      label && label.length > 10
                        ? `${label.slice(0, 15)}...`
                        : label;

                    return (
                      <option
                        key={index}
                        value={option?.lkStageId} // This will now always be the ID
                        title={label}
                      >
                        {shortLabel}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>
      </div>

      {!loading ? (
        Array.isArray(judgementGrounds) && judgementGrounds?.length > 0 ? (
          <>
            <div className="mb-3 table-responsive">
              <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4 text-center w-100">
                <thead>
                  <tr className="fw-bolder projectSecColor">
                    <th className="Case-Table-Head px-2 pb-3">
                      {intl.formatMessage({ id: "Casenumber" })}
                    </th>
                    <th className="Case-Table-Head px-2 pb-3">
                      {intl.formatMessage({ id: "CaseTitle" })}
                    </th>
                    <th className="Case-Table-Head px-2 pb-3">
                      {intl.formatMessage({ id: "TheLawsuit" })}
                    </th>
                    <th className="Case-Table-Head px-2 pb-3">
                      {intl.formatMessage({ id: "Title1" })}
                    </th>
                    <th className="Case-Table-Head px-2 pb-3">
                      {intl.formatMessage({ id: "Opponent" })}
                    </th>
                    <th className="Case-Table-Head px-2 pb-3">
                      {intl.formatMessage({ id: "ClientsState" })}
                    </th>
                    <th className="Case-Table-Head px-2 pb-3">
                      {intl.formatMessage({ id: "JudgementFor" })}
                    </th>
                    <th className="Case-Table-Head px-2 pb-3">
                      {intl.formatMessage({ id: "Date" })}
                    </th>
                    <th className="Case-Table-Head px-2 pb-3">
                      {intl.formatMessage({ id: "LitigationStatus" })}
                    </th>
                    <th className="Case-Table-Head px-2 pb-3">
                      {intl.formatMessage({ id: "Procedures" })}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {judgementGrounds?.length > 0 ? (
                    judgementGrounds.map((judgement, index: any) => {
                      const item = mapJudgementToTableFormat(judgement);
                      return (
                        <tr key={index}>
                          <td
                            className="Case-Table-Content text-truncate"
                            style={{ maxWidth: "100px" }}
                          >
                            <Link
                              to={`/judgements-managements/case-judgement/${item.id}`}
                              state={{
                                item: item,
                                comeFrom: "judgements-managements",
                              }}
                              className="case-Menu-link px-3 mb-2 text-muted cursor-pointer"
                            >
                              <p className="text-primary text-sm font-semibold">
                                {item.caseNumber}
                              </p>
                            </Link>
                          </td>
                          <td
                            className="Case-Table-Content text-truncate"
                            style={{ maxWidth: "120px" }}
                          >
                            <div
                              onClick={() => handleNavigate(item)}
                              className="case-Menu-link px-3 mb-2 text-muted cursor-pointer no-whitespace-wrap text-truncate mw-100px"
                              title={item.caseSubject}
                            >
                              <span className="text-muted text-hover-primary">
                                {item.caseSubject}
                              </span>
                            </div>
                          </td>
                          <td
                            className="text-truncate"
                            style={{ maxWidth: "120px" }}
                          >
                            <span
                              className="Case-Table-Span fs-7 py-1 px-2 bg-light-primary text-primary text-center rounded-3"
                              title={
                                intl.locale === "ar"
                                  ? item.stageNameAr
                                  : item.stageNameEn
                              }
                            >
                              {intl.locale === "ar"
                                ? item.stageNameAr
                                : item.stageNameEn}
                            </span>
                          </td>
                          <td
                            className="text-truncate"
                            style={{ maxWidth: "120px" }}
                          >
                            <span
                              className={`Case-Table-Span fw-bolder mb-1 fs-7 rounded-3 px-2 py-1`}
                              title={item.judgementTitle}
                            >
                              {item.judgementTitle}
                            </span>
                          </td>
                          <td
                            className="Case-Table-Content "
                            style={{ minWidth: "150px" }}
                          >
                            <div className="d-flex align-items-center ">
                              <i className="fa-solid fa-circle-user mx-3 text-primary fs-2"></i>
                              <p className="mb-0">{item.assignment}</p>
                            </div>
                          </td>
                          <td
                            className="Case-Table-Content"
                            style={{ maxWidth: "100px" }}
                          >
                            <span className="text-muted">
                              {intl.formatMessage({ id: item?.clients })}
                            </span>
                          </td>
                          <td className="Case-Table-Content">
                            <span
                              className={`Case-Table-Span fw-bolder mb-1 fs-7 rounded-2 px-2 py-1 badge-${getStyleByStatusToJudgements(
                                item?.judgementStatus
                              )}`}
                            >
                              {item?.JudgementFor}
                            </span>
                          </td>
                          <td
                            className="Case-Table-Content text-truncate"
                            style={{ maxWidth: "100px" }}
                          >
                            <p className="text-muted">{item.judgementDate}</p>
                          </td>
                          <td className="Case-Table-Content">
                            <div
                              className={`Case-Table-Span fw-bolder mb-1 fs-7 rounded-2 px-2 py-1 badge-${getStyleByStatusCauseStages(
                                item?.caseStatusById
                              )}`}
                            >
                              {item?.litigationStatus}
                            </div>
                          </td>
                          <td
                            className="text-center"
                            onClick={() => {
                              setSelectedJudgement(item);
                            }}
                          >
                            <TableActions
                              id={item.id}
                              handleNavigate={() => handleNavigate(item)}
                              status={item.litigationStatus || ""}
                              pageNumber={pageNumber}
                              pageSize={pageSize}
                              searchTerm={searchTerm}
                              selectedCause={selectedCause}
                              selectedDegree={selectedDegree}
                              selectedJudgement={selectedJudgement}
                            />
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={10} className="text-center py-5">
                        <div className="d-flex flex-column align-items-center">
                          <p className="text-muted">
                            {intl.formatMessage({ id: "NoRecordsFound" })}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {pagination?.totalPages > 0 && (
              <div className="w-100">
                <SystemPagination
                  totalPages={pagination?.totalPages || 1}
                  totalItems={pagination?.totalItems || 0}
                  pageIndex={pageNumber}
                  pageSize={pageSize}
                  setPageIndex={setPageNumber}
                  setPageSize={setPageSize}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center fw-bolder mt-8 fs-4">
            {intl.formatMessage({ id: "NoDataYet" })}
          </div>
        )
      ) : (
        <div className="d-flex gap-4 justify-content-center align-items-center py-4">
          {intl.formatMessage({ id: "DataIsLoaded..." })}
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </>
  );
};

export default JudgementsManagementsTable;