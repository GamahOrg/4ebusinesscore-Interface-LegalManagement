import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { Actions } from "./Actions";

export default function IncomingClaims() {
  const intl = useIntl();

  const Data = [
    {
      id: 1,
      caseNumber: 12345678,
      competentCourt: `${intl.formatMessage({ id: "ElementaryCourt" })}`,
      theCreatorOfTheCall: `${intl.formatMessage({
        id: "SaudMohammedAliAl-Qahtani",
      })}`,
      defendant: `${intl.formatMessage({
        id: "AbdullahbinMohammedbinIbrahim",
      })}`,
      sessionDate: "22-10-2024",
    },
    {
      id: 2,
      caseNumber: 12345678,
      competentCourt: `${intl.formatMessage({ id: "Alia" })}`,
      theCreatorOfTheCall: `${intl.formatMessage({
        id: "SaudMohammedAliAl-Qahtani",
      })}`,
      defendant: `${intl.formatMessage({
        id: "AbdullahbinMohammedbinIbrahim",
      })}`,
      sessionDate: "22-10-2024",
    },
    {
      id: 3,
      caseNumber: 12345678,
      competentCourt: `${intl.formatMessage({ id: "Appeal" })}`,
      theCreatorOfTheCall: `${intl.formatMessage({
        id: "SaudMohammedAliAl-Qahtani",
      })}`,
      defendant: `${intl.formatMessage({
        id: "AbdullahbinMohammedbinIbrahim",
      })}`,
      sessionDate: "22-10-2024",
    },
    {
      id: 4,
      caseNumber: 12345678,
      competentCourt: `${intl.formatMessage({ id: "ElementaryCourt" })}`,
      theCreatorOfTheCall: `${intl.formatMessage({
        id: "SaudMohammedAliAl-Qahtani",
      })}`,
      defendant: `${intl.formatMessage({
        id: "AbdullahbinMohammedbinIbrahim",
      })}`,
      sessionDate: "22-10-2024",
    },
    {
      id: 5,
      caseNumber: 12345678,
      competentCourt: `${intl.formatMessage({ id: "Alia" })}`,
      theCreatorOfTheCall: `${intl.formatMessage({
        id: "SaudMohammedAliAl-Qahtani",
      })}`,
      defendant: `${intl.formatMessage({
        id: "AbdullahbinMohammedbinIbrahim",
      })}`,
      sessionDate: "22-10-2024",
    },
    {
      id: 6,
      caseNumber: 12345678,
      competentCourt: `${intl.formatMessage({ id: "Appeal" })}`,
      theCreatorOfTheCall: `${intl.formatMessage({
        id: "SaudMohammedAliAl-Qahtani",
      })}`,
      defendant: `${intl.formatMessage({
        id: "AbdullahbinMohammedbinIbrahim",
      })}`,
      sessionDate: "22-10-2024",
    },
    {
      id: 7,
      caseNumber: 12345678,
      competentCourt: `${intl.formatMessage({ id: "ElementaryCourt" })}`,
      theCreatorOfTheCall: `${intl.formatMessage({
        id: "SaudMohammedAliAl-Qahtani",
      })}`,
      defendant: `${intl.formatMessage({
        id: "AbdullahbinMohammedbinIbrahim",
      })}`,
      sessionDate: "22-10-2024",
    },
  ];

  return (
    <>
      <div className="card-body">
        <div className="table-responsive mb-3">
          <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4 text-center">
            <thead>
              <tr className="fw-bolder projectSecColor">
                <th className="px-2 pb-3 min-w-50px max-w-350px">{intl.formatMessage({ id: "CaseNumber" })}</th>
                <th className="px-2 pb-3 min-w-50px max-w-350px">{intl.formatMessage({ id: "CompetentCourt" })}</th>
                <th className="px-2 pb-3 min-w-50px max-w-350px">{intl.formatMessage({ id: "TheCreatorOfTheCall" })}</th>
                <th className="px-2 pb-3 min-w-50px max-w-350px">{intl.formatMessage({ id: "Defendant" })}</th>
                <th className="px-2 pb-3 min-w-50px max-w-200px">{intl.formatMessage({ id: "TheProcedures" })}</th>
              </tr>
            </thead>
            <tbody>
              {Data.map((item) => (
                <tr key={item.id}>
                  <td>
                    {" "}
                    <Link to="/view-lawsuit" className="menu-link px-3 mb-2 text-muted">
                      <h6 className="text-primary fs-8">{item.caseNumber}</h6>
                    </Link>
                  </td>
                  <td>
                    <h6 className="text-muted">{item.competentCourt}</h6>
                  </td>
                  <td>
                    <h6 className="text-muted">{item.theCreatorOfTheCall}</h6>
                  </td>
                  <td>
                    <h6 className="text-muted">{item.defendant}</h6>
                  </td>

                  <td>
                    <Actions id={item.id} />
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
