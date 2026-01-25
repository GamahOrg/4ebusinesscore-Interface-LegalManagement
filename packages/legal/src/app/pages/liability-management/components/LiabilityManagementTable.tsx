import { useIntl } from "react-intl";
import { LiabilityManagementProcedures } from "./LiabilityManagementProcedures";
import { useEffect, useRef, useState, useCallback,useMemo, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getLitigantConsume } from "../../../features/litigant-consume";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import Spinner from "react-bootstrap/esm/Spinner";
import { shallowEqual } from "react-redux";
import React from "react";
import { ClientType, LitigationStatus } from "../../../models/LegalEnums";
function LiabilityManagementTable({
 searchQuery,  
 setSearchQuery , 
 pageIndex ,
 pageSize,
 setPageIndex,
 setPageSize,
 clientType,
  setClientType,
}: any) {
  const ViewCasesInTable = React.lazy(()=>import("@4eplatform/shared/src/components/ViewCasesInTable"))
  let dispatch = useDispatch<AppDispatch>()
  const intl = useIntl();
 
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const prevSearchTermRef = useRef<string | undefined>();
  const prevStatusTermRef = useRef<string | undefined>();

  useEffect(() => {
    if (prevSearchTermRef.current !== searchQuery) {
      setPageIndex(1);
    }
    prevSearchTermRef.current = searchQuery;
  }, [searchQuery]);

  useEffect(() => {
    if (prevStatusTermRef.current !== clientType) {
      setPageIndex(1);
    }
    prevStatusTermRef.current = clientType;
  }, [clientType]);
  const { litigantConsume, pagination } = useSelector(
    (state: RootState) => state.libability,
    shallowEqual
  );
 

  const getData = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      await dispatch(getLitigantConsume({
        pageIndex: pageIndex,
        pageSize: pageSize,
        
        // عشان يجيب الخصوم 
        status: LitigationStatus.Opponent,
        ClientType: clientType,
        IgnoreAccessCheck: false,
        ...(searchQuery ? { name: searchQuery } : {}),
      }));
    } finally {
      setLoading(false);
    }
  }, [dispatch, pageIndex, pageSize, searchQuery, clientType])

  useEffect(() => {
    getData()
  }, [getData])
  const rows = useMemo(() => {
    return Array.isArray(litigantConsume)
      ? litigantConsume.map((item, index) => (
        <tr key={item.id}>
        <td className="text-center">
          <span className="fw-bold text-primary">{item.id.toString().slice(0, 6)} {"#"}</span>
        </td>

        <td>
          <div
            className="d-flex align-items-center"
            style={{ width: "150px", margin: "0 auto" }}
          >
            <div style={{ width: "20px" }} className="text-center">
              <i className="fa-solid fa-circle-user fs-3 text-primary"></i>
            </div>
            <div className="ms-3">{item.name}</div>
          </div>
        </td>
        <td className="text-center">{item.phoneNumber}</td>
        <td className="text-center">{intl.locale === "ar" ? item.identityTypeNameAr : item.identityTypeNameEn}</td>
        <td className="text-center">{item.identityNumber}</td>
        <td className="text-center">
          {item.clientType == ClientType.Plaintiff
            ? intl.formatMessage({ id: "Claimant" })
            : item.clientType == ClientType.Defendant
            ? intl.formatMessage({ id: "Respondent" }) 
            : '-------'}
        </td>
        <td className="text-center">
          <div className="d-flex justify-content-center">
            <span
              className="rounded-circle bg-light-primary text-primary p-2 cursor-pointer"
              onClick={() => {
                handleShowModal(item.id);
              }}
            >
              {item.count}+
            </span>
          </div>
        </td>
        <td className="text-center">
          <LiabilityManagementProcedures searchQuery={searchQuery} clientType={clientType} pageIndex={pageIndex} pageSize={pageSize} id={item.id} rowIndex={index} />
        </td>
      </tr>
        ))
      : null;
  }, [litigantConsume, searchQuery, status, pageIndex, pageSize]);
  const handleShowModal = (id: number) => {
    setSelectedId(id);
    setShowModal(true);
  };
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <>
      {!loading ? (
        Array.isArray(litigantConsume) && litigantConsume.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bolder projectSecColor">
                  <th className="text-center px-2 py-3">
                    {intl.formatMessage({ id: "IDNumber1" })}
                  </th>
                  <th className="text-center px-2 py-3">
                    {intl.formatMessage({ id: "Name" })}
                  </th>
                  <th className="text-center px-2 py-3">
                    {intl.formatMessage({ id: "PhoneNumber" })}
                  </th>
                  <th className="text-center px-2 py-3">
                    {intl.formatMessage({ id: "IdentityType" })}
                  </th>
                  <th className="text-center px-2 py-3">
                    {intl.formatMessage({ id: "NumberAssociatedWithTheIdentity" })}
                  </th>
                  <th className="text-center px-2 py-3">
                    {intl.formatMessage({ id: "ClientsCondition1" })}
                  </th>
                  <th className="text-center px-2 py-3">
                    {intl.formatMessage({ id: "NumberOfRelatedIssues" })}
                  </th>
                  <th className="text-center px-2 py-3">
                    {intl.formatMessage({ id: "Procedures" })}
                  </th>
                </tr>
              </thead>
              <tbody>
           {rows}
              </tbody>
            </table>
            <div className="p-4 mb-8">
              <SystemPagination
                totalPages={pagination?.totalPages}
                totalItems={pagination?.totalItems || 0}
                pageIndex={pageIndex}
                pageSize={pageSize}
                setPageIndex={setPageIndex}
                setPageSize={setPageSize}
              />
            </div>
          </div>
        ) : (
          <div className="text-center text-handle fw-bolder mt-8 fs-4">
            {intl.formatMessage({ id: "NoDataYet" })}
          </div>
        )
      ) : (
        <div className="d-flex gap-4 justify-content-center align-items-center py-4">
          {intl.formatMessage({ id: "DataIsLoaded..." })}
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {showModal && selectedId !==null && (
        <Suspense fallback={<Spinner animation="border" variant="primary" />}>
        <ViewCasesInTable
          id={selectedId}
          show={showModal}
          handleClose={() => {
            setShowModal(false);
            setSelectedId(null);
          }}
          name="فهد جمال الراجح"
          type="Rival"
        />
        </Suspense>
      )}
    </>
  );
}

export default LiabilityManagementTable;
