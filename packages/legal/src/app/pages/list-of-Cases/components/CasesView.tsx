import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import CaseViewTable from "./CaseViewTable";
import CaseViewCards from "./CaseViewCards";
import CaseViewTableToolbar from "../Toolbar/CaseViewTableToolbar";
import { ClientType } from "../../../models/LegalEnums";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCauses } from "../../../features/cause";
import { RootState } from "../../../store/store";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import Spinner from "react-bootstrap/esm/Spinner";
import { useSearchParams } from "react-router-dom";
import { fetchIsConsultative } from "../../../features/cause-comments";

function CasesView() {
  const intl = useIntl();
  const TABLE = "Table";
  const CARDS = "Card";
 const [searchParams, setSearchParams] = useSearchParams();
   const initialView = searchParams.get("view") ?? TABLE;
  const [activeCaseView, setActiveCaseView] = useState(initialView);
    useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("view", activeCaseView);
    setSearchParams(params, { replace: true });
  }, [activeCaseView]);
  let [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);
  let [clientTypiesFilter, setClientTypiesFilter] = useState<ClientType[]>([
    ClientType.Plaintiff,
    ClientType.Defendant,
  ]);
  const [causes, setCauses] = useState<[]>([]);

  let loadingForCauses = useSelector((state: RootState) => {
    return state?.causes?.loadingForCauses;
  });
  const totalItems = useSelector((state: RootState) => {
    return state?.causes?.causesPagination?.totalItems;
  });
  const totalPages = useSelector((state: RootState) => {
    return state?.causes?.causesPagination?.totalPages;
  });
  const prevSearchTermRef = useRef<string | undefined>();
  const prevClientTypiesTermRef = useRef<ClientType[]>([]);
  useEffect(() => {
    if (prevSearchTermRef.current !== searchTerm) {
      setPageIndex(1);
    }
    prevSearchTermRef.current = searchTerm;
  }, [searchTerm]);
  useEffect(() => {
    if (
      JSON.stringify(prevClientTypiesTermRef.current) !==
      JSON.stringify(clientTypiesFilter)
    ) {
      setPageIndex(1);
    }
    prevClientTypiesTermRef.current = clientTypiesFilter;
  }, [clientTypiesFilter]);
  useEffect(() => {
    const params = new URLSearchParams();
    params.append("pageSize", pageSize.toString());
    params.append("pageIndex", pageIndex.toString());
    if (searchTerm) {
      params.append("searchWord", searchTerm);
    }
    clientTypiesFilter.forEach((type) => {
      params.append("clientTypeFilter", type.toString());
    });

    if (filter?.causeNumber) {
      params.append("CauseNumber", filter?.causeNumber);
    }
    if (filter?.subject) {
      params.append("Subject", filter?.subject);
    }
    if (filter?.Lk_StageIds?.length > 0) {
      filter?.Lk_StageIds?.forEach((item: any, index: number) => {
        params.append(`Lk_StageIds[${index}]`, item?.id);
      });
    }
    if (filter?.LK_CauseCategories) {
      params.append("LK_CauseCategories", filter?.LK_CauseCategories);
    }
    if (filter?.LitigantIds?.length > 0) {
      filter?.LitigantIds?.forEach((ele: any, index: number) => {
        params.append(`LitigantIds[${index}]`, ele.id);
      });
    }
    if (filter?.CauseStatus) {
      params.append("CauseStatus", filter?.CauseStatus);
    }
    if (filter?.UserIds?.length > 0) {
      filter?.UserIds?.forEach((item: any, index: number) => {
        params.append(`UserIds[${index}]`, item);
      });
    }

    dispatch(fetchAllCauses(params) as any).then((res: any) => {
      setCauses(res?.payload?.result);
    });
  }, [searchTerm, pageSize, pageIndex, clientTypiesFilter]);
  const handleFilterCheckboxChange = (type: ClientType, isChecked: boolean) => {
    setClientTypiesFilter((prev: ClientType[]) => {
      if (isChecked) {
        return [...prev, type];
      } else {
        return prev.filter((t) => t !== type);
      }
    });
  };
  let [filter, setFilter] = useState({
    causeNumber: "",
    subject: "",
    CauseStatus: "",
    Lk_StageIds: [],
    LK_CauseCategories: "",
    UserIds: [],
    LitigantIds: [],
  });
  const [isConsultive , setIsConsultive] = useState<boolean >(true);
  const [isLawyerToTakeAction , setIsLawyerToTakeAction] = useState<boolean>(false);
  const [isDataEntry , setIsDataEntry] = useState<boolean>(false);
  const [isOwnerOrSuperVisor , setIsOwnerOrSuperVisor] = useState<boolean>(false);
   useEffect(()=>{
 
   dispatch(fetchIsConsultative({}) as any).then((res: any) => {
   if(res?.payload?.message == "RetrievedSuccessfully" || res?.payload?.statusEnum == 3){
     setIsConsultive(res?.payload?.result?.isConsultative)
    setIsLawyerToTakeAction(res?.payload?.result?.isLawyer)
    setIsDataEntry(res?.payload?.result?.isDataEntery)
    setIsOwnerOrSuperVisor(res?.payload?.result?.isOwnerOrSupervisor)
   }
     });
   },[])
  return (
    <>
      <CaseViewTableToolbar
        setFilter={setFilter}
        filter={filter}
        setPageIndex={setPageIndex}
        pageSize={pageSize}
        pageIndex={pageIndex}
        setCauses={setCauses}
        searchTerm={searchTerm}
        clientTypiesFilter={clientTypiesFilter}
        isConsultive={isConsultive}
        isLawyerToTakeAction={isLawyerToTakeAction}
        isDataEntry={isDataEntry}
        isOwnerOrSuperVisor={isOwnerOrSuperVisor}
      />

      <div className="container-fluid  table-dark card card-xl-stretch mb-xl-8">
        <div className="row gx-3 gy-3 mt-10 mb-4 py-2 d-flex flex-column flex-sm-row justify-content-md-between">
          {/* Heading Section */}
          <div className="col-12 col-md-4 col-lg-3">
            <div className="d-flex flex-column">
              <h1 className="">
                <span className="fs-2 mt-3 mb-1">
                  {intl.formatMessage({ id: "ListOfCases" })}
                </span>
              </h1>
              <h1 className="card-title">
                <span className="fw-semibold fs-6 text-muted">
                  {intl.formatMessage({ id: "ViewAllCasesWithAllTheirClaims" })}
                </span>
              </h1>
            </div>
          </div>

          <div className="col-1 my-2 d-md-none d-sm-none d-lg-block"></div>

          {/* Search Input */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-2">
            <div className="d-flex align-items-center position-relative">
              <span className="svg-icon svg-icon-1 position-absolute text-muted mx-3">
                <KTSVG path="/media/icons/duotune/general/gen114_search.svg" />
              </span>
              <input
                type="text"
                data-kt-filemanager-table-filter="search"
                className="form-control form-control-solid px-11"
                placeholder={intl.formatMessage({ id: "Search" })}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e?.target?.value);
                }}
              />
            </div>
          </div>

          {/* Plaintiff & Defendant Checkbox */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-2">
            <div className="bg-gray-200 px-3 py-4 w-100 rounded d-flex align-items-center gap-2">
              <div className="d-flex align-items-center gap-2">
                <input
                  className="form-check-input w-20px h-20px"
                  type="checkbox"
                  name="clientTypeFilter"
                  checked={clientTypiesFilter?.includes(ClientType.Plaintiff)}
                  onChange={(e) => {
                    handleFilterCheckboxChange(
                      ClientType.Plaintiff,
                      e?.target?.checked
                    );
                  }}
                  title={intl.formatMessage({ id: "Plaintiff" })}
                />
                <label className="fs-8  text-primary fa-solid">
                  {intl.formatMessage({ id: "Plaintiff" })}
                </label>
              </div>
              <div className="d-flex align-items-center gap-2">
                <input
                  className="form-check-input w-20px h-20px"
                  type="checkbox"
                  name="clientTypeFilter"
                  checked={clientTypiesFilter?.includes(ClientType.Defendant)}
                  onChange={(e) => {
                    handleFilterCheckboxChange(
                      ClientType.Defendant,
                      e?.target?.checked
                    );
                  }}
                  title={intl.formatMessage({ id: "Defendant" })}
                />
                <label className="fs-8 text-primary fa-solid">
                  {intl.formatMessage({ id: "Defendant" })}
                </label>
              </div>
            </div>
          </div>

          {/* Tabs for Switching Views */}
          <div className="col-12 col-sm-3 col-md-6 col-lg-2 my-2 ">
            <div className="">
              <ul className="nav nav-pills mb-2 mb-sm-0 flex-nowrap p-0 justify-content-lg-end">
                <li className="nav-item m-0">
                  <a
                    className="btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary me-3"
                    data-bs-toggle="tab"
                    href="#kt_project_users_card_pane"
                    onClick={() => setActiveCaseView(CARDS)}
                    aria-label="CARDS"
                  >
                    <span className="svg-icon svg-icon-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect
                            x="5"
                            y="5"
                            width="5"
                            height="5"
                            rx="1"
                            fill="currentColor"
                          ></rect>
                          <rect
                            x="14"
                            y="5"
                            width="5"
                            height="5"
                            rx="1"
                            fill="currentColor"
                            opacity="0.3"
                          ></rect>
                          <rect
                            x="5"
                            y="14"
                            width="5"
                            height="5"
                            rx="1"
                            fill="currentColor"
                            opacity="0.3"
                          ></rect>
                          <rect
                            x="14"
                            y="14"
                            width="5"
                            height="5"
                            rx="1"
                            fill="currentColor"
                            opacity="0.3"
                          ></rect>
                        </g>
                      </svg>
                    </span>
                  </a>
                </li>
                <li className="nav-item m-0">
                  <a
                    className="btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary me-3 active"
                    data-bs-toggle="tab"
                    href="#kt_project_users_table_pane"
                    onClick={() => setActiveCaseView(TABLE)}
                    aria-label="TABLE"
                  >
                    <span className="svg-icon svg-icon-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z"
                          fill="currentColor"
                        ></path>
                        <path
                          opacity="0.3"
                          d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mb-3 mt-5">
          {loadingForCauses ? (
            <div className="d-flex gap-4 justify-content-center align-items-center py-4">
              {intl.formatMessage({ id: "DataIsLoaded..." })}
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <>
              {activeCaseView === CARDS ? (
                <CaseViewCards
                  causes={causes}
                  callingData={() => {
                    const params = new URLSearchParams();
                    params.append("pageSize", pageSize.toString());
                    params.append("pageIndex", pageIndex.toString());
                    if (searchTerm) {
                      params.append("searchWord", searchTerm);
                    }
                    clientTypiesFilter.forEach((type) => {
                      params.append("clientTypeFilter", type.toString());
                    });

                    if (filter?.causeNumber) {
                      params.append("CauseNumber", filter?.causeNumber);
                    }
                    if (filter?.subject) {
                      params.append("Subject", filter?.subject);
                    }
                    if (filter?.Lk_StageIds?.length > 0) {
                      filter?.Lk_StageIds?.forEach(
                        (item: any, index: number) => {
                          params.append(`Lk_StageIds[${index}]`, item?.id);
                        }
                      );
                    }
                    if (filter?.LK_CauseCategories) {
                      params.append(
                        "LK_CauseCategories",
                        filter?.LK_CauseCategories
                      );
                    }
                    if (filter?.LitigantIds?.length > 0) {
                      filter?.LitigantIds?.forEach(
                        (ele: any, index: number) => {
                          params.append(`LitigantIds[${index}]`, ele.id);
                        }
                      );
                    }
                    if (filter?.CauseStatus) {
                      params.append("CauseStatus", filter?.CauseStatus);
                    }
                    if (filter?.UserIds?.length > 0) {
                      filter?.UserIds?.forEach((item: any, index: number) => {
                        params.append(`UserIds[${index}]`, item);
                      });
                    }
                    dispatch(fetchAllCauses(params) as any).then((res: any) => {
                      setCauses(res?.payload?.result);
                    });
                  }}
                />
              ) : (
                <CaseViewTable
                  causes={causes}
                  callingData={() => {
                    const params = new URLSearchParams();
                    params.append("pageSize", pageSize.toString());
                    params.append("pageIndex", pageIndex.toString());
                    if (searchTerm) {
                      params.append("searchWord", searchTerm);
                    }
                    clientTypiesFilter.forEach((type) => {
                      params.append("clientTypeFilter", type.toString());
                    });

                    if (filter?.causeNumber) {
                      params.append("CauseNumber", filter?.causeNumber);
                    }
                    if (filter?.subject) {
                      params.append("Subject", filter?.subject);
                    }
                    if (filter?.Lk_StageIds?.length > 0) {
                      filter?.Lk_StageIds?.forEach(
                        (item: any, index: number) => {
                          params.append(`Lk_StageIds[${index}]`, item?.id);
                        }
                      );
                    }
                    if (filter?.LK_CauseCategories) {
                      params.append(
                        "LK_CauseCategories",
                        filter?.LK_CauseCategories
                      );
                    }
                    if (filter?.LitigantIds?.length > 0) {
                      filter?.LitigantIds?.forEach(
                        (ele: any, index: number) => {
                          params.append(`LitigantIds[${index}]`, ele.id);
                        }
                      );
                    }
                    if (filter?.CauseStatus) {
                      params.append("CauseStatus", filter?.CauseStatus);
                    }
                    if (filter?.UserIds?.length > 0) {
                      filter?.UserIds?.forEach((item: any, index: number) => {
                        params.append(`UserIds[${index}]`, item);
                      });
                    }
                    dispatch(fetchAllCauses(params) as any).then((res: any) => {
                      setCauses(res?.payload?.result);
                    });
                  }}
                />
              )}
            </>
          )}
        </div>

        <div className="px-5 mx-5" style={{ margin: "20px 0px" }}>
          {totalPages == 0 ? (
            <>
              {" "}
              {!loadingForCauses && (
                <div className="text-center text-handle  fw-bold">
                  {intl.formatMessage({ id: "NoFoundData" })}
                </div>
              )}
            </>
          ) : (
            <>
              {" "}
              <SystemPagination
                totalPages={totalPages}
                totalItems={totalItems}
                pageIndex={pageIndex}
                pageSize={pageSize}
                setPageIndex={setPageIndex}
                setPageSize={setPageSize}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CasesView;
