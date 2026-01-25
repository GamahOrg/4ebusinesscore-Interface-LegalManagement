import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { NotesTableActions } from "./NotesTableActions";
import ViewNotePopup from "../popups/ViewNotePopup";
import { useNavigate } from "react-router-dom";
import { CauseStatus, ClientType } from "../../../models/LegalEnums";
import moment from "moment";
import "moment/locale/ar";
import { SessionNoteModel } from "../../../models/SessionNoteModel";
import convertNullString from "../../../../../../shared/functions/convertNullString";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";
import causeStatus, {
  causeStageStatus,
} from "@4eplatform/shared/functions/causeStatus";
import {
  getStyleByStatus,
  getStyleByStatusCauseStages,
} from "@4eplatform/shared/functions/getStyleByStatus";
const LegalNotesTable = ({
  sessionNotes,
  pageIndex,
  setPageIndex,
  pageSize,
  setPageSize,
  selectedDegree,
  selectedCase,
  setSelectedCase,
  setSelectedDegree,
  searchTerm,
  setSearchTerm,
}: any) => {
  const intl = useIntl();
  moment.locale("en");
  const navigate = useNavigate();
  const [showViewPopup, setShowViewPopup] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const handleNavigate = (item: any) => {
    navigate(`/legal-notes/list-of-cases/${item?.causeId}#lawsuits`, {
      state: { item: item, comeFrom: "/legal-notes" },
    });
  };

  // console.log(sessionNotes);

  return (
    <>
      <div className="table-responsive mb-3">
        <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4 text-center">
          <thead>
            <tr className="fw-bolder projectSecColor">
              <th className="Case-Table-Head px-2 pb-3 min-width-130px">
                {intl.formatMessage({ id: "Casenumber" })}
              </th>
              <th className="Case-Table-Head px-2 pb-3 min-width-130px ">
                {intl.formatMessage({ id: "CaseTitle" })}
              </th>
              <th className="Case-Table-Head px-2 pb-3 min-width-130px ">
                {intl.formatMessage({ id: "TheLawsuit" })}
              </th>
              <th className="Case-Table-Head px-2 pb-3 min-width-130px">
                {intl.formatMessage({ id: "SessionNumber" })}
              </th>
              <th className="Case-Table-Head px-2 pb-3 min-width-130px">
                {intl.formatMessage({ id: "StudyClaimInfo" })}
              </th>
              <th className="Case-Table-Head px-2 pb-3 min-width-130px ">
                {intl.formatMessage({ id: "NoteCreator" })}
              </th>
              <th className="Case-Table-Head px-2 pb-3 min-width-130px ">
                {intl.formatMessage({ id: "Clients' Status" })}
              </th>
              <th className="Case-Table-Head px-2 pb-3 min-width-130px ">
                {intl.formatMessage({ id: "Adversaries" })}
              </th>
              <th className="Case-Table-Head px-2 pb-3 min-width-130px">
                {intl.formatMessage({ id: "DateCreated" })}
              </th>
              <th className="Case-Table-Head px-2 pb-3 min-width-130px">
                {intl.formatMessage({ id: "LitigationStatus" })}
              </th>
              <th className="Case-Table-Head px-2 pb-3 min-width-130px">
                {intl.formatMessage({ id: "Procedures" })}
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(sessionNotes) &&
              sessionNotes?.map((item: SessionNoteModel) => {
                return (
                  <tr key={item?.id}>
                    <td className="Case-Table-Content">
                      <h6
                        // onClick={() => handleNavigate(item)}
                        className=" text-center text-dark fw-bolder  min-width-130px"
                      >
                        {item?.causeNumber && item?.causeNumber !== "null"
                          ? item?.causeNumber
                          : "--------"}
                      </h6>
                    </td>
                    <td className="Case-Table-Content text-center ">
                      <p
                        className="text-muted text-hover-primary no-whitespace-wrap text-truncate mw-100px cursor-pointer"
                        title={item?.causeTitle}
                      >
                        {item?.causeTitle}
                      </p>
                    </td>
                    <td className="Case-Table-Content">
                      <span
                        onClick={() => handleNavigate(item)}
                        className="min-width-130px Case-Table-Span fs-7 py-1 text-primary text-center border-bottom-primary cursor-pointer"
                      >
                        #{" "}
                        {intl.locale === "en"
                          ? item?.lkStageNameEn
                          : item?.lkStageNameAr}
                      </span>
                    </td>

                    <td className="Case-Table-Content">
                      <span className="Case-Table-Span fs-7 py-1 text-center text-dark fw-bolder min-width-130px">
                        {item?.sessionNumber ? item?.sessionNumber : "--------"}
                      </span>
                    </td>
                    <td className="Case-Table-Content">
                      <span
                        style={{ margin: "0 25px" }}
                        onClick={() => {
                          setSelectedItem(item);
                          setShowViewPopup(true);
                        }}
                        className="d-block text-primary text-center border-bottom-primary w-150px text-truncate cursor-pointer "
                      >
                        {item?.description}
                      </span>
                    </td>
                    <td className="Case-Table-Content border-none ">
                      <div className="d-flex gap-1 ">
                        <div className="w-25 d-flex justify-content-center align-items-center">
                          <div className="icone-circle bg-primary">
                            <img
                              src={toAbsoluteUrl("/media/avatars/user.svg")}
                              alt="user-img"
                            />
                          </div>
                        </div>
                        <span className="text-dark fw-bolder w-75">
                          {item?.createdByName}
                        </span>
                      </div>
                    </td>

                    <td className="Case-Table-Content">
                      <span className="text-muted min-width-130px text-center">
                        {intl.formatMessage({
                          id:
                            item?.clientType == ClientType.Plaintiff
                              ? "Plaintiff"
                              : "Defendant",
                        })}
                      </span>
                    </td>
                    <td className="Case-Table-Content text-center">
                      {Array.isArray(item?.opponents) &&
                      item?.opponents?.length > 1 ? (
                        <div className="d-flex min-width-160px gap-3 align-items-center justify-content-center">
                          <span className="text-dark fw-bolder ">
                            {convertNullString(
                              item?.opponents[0]?.opponentName
                            )}
                          </span>
                          <div className="small-circle bg-primary text-white">
                            {`${item?.opponents?.length - 1} +`}
                          </div>
                        </div>
                      ) : Array.isArray(item?.opponents) &&
                        item?.opponents?.length == 1 ? (
                        <span className="text-dark w-100 d-flex align-items-center justify-content-center">
                          {Array.isArray(item?.opponents) &&
                            convertNullString(item?.opponents[0]?.opponentName)}
                        </span>
                      ) : (
                        "_________"
                      )}
                    </td>
                    <td className="Case-Table-Content">
                      <span
                        className="text-dark min-width-130px text-center"
                        dir="ltr"
                      >
                        {moment(item?.createon).format("DD MMM YYYY")}
                      </span>
                    </td>
                    {item.lkStageNameAr !== "الدراسة" &&
                    item.lkStageNameEn !== "Study" ? (
                      <td className="Case-Table-Content">
                        <span
                          className={`border-radius-4px p-4 w-110px d-block badge-${getStyleByStatusCauseStages(
                            causeStageStatus(item?.causeStageStatus, intl)
                              ?.statusEnum as number
                          )}`}
                        >
                          {causeStageStatus(item?.causeStageStatus, intl)?.name}
                        </span>
                      </td>
                    ) : (
                      <td className="Case-Table-Content">
                        <span
                          className={`border-radius-4px p-4 w-110px d-block badge-light-primary text-primary `}
                        >
                          {intl.formatMessage({ id: "New" })}
                        </span>
                      </td>
                    )}

                    <td className="Case-Table-Content text-center min-width-130px">
                      <NotesTableActions
                        id={item?.id}
                        item={item}
                        {...{
                          pageIndex,
                          setPageIndex,
                          pageSize,
                          setPageSize,
                          selectedDegree,
                          selectedCase,
                          setSelectedCase,
                          setSelectedDegree,
                          searchTerm,
                          setSearchTerm,
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {showViewPopup && (
        <div className="modal fade">
          <ViewNotePopup
            id={selectedItem?.id}
            show={showViewPopup}
            handleClose={() => setShowViewPopup(false)}
            text={selectedItem?.description}
          />
        </div>
      )}
    </>
  );
};

export default LegalNotesTable;
