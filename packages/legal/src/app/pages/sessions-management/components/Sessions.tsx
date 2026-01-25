import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { Fragment, useEffect, useState, useCallback } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { getStyleByStatusCauseStages } from "@4eplatform/shared/functions/getStyleByStatus";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchAllSessionsNew } from "../../../features/session";
import moment from "moment";
import "moment/locale/ar";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { fetchCauseTitles } from "../../../features/causes";
import {
  fetchAllCauseStages,
  fetchCauseStageNameByCauseId,
} from "../../../features/cause-stage";
import Spinner from "react-bootstrap/esm/Spinner";
import { StageModel } from "../../../models/StageModel";
import { fetchAllLKStage } from "../../../features/stage";
import Select from "react-select";
import { searchSelectStylesModeStyles } from "@4eplatform/shared/functions/searchSelectStylesModeStyles";
import { causeStageStatus } from "@4eplatform/shared/functions/causeStatus";

function Sessions() {
  let isDarkMode = localStorage.getItem("Theme") === "dark" ? true : false;
  let intl = useIntl();
  moment.locale("en");
  let navigate = useNavigate();
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [selectedDegree, setSelectedDegree] = useState<any>(null);
  let [causeStages, setCauseStages] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const fetchLkStages = useCallback(async () => {
    await dispatch(fetchAllLKStage({}) as any).then((res) => {
      setCauseStages(
        res?.payload?.result?.map((item: StageModel) => ({
          lk_StageId: item?.id,
          lk_StageNameAr: item?.nameAr,
          lk_StageNameEn: item?.nameEn,
        }))
      );
    });
  }, [dispatch]);

  const handleNavigate = (item: any) => {
    navigate(`/sessions-view/list-of-cases/${item?.causeId}`, {
      state: { item: item, comeFrom: "/sessions-view" },
    });
  };

  // const handleNavigate = (
  //   item: CauseStagesModel,
  //   specificTab = false,
  //   hideOtherTabs = false,
  //   specificClaim =false,
  // ) => {
  //   navigate(
  //     `/cases-view/list-of-cases/${item?.causeId}${specificTab ? "#lawsuits" : ""}`,
  //     {
  //       state: {
  //         item: item,
  //         hideOtherTabs,
  //         comeFrom: "/litigation-management",
  //         specificClaim,
  //       },
  //     }
  //   );
  // };

  useEffect(() => {
    const params: Record<string, any> = {
      ...(searchTerm && { searchTerm }),
      ...(pageIndex !== undefined && { PageNumber: pageIndex }),
      ...(pageSize !== undefined && { PageSize: pageSize }),
      ...(selectedDegree?.value && { LK_Stage: selectedDegree?.value }),
      ...(selectedCase?.value && { CaseId: selectedCase?.value }),
    };

    setIsSearching(true);
    (async () => {
      try {
        await dispatch(fetchAllSessionsNew(params) as any);
      } finally {
        setIsSearching(false);
      }
    })();
  }, [
    dispatch,
    pageSize,
    pageIndex,
    searchTerm,
    selectedCase?.value,
    selectedDegree?.value,
  ]);

  const {
    sessionsNew,
    pagination: { totalPages, totalItems },
  } = useSelector((state: RootState) => state.session);

  // const handleNavigate = (item: any) => {
  //   navigate(`/cases-view/list-of-cases/${item?.sessionId}#CaseDetails`, {
  //     state: { item: item },
  //   });
  // };

  useEffect(() => {
    dispatch(fetchCauseTitles({}));
  }, [dispatch]);

  // console.log(selectedDegree);

  // useEffect(() => {
  //   if (selectedCase) {
  //     dispatch(fetchAllCauseStages({ causeId: selectedCase }));
  //   }
  // }, [dispatch, selectedCase]);
  useEffect(() => {
    dispatch(
      fetchAllCauseStages({
        ...(searchTerm && { searchWord: searchTerm }),
        ...(!searchTerm && !selectedCase?.value && !selectedDegree?.value
          ? { pagesize: pageSize, pageIndex: pageIndex }
          : { pagesize: "10000", pageIndex: "1" }),

        ...(selectedCase?.value && { CaseId: selectedCase?.value }),
        ...(selectedDegree?.value && { lk_StageId: selectedDegree?.value }),
      }) as any
    );
  }, [searchTerm, selectedCase, selectedDegree, pageSize, pageIndex, dispatch]);

  useEffect(() => {
    if (selectedCase?.value) {
      dispatch(fetchCauseStageNameByCauseId(selectedCase?.value) as any).then(
        (res) => {
          setCauseStages(res?.payload?.result);
        }
      );
    } else {
      fetchLkStages();
    }
  }, [selectedCase?.value, dispatch, fetchLkStages]);
  let { causeTitles } = useSelector((state: any) => state.causesData);

 
  const caseOptions = Array.isArray(causeTitles)
    ? causeTitles?.map((option) => ({
        value: option?.id,
        label: option?.title,
      }))
    : [];
  const lkStageOptions = Array.isArray(causeStages)
    ? causeStages?.map((option) => ({
        value: option?.lk_StageId,
        label:
          intl.locale === "ar" ? option?.lk_StageNameAr : option?.lk_StageNameEn,
      }))
    : [];
  const handleNavigateToSessionDetails = (session: any) => {
    navigate(`/sessions-view/session-details/${session.sessionId}`, {
      state: { causeId: session.causeId },
    });
  };
  const language = intl.locale;

  console.log(sessionsNew);

  return (
    <Fragment>
      <div className="container table-dark card card-xl-stretch mb-xl-8">
        <div className="d-flex align-items-center mt-8 mb-6 row">
          <div className="d-flex flex-column  col-12 col-sm-12 col-md-3 col-lg-3">
            <h1 className="">
              <span className="fs-2 mt-3 mb-1">
                {intl.formatMessage({ id: "ManagingSessions" })}
              </span>
            </h1>
            <h1 className="card-title">
              <span className="fw-semibold fs-6 text-muted">
                {intl.formatMessage({
                  id: "ViewAllCasesManagers",
                })}
              </span>
            </h1>
          </div>
          <div className="col-9 d-flex justify-content-end">
            <div className="row gx-5 gy-3 w-100">
              <div className="col-12 col-md-6 col-lg-6 col-sm-12">
                <div className="d-flex align-items-center position-relative">
                  <span className="svg-icon svg-icon-1 position-absolute text-muted mx-3">
                    <KTSVG path="/media/icons/duotune/general/gen114_search.svg" />
                  </span>
                  <input
                    type="text"
                    data-kt-filemanager-table-filter="search"
                    className="form-control form-control-solid px-11 searchBorder"
                    placeholder={intl.formatMessage({ id: "Search" })}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {isSearching && (
                    <span className="position-absolute end-0 me-3">
                      <Spinner animation="border" size="sm" />
                    </span>
                  )}
                </div>
              </div>

              <div className="col-md-12 col-lg-3 col-sm-12 my-3 select-menu-dark-fix">
                <Select
                  id="Case"
                  className="react-select__container bg-light"
                  placeholder={intl.formatMessage({
                    id: "Choose",
                  })}
                  options={caseOptions}
                  isClearable={true}
                  onChange={(selectedOption) => {
                    setSelectedCase(selectedOption);
                  }}
                  value={selectedCase}
                  noOptionsMessage={() =>
                    intl.formatMessage({
                      id: "NotAvailableOptions",
                    })
                  }
                  styles={searchSelectStylesModeStyles(isDarkMode)}
                  formatOptionLabel={(option) => {
                    const label = option.label || "";
                    const shortLabel =
                      label.length > 10 ? `${label.slice(0, 15)}...` : label;

                    // Add tooltip with full text
                    return <span title={label}>{shortLabel}</span>;
                  }}
                />
              </div>

              <div className="col-md-12 col-lg-3 col-sm-12 my-3 select-menu-dark-fix">
                <Select
                  id="CaseDegree"
                  className="react-select__container bg-light"
                  placeholder={intl.formatMessage({
                    id: "Choose",
                  })}
                  options={lkStageOptions}
                  isClearable={true}
                  onChange={(selectedOption) => {
                    setSelectedDegree(selectedOption);
                  }}
                  value={selectedDegree}
                  noOptionsMessage={() =>
                    intl.formatMessage({
                      id: "NotAvailableOptions",
                    })
                  }
                  styles={searchSelectStylesModeStyles(isDarkMode)}
                  formatOptionLabel={(option) => {
                    const label = option.label || "";
                    const shortLabel =
                      label.length > 10 ? `${label.slice(0, 15)}...` : label;

                    // Add tooltip with full text
                    return <span title={label}>{shortLabel}</span>;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {isSearching ? (
          <div className="d-flex gap-4 justify-content-center align-items-center py-4">
            {intl.formatMessage({ id: "DataIsLoaded..." })}
            <Spinner animation="border" variant="primary" />
          </div>
        ) : totalPages > 0 ? (
          <>
            <div className="table-responsive mb-3">
              <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4 text-center">
                <thead>
                  <tr className="fw-bolder projectSecColor">
                    <th className="Case-Table-Head   pb-3 min-w-100px max-w-350px">
                      {intl.formatMessage({ id: "CaseeNumber" })}
                    </th>
                    <th className="Case-Table-Head  pb-3 min-w-100px max-w-350px">
                      {intl.formatMessage({ id: "CaseeTitle" })}
                    </th>
                    <th className="Case-Table-Head  pb-3 min-w-100px max-w-350px">
                      {intl.formatMessage({ id: "TheLawsuit" })}
                    </th>
                    <th className="Case-Table-Head   pb-3 min-w-100px max-w-200px">
                      {intl.formatMessage({ id: "CompetentCourt" })}
                    </th>
                    <th className="Case-Table-Head   pb-3 min-w-100px max-w-200px">
                      {intl.formatMessage({ id: "CourtLocation" })}
                    </th>
                    <th className="Case-Table-Head   pb-3 min-w-100px max-w-200px">
                      {intl.formatMessage({ id: "SessionNumber" })}
                    </th>
                    <th className="Case-Table-Head   pb-3 min-w-100px max-w-200px">
                      {intl.formatMessage({ id: "ClientsCondition" })}
                    </th>
                    <th className="Case-Table-Head pb-3 min-w-100px max-w-200px">
                      {intl.formatMessage({ id: "SessionDate" })}
                    </th>
                    <th className="Case-Table-Head ps-1  pb-3 min-w-100px max-w-200px">
                      {intl.formatMessage({ id: "Opponent" })}
                    </th>
                    <th className="Case-Table-Head pb-3 min-w-50px max-w-200px">
                      {intl.formatMessage({ id: "LitigationStatus" })}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sessionsNew?.map((session) => {
                    return (
                      <tr key={session?.sessionId}>
                        <td className="Case-Table-Content">
                          <div
                            onClick={() => handleNavigate(session)}
                            // to={`/cases-view/list-of-cases/${session?.causeId}`}
                          >
                            {" "}
                            <div className="px-3 mb-2 text-muted cursor-pointer">
                              <h6 className="text-primary">
                                {session?.causeNumber}#
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td className="Case-Table-Content">
                          <div
                            // to={`/cases-view/list-of-cases/${session?.causeId}`}
                            onClick={() => handleNavigate(session)}
                            className="case-Menu-link px-3 mb-2 text-muted cursor-pointer"
                          >
                            <h6
                              className="text-muted text-hover-primary no-whitespace-wrap text-truncate mw-100px"
                              title={session?.causeTitle}
                            >
                              {session?.causeTitle}
                            </h6>
                          </div>
                        </td>
                        <td className="case-Menu-link px-3 mb-2 text-muted cursor-pointer">
                          <h6
                            className="text-primary cursor-pointer"
                            onClick={() => {
                              navigate(
                                `/sessions-view/list-of-cases/${session?.causeId}#lawsuits`,
                                {
                                  state: {
                                    item: session,
                                    causeStageId: session?.causeStageId,
                                  },
                                }
                              );
                            }}
                          >
                            {/* {session?.causeStageLookup} */}
                            {" # "}
                            {language === "ar"
                              ? session?.lkStageNameAr
                              : session?.lkStageNameEn}
                          </h6>
                        </td>
                        <td className="Case-Table-Content">
                          <h6 className="text-muted">{session?.courtName}</h6>
                        </td>
                        <td className="Case-Table-Content">
                          <h6 className="text-muted">
                            {session?.location || "----"}
                          </h6>
                        </td>
                        <td className="Case-Table-Content">
                          <span
                            onClick={() =>
                              handleNavigateToSessionDetails(session)
                            }
                            className="case-Menu-link px-3 mb-2 text-muted cursor-pointer"
                          >
                            <h6 className="text-primary">
                              {session?.sessionNumber}#
                            </h6>
                          </span>
                        </td>
                        <td className="Case-Table-Content">
                          <h6 className="text-muted">
                            {session?.clientType === 1 &&
                              intl.formatMessage({ id: "Plaintiff1" })}
                            {session?.clientType === 2 &&
                              intl.formatMessage({ id: "Respondent" })}
                          </h6>
                        </td>
                        <td className="Case-Table-Content" dir="ltr">
                          <h6 className="text-dark">
                            {moment(session?.sessionDate).format("DD MMM YYYY")}
                          </h6>
                          <h6 className="text-muted">
                            {moment(session?.sessionDate).format("h:mm A")}
                          </h6>
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center gap-1">
                            {!Array.isArray(session?.opponentName) ||
                            session.opponentName.length === 0 ? (
                              <p className="mb-0">
                                {intl.formatMessage({ id: "NotFound" })}
                              </p>
                            ) : (
                              <>
                                <p className="mb-0">
                                  {session.opponentName.at(0)}
                                </p>
                                {session.opponentName.length > 1 && (
                                  <div className="small-circle bg-primary text-white">
                                    {`${session.opponentName.length - 1} +`}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </td>
                        <td>
                          <span
                            className={`Case-Table-Span fw-bolder mb-1 fs-7 rounded-3 px-4 py-1 badge-${getStyleByStatusCauseStages(
                              causeStageStatus(session?.causeStageStatus, intl)
                                ?.statusEnum as number
                            )}`}
                          >
                            {causeStageStatus(session?.causeStageStatus, intl)?.name}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mb-9">
              <SystemPagination
                totalPages={totalPages}
                totalItems={totalItems}
                pageIndex={pageIndex}
                pageSize={pageSize}
                setPageIndex={setPageIndex}
                setPageSize={setPageSize}
              />
            </div>
          </>
        ) : (
          <div className="text-center fw-bold py-5 my-5">
            {intl.formatMessage({ id: "NoFoundData" })}
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default Sessions;
