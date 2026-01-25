import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import LegalNotesTable from "./LegalNotesTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { fetchAllSessionNotes } from "../../../features/session";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { fetchCauseStageNameByCauseId } from "../../../features/cause-stage";
import Spinner from "react-bootstrap/esm/Spinner";
import { fetchCauseTitles } from "../../../features/causes";
import { fetchAllLKStage } from "../../../features/stage";
import { StageModel } from "../../../models/StageModel";
import Select from "react-select";
import { searchSelectStylesModeStyles } from "@4eplatform/shared/functions/searchSelectStylesModeStyles";

const LegalNotesContent = ({
  pageIndex,
  setPageIndex,
  pageSize,
  setPageSize,
  selectedDegree,
  selectedCase,
  setSelectedCase,
  setSelectedDegree,
  searchTerm,
  setSearchTerm,
}: any) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  let sessionNotes = useSelector((state: RootState) => {
    return state?.session?.sessionNotes;
  });
  let loadingForSessionNotes = useSelector((state: RootState) => {
    return state?.session?.loadingForSessionNotes;
  });
  const totalItems = useSelector((state: RootState) => {
    return state?.session?.pagination?.totalItems;
  });
  const totalPages = useSelector((state: RootState) => {
    return state?.session?.pagination?.totalPages;
  });

  let cases = useSelector((state: RootState) => state?.causesData?.causeTitles);
  let [lkStages, setLkStages] = useState<any[]>([]);
  let fetchLkStages = async () => {
    await dispatch(fetchAllLKStage({}) as any).then((res) => {
      setLkStages(
        res?.payload?.result?.map((item: StageModel) => {
          return {
            lk_StageId: item?.id,
            lk_StageNameAr: item?.nameAr,
            lk_StageNameEn: item?.nameEn,
          };
        })
      );
    });
  };

  useEffect(() => {
    dispatch(fetchCauseTitles({}) as any);
  }, []);
  const prevSearchTermRef = useRef<string | undefined>();
  const prevCauseTermRef = useRef<string | undefined>();
  const prevDegreeTermRef = useRef<string | undefined>();

  useEffect(() => {
    if (prevSearchTermRef.current !== searchTerm) {
      setPageIndex(1);
    }
    prevSearchTermRef.current = searchTerm;
  }, [searchTerm]);
  useEffect(() => {
    if (prevCauseTermRef.current !== selectedCase?.value) {
      setPageIndex(1);
    }
    prevCauseTermRef.current = selectedCase?.value;
  }, [selectedCase?.value]);
  useEffect(() => {
    if (prevDegreeTermRef.current !== selectedDegree?.value) {
      setPageIndex(1);
    }
    prevDegreeTermRef.current = selectedDegree?.value;
  }, [selectedDegree?.value]);

  useEffect(() => {
    if (selectedCase?.value) {
      dispatch(fetchCauseStageNameByCauseId(selectedCase?.value) as any).then(
        (res) => {
          setLkStages(res?.payload?.result);
        }
      );
    } else {
      fetchLkStages();
    }
  }, [selectedCase?.value]);
  useEffect(() => {
    dispatch(
      fetchAllSessionNotes({
        ...(searchTerm && {
          search: searchTerm,
        }),
        pageNumber: pageIndex,
        pageSize,
        ...(selectedDegree?.value && {
          lK_Stage: selectedDegree?.value,
        }),
        ...(selectedCase?.value && {
          cuaseid: selectedCase?.value,
        }),
      }) as any
    );
  }, [searchTerm, selectedCase?.value, selectedDegree?.value, pageIndex, pageSize]);
  const caseOptions = cases?.map((option) => ({
    value: option?.id,
    label: option?.title,
  }));
  const lkStageOptions = lkStages?.map((option) => ({
    value: option?.lk_StageId,
    label:
      intl.locale == "ar" ? option?.lk_StageNameAr : option?.lk_StageNameEn,
  }));
  let isDarkMode = localStorage.getItem("Theme") == "dark" ? true : false;

  return (
    <>
      <div className="container table-dark card card-xl-stretch mb-xl-8 p-7 mt-5">
        <div className="row d-flex flex-column flex-md-row card-header align-items-center justify-content-between">
          <div className="col-md-6 col-lg-3 col-sm-12 my-3 px-8">
            <div className="d-flex flex-column">
              <h1 className="card-title fs-2 fw-bold">
                {intl.formatMessage({ id: "LitigationNotes" })}
              </h1>
              <h1 className="fw-semibold fs-6 text-muted">
                {intl.formatMessage({ id: "ViewAllLitigationNotes" })}
              </h1>
            </div>
          </div>
          <div className="col-md-12 col-lg-9 col-sm-12 my-3 px-8">
            <div className="row justify-content-end  ">
              <div className="col-12 col-lg-6 col-md-12 my-1">
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
              <div className="col-12 col-lg-3 col-md-12 my-1 select-menu-dark-fix">
                <Select
                  id="Case"
                  className="react-select__container"
                  
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
                    const shortLabel = label.length > 3 ? `${label.slice(0, 15)}...` : label;

                    return <span title={label}>{shortLabel}</span>;
                  }}
                />
              </div>

              <div className="col-md-12 col-lg-3 col-sm-12 my-1 select-menu-dark-fix">
                <Select
                  id="Case"
                  className="react-select__container"
                  
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
                    const shortLabel = label.length > 3 ? `${label.slice(0, 15)}...` : label;

                    return <span title={label}>{shortLabel}</span>;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row card-body">
          {loadingForSessionNotes ? (
            <div className="d-flex gap-4 justify-content-center align-items-center py-4">
              {intl.formatMessage({ id: "DataIsLoaded..." })}
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <>
              {" "}
              <LegalNotesTable
                sessionNotes={sessionNotes}
                {...{
                  pageIndex,
                  setPageIndex,
                  pageSize,
                  setPageSize,
                  selectedDegree,
                  selectedCase,
                  setSelectedCase,
                  setSelectedDegree,
                  searchTerm,
                  setSearchTerm,
                }}
              />
              {totalPages == 0 ? (
                <>
                  {" "}
                  <div className="text-center fw-bold">
                    {intl.formatMessage({ id: "NoFoundData" })}
                  </div>
                </>
              ) : (
                <>
                  {/* {selectedCase == "" &&
                  selectedDegree == "" &&
                  searchTerm == "" ? ( */}
                  <SystemPagination
                    totalPages={totalPages}
                    totalItems={totalItems}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    setPageIndex={setPageIndex}
                    setPageSize={setPageSize}
                  />
                  {/* ) : (
                    <></>
                  )} */}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LegalNotesContent;
