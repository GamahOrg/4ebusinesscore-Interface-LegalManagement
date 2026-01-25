import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { IssuedLawsuitsProcedures } from "./IssuedLawsuitsProcedures";

export default function IssuedLawsuits() {
  const intl = useIntl();
  const Data = [
    {
      id: 1,
      caseNumber: 23435356,
      competentCourt: `${intl.formatMessage({ id: "Alia" })}`,
      Defendant: `${intl.formatMessage({
        id: "SaudMohammedAliAl-Qahtani",
      })}`,
    },
    {
      id: 2,
      caseNumber: 23435356,
      competentCourt: `${intl.formatMessage({ id: "ElementaryCourt" })}`,
      Defendant: `${intl.formatMessage({
        id: "KhaledBinAbdulrahmanAlSudairy",
      })}`,
    },
    {
      id: 3,
      caseNumber: 23435356,
      competentCourt: `${intl.formatMessage({ id: "Appeal" })}`,
      Defendant: `${intl.formatMessage({
        id: "FahdBinSaudBinAbdulaziz",
      })}`,
    },
    {
      id: 4,
      caseNumber: 23435356,
      competentCourt: `${intl.formatMessage({ id: "Alia" })}`,
      Defendant: `${intl.formatMessage({
        id: "SaudMohammedAliAl-Qahtani",
      })}`,
    },
    {
      id: 5,
      caseNumber: 23435356,
      competentCourt: `${intl.formatMessage({ id: "Appeal" })}`,
      Defendant: `${intl.formatMessage({
        id: "AbdullahBinMohammedBinIbrahim",
      })}`,
    },
    {
      id: 6,
      caseNumber: 23435356,
      competentCourt: `${intl.formatMessage({ id: "Alia" })}`,
      Defendant: `${intl.formatMessage({
        id: "SaudMohammedAliAl-Qahtani",
      })}`,
    },
    {
      id: 7,
      caseNumber: 23435356,
      competentCourt: `${intl.formatMessage({ id: "Appeal" })}`,
      Defendant: `${intl.formatMessage({
        id: "SaudMohammedAliAl-Qahtani",
      })}`,
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
                {intl.formatMessage({ id: "Defendant" })}
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
                    to="/view-claims-list-cliams"
                    className="menu-link px-3 mb-2 text-muted"
                  >
                    <h6 className="text-primary fs-8">{item.caseNumber}</h6>
                  </Link>
                </td>
                <td>
                  <h6 className="text-muted">{item.Defendant}</h6>
                </td>
                <td>
                  <h6 className="text-muted">{item.competentCourt}</h6>
                </td>

                <td>
                  <IssuedLawsuitsProcedures rowIndex={index} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
