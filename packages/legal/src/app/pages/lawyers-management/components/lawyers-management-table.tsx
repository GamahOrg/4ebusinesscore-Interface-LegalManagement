import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import LegalAdministrationLawyers from "./LegalAdministrationLawyers";
import Opponentslawyers from "./Opponentslawyers";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchAllLawyers } from "../../../features/lawyer";
import {
  GetAllLawyerStatus,
  GetAllLawyerType,
  LitigantStatus,
} from "../../../models/LegalEnums";

type ButtonTypes = {
  id: number;
  name: string;
};

function LawyersManagementTable() {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const [activeButtonId, setActiveButtonId] = useState<number>(1);
  const [litigantStatus, setLitigantStatus] = useState<number | null>(LitigantStatus.Client);
  const [lawyerType, setLawyerType] = useState<number | any>(GetAllLawyerType.Internal);
  const [lawyerStatus, setLawyerStatus] = useState<number | any>(GetAllLawyerStatus.Both);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const { lawyers, loadingForLawyers } = useAppSelector((state) => state?.lawyer);
  const { totalPages, totalItems } = useAppSelector((state) => state?.lawyer?.lawyersPagination);

  
  const reloadTableData = () => {
    const params = {
      pageNumber: pageIndex,
      pageSize: pageSize,
      litigantStatus: litigantStatus,
      lawyerTypeDto: lawyerType,
      lawyerStateDto: lawyerStatus,
      ...(searchQuery && { search: searchQuery }),
    };
    dispatch(fetchAllLawyers(params));
  };

  const buttons: ButtonTypes[] = [
    { id: 1, name: "LegalAdministrationLawyers" },
    // { id: 2, name: "Opponentslawyers" },
  ];
  
  const [activeButton, setActiveButton] = useState<ButtonTypes>(buttons[0]);

  useEffect(() => {
    const params = {
      pageNumber: pageIndex,
      pageSize: pageSize,
      litigantStatus: litigantStatus,
      lawyerTypeDto: lawyerType,
      lawyerStateDto: lawyerStatus,
      ...(searchQuery && { search: searchQuery }),
    };
    dispatch(fetchAllLawyers(params));
  }, [pageIndex, pageSize, litigantStatus, lawyerType, lawyerStatus, searchQuery, dispatch]);

  useEffect(() => {
    setLitigantStatus(activeButton.id === 1 ? LitigantStatus.Client: LitigantStatus.Opponent);
    setLawyerType(GetAllLawyerType.Internal);
    setLawyerStatus(GetAllLawyerStatus.Both);
    setPageIndex(1);
    setPageSize(10);
    setSearchQuery("");
  }, [activeButton.id]);

  const handleButtonClick = (button: ButtonTypes) => {
    setActiveButton(button);
    setActiveButtonId(button.id);
  };

  const ActivatedUserDetailsTab = () => {
    const Component = activeButton.id === 1 ? LegalAdministrationLawyers : Opponentslawyers;

    return (
      <Component
        lawyers={lawyers}
        lawyerType={lawyerType}
        lawyerStatus={lawyerStatus}
        setLawyerType={setLawyerType}
        setLawyerStatus={setLawyerStatus}
        setSearchQuery={setSearchQuery}
        setPageIndex={setPageIndex}
        pageIndex={pageIndex}
        pageSize={pageSize}
        loadingForLawyers={loadingForLawyers}
        searchQuery={searchQuery}
        litigantStatus = {litigantStatus}
        onReloadTable={reloadTableData}
      />
    );
  };

  return (
    <div className="container table-dark card">
      <div className="grid row mt-10 mb-4">
        <div className="d-flex my-5 flex-wrap justify-content-between align-items-center">
          <div className="col-12 col-sm-7 col-md-6">
            <div className="d-flex flex-column">
              <h1 className="text-right">
                <span className="fs-2 mb-1">
                  {intl.formatMessage({ id: "LawyersManagement" })}
                </span>
              </h1>
              <h1 className="card-title">
                <span className="fw-semibold fs-6 text-muted">
                  {intl.formatMessage({ id: "ViewAllLaywersManagement" })}
                </span>
              </h1>
            </div>
          </div>
        </div>

        <div>
          <div className="d-flex">
            <div className="pb-0 w-100 d-flex gap-6 mb-5 border-bottom border-bottom-2">
              {buttons.map((button) => (
                <button
                  key={button.id}
                  className={`btn btn-active-color-primary rounded-0 bg-transparent border-0 p-5 fs-6 fw-bolder border border-bottom border-white border-2 ${
                    activeButton.id === button.id ? "active text-dark" : "text-muted"
                  } rounded-0 px-0 fw-bolder`}
                  onClick={() => handleButtonClick(button)}
                >
                  {intl.formatMessage({ id: button.name })}
                </button>
              ))}
            </div>
          </div>
          {ActivatedUserDetailsTab()}
        </div>

        <div className="px-5 mx-5" style={{ margin: "20px 0px" }}>
          <SystemPagination
            totalPages={totalPages}
            totalItems={totalItems}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPageIndex={setPageIndex}
            setPageSize={setPageSize}
          />
        </div>
      </div>
    </div>
  );
}

export default LawyersManagementTable;