import ViewCasesInTable from "@4eplatform/shared/src/components/ViewCasesInTable";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";
import OpponentslawyersActions from "./OpponentslawyersActions";
import LayersManagmentActions from "./layers-managment-actions";
import moment from "moment";
import "moment/locale/ar";

type DataItem = {
  [key: string]: any;
};

type ReusableTableProps = {
  headers: string[];
  data: DataItem[];
  handleNavigate: (item: DataItem) => void;
  getStyleByStatus: (status: number) => string;
  Actions?: React.ReactNode;
  actionsHeader?: string;
  openentsLawyer?: boolean;
  LayersManagment?: boolean;
  pageIndex?: number;
  pageSize?: number;
  searchQuery?: string;
  litigantStatus?: number;
  lawyerStatus: any;
  lawyerType: any;
  onReloadTable?: () => void;
};

const ReusableTable: React.FC<ReusableTableProps> = ({
  headers,
  data,
  handleNavigate,
  getStyleByStatus,
  Actions,
  actionsHeader,
  openentsLawyer,
  LayersManagment,
  pageIndex = 0,
  pageSize = 10,
  searchQuery,
  litigantStatus,
  lawyerStatus,
  lawyerType,
  onReloadTable,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState<any>("");
  const [lawyerName, setLawyerName] = useState<any>("");
  const [isLawyerInternal, setIsLawyerInternal] = useState<any>("");
  const intl = useIntl();
  let location = useLocation();
  moment.locale("en");

  return (
    <div className="table-responsive mb-3">
      <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4 text-center">
        <thead>
          <tr className="fw-bolder projectSecColor">
            {headers.map((header, index) => (
              <th
                key={index}
                className="Case-Table-Head px-2 pb-3 min-w-50px max-w-350px"
              >
                {header}
              </th>
            ))}
            {Actions && (
              <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-350px">
                {actionsHeader || "Procedures"}{" "}
                {/* Default title if actionsHeader is not passed */}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.map((item, idx) => (
              <tr key={item?.id}>
                {item?.id && (
                  <td className="Case-Table-Content">
                    {location.pathname?.includes("lawyers-managment") ? (
                      <div className="case-Menu-link px-3 mb-2 text-muted">
                        <h6 className="text-muted">{idx + 1}</h6>
                      </div>
                    ) : (
                      <div
                        onClick={() => handleNavigate(item)}
                        className="case-Menu-link px-3 mb-2 text-muted cursor-pointer"
                      >
                        <h6 className="text-primary">{item?.id}</h6>
                      </div>
                    )}
                  </td>
                )}
                {location.pathname.includes("lawyers-managment") && (
                  <td className="Case-Table-Content d-flex justify-content-center align-items-center">
                    <div
                      // onClick={() => handleNavigate(item)}
                      className="d-flex px-3 mb-2 text-muted"
                    >
                      <p className="text-muted mb-0 ">
                        <i className="fa-solid fa-circle-user mx-3 text-primary fs-2"></i>
                        <span className="">
                          {item?.lawyerName ? item?.lawyerName : "----"}
                        </span>
                      </p>
                    </div>
                  </td>
                )}
                <td>
                  <span className="Case-Table-Span fs-7 py-1 px-4 text-center rounded-3">
                    {item?.phone ? item?.phone : "-"}
                  </span>
                </td>
                {/*                 
                <td>
                  <span
                    className={`Case-Table-Span fw-bolder d-flex justify-content-center align-items-center gap-4 fs-7 rounded-2 px-4 py-1`}
                  >
                    {item?.lawyerType ? (
                      <>
                        {location.pathname.includes("lawyers-managment") &&
                        item?.lawyerType == 2 ? (
                          <i className="bi bi-building text-primary fs-2"></i>
                        ) : (
                          <i className="fa-solid fa-circle-user text-primary fs-2"></i>
                        )}
                        {item?.lawyerType === 2
                          ? intl.formatMessage({ id: "Office" })
                          : intl.formatMessage({ id: "One" })}
                      </>
                    ) : (
                      "-"
                    )}
                  </span>
                </td>
                {LayersManagment && (
                  <td>
                    <span
                      className={`Case-Table-Span fw-bolder py-3 mb-1 fs-7 rounded-3 px-4 py-1`}
                    >
                      {item?.isInternal === true
                        ? intl.formatMessage({ id: "InternalB" })
                        : intl.formatMessage({ id: "ExternalB" })}
                    </span>
                  </td>
                )} */}

                {(item?.causeCount || item?.causeCount === 0) && (
                  <td className="Case-Table-Content">
                    <div className="d-flex justify-content-center">
                      <span
                        className={`rounded-circle bg-light-primary text-primary w-35px h-35px d-flex
                      justify-content-center align-items-center ${
                        item?.causeCount === 0 ? "" : "cursor-pointer"
                      }`}
                        onClick={() => {
                          setShowModal(item?.causeCount === 0 ? false : true);
                          setSelectedId(item?.id);
                          setSelectedUserId(item?.userId);
                          setLawyerName(item?.lawyerName);
                          setIsLawyerInternal(item?.isInternal);
                        }}
                      >
                        {item?.causeCount === 0
                          ? item?.causeCount
                          : item?.causeCount + "+"}
                      </span>
                    </div>
                  </td>
                )}
                {/* {(item?.lawyerStatus || item?.lawyerStatus === 0) &&
                  LayersManagment && (
                    <td className="Case-Table-Content">
                      <p
                        className={`bg-${getStyleByStatus(
                          item?.lawyerStatus === 2 ? 2 : item?.lawyerStatus
                        )} py-2 rounded badge-${getStyleByStatus(
                          item?.lawyerStatus === 2 ? 2 : item?.lawyerStatus
                        )}`}
                      >
                        {item?.lawyerStatus === 1
                          ? intl.formatMessage({ id: "ACTIVE" })
                          : intl.formatMessage({ id: "Forbidden" })}
                      </p>
                    </td>
                  )} */}
                <td className="Case-Table-Content">
                  <p className={` py-2 rounded text-center`} dir="ltr">
                    {item?.nextSesionDate
                      ? moment(item?.nextSesionDate).format("DD MMM YYYY")
                      : "-"}
                  </p>
                </td>

                {item?.lawyerStatus === 1 || item?.lawyerStatus === 2 ? (
                  <td className="Case-Table-Content">
                    <p
                      className={`bg-${getStyleByStatus(
                        item?.lawyerStatus
                      )} py-2 rounded badge-${getStyleByStatus(
                        item?.lawyerStatus
                      )}`}
                    >
                      {item?.lawyerStatus === 1
                        ? intl.formatMessage({ id: "ACTIVE" })
                        : intl.formatMessage({ id: "Forbidden" })}
                    </p>
                  </td>
                ) : (
                  <td className="Case-Table-Content">
                    <p className="py-2 rounded">--------</p>
                  </td>
                )}

                {Actions && (
                  <td className="text-center">
                    {openentsLawyer && (
                      <OpponentslawyersActions
                        id={item?.id}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                      />
                    )}
                    {LayersManagment && (
                      <LayersManagmentActions
                        id={item?.id}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        searchQuery={searchQuery}
                        litigantStatus={litigantStatus}
                        lawyerStatus={lawyerStatus}
                        lawyerType={lawyerType}
                      />
                    )}
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
      {showModal && (
        <ViewCasesInTable
          show={showModal}
          handleClose={() => {
            setShowModal(false);
          }}
          id={selectedId}
          selectedUserId={selectedUserId}
          lawyerName={lawyerName}
          isLawyerInternal={isLawyerInternal}
          isLawyers={true}
          onReloadTable={onReloadTable}
        />
      )}
    </div>
  );
};

export default ReusableTable;
