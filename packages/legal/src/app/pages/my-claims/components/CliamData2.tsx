import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useIntl } from "react-intl";
import { ShowMore } from "../propus/ShowMore";

export default function CliamData2() {
  const intl = useIntl();
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  const handleShow = () => setShowModal(true);
  return (
    <>
      <Container className="main-container-followLawsuits p-7">
        <h4 className="main-title-lawsuit">
          {intl.formatMessage({ id: "TheNote" })}
        </h4>
        <Row className="mt-3">
          <Col md={4} className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "StudyClaimNumber" })}
            </p>
            <span className="mx-2">:</span>
            <p className="lawsuit-text-left">746578345</p>
          </Col>
          <Col md={4} className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "StudyClaimDate" })}
            </p>
            <span className="mx-2">:</span>
            <p className="lawsuit-text-left">23/8/2024</p>
          </Col>
        </Row>

        <div className="mt-4 mb-9">
          <p className="text-gray-400">
            {intl.formatMessage({ id: "StudyClaimInfo" })}
          </p>
          <p className="lawsuit-text-left">
            {intl.formatMessage({
              id: "TextOfTheLawsuitMemorandumIssuedLawsuits",
            })}
            <span
              className="text-primary ms-1"
              onClick={handleShow}
              style={{ cursor: "pointer" }}
            >
              {intl.formatMessage({ id: "ReadMoreCourse" })}
            </span>{" "}
          </p>
        </div>
        <ShowMore
          show={showModal}
          handleClose={handleClose}
          data="Some additional data"
        />
      </Container>

      <Container className="main-container-followLawsuits p-7 mt-7">
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
              {intl.formatMessage({ id: "CompetentCourt" })}
            </p>
            <span className="mx-2">:</span>
            <p className="lawsuit-text-left">
              {intl.formatMessage({ id: "Alia" })}
            </p>
          </Col>
          <Col md={4} className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "DateOfTheCase" })}
            </p>
            <span className="mx-2">:</span>
            <p className="lawsuit-text-left">23/8/2024</p>
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

      <Container className="main-container-followLawsuits p-7 mt-7">
        <h4 className="main-title-lawsuit">
          {intl.formatMessage({ id: "Defendant" })}
        </h4>
        <Row className="mt-3">
          <Col md={4} className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "DefendantName" })}
            </p>
            <span className="mx-2">:</span>
            <p className="lawsuit-text-left">
              {intl.formatMessage({ id: "AbdulrahmanFaisal" })}
            </p>
          </Col>
          <Col md={4} className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "IDNumber" })}
            </p>
            <span className="mx-2">:</span>
            <p className="lawsuit-text-left">454645756</p>
          </Col>
          <Col md={4} className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "Defendant'sIDType" })}
            </p>
            <span className="mx-2">:</span>
            <p className="lawsuit-text-left">
              {intl.formatMessage({ id: "NationalIdentity" })}
            </p>
          </Col>
          <Col md={4} className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "Email" })}
            </p>
            <span className="mx-2">:</span>
            <p className="lawsuit-text-left">abd.fasal@gmail.com</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
