import { Container, Row, Col } from "react-bootstrap";
import { useIntl } from "react-intl";

export default function CliamData2() {
  const intl = useIntl();
  return (
    <>
      <Container className="main-container-followLawsuits p-7">
        <h4 className="main-title-lawsuit">
          {intl.formatMessage({ id: "Lawist" })}
        </h4>
        <Row className="mt-3">
          <Col md={4} className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "CaseNumber" })}
            </p>
            <span className="mx-2">:</span>
            <p className="lawsuit-text-left">746578345</p>
          </Col>
          <Col md={4} className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "DateOfTheCase" })}
            </p>
            <span className="mx-2">:</span>
            <p className="lawsuit-text-left">23/8/2024</p>
          </Col>
          <Col md={4} className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "Gender" })}
            </p>
            <span className="mx-2">:</span>
            <p className="lawsuit-text-left">
              {intl.formatMessage({ id: "administrative" })}
            </p>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={4} className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "TheCourt" })}
            </p>
            <span className="mx-2">:</span>
            <p className="lawsuit-text-left">
              {intl.formatMessage({ id: "Alia" })}
            </p>
          </Col>
          <Col md={4} className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "TheCircle" })}
            </p>
            <span className="mx-2">:</span>
            <p className="lawsuit-text-left">
              {intl.formatMessage({ id: "Fifteen" })}
            </p>
          </Col>
          <Col md={4} className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "TypeOfLawsuit" })}
            </p>
            <span className="mx-2">:</span>
            <p className="lawsuit-text-left">
              {intl.formatMessage({
                id: "ObjectionToAnAdministrativeDecision",
              })}
            </p>
          </Col>
        </Row>

        <div className="mt-4 mb-9">
          <p className="text-gray-400">
            {intl.formatMessage({ id: "SubjectOfTheLawsuit" })}
          </p>
          <p className="lawsuit-text-left">
            {intl.formatMessage({ id: "paragraphOfLawsuit" })}
          </p>
        </div>
      </Container>
      <Container>
        <div className="main-container-followLawsuits2 p-7  mt-8">
          <h4 className="main-title-lawsuit">
            {intl.formatMessage({ id: "Defendant2" })}
          </h4>
          <Row className="mt-3">
            <Col md={3} className="d-flex">
              <p className="text-gray-400">
                {intl.formatMessage({ id: "Name" })}
              </p>
              <span className="mx-2">:</span>
              <p className="lawsuit-text-left">
                {intl.formatMessage({ id: "AbdullahFaisalAlGhamdi" })}
              </p>
            </Col>

            <Col md={3} className="d-flex">
              <p className="text-gray-400">
                {intl.formatMessage({ id: "IdentityType" })}
              </p>
              <span className="mx-2">:</span>
              <p className="lawsuit-text-left">
                {intl.formatMessage({ id: "One" })}
              </p>
            </Col>

            <Col md={3} className="d-flex">
              <p className="text-gray-400">
                {intl.formatMessage({ id: "IDNumber" })}
              </p>
              <span className="mx-2">:</span>
              <p className="lawsuit-text-left">495848678</p>
            </Col>
            <Col md={3} className="d-flex">
              <p className="text-gray-400">
                {intl.formatMessage({ id: "Email" })}
              </p>
              <span className="mx-2">:</span>
              <p className="lawsuit-text-left">abd.fasal@gmail.com</p>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
