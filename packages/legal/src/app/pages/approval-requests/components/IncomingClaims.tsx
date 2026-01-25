import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import IncomingClaimsProcedures2 from "./IncomingClaimsProcedures2";
export default function IncomingClaims() {
  const intl = useIntl();
  const getStatusBadgeClass = (status: any) => {
    switch (status) {
      case intl.formatMessage({ id: "InWaiting" }):
        return "badge-light-warning";
      case intl.formatMessage({ id: "Rejected" }):
        return "badge-light-danger";
      case intl.formatMessage({ id: "Approve" }):
        return "badge-light-success";
    }
  };

  const Data = [
    {
      id: 1,
      caseNumber: 23435356,
      competentCourt: `${intl.formatMessage({ id: "ElementaryCourt" })}`,
      Defendant2: `${intl.formatMessage({
        id: "SaudMohammedAliAl-Qahtani",
      })}`,
      AssignedTo: `${intl.formatMessage({
        id: "AbdullahbinMohammed",
      })}`,
      typeOfLawsuit: `${intl.formatMessage({
        id: "RealEstateContributions",
      })}`,

      sessionDate: "08-02-2024",
      status: "InWaiting",
    },
    {
      id: 2,
      caseNumber: 23435356,
      competentCourt: `${intl.formatMessage({ id: "Appeal" })}`,
      Defendant2: `${intl.formatMessage({
        id: "SaudMohammedAliAl-Qahtani",
      })}`,
      AssignedTo: `${intl.formatMessage({
        id: "AbdullahbinMohammed",
      })}`,
      typeOfLawsuit: `${intl.formatMessage({
        id: "SaleAndRentOnTheMap",
      })}`,

      sessionDate: "08-02-2024",
      status: "Approve",
    },
    {
      id: 3,
      caseNumber: 23435356,
      competentCourt: `${intl.formatMessage({ id: "Alia" })}`,
      Defendant2: `${intl.formatMessage({
        id: "SaudMohammedAliAl-Qahtani",
      })}`,
      AssignedTo: `${intl.formatMessage({
        id: "AbdullahbinMohammed",
      })}`,
      typeOfLawsuit: `${intl.formatMessage({
        id: "StateProperties",
      })}`,

      sessionDate: "08-02-2024",
      status: "Rejected",
    },
  ];

  return (
    <>
      <div className="table-responsive mb-3">
        <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4 text-center">
          <thead>
            <tr className="fw-bolder projectSecColor">
              <th className="px-2 pb-3 min-w-50px max-w-350px">
                {intl.formatMessage({ id: "CaseNumber" })}
              </th>
              <th className="px-2 pb-3 min-w-50px max-w-350px">
                {intl.formatMessage({ id: "PlaintiffDefendant" })}
              </th>
              <th className="px-2 pb-3 min-w-50px max-w-350px">
                {intl.formatMessage({ id: "CompetentCourt" })}
              </th>
              <th className="px-2 pb-3 min-w-50px max-w-200px">
                {intl.formatMessage({ id: "SessionDate" })}
              </th>
              <th className="px-2 pb-3 min-w-50px max-w-200px">
                {intl.formatMessage({ id: "Status" })}
              </th>
              <th className="px-2 pb-3 min-w-50px max-w-200px">
                {intl.formatMessage({ id: "TheProcedures" })}
              </th>
            </tr>
          </thead>
          <tbody>
            {Data.map((item, index) => (
              <tr key={item.id}>
                <td>
                  {" "}
                  <Link
                    to="/view-cliams3"
                    className="menu-link px-3 mb-2 text-muted"
                  >
                    <h6 className=" fs-8">{item.caseNumber}</h6>
                  </Link>
                </td>
                <td>
                  <h6 className="text-muted">{item.Defendant2}</h6>
                </td>
                <td>
                  <h6 className="text-muted">{item.competentCourt}</h6>
                </td>
                <td>
                  <h6 className="text-muted">{item.sessionDate}</h6>
                </td>
                <td>
                  <span
                    className={`badge fs-8 fw-bolder ${getStatusBadgeClass(
                      intl.formatMessage({ id: item.status })
                    )} rounded`}
                  >
                    {intl.formatMessage({ id: item.status })}
                  </span>
                </td>
                <td>
                  <IncomingClaimsProcedures2
                    rowIndex={index}
                    status={item.status}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
