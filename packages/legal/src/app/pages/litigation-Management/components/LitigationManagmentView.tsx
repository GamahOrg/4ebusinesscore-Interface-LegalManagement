import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { lazy, useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import Select from "react-select";
import { searchSelectStylesModeStyles } from "@4eplatform/shared/functions/searchSelectStylesModeStyles";

import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../store/store";
import {
  fetchAllCauseStages,
  fetchCauseStageNameByCauseId,
} from "../../../features/cause-stage";
import { useSelector } from "react-redux";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import Spinner from "react-bootstrap/esm/Spinner";
import { StageModel } from "../../../models/StageModel";
import { fetchAllLKStage } from "../../../features/stage";
const LitigationManagementTable = lazy(
  () => import("./LitigationManagementTable")
);

function LitigationManagementView({
  pageIndex,
  setPageIndex,
  searchTerm,
  setSearchTerm,
  selectedCase,
  setSelectedCase,
  selectedDegree,
  setSelectedDegree,
  pageSize,
  setPageSize,
}: any) {
  const intl = useIntl();
  let cases = useSelector((state: RootState) => state?.causesData?.causeTitles);
  let isDarkMode = localStorage.getItem("Theme") == "dark" ? true : false;

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
  let dispatch = useAppDispatch();
  let [lkStages, setLkStages] = useState<any[]>([]);

  const { causeStages, loadingForCauseStages } = useAppSelector(
    (state) => state.causeStages
  );

  const { totalItems, totalPages } = useAppSelector(
    (state) => state.causeStages?.pagination
  );
  const prevSearchTermRef = useRef<any>();
  const prevCauseTermRef = useRef<any>();
  const prevDegreeTermRef = useRef<any>();

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
    dispatch(
      fetchAllCauseStages({
        ...(searchTerm && { searchWord: searchTerm }),
        pagesize: pageSize,
        pageIndex: pageIndex,
        ...(selectedCase?.value && { causeId: selectedCase?.value }),
        ...(selectedDegree?.value && { lK_StageId: selectedDegree?.value }),
      }) as any
    );
  }, [
    searchTerm,
    selectedCase?.value,
    selectedDegree?.value,
    pageSize,
    pageIndex,
    dispatch,
  ]);

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
  }, [selectedCase?.value, dispatch]);
  const caseOptions = cases?.map((option) => ({
    value: option?.id,
    label: option?.title,
  }));
  const lkStageOptions = lkStages?.map((option) => ({
    value: option?.lk_StageId,
    label:
      intl.locale == "ar" ? option?.lk_StageNameAr : option?.lk_StageNameEn,
  }));
  return (
    <>
      <div className="container card table-dark card-xl-stretch mb-xl-8">
        <div className="d-flex align-items-center mt-8 mb-6 row">
          <div className="d-flex flex-column col-12 col-sm-12 col-md-3 col-lg-3">
            <h1 className="">
              <span className="fs-2 mt-3 mb-1">
                {intl.formatMessage({ id: "LitigationManagement" })}
              </span>
            </h1>
            <h1 className="card-title">
              <span className="fw-semibold fs-6 text-muted">
                {intl.formatMessage({ id: "ViewAllCases" })}
              </span>
            </h1>
          </div>
          <div className="col-md-12 col-lg-9">
            <div className="row gx-5 gy-3 w-100 justify-content-end">
              <div className="col-md-12 col-lg-6 col-sm-12 my-3">
                <div className="d-flex align-items-center position-relative">
                  <span className="svg-icon svg-icon-1 position-absolute text-muted mx-3">
                    <KTSVG path="/media/icons/duotune/general/gen114_search.svg" />
                  </span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                    className="form-control form-control-solid px-11"
                    placeholder={intl.formatMessage({ id: "Search" })}
                  />
                </div>
              </div>
              <div className="col-md-12 col-lg-3 col-sm-12 my-3">
                <Select
                  id="Case"
                  className="react-select__container bg-light select-menu-dark-fix"
                
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
              <div className="col-md-12 col-lg-3 col-sm-12 my-3 select-menu-dark-fix">
                <Select
                  id="Case"
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
                    const shortLabel = label.length > 3 ? `${label.slice(0, 15)}...` : label;

                    return <span title={label}>{shortLabel}</span>;
                  }} 
                />
              </div>
            </div>
          </div>
        </div>

        {loadingForCauseStages ? (
          <div className="d-flex gap-4 justify-content-center align-items-center py-4">
            {intl.formatMessage({ id: "DataIsLoaded..." })}
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            <div className="mb-3 mt-5">
              <LitigationManagementTable causeStages={causeStages} />
            </div>

            <div className="px-5 mx-5" style={{ margin: "20px 0px" }}>
              {totalPages == 0 ? (
                <>
                  {" "}
                  <div className="text-center fw-bold">
                    {intl.formatMessage({ id: "NoFoundData" })}
                  </div>
                </>
              ) : (
                <>
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
          </>
        )}
      </div>
    </>
  );
}

export default LitigationManagementView;
