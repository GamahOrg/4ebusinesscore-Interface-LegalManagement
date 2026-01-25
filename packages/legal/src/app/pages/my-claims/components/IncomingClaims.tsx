import { useIntl } from "react-intl";
import IncomingClaimsProcedures from "./IncomingClaimsProcedures";
import { FC } from "react";
import IncomingClaimsFirstCoulmnLink from "./OutgoingClaimsFirstCoulmnLink";

type ActionProps = {
  id?: number;
  status?: string;
};
export const IncomingClaims: FC<ActionProps> = ({ id, status }) => {
  const intl = useIntl();

  const getStatusColor = (status: any) => {
    switch (status) {
      case "Rejected":
        return "badge-light-danger";
      case "Finished":
        return "bg-secondary text-muted";
      case "consent":
      case "SentStatus":
        return "badge-light-success";
      case "Drafts":
        return "badge-light-primary";
      case "InTrack":
        return "badge-light-warning";
      default:
        return "badge-light-primary";
    }
  };
  const Data = [
    {
      id: 1,
      caseNumber: 23435356,
      competentCourt: `${intl.formatMessage({ id: "Alia" })}`,
      Defendant2: `${intl.formatMessage({
        id: "SaudMohammedAliAl-Qahtani",
      })}`,
      sessionDate: "25-9-2024",
      status: "Drafts",
    },
    {
      id: 2,
      caseNumber: 23435356,
      competentCourt: `${intl.formatMessage({ id: "ElementaryCourt" })}`,
      Defendant2: `${intl.formatMessage({
        id: "KhaledBinAbdulrahmanAlSudairy",
      })}`,
      sessionDate: "-----------",
      status: "InTrack",
    },
    {
      id: 3,
      caseNumber: 23435356,
      competentCourt: `${intl.formatMessage({ id: "Appeal" })}`,
      Defendant2: `${intl.formatMessage({
        id: "FahdBinSaudBinAbdulaziz",
      })}`,
      sessionDate: "25-9-2024",
      status: "SentStatus",
    },
    {
      id: 4,
      caseNumber: 23435356,
      competentCourt: `${intl.formatMessage({ id: "Alia" })}`,
      Defendant2: `${intl.formatMessage({
        id: "SaudMohammedAliAl-Qahtani",
      })}`,
      sessionDate: "25-9-2024",
      status: "Finished",
    },
    {
      id: 5,
      caseNumber: 23435356,
      competentCourt: `${intl.formatMessage({ id: "Alia" })}`,
      Defendant2: `${intl.formatMessage({
        id: "SaudMohammedAliAl-Qahtani",
      })}`,
      sessionDate: "25-9-2024",
      status: "Rejected",
    },
    {
      id: 6,
      caseNumber: 23435356,
      competentCourt: `${intl.formatMessage({ id: "Alia" })}`,
      Defendant2: `${intl.formatMessage({
        id: "SaudMohammedAliAl-Qahtani",
      })}`,
      sessionDate: "25-9-2024",
      status: "consent",
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
                {intl.formatMessage({ id: "Defendant2" })}
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
            {Data.map((item) => (
              <tr key={item.id}>
                <td>
                  <IncomingClaimsFirstCoulmnLink
                    id={item.id}
                    status={item.status}
                  />
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
                  <div className={`badge ${getStatusColor(item.status)}`}>
                    {intl.formatMessage({ id: `${item.status}` })}
                  </div>
                </td>
                <td>
                  <IncomingClaimsProcedures id={item.id} status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default IncomingClaims;
