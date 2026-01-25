import { useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import IncomingClaimsProcedures from "./IncomingClaimsProcedures";
import { ShowMore } from "../propus/ShowMore";

export default function StudyClaims() {
  const intl = useIntl();
  const langIsArabic = intl.locale === "ar";

  const [showModal, setShowModal] = useState(false);
  const [selectedMemoText, setSelectedMemoText] = useState<string>("");

  const handleShowMore = (memoText: string) => {
    setSelectedMemoText(memoText);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMemoText("");
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case intl.formatMessage({ id: "InWaiting" }):
        return "badge-light-warning";
      case intl.formatMessage({ id: "Rejected" }):
        return "badge-light-danger";
      case intl.formatMessage({ id: "Approve" }):
        return "badge-light-success";
      default:
        return "badge-light-info"; // Default class if status doesn't match
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
      AssignedTo: `${intl.formatMessage({
        id: "AbdullahbinMohammed",
      })}`,
      typeOfLawsuit: `${intl.formatMessage({
        id: "ObjectionToAnAdministrativeDecision",
      })}`,
      sessionDate: "08-02-2024",
      status:  "InWaiting" ,
      memoText: langIsArabic
        ? "التأخير أو عدم دفع الأجور: عدم دفع الأجور في موعدها أو الامتناع عن دفع المستحقات"
        : "Delay or non-payment of wages: failure to pay wages on time or withholding dues",
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
      status:  "Approve" ,
      memoText: langIsArabic
        ? "التأخير أو عدم دفع الأجور: عدم دفع الأجور في موعدها أو الامتناع عن دفع المستحقات"
        : "Delay or non-payment of wages: failure to pay wages on time or withholding dues",
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
      status:  "Rejected",
      memoText: langIsArabic
        ? "التأخير أو عدم دفع الأجور: عدم دفع الأجور في موعدها أو الامتناع عن دفع المستحقات"
        : "Delay or non-payment of wages: failure to pay wages on time or withholding dues",
    },
  ];

  return (
    <div className="table-responsive mb-3">
      <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4 text-center">
        <thead>
          <tr className="fw-bolder projectSecColor">
            <th className="px-2 pb-3 min-w-100px max-w-350px">
              {intl.formatMessage({ id: "MemoId" })}
            </th>
            <th className="px-2 pb-3 min-w-100px max-w-350px">
              {intl.formatMessage({ id: "ClaimCreator" })}
            </th>
            <th className="px-2 pb-3 min-w-100px max-w-350px">
              {intl.formatMessage({ id: "Defendant" })}
            </th>
            <th className="px-2 pb-3 min-w-100px max-w-200px">
              {intl.formatMessage({ id: "MemoText" })}
            </th>
            <th className="px-2 pb-3 min-w-100px max-w-200px">
              {intl.formatMessage({ id: "MemoDate" })}
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
                <Link to={`/study-details/${encodeURIComponent(item.status)}`} className="menu-link px-3 mb-2">
                  <h6 className="fs-8">{item.caseNumber}</h6>
                </Link>
              </td>
              <td>
                <h6>{item.Defendant2}</h6>
              </td>
              <td>
                <h6>{item.competentCourt}</h6>
              </td>
              <td
                className="min-w-100px memo-text-cell"
                onClick={() => handleShowMore(item.memoText)}
                style={{ cursor: "pointer", color: "blue" }}
              >
                <h6 className="text-primary">{item.memoText}</h6>
              </td>
              <td>
                <h6>{item.sessionDate}</h6>
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
                <IncomingClaimsProcedures rowIndex={index} status={item.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ShowMore
        show={showModal}
        handleClose={handleCloseModal}
        data={selectedMemoText}
      />
    </div>
  );
}
