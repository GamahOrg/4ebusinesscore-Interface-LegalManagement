import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Col, Row, Form } from "react-bootstrap";

export default function CliamDataAddLAsuit2() {
  const intl = useIntl();
  const [caseNumber, setCaseNumber] = useState("");
  const [circle, setCircle] = useState("");
  const [subjectOfTheLawsuit, setSubjectOfTheLawsuit] = useState("");
  const [plaintiffName, setPlaintiffName] = useState("");
  const [dateOfTheCase, setDateOfTheCase] = useState("");

  return (
    <>
      <div className="bg-light pt-5 mb-9 pb-5 pe-4 rounded mt-8">
        <div className="card card-xl-stretch mb-xl-8"></div>
        <div className="main-container-followLawsuits p-7 mb-6">
          <h4 className="main-title-lawsuit">
            {intl.formatMessage({ id: "Lawist" })}
          </h4>
          <div className="row">
            <div className="col-md-4 col-12 mt-4">
              <label htmlFor="caseNumber" className="form-label px-2 fontSz-6">
                {intl.formatMessage({ id: "CaseNumber" })}
              </label>
              <div className="input-group bg-white">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="special fas fa-signature"></i>
                  </span>
                </div>
                <input
                  id="caseNumber"
                  type="text"
                  className="form-control"
                  placeholder={intl.formatMessage({
                    id: "EnterInvitationNumber",
                  })}
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4 col-12 mt-4">
              <label
                htmlFor="DateOfTheCase"
                className="form-label px-2 fontSz-6"
              >
                {intl.formatMessage({ id: "DateOfTheCase" })}
              </label>
              <div className="input-group">
                <div className="input-group-prepend"></div>
                <input
                  id="DateOfTheCase"
                  type="date"
                  className="form-control"
                  value={dateOfTheCase}
                  onChange={(e) => setDateOfTheCase(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4 col-12 mt-4">
              <Form.Group as={Col} md={12} controlId="lawsuitType">
                <Form.Label>{intl.formatMessage({ id: "Gender" })}</Form.Label>
                <Form.Select>
                  <option>{intl.formatMessage({ id: "SelectTheType" })}</option>
                  <option value="type1">
                    {intl.formatMessage({ id: "Type1" })}
                  </option>
                  <option value="type2">
                    {intl.formatMessage({ id: "Type2" })}
                  </option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-12 mt-8">
              <Form.Group as={Col} md={12} controlId="lawsuitType">
                <Form.Label>
                  {intl.formatMessage({ id: "CompetentCourt" })}
                </Form.Label>
                <Form.Select>
                  <option>{intl.formatMessage({ id: "SelectTheType" })}</option>
                  <option value="Alia">
                    {intl.formatMessage({ id: "Alia" })}
                  </option>
                  <option value="ElementaryCourt">
                    {intl.formatMessage({ id: "ElementaryCourt" })}
                  </option>
                  <option value="Appeal">
                    {intl.formatMessage({ id: "Appeal" })}
                  </option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-4 col-12 mt-8">
              <label htmlFor="TheCircle" className="form-label px-2 fontSz-6">
                {intl.formatMessage({ id: "TheCircle" })}
              </label>
              <div className="input-group bg-white">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="special fas fa-layer-group"></i>
                  </span>
                </div>
                <input
                  id="TheCircle"
                  type="text"
                  className="form-control"
                  placeholder={intl.formatMessage({
                    id: "EnterTheCircle",
                  })}
                  value={circle}
                  onChange={(e) => setCircle(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4 col-12 mt-8">
              <Form.Group as={Col} md={12} controlId="lawsuitType">
                <Form.Label>
                  {intl.formatMessage({ id: "TypeOfLawsuit" })}
                </Form.Label>
                <Form.Select>
                  <option>{intl.formatMessage({ id: "SelectTheType" })}</option>
                  <option value="ObjectionToAnAdministrativeDecision">
                    {intl.formatMessage({
                      id: "ObjectionToAnAdministrativeDecision",
                    })}
                  </option>
                  <option value="RealEstateContributions">
                    {intl.formatMessage({ id: "RealEstateContributions" })}
                  </option>
                  <option value="SaleAndRentOnTheMap">
                    {intl.formatMessage({ id: "SaleAndRentOnTheMap" })}
                  </option>
                  <option value="StateProperties">
                    {intl.formatMessage({ id: "StateProperties" })}
                  </option>
                  <option value="Rent">
                    {intl.formatMessage({ id: "Rent" })}
                  </option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-12 mt-8">
              <label
                htmlFor="SubjectOfTheLawsuit"
                className="form-label px-2 fontSz-6"
              >
                {intl.formatMessage({ id: "SubjectOfTheLawsuit" })}
              </label>
              <div className="input-group bg-white">
                <textarea
                  id="SubjectOfTheLawsuit"
                  className="form-control"
                  placeholder={intl.formatMessage({ id: "EnterTheTopic" })}
                  value={subjectOfTheLawsuit}
                  onChange={(e) => setSubjectOfTheLawsuit(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="main-container-followLawsuits p-7 mb-6">
          <h4 className="main-title-lawsuit">
            {intl.formatMessage({ id: "Defendant2" })}
          </h4>
          <div className="row">
            <div className="col-md-4 col-12 mt-4">
              <label
                htmlFor="DefendantName2"
                className="form-label px-2 fontSz-6"
              >
                {intl.formatMessage({ id: "DefendantName2" })}
              </label>
              <div className="input-group bg-white">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="special fas fa-user"></i>
                  </span>
                </div>
                <input
                  id="DefendantName2"
                  type="text"
                  className="form-control"
                  placeholder={intl.formatMessage({
                    id: "EnterTheNameOfThePlaintiff",
                  })}
                  value={plaintiffName}
                  onChange={(e) => setPlaintiffName(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="main-container-followLawsuits p-7 mb-6">
          <h4 className="main-title-lawsuit">
            {intl.formatMessage({ id: "Assign" })}
          </h4>
          <div className="row">
            <div className="col-md-4 col-12 mt-4">
              <Form.Group as={Col} md={12} controlId="lawsuitType">
                <Form.Label>
                  {intl.formatMessage({ id: "TheSubject" })}
                </Form.Label>
                <Form.Select>
                  <option>
                    {intl.formatMessage({ id: "SelectEmployee" })}
                  </option>
                  <option value="Employee1">
                    {intl.formatMessage({ id: "Employee1" })}
                  </option>
                  <option value="Employee2">
                    {intl.formatMessage({ id: "Employee2" })}
                  </option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>
        </div>
        <div className="main-container-followLawsuits p-7 mb-6">
          <Row>
            <Col className="pt-6 ps-2 " lg={12}>
              <h3>{intl.formatMessage({ id: "Session1" })}</h3>
            </Col>
          </Row>
          <Row>
            <Col lg={4} className="h-auto mt-5">
              <Form.Group controlId="caseNumberInput">
                <Form.Label className="mb-3">
                  {intl.formatMessage({ id: "SessionDate" })}
                </Form.Label>
                <div className="input-group">
                  <Form.Control
                    type="date"
                    className="bg-white"
                    placeholder={intl.formatMessage({ id: "SessionDate" })}
                  />
                </div>
              </Form.Group>
            </Col>
            <Col lg={4} className="h-auto mt-5">
              <Form.Group controlId="caseDaySelect">
                <Form.Label className="mb-3">
                  {intl.formatMessage({ id: "SessionDay" })}
                </Form.Label>
                <div className="input-group">
                  <select className="form-select bg-white">
                    <option value="sunday">
                      {intl.formatMessage({ id: "Sunday" })}
                    </option>
                    <option value="monday">
                      {intl.formatMessage({ id: "Monday" })}
                    </option>
                    <option value="tuesday">
                      {intl.formatMessage({ id: "Tuesday" })}
                    </option>
                    <option value="wednesday">
                      {intl.formatMessage({ id: "Wednesday" })}
                    </option>
                    <option value="thursday">
                      {intl.formatMessage({ id: "Thursday" })}
                    </option>
                    <option value="friday">
                      {intl.formatMessage({ id: "Friday" })}
                    </option>
                    <option value="saturday">
                      {intl.formatMessage({ id: "Saturday" })}
                    </option>
                  </select>
                </div>
              </Form.Group>
            </Col>
            <Col lg={4} className="h-auto mt-5">
              <Form.Group controlId="caseNumberInput">
                <Form.Label className="mb-3">
                  {intl.formatMessage({ id: "SessionTime" })}
                </Form.Label>
                <div className="input-group">
                  <Form.Control
                    type="time"
                    className="bg-white"
                    placeholder={intl.formatMessage({ id: "SessionTime" })}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
