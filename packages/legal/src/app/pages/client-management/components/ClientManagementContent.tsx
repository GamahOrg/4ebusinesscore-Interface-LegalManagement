import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { useIntl } from "react-intl";
import ClientManagementTable from "./ClientManagementTable";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useEffect, useRef, useState } from "react";
import { getLitigantConsume } from "../../../features/litigant-consume";
import { ClientType, LitigationStatus } from "../../../models/LegalEnums";
import Spinner from "react-bootstrap/esm/Spinner";
import  {FC}from "react";




interface ClientManagementContent {
  pageIndex?:number;
  pageSize?:number;
  setPageIndex?:any;
  setPageSize?:any;
  searchQuery?:any;
  setSearchQuery?:any;
  selectedClientTypes?:any;
  setSelectedClientTypes?:any;
  clientType?:any;
  setClientType?:any;
}

const ClientManagementContent : FC<ClientManagementContent> = ({
  pageIndex ,
   pageSize ,
  setPageIndex,
  setPageSize,
  searchQuery,
  setSearchQuery,
  selectedClientTypes,
  setSelectedClientTypes,
  clientType,
  setClientType,
}) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const handleClientypeChange = (type: number, checked: boolean) => {
    let updatedTypes = [...selectedClientTypes];
  
    if (checked) {
      if (!updatedTypes.includes(type)) {
        updatedTypes.push(type);
      }
    } else {
      updatedTypes = updatedTypes.filter(t => t !== type);
    }
  
    setSelectedClientTypes(updatedTypes);
  
    if (updatedTypes.length === 2 || updatedTypes.length === 0) {
      setClientType(null); 
    } else {
      setClientType(updatedTypes[0]); 
    }
  };

  const { litigantConsume: clientsData, loadingForClients } = useAppSelector(
    (state) => {
      return state?.libability;
    }
  );
  const { totalPages, totalItems } = useAppSelector((state) => {
    return state?.libability?.pagination;
  });
    const prevSearchTermRef = useRef<string | undefined>();
    const prevClientTermRef = useRef<number | undefined>();
  
    useEffect(() => {
      if (prevSearchTermRef.current !== searchQuery) {
        setPageIndex(1);
      }
      prevSearchTermRef.current = searchQuery;
    }, [searchQuery]);

    useEffect(() => {
      if (prevClientTermRef.current !== clientType) {
        setPageIndex(1);
      }
    }, [clientType]);

  useEffect(() => {
    const params = {
      status: LitigationStatus.Client,
      pageIndex: pageIndex,
       IgnoreAccessCheck: false,
      pageSize: pageSize,
      ClientType: clientType,
      ...(searchQuery ? { name: searchQuery } : {}),
    };

    dispatch(getLitigantConsume(params) as any);
  }, [pageIndex, pageSize, searchQuery, clientType]);

 

  return (
    <>
      <div className="container card table-dark card-xl-stretch mb-xl-8 pb-8">
        <div className="d-flex flex-stack flex-md-nowrap flex-wrap mt-10 mb-4 py-2">
          <div className="d-flex flex-column">
            <h1 className="text-right">
              <span className="fs-2 mt-3 mb-1">
                {intl.formatMessage({ id: "ClientManagement" })}
              </span>
            </h1>
            <h1 className="card-title">
              <span className="fw-semibold fs-6 text-muted">
                {intl.formatMessage({
                  id: "ViewAllClientManagement",
                })}
              </span>
            </h1>
          </div>

          <div className="d-flex flex-sm-nowrap flex-wrap gap-4 mt-md-0 mt-4">
            <div className="d-flex align-items-center position-relative w-100">
              <span className="svg-icon svg-icon-2 position-absolute text-muted mx-6">
                <i className="bi bi-search fs-3 text-gray-500"></i>
              </span>
              <input
                type="text"
                data-kt-filemanager-table-filter="search"
                className="form-control form-control-solid px-14 searchBorder"
                placeholder={intl.formatMessage({ id: "Search" })}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="bg-gray-200 px-6 py-4 rounded d-flex align-items-center gap-6 w-100">
              <div className="d-flex align-items-center gap-2">
                <input
                  className="form-check-input w-20px h-20px"
                  type="checkbox"
                  onChange={(e) =>
                    {
                      handleClientypeChange(
                        ClientType.Plaintiff,
                        e.target.checked
                      )
                    }

                    }
                    checked={selectedClientTypes?.includes(ClientType.Plaintiff)}
                />
                <label className="fs-7 me-3 text-primary fa-solid">
                  {intl.formatMessage({ id: "Plaintiff" })}
                </label>
              </div>
              <div className="d-flex align-items-center gap-2">
                <input
                  className="form-check-input w-20px h-20px"
                  type="checkbox"
                  onChange={(e) =>
                    {
                      handleClientypeChange(
                        ClientType.Defendant,
                        e.target.checked
                      )
                    }
                    }
                    checked={selectedClientTypes.includes(ClientType.Defendant)}
                />
                <label className="fs-7 me-3 text-primary fa-solid">
                  {intl.formatMessage({ id: "Defendant" })}
                </label>
              </div>
            </div>
          </div>
        </div>

        {loadingForClients ? (
          <div className="d-flex gap-4 justify-content-center align-items-center py-4">
            {intl.formatMessage({ id: "DataIsLoaded..." })}
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            {" "}
            <div className="mb-3 mt-5">
              <ClientManagementTable 
              clientsData={clientsData}
              pageIndex={pageIndex}
              pageSize={pageSize}
              clientType = {clientType}
              searchQuery = {searchQuery}
               />
            </div>
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
          </>
        )}
      </div>
    </>
  );
}

export default ClientManagementContent;
