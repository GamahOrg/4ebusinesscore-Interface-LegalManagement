import { FC, useEffect, useRef } from "react";
import ReusableTable from "./SharedTable";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { getStyleByStatus } from "@4eplatform/shared/functions/getStyleByStatus";
import OpponentslawyersActions from "./OpponentslawyersActions";
import { LawyerModel } from "../../../models/LawyerModel";
import {
  GetAllLawyerStatus,
  GetAllLawyerType,
} from "../../../models/LegalEnums";
import Spinner from "react-bootstrap/esm/Spinner";

interface OpponentslawyersProps {
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
}

const Opponentslawyers: FC<OpponentslawyersProps> = ({
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
}) => {
  const intl = useIntl();
  const navigate = useNavigate();

  // Refs لتتبع القيم السابقة
  const prevSearchQueryRef = useRef<string>();
  const prevLawyerTypeRef = useRef<number | null>();
  const prevLawyerStatusRef = useRef<number | null>();

  // إعادة تعيين الصفحة عند تغيير معايير البحث
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
    intl.formatMessage({ id: "Count" }),
    intl.formatMessage({ id: "NumberOfCasesInvolved" }),
    // intl.formatMessage({ id: "Procedures" }),
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

  const tableRows = lawyers?.map((item) => ({
    ...item,
    procedures: <OpponentslawyersActions item={item} />,
  }));

  return (
    <div>
      <div className="row d-flex align-items-center">
        <div className="d-flex col-12 align-items-center position-relative my-3">
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
      </div>
      {loadingForLawyers ? (
        <div className="d-flex gap-4 justify-content-center align-items-center py-4">
          {intl.formatMessage({ id: "DataIsLoaded..." })}
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <ReusableTable
          headers={headers}
          data={tableRows}
          handleNavigate={handleNavigate}
          getStyleByStatus={getStyleByStatus}
          Actions={<OpponentslawyersActions />}
          actionsHeader={intl.formatMessage({ id: "Procedures" })}
          openentsLawyer={true}
        />
      )}
    </div>
  );
};

export default Opponentslawyers;
