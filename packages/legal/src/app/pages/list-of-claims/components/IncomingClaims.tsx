import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import IncomingClaimsProcedures from "./IncomingClaimsProcedures";

export default function IncomingClaims() {
  const intl = useIntl();

  const getShowLink = (index: number): string => {
    if ([0, 2, 4].includes(index)) {
      return "/view-claims-list-cliams2";
    }

    return "/view-claims-list-cliams2";
  };
  const Data = [
    {
      id: 1,
      caseNumber: 23435356,
      competentCourt: `${intl.formatMessage({ id: "Alia" })}`,
      Defendant2: `${intl.formatMessage({
        id: "SaudMohammedAliAl-Qahtani",
      })}`,
    },
    {
      id: 2,
      caseNumber: 23435356,
      competentCourt: `${intl.formatMessage({ id: "ElementaryCourt" })}`,
      Defendant2: `${intl.formatMessage({
        id: "KhaledBinAbdulrahmanAlSudairy",
      })}`,
    },
    {
      id: 3,
      caseNumber: 23435356,
      competentCourt: `${intl.formatMessage({ id: "Appeal" })}`,
      Defendant2: `${intl.formatMessage({
        id: "FahdBinSaudBinAbdulaziz",
      })}`,
    },
    {
      id: 4,
      caseNumber: 23435356,
      competentCourt: `${intl.formatMessage({ id: "Alia" })}`,
      Defendant2: `${intl.formatMessage({
        id: "SaudMohammedAliAl-Qahtani",
      })}`,
    },
    {
      id: 5,
      caseNumber: 23435356,
      competentCourt: `${intl.formatMessage({ id: "Appeal" })}`,
      Defendant2: `${intl.formatMessage({
        id: "AbdullahBinMohammedBinIbrahim",
      })}`,
    },
    {
      id: 6,
      caseNumber: 23435356,
      competentCourt: `${intl.formatMessage({ id: "Alia" })}`,
      Defendant2: `${intl.formatMessage({
        id: "SaudMohammedAliAl-Qahtani",
      })}`,
    },
    {
      id: 7,
      caseNumber: 23435356,
      competentCourt: `${intl.formatMessage({ id: "Appeal" })}`,
      Defendant2: `${intl.formatMessage({
        id: "SaudMohammedAliAl-Qahtani",
      })}`,
    },
  ];

  return (
    <>
      <div className="card-title"></div>
      <div className="card-body">
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
                      to={getShowLink(index)}
                      className="menu-link px-3 mb-2 text-muted"
                    >
                      <h6 className="text-primary fs-8">{item.caseNumber}</h6>
                    </Link>
                  </td>
                  <td>
                    <h6 className="text-muted">{item.Defendant2}</h6>
                  </td>
                  <td>
                    <h6 className="text-muted">{item.competentCourt}</h6>
                  </td>
                  <td>
                    <IncomingClaimsProcedures rowIndex={index} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
