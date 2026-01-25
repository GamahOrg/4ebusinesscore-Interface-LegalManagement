import { tableData } from "../data";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import SupportDocsProcedures2 from "./supporting-docs-procedures 2";
const SupportingDocumentsTable = () => {
  const intl = useIntl();

  return (
    <div className="table-responsive mb-3">
      <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4 text-center">
        <thead>
          <tr className="fw-bolder projectSecColor">
            <th className="px-2 pb-3 min-w-100px max-w-350px">
              {intl.formatMessage({ id: "MemoCaseId" })}
            </th>
            <th className="px-2 pb-3 min-w-100px max-w-350px">
              {intl.formatMessage({ id: "PlaintiffDefendant" })}
            </th>
            <th className="px-2 pb-3 min-w-100px max-w-350px">
              {intl.formatMessage({ id: "DocumentType" })}
            </th>
            <th className="px-2 pb-3 min-w-100px max-w-200px">
              {intl.formatMessage({ id: "MemoSessionDate" })}
            </th>
            <th className="px-2 pb-3 min-w-50px max-w-200px">
              {intl.formatMessage({ id: "TheProcedures" })}
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>
                {" "}
                <Link to="/study-details2" className="menu-link px-3 mb-2 ">
                  <h6 className=" fs-8">{item.MemoCaseId}</h6>
                </Link>
              </td>
              <td>
                <h6 className="">{item.PlaintiffDefendant}</h6>
              </td>
              <td>
                <h6 className="">
                  {intl.formatMessage({ id: item.DocumentType })}
                </h6>
              </td>

              <td>
                <h6 className="">{item.MemoSessionDate}</h6>
              </td>

              <td>
                <SupportDocsProcedures2 rowIndex={index} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupportingDocumentsTable;
