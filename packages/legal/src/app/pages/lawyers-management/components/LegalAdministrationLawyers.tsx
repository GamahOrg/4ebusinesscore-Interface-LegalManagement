import { FC, useEffect, useRef } from "react";
import ReusableTable from "./SharedTable";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import LayersManagmentActions from "./layers-managment-actions";
import { getStyleByStatus } from "@4eplatform/shared/functions/getStyleByStatus";
import { LawyerModel } from "../../../models/LawyerModel";
import {
  GetAllLawyerStatus,
  GetAllLawyerType,
} from "../../../models/LegalEnums";
import Spinner from "react-bootstrap/esm/Spinner";

interface LegalAdminProps {
  lawyers: LawyerModel[];
  lawyerStatus: number | null;
  lawyerType: number | null;
  setLawyerType: React.Dispatch<React.SetStateAction<number | null>>;
  setLawyerStatus: React.Dispatch<React.SetStateAction<number | null>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setPageIndex?: React.Dispatch<React.SetStateAction<number>>;
  pageSize?: number;
  pageIndex?: number;
  loadingForLawyers?: boolean;
  searchQuery?: string;
  litigantStatus?: any;
  onReloadTable?: () => void; 
}

const LegalAdministrationLawyers: FC<LegalAdminProps> = ({
  lawyers = [],
  lawyerStatus = null,
  lawyerType = null,
  setLawyerType,
  setLawyerStatus,
  setSearchQuery,
  setPageIndex = () => {},
  pageSize = 10,
  pageIndex = 1,
  loadingForLawyers = false,
  searchQuery = "",
  litigantStatus,
  onReloadTable,
}) => {
  const intl = useIntl();
  const navigate = useNavigate();

  const prevSearchQueryRef = useRef<string>();
  const prevLawyerTypeRef = useRef<number | null>();
  const prevLawyerStatusRef = useRef<number | null>();

  useEffect(() => {
    if (prevSearchQueryRef.current !== searchQuery && setPageIndex) {
      setPageIndex(1);
    }
    prevSearchQueryRef.current = searchQuery;
  }, [searchQuery, setPageIndex]);

  useEffect(() => {
    if (prevLawyerTypeRef.current !== lawyerType && setPageIndex) {
      setPageIndex(1);
    }
    prevLawyerTypeRef.current = lawyerType;
  }, [lawyerType, setPageIndex]);

  useEffect(() => {
    if (prevLawyerStatusRef.current !== lawyerStatus && setPageIndex) {
      setPageIndex(1);
    }
    prevLawyerStatusRef.current = lawyerStatus;
  }, [lawyerStatus, setPageIndex]);

  const headers = [
    intl.formatMessage({ id: "IDNumber1" }),
    intl.formatMessage({ id: "Name" }),
    intl.formatMessage({ id: "PhoneNumber" }),
    // intl.formatMessage({ id: "Count" }),
    intl.formatMessage({ id: "NumberOfCasesAssigned" }),
    intl.formatMessage({ id: "nextSesionDate" }),
    intl.formatMessage({ id: "Status" }),
  ];

  const handleLawyerTypeChange = (type: number, isChecked: boolean) => {
    if (isChecked) {
      setLawyerType((prev) =>
        prev === GetAllLawyerType.IsBoth
          ? type
          : prev === null
          ? type
          : GetAllLawyerType.IsBoth
      );
    } else {
      setLawyerType((prev) =>
        prev === GetAllLawyerType.IsBoth
          ? type === GetAllLawyerType.Internal
            ? GetAllLawyerType.External
            : GetAllLawyerType.Internal
          : null
      );
    }
  };

  const handleLawyerStatusChange = (type: number, isChecked: boolean) => {
    if (isChecked) {
      setLawyerStatus((prev) =>
        prev === GetAllLawyerStatus.Both
          ? type
          : prev === null
          ? type
          : GetAllLawyerStatus.Both
      );
    } else {
      setLawyerStatus((prev) =>
        prev === GetAllLawyerStatus.Both
          ? type === GetAllLawyerStatus.Active
            ? GetAllLawyerStatus.Banned
            : GetAllLawyerStatus.Active
          : null
      );
    }
  };

  const handleNavigate = (item: any) => {
    navigate(`/cases-view/list-of-cases/${item?.id}`, {
      state: { item: item },
    });
  };

  return (
    <div>
      <div className="row d-flex align-items-center justify-content-between">
        <div className="d-flex col-md-6 align-items-center position-relative my-3">
          <span className="svg-icon svg-icon-1 position-absolute text-muted mx-3">
            <KTSVG path="/media/icons/duotune/general/gen114_search.svg" />
          </span>
          <input
            type="text"
            data-kt-filemanager-table-filter="search"
            className="form-control form-control-solid px-11"
            placeholder={intl.formatMessage({ id: "Search" })}
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        </div>
        {/* <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-2">
          <div className="bg-gray-100 px-3 py-4 w-100 rounded-2 d-flex align-items-center gap-8">
            <div className="d-flex align-items-center gap-2">
              <input
                className="form-check-input w-20px h-20px"
                name="LInternal"
                type="checkbox"
                checked={
                  lawyerType === GetAllLawyerType.Internal ||
                  lawyerType === GetAllLawyerType.IsBoth
                }
                onChange={(e) =>
                  handleLawyerTypeChange(
                    GetAllLawyerType.Internal,
                    e.target.checked
                  )
                }
              />
              <label className="fs-7">
                {intl.formatMessage({ id: "Internal" })}
              </label>
            </div>
            <div className="d-flex align-items-center gap-2">
              <input
                className="form-check-input w-20px h-20px"
                name="LExternal"
                type="checkbox"
                checked={
                  lawyerType === GetAllLawyerType.External ||
                  lawyerType === GetAllLawyerType.IsBoth
                }
                onChange={(e) =>
                  handleLawyerTypeChange(
                    GetAllLawyerType.External,
                    e.target.checked
                  )
                }
              />
              <label className="fs-7">
                {intl.formatMessage({ id: "External" })}
              </label>
            </div>
          </div>
        </div> */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-2">
          <div className="bg-gray-100 px-3 py-4 w-100 rounded-2 d-flex align-items-center gap-8">
            <div className="d-flex align-items-center">
              <input
                className="form-check-input w-20px h-20px"
                name="LACTIVE"
                type="checkbox"
                checked={
                  lawyerStatus === GetAllLawyerStatus.Active ||
                  lawyerStatus === GetAllLawyerStatus.Both
                }
                onChange={(e) =>
                  handleLawyerStatusChange(
                    GetAllLawyerStatus.Active,
                    e.target.checked
                  )
                }
              />
              <label className="fs-7 mx-3  text-primary fa-solid">
                {intl.formatMessage({ id: "ACTIVE" })}
              </label>
            </div>
            <div className="d-flex align-items-center gap-2">
              <input
                className="form-check-input w-20px h-20px"
                name="LForbidden"
                type="checkbox"
                checked={
                  lawyerStatus === GetAllLawyerStatus.Banned ||
                  lawyerStatus === GetAllLawyerStatus.Both
                }
                onChange={(e) =>
                  handleLawyerStatusChange(
                    GetAllLawyerStatus.Banned,
                    e.target.checked
                  )
                }
              />
              <label className="fs-7 mx-3 text-primary fa-solid">
                {intl.formatMessage({ id: "Forbidden" })}
              </label>
            </div>
          </div>
        </div>
      </div>
      {loadingForLawyers ? (
        <div className="d-flex gap-4 justify-content-center align-items-center py-4">
          {intl.formatMessage({ id: "DataIsLoaded..." })}
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <ReusableTable
          headers={headers}
          data={lawyers}
          handleNavigate={handleNavigate}
          getStyleByStatus={getStyleByStatus}
          Actions={<LayersManagmentActions />}
          actionsHeader={intl.formatMessage({ id: "Procedures" })}
          LayersManagment={true}
          pageSize={pageSize}
          pageIndex={pageIndex}
          searchQuery={searchQuery}
          litigantStatus={litigantStatus}
          lawyerStatus={lawyerStatus}
          lawyerType={lawyerType}
          onReloadTable={onReloadTable}
        />
      )}
    </div>
  );
};

export default LegalAdministrationLawyers;
