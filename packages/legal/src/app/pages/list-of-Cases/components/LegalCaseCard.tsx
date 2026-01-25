import { Card, Col, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { getStyleByStatus } from "@4eplatform/shared/functions/getStyleByStatus";
import { CasesTableActions } from "./CasesTableActions";
import moment from "moment";
import "moment/locale/ar";
import { useIntl } from "react-intl";
import causeStatus from "./../../../../../../shared/functions/causeStatus";
import convertNullString from "../../../../../../shared/functions/convertNullString";

export const LegalCaseCard = ({
  cause,
  callingData,
}: {
  cause: any;
  callingData?: any;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  let intl = useIntl();
  moment.locale("en");
  let language = intl.locale;
  const handleNavigate = (item: any) => {
    navigate(`/cases-view/list-of-cases/${item?.id}${location.search}`, {
      state: { item: item },
    });
  };
  let allAssignees = cause?.dataEntries
    ?.concat(cause?.owner)
    ?.concat(cause?.superVisor as any)
    ?.concat(cause?.lawyers)
    ?.filter((assignee) => assignee?.firstName && assignee?.secondName);
  const causeLawyers = cause?.lawyers?.filter((lawyer)=> lawyer && lawyer?.firstName && lawyer?.secondName)
  return (
    <Col md={6} lg={4}>
      <Card
        className="p-3 bg-gray-100 rounded p-4 h-100 cursor-pointer"
        onClick={() => {
          handleNavigate(cause);
        }}
        style={{ border: "1px solid #ccc", boxShadow: "none" }}
      >
        <Row className="align-items-center mb-4">
          <div className="col-10 d-flex gap-2">
            <div
              className={`mx-0 badge badge-light-primary text-primary fw-bolder`}
            >
              <div className="p-1">
                {" "}
                {intl.formatMessage({ id: "CauseStage" })}
                {language == "ar"
                  ? cause?.lk_StageNameAr
                  : cause?.lk_StageNameEn}
              </div>
            </div>
            <div
              className={`mx-0 rounded-3 badge-${getStyleByStatus(
                causeStatus(cause?.causeStatus, intl)?.statusEnum as number
              )} fw-bolder d-flex align-items-center justify-content-center`}
              style={{ width: "90px" }}
            >
              <div className="fw-bolder fs-8 px-4 py-1">
                {causeStatus(cause?.causeStatus, intl)?.name}
              </div>
            </div>
          </div>
          <div
            className="col-2 text-muted"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <CasesTableActions
              id={cause?.id}
              handleNavigate={() => handleNavigate(cause)}
              status={causeStatus(cause?.causeStatus, intl)?.name as string}
              callingData={callingData}
            />
          </div>
        </Row>
        <div
          onClick={() => handleNavigate(cause)}
          className="text-primary cursor-pointer"
        >
          <div className="mb-3 fs-4 fw-bolder">{cause?.title}</div>
        </div>

        {cause?.causeNumber ||
        cause?.causeDate ||
        cause?.lK_CauseCategoriesNameAr ||
        cause?.lK_CauseCategoriesNameEn ? (
          <>
            <p className="text-muted" dir="ltr">
              {cause?.causeNumber} |{" "}
              {intl.locale == "ar"
                ? cause?.lK_CauseCategoriesNameAr
                : cause?.lK_CauseCategoriesNameEn}{" "}
              | {moment(cause?.causeDate).format("DD MMM YYYY")}
            </p>
          </>
        ) : (
          <></>
        )}

        <div className="p-3 bg-body border border-1 rounded-2">
          <Row>
            <Col>
              <div className="rounded-2 d-flex flex-column fs-6">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center gap-4  fw-bolder">
                    <div className="fs-6 text-muted">
                      {cause?.client?.length > 0
                        ? cause?.client[0]
                        : intl.formatMessage({ id: "NotFound" })}
                    </div>
                    {cause?.client?.length > 1 && (
                      <div className="rounded-circle bg-primary w-25px h-25px d-flex justify-content-center align-items-center text-white">
                        {cause?.client?.length - 1}+
                      </div>
                    )}
                  </div>
                  <div className="mx-0 bg-gray-100 py-1 px-2 fw-bolder fs-7 text-primary rounded-2 border">
                    {cause?.clientType == "Plaintiff"
                      ? intl.formatMessage({ id: "Respondent" })
                      : intl.formatMessage({ id: "Claimant" })}
                  </div>
                </div>
                {cause?.opponent?.length > 0 && (
                  <>
                    {" "}
                    <div className="mb-2 fs-7 text-muted">
                      {intl.formatMessage({ id: "Opponents" })}:
                    </div>
                    <div className="d-flex align-items-center gap-4 fw-bolder fs-5">
                      <div className="fs-6 text-muted">
                        {cause?.opponent[0]}
                      </div>
                      {cause?.opponent?.length > 1 && (
                        <div className="rounded-circle bg-primary w-25px h-25px d-flex justify-content-center align-items-center text-white">
                          {cause?.opponent?.length - 1}+
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </div>

        {/* {allAssignees?.length > 0 && (
          <>
            <div className="p-3 bg-body border rounded-2 border-1 mt-3">
              <Row>
                <Col>
                  <div className="rounded-2 d-flex align-items-center gap-4">
                    <div className="d-flex align-items-center gap-2">
                      <div className="text-muted">
                        {intl.formatMessage({ id: "AssignedTo" })}
                      </div>
                      <div className="d-flex align-items-center gap-3 fw-bolder fs-6">
                        <div className="fs-6 text-muted">
                          {convertNullString(allAssignees[0]?.firstName) +
                            "  " +
                            convertNullString(allAssignees[0]?.secondName)}
                        </div>

                        {allAssignees?.length > 1 && (
                          <div className="rounded-circle bg-primary w-25px h-25px d-flex justify-content-center align-items-center text-white">
                            {allAssignees?.length - 1}+
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </>
        )} */}
        {causeLawyers?.length > 0 ? (
          <>
            <div className="p-3 bg-body border rounded-2 border-1 mt-3">
              <Row>
                <Col>
                  <div className="rounded-2 d-flex align-items-center gap-4">
                    <div className="d-flex align-items-center gap-2">
                      <div className="text-muted">
                        {intl.formatMessage({ id: "Counselor" })}{ " : "}
                      </div>
                      <div className="d-flex align-items-center gap-3 fw-bolder fs-6">
                        <div className="fs-6 text-muted">
                          {convertNullString(causeLawyers[0]?.firstName) +
                            "  " +
                            convertNullString(causeLawyers[0]?.secondName)}
                        </div>

                        {causeLawyers?.length > 1 && (
                          <div className="rounded-circle bg-primary w-25px h-25px d-flex justify-content-center align-items-center text-white">
                            {causeLawyers?.length - 1}+
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </>
        ):
          <>
            <div className="p-3 bg-body border rounded-2 border-1 mt-3">
              <Row>
                <Col>
                  <div className="rounded-2 d-flex align-items-center gap-4">
                    <div className="d-flex align-items-center gap-2">
                      <div className="text-muted">
                        {intl.formatMessage({ id: "Counselor" })} { " : "}
                      </div>
                      <div className="d-flex align-items-center gap-3 fw-bolder fs-6">
                        <div className="fs-6 text-muted">
                          - - - - -
                        </div>


                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </> }
        
     
            <div className="p-3 bg-body border rounded-2 border-1 mt-3">
              <Row>
                <Col>
                  <div className="rounded-2 d-flex align-items-center gap-4">
                    <div className="d-flex align-items-center gap-2">
                      <div className="text-muted">
                        {intl.formatMessage({ id: "nextSessionDate" })}{ " : "}
                      </div>
                      <div className="d-flex align-items-center gap-3 fw-bolder fs-6">
                        <div className="fs-6 text-muted">
                       {cause?.nextSessionDate && cause?.nextSessionDate !== "0001-01-01T00:00:00"
                          ? moment(cause?.nextSessionDate).locale(intl.locale).format('DD MMM YYYY')
                         : " - - - - -"}
                        </div>

                 
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
   
      
      </Card>
    </Col>
  );
};

export default LegalCaseCard;
