import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import DropDownDoc from "./DropDownDoc";
import DocTable from "./DocTable";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppSelector } from "../../../../store/store";
import { fetchAllLkAttachmentSources } from "../../../../features/attachment-source";
import causeStatusMapping from "@4eplatform/shared/functions/causeStatusMapping";
import { fetchAllCauseStageAttachments } from "../../../../features/cause-stage";
import AddCauseStageDocPopup from "../../popups/AddCauseStageDocPopup";
import Spinner from "react-bootstrap/esm/Spinner";

interface DocumentBodyProps {
  isConsultive?:boolean;
  isLawyerToTakeAction?:boolean;
    isDataEntry?:any;
  isOwnerOrSuperVisor?:any;
}
function DocumentBody({isConsultive ,isLawyerToTakeAction,isDataEntry,
  isOwnerOrSuperVisor, }:DocumentBodyProps) {
  const intl = useIntl();
  let [loading, setLoading] = useState(false);
  let { id: caseId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  let [date, setDate] = useState("");
  let [lK_AttachmentSourceId, setLK_AttachmentSourceId] = useState<number>(-1);
  let lkAttachmentSources = useSelector((state: RootState) => {
    return state?.attachmentSource?.lkAttachmentSources;
  });
  const caseData = useAppSelector((state) => state.causes.causeById);
  let showAddDocForCause =
    caseData?.causeStages?.length == 1 &&
    (caseData?.causeStages[0]?.lK_Stage?.nameAr == "دراسه" ||
      caseData?.causeStages[0]?.lK_Stage?.nameAr == "دراسة");

  const CARDS = "Card";
  const TABLE = "Table";

  const [activeCaseView, setActiveCaseView] = useState(CARDS);
  const [addShowDoc, setAddShowDoc] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    let params = {
      ...(caseId && { causeId: caseId }),
      ...(searchQuery && { searchTerm: searchQuery }),
      ...(lK_AttachmentSourceId > -1 && {
        lKAttachmentSourceId: lK_AttachmentSourceId,
      }),
      ...(date && { startDate: date }),
      // ...(date && { endDate: date }),
    };
    setLoading(true);
    dispatch(fetchAllCauseStageAttachments(params) as any).then((res)=>{
      setLoading(false)
    });
  }, [searchQuery, lK_AttachmentSourceId, date, caseId]);
  useEffect(() => {
    dispatch(
      fetchAllLkAttachmentSources({
        pageSize: "10000",
      }) as any
    );
  }, []);
  return (
    <Row className="bg-gray-100 p-6 rounded-2 mx-0">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="fw-bolder mb-8 px-0">
          {intl.formatMessage({ id: "CaseDocuments" })}
        </h4>

        {causeStatusMapping(caseData?.causeStatus, intl)?.name ==
          intl.formatMessage({
            id: "InTheSessions",
          }) &&
          activeCaseView == TABLE &&
          showAddDocForCause && (
            <button
              type="button"
              className="btn btn-primary fw-bold px-4 py-2"
              onClick={() => {
                setAddShowDoc(true);
              }}
            >
              {intl.formatMessage({
                id: "Add",
              })}{" "}
              {intl.formatMessage({
                id: "Doc",
              })}
            </button>
          )}
      </div>

      <Row className="w-100 align-items-center my-5 mx-3">
        <Col xs={12} md={3} lg={4} className="mb-3 mb-md-0">
          <div className="d-flex align-items-center bg-white bg-fix-dark border-fix-dark  position-relative w-100">
            <span className="svg-icon svg-icon-1 position-absolute text-muted mx-3">
              <KTSVG path="/media/icons/duotune/general/gen114_search.svg" />
            </span>
            <input
              type="text"
              data-kt-filemanager-table-filter="search"
              className="form-control form-control-solid px-11 bg-white bg-fix-dark border-fix-dark  text-gix-dark "
              placeholder={intl.formatMessage({ id: "Search" })}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e?.target?.value);
              }}
            />
          </div>
        </Col>

        <Col className="mb-3 mb-lg-0" xs={12} md={4} lg={3}>
          <select
            onChange={(e) => setLK_AttachmentSourceId(+e.target.value)}
            className="rounded w-100 form-select text-gix-dark"
            value={lK_AttachmentSourceId}
            title={intl.formatMessage({ id: "Source" })}
          >
            <option value={-1}>
              {intl.formatMessage({ id: "All" })}
            </option>
            {lkAttachmentSources?.map((item) => (
              <option key={item?.id} value={item?.id}>
                {intl.locale == "ar" ? item?.nameAr : item?.nameEn}
              </option>
            ))}
          </select>
        </Col>

        <Col xs={12} md={4} lg={3}>
          <div className="input-group">
            <input
              type="date"
              className="form-control bg-white bg-fix-dark border-fix-dark text-gix-dark"
              placeholder={intl.formatMessage({ id: "SelectDate" })}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </Col>
        <Col md={3} xs={12} lg={2} className="d-flex justify-content-end">
          <ul className="nav nav-pills mb-2 mb-sm-0 flex-nowrap p-0">
            <li className="nav-item m-0">
              <a
                className={`btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary me-3 ${
                  activeCaseView === CARDS ? "active" : ""
                }`}
                style={{ backgroundColor: "white" }}
                data-bs-toggle="tab"
                href="#kt_project_users_card_pane"
                onClick={() => setActiveCaseView(CARDS)}
              >
                <span className="svg-icon svg-icon-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                  >
                    <g
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <rect
                        x="5"
                        y="5"
                        width="5"
                        height="5"
                        rx="1"
                        fill="currentColor"
                      ></rect>
                      <rect
                        x="14"
                        y="5"
                        width="5"
                        height="5"
                        rx="1"
                        fill="currentColor"
                        opacity="0.3"
                      ></rect>
                      <rect
                        x="5"
                        y="14"
                        width="5"
                        height="5"
                        rx="1"
                        fill="currentColor"
                        opacity="0.3"
                      ></rect>
                      <rect
                        x="14"
                        y="14"
                        width="5"
                        height="5"
                        rx="1"
                        fill="currentColor"
                        opacity="0.3"
                      ></rect>
                    </g>
                  </svg>
                </span>
              </a>
            </li>
            <li className="nav-item m-0">
              <a
                className={`btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary me-3 ${
                  activeCaseView === TABLE ? "active" : ""
                }`}
                data-bs-toggle="tab"
                href="#kt_project_users_table_pane"
                onClick={() => setActiveCaseView(TABLE)}
                style={{ backgroundColor: "white" }}
              >
                <span className="svg-icon svg-icon-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z"
                      fill="currentColor"
                    ></path>
                    <path
                      opacity="0.3"
                      d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
              </a>
            </li>
          </ul>
        </Col>
      </Row>

      <Row className="mx-2 "
      >
        <div className="mb-3 mt-5">
        {loading? (
            <div className="d-flex gap-4 justify-content-center align-items-center py-4">
              {intl.formatMessage({ id: "DataIsLoaded..." })}
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <>
               {activeCaseView === CARDS ? (
            <DropDownDoc
              {...{
                searchQuery,
                lK_AttachmentSourceId,
                date,
                isConsultive,
                isLawyerToTakeAction,
                isDataEntry,
                isOwnerOrSuperVisor,
              }}
            />
          ) : (
            <DocTable
              {...{
                searchQuery,
                lK_AttachmentSourceId,
                date,
                isConsultive,
                isLawyerToTakeAction,
                 isDataEntry,
                isOwnerOrSuperVisor,
              }}
            />
          )}
            </>
          )}
        </div>
      </Row>

      <AddCauseStageDocPopup
        show={addShowDoc}
        handleClose={() => setAddShowDoc(false)}
        causeStageId={showAddDocForCause ? caseData?.causeStages[0]?.id : ""}
      />
    </Row>
  );
}

export default DocumentBody;
