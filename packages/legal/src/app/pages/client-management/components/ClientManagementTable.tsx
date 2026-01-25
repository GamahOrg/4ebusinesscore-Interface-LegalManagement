import { useIntl } from "react-intl";
import { ClientManagementActions } from "./ClientManagementActions";
import { useState } from "react";
import ViewCasesInTable from "@4eplatform/shared/src/components/ViewCasesInTable";
import { ClientType } from "../../../models/LegalEnums";
import { useNavigate } from "react-router-dom";

function ClientManagementTable({
  clientsData,
  pageIndex,
  pageSize,
  clientType,
  searchQuery,
}) {
  const intl = useIntl();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleNavigate = (item: any) => {
    navigate(`/cases-view/list-of-cases/${item?.id}`, {
      state: { item: item },
    });
  };

  return (
    <>
      <div className="table-responsive mb-3">
        <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4">
          <thead>
            <tr className="fw-bolder projectSecColor">
              <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-350px client-head text-center">
                {intl.formatMessage({ id: "IDNumber1" })}
              </th>
              <th className="Case-Table-Head text-center px-2 pb-3 min-w-50px max-w-350px client-head">
                {intl.formatMessage({ id: "Name" })}
              </th>
              <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-350px client-head">
                {intl.formatMessage({ id: "PhoneNumber" })}
              </th>
              <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-200px client-head">
                {intl.formatMessage({ id: "IdentityType" })}
              </th>
              <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-200px client-head">
                {intl.formatMessage({ id: "NumberAssociatedWithTheIdentity" })}
              </th>
              <th className="Case-Table-Head text-center px-2 pb-3 min-w-50px max-w-200px client-head">
                {intl.formatMessage({ id: "ClientsCondition1" })}
              </th>
              <th className="Case-Table-Head text-center px-2 pb-3 min-w-50px max-w-200px client-head">
                {intl.formatMessage({ id: "NumberOfRelatedIssues" })}
              </th>
              <th className="Case-Table-Head px-2 pb-3 min-w-50px max-w-200px client-head">
                {intl.formatMessage({ id: "Procedures" })}
              </th>
            </tr>
          </thead>
          <tbody>
            {clientsData?.length > 0 &&
              clientsData?.map((item: any, idx) => {
                return (
                  <tr key={item.id}>
                    <td className="Case-Table-Content">
                      <h6 className="fw-bold text-primary text-center">
                        {item?.id?.toString().slice(0, 6)} {"#"}
                      </h6>
                    </td>
                    <td className="Case-Table-Content">
                      <div className="d-flex px-3 mb-2 text-muted">
                        <p className="mb-0">
                          <i className="fa-solid fa-circle-user mx-3 text-primary fs-2"></i>
                          {item?.name}
                        </p>
                      </div>
                    </td>
                    <td>
                      <span className="Case-Table-Span">
                        {item?.phoneNumber}
                      </span>
                    </td>
                    <td>
                      <span className="Case-Table-Span client-identity">
                        {intl.locale === "ar"
                          ? item.identityTypeNameAr
                          : item.identityTypeNameEn}
                      </span>
                    </td>
                    <td className="Case-Table-Content">
                      <span className="text-muted">
                        #{item?.identityNumber}
                      </span>
                    </td>
                    <td className="Case-Table-Content text-center">
                      <p className="text-muted ">
                        {item.clientType == ClientType.Plaintiff
                          ? intl.formatMessage({ id: "Plaintiff" })
                          : item.clientType == ClientType.Defendant
                          ? intl.formatMessage({ id: "Respondent" })
                          : "-------"}
                      </p>
                    </td>
                    <td className="Case-Table-Content text-center">
                      {item.count ? (
                        <>
                          <span
                            className="rounded-circle bg-light-primary text-primary p-2 cursor-pointer"
                            onClick={() => {
                              setShowModal(true);
                              setSelectedId(item.id);
                            }}
                          >
                            {item.count}+
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="rounded-circle bg-light-primary text-primary p-2">
                            0
                          </span>
                        </>
                      )}
                    </td>
                    <td className="text-center">
                      <ClientManagementActions
                        id={item?.id}
                        canEdit={item?.canEdit}
                        pageSize={pageSize}
                        pageIndex={pageIndex}
                        clientType={clientType}
                        searchQuery={searchQuery}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {showModal && (
          <ViewCasesInTable
            id={selectedId}
            show={showModal}
            handleClose={() => {
              setShowModal(false);
            }}
          />
        )}
      </div>
    </>
  );
}

export default ClientManagementTable;
