import { useIntl } from "react-intl";
import {  Row, Col } from 'react-bootstrap';

export default function LawistData2() {
    const intl = useIntl();
  return (
    <div className="pb-7">
  <div className="main-container-followLawsuits p-7">
      <h4 className="main-title-lawsuit mt-5">
        {intl.formatMessage({ id: "Lawist" })}
      </h4>

      <Row className="justify-content-between w-80 mt-3">
        <Col md="4" className="d-flex">
          <p className="text-gray-400">
            {intl.formatMessage({ id: "CaseNumber" })}
          </p>
          <span className="ms-2 me-2">:</span>
          <p className="lawsuit-text-left">12345678</p>
        </Col>

        <Col md="4" className="d-flex">
          <p className="text-gray-400">
            {intl.formatMessage({ id: "DateOfTheCase" })}
          </p>
          <span className="ms-2 me-2">:</span>
          <p className="lawsuit-text-left">
            {intl.formatMessage({ id: "DateOfTheCase2" })}
          </p>
        </Col>

        <Col md="4" className="d-flex">
          <p className="text-gray-400">
            {intl.formatMessage({ id: "Gender" })}
          </p>
          <span className="ms-2 me-2">:</span>
          <p className="lawsuit-text-left">
            {intl.formatMessage({ id: "administrative" })}
          </p>
        </Col>
      </Row>

      <Row className="justify-content-between w-80 mt-3">
        <Col md="4" className="d-flex">
          <p className="text-gray-400">
            {intl.formatMessage({ id: "TheCourt" })}
          </p>
          <span className="ms-2 me-2">:</span>
          <p className="lawsuit-text-left">
            {intl.formatMessage({ id: "Alia" })}
          </p>
        </Col>

        <Col md="4" className="d-flex">
          <p className="text-gray-400">
            {intl.formatMessage({ id: "TheCircle" })}
          </p>
          <span className="ms-2 me-2">:</span>
          <p className="lawsuit-text-left">
            {intl.formatMessage({ id: "Fifteen" })}
          </p>
        </Col>

        <Col md="4" className="d-flex">
          <p className="text-gray-400">
            {intl.formatMessage({ id: "TypeOfLawsuit" })}
          </p>
          <span className="ms-2 me-2">:</span>
          <p className="lawsuit-text-left">
            {intl.formatMessage({ id: "ObjectionToAnAdministrativeDecision" })}
          </p>
        </Col>
      </Row>

      <Row className="mt-4 mb-9">
        <Col>
          <p className="text-gray-400">
            {intl.formatMessage({ id: "SubjectOfTheLawsuit" })}
          </p>
          <p className="lawsuit-text-left">
            {intl.formatMessage({ id: "paragraphOfLawsuit" })}
          </p>
        </Col>
      </Row>
    </div>



      <div className="main-container-followLawsuits mt-8 ">
        <h4 className="main-title-lawsuit">
          {intl.formatMessage({ id: "Defendant2" })}
        </h4>

        <div className="d-flex justify-content-between w-80 ">
          <div className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "Name" })}
            </p>
            <span className="ms-2 me-2">:</span>
            <p className="lawsuit-text-left">{intl.formatMessage({ id: "AbdullahbinMohammedbinIbrahim" })}</p>
          </div>

          <div className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "IdentityType" })}
            </p>
            <span className="ms-2 me-2">:</span>
            <p className="lawsuit-text-left"> {intl.formatMessage({ id: "One" })}</p>
          </div>

          <div className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "IDNumber" })}
            </p>
            <span className="ms-2 me-2">:</span>
            <p className="lawsuit-text-left">
              12345678
            </p>
          </div>


          <div className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "Email" })}
            </p>
            <span className="ms-2 me-2">:</span>
            <p className="lawsuit-text-left">
            Abd.fasl@gmail.com
            </p>
          </div>
        </div>
      </div>




    </div>
  )
}
