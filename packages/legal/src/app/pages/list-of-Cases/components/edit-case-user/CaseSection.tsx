import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Col, Row, Form } from "react-bootstrap";
export default function CaseSection() {
  const intl = useIntl();
  const [caseTitle, setCaseTitle] = useState("");
  const [incidentLocation, setIncidentLocation] = useState("");
  const [topic, setTopic] = useState("");
  const [showInputs, setShowInputs] = useState("TheStudy");

  return (
    <>
      <div className="rounded-2 mx-10 mt-15 case-section-style-responsive">
        <div className="p-7 bg-gray-100 rounded-2 w-100">
          <h4 className="main-title-lawsuit mt-1 fs-4">
            {intl.formatMessage({ id: "TheCase" })}
          </h4>
          <div className="row">
            <div className="col-md-12 col-12">
              <label htmlFor="CaseTitle" className="form-label px-2 fontSz-6">
                {intl.formatMessage({ id: "CaseTitle" })}
                <span className="text-danger mx-2">*</span>
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="special fas fa-layer-group"></i>
                  </span>
                </div>
                <input
                  id="CaseTitle"
                  type="text"
                  className="form-control"
                  placeholder={intl.formatMessage({
                    id: "EnterTheAddress",
                  })}
                  value={caseTitle}
                  onChange={(e) => setCaseTitle(e.target.value)}
                />
              </div>
            </div>
          </div>
          <Row>
            <Col lg={4} className="h-auto mt-5">
              <Form.Group controlId="caseNumberInput">
                <Form.Label className="mb-3">
                  {intl.formatMessage({ id: "IncidentDate" })}
                  <span className="text-danger mx-2">*</span>
                </Form.Label>
                <div className="input-group">
                  <Form.Control
                    type="date"
                    className="bg-white"
                    placeholder={intl.formatMessage({ id: "IncidentDate" })}
                  />
                </div>
              </Form.Group>
            </Col>
            <Col lg={4} className="h-auto mt-5">
              <Form.Group controlId="caseDaySelect">
                <Form.Label className="mb-3">
                  {intl.formatMessage({ id: "CaseClassification" })}
                </Form.Label>
                <div className="input-group">
                  <select className="form-select">
                    <option value="">
                      {intl.formatMessage({ id: "SelectCategory" })}
                    </option>
                    <option value="#1"> # 1</option>
                    <option value="#2"> # 2</option>
                    <option value="#3"> # 3</option>
                    <option value="#4"> # 4</option>
                  </select>
                </div>
              </Form.Group>
            </Col>
            <Col lg={4} className="h-auto mt-5">
              <label
                htmlFor="IncidentLocation"
                className="form-label px-2 fontSz-6"
              >
                {intl.formatMessage({ id: "IncidentLocation" })}
                <span className="text-danger mx-2">*</span>
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-map-marker-alt fs-3"></i>
                  </span>
                </div>
                <input
                  id="IncidentLocation"
                  type="text"
                  className="form-control"
                  placeholder={intl.formatMessage({
                    id: "EnterTheSite",
                  })}
                  value={incidentLocation}
                  onChange={(e) => setIncidentLocation(e.target.value)}
                />
              </div>
            </Col>
          </Row>
          <div className="row">
            <div className="col-md-12 col-12 mt-6">
              <label htmlFor="Topic" className="form-label px-2 fontSz-6">
                {intl.formatMessage({ id: "Topic" })}
                <span className="text-danger mx-2">*</span>
              </label>
              <div className="input-group">
                <textarea
                  id="Topic"
                  className="form-control"
                  placeholder={intl.formatMessage({ id: "EnterTheTopic" })}
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </div>
          <Row>
            <Col lg={4} className="h-auto mt-5">
              <Form.Group controlId="caseDaySelect">
                <Form.Label className="mb-3">
                  {intl.formatMessage({ id: "CaseDegree" })}
                  <span className="text-danger mx-2">*</span>
                </Form.Label>
                <div className="input-group">
                  <select
                    className="form-select"
                    onChange={(e) => setShowInputs(e.target.value)}
                    value={showInputs}
                  >
                    <option value="TheStudy">
                      {intl.formatMessage({ id: "TheStudy" })}
                    </option>
                    <option value="Claim#1">
                      {intl.formatMessage({ id: "Claim#1" })}
                    </option>
                    <option value="Claim#2">
                      {intl.formatMessage({ id: "Claim#2" })}
                    </option>
                    <option value="Claim#3">
                      {intl.formatMessage({ id: "Claim#3" })}
                    </option>
                    <option value="Claim#4">
                      {intl.formatMessage({ id: "Claim#4" })}
                    </option>
                    <option value="Claim#5">
                      {intl.formatMessage({ id: "Claim#5" })}
                    </option>
                    <option value="Claim#6">
                      {intl.formatMessage({ id: "Claim#6" })}
                    </option>
                  </select>
                </div>
              </Form.Group>
            </Col>

          </Row>
        </div>
      </div>
    </>
  );
}
