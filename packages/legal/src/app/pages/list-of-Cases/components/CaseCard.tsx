import { ReactNode } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useIntl } from "react-intl";

interface ResponsibleInfo {
  name: string;
  department?: string;
}

interface ScheduleInfo {
  date: string;
  day: string;
  time: string;
}

interface CaseCardProps {
  bgColor?: string | undefined;
  caseTitle: string | undefined;
  caseNumber?: string | undefined;
  responsibleInfo: ResponsibleInfo | undefined;
  scheduleInfo: ScheduleInfo | undefined;
  AdditionalData?: ReactNode;
}

const CaseCard = ({
  bgColor = "primary",
  caseTitle,
  caseNumber,
  responsibleInfo,
  scheduleInfo,
  AdditionalData,
}: CaseCardProps) => {
  const intl = useIntl();
  return (
    <Card className={`mb-3 bg-light-${bgColor} border border-${bgColor}`}>
      <Card.Body>
        <Row className="align-items-center">
          <Col md={8}>
            <div className="fs-3 fw-bolder text-dark">
              {caseTitle}{" "}
              <span className="text-primary">
                {" "}
                {caseNumber && <>({caseNumber})</>}
              </span>
            </div>
          </Col>
          <div className="d-flex flex-md-nowrap flex-wrap justify-content-between mt-3">
            <div className="text-muted fs-6">
              {intl.formatMessage({ id: "Administrator" })}:{" "}
              <span className="fs-5 fw-bolder text-dark">
                {responsibleInfo?.name}{" "}
              </span>
              {responsibleInfo?.department && (
                <>({responsibleInfo?.department})</>
              )}
            </div>

            <div className="text-muted fs-6">
              {intl.formatMessage({ id: "Date" })}:{" "}
              <span className="fw-bolder text-dark">{scheduleInfo?.day}</span>
              <span className="text-dark"> | </span>
              <span className="fw-bolder text-dark">{scheduleInfo?.date}</span>
              <span className="text-dark"> | </span>
              {intl.formatMessage({ id: "Time" })}:{" "}
              <span className="fw-bolder text-dark">{scheduleInfo?.time}</span>
            </div>
          </div>
        </Row>
        {AdditionalData && (
          <>
            <hr />
            {AdditionalData}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default CaseCard;
