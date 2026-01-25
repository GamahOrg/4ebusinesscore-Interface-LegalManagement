import { FC, useState } from "react";
import { useIntl } from "react-intl";

import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import { Link } from "react-router-dom";
import { Form, Col } from "react-bootstrap";
import { AddPopup } from "@4eplatform/shared/src/popups/AddPopup";

const AddAnIncomingClaim: FC = () => {
  const intl = useIntl();
  const [caseNumber, setCaseNumber] = useState("");
  const [circle, setCircle] = useState("");
  const [subjectOfTheLawsuit, setSubjectOfTheLawsuit] = useState("");
  const [plaintiffName, setPlaintiffName] = useState("");
  const [sessionDate, setSessionDate] = useState("");
  const [dateOfTheCase, setDateOfTheCase] = useState("");
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState("");
  const [modalAddShow, setModalAddShow] = useState<boolean>(false);
  const daysOfWeek = [
    { value: "saturday", label: intl.formatMessage({ id: "Saturday" }) },
    { value: "sunday", label: intl.formatMessage({ id: "Sunday" }) },
    { value: "monday", label: intl.formatMessage({ id: "Monday" }) },
    { value: "tuesday", label: intl.formatMessage({ id: "Tuesday" }) },
    { value: "wednesday", label: intl.formatMessage({ id: "Wednesday" }) },
    { value: "thursday", label: intl.formatMessage({ id: "Thursday" }) },
    { value: "friday", label: intl.formatMessage({ id: "Friday" }) },
  ];
  const handleSelectChangeDays = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDay(event.target.value);
  };

  return (
    <>
      <GenericToolbar
        list={[
          { key: "ListOfClaims", value: "/list-of-claims" },
          { key: "AddAnIncomingClaim", value: "/add-incoming-claim" },
        ]}
      />
      <div className="card card-xl-stretch mb-xl-8">
        <div className="card-Systems-Header d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column mt-5">
            <h1 className="text-right">
              <span className="fs-2 mt-3 mb-1">
                {intl.formatMessage({ id: "AddAnIncomingClaim" })}
              </span>
            </h1>
            <h1 className="card-title">
              <span className="fw-semibold fs-6 text-muted">
                {intl.formatMessage({
                  id: "EnterTheFollowingInformationToAddTheClaim",
                })}
              </span>
            </h1>
          </div>
        </div>
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
            {intl.formatMessage({ id: "Imputation" })}
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
          <h4 className="main-title-lawsuit">
            {intl.formatMessage({ id: "Session1" })}
          </h4>
          <div className="row align-items-center">
            <div className="col-md-4 col-12 mt-2">
              <label
                htmlFor="DateOfTheCase"
                className="form-label px-2 fontSz-6"
              >
                {intl.formatMessage({ id: "SessionDate" })}
              </label>
              <div className="input-group">
                <input
                  id="DateOfTheCase"
                  type="date"
                  className="form-control"
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4 col-12 mt-4">
              <Form.Group as={Col} md={12} controlId="lawsuitType">
                <Form.Label>
                  {intl.formatMessage({ id: "SessionDay" })}
                </Form.Label>
                <Form.Select
                  value={selectedDay}
                  onChange={handleSelectChangeDays}
                >
                  <option>{intl.formatMessage({ id: "ChooseToday" })}</option>{" "}
                  {daysOfWeek.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-4 col-12 mt-6">
              <Form.Group as={Col} md={12} controlId="sessionTime">
                <Form.Label>
                  {intl.formatMessage({ id: "SessionTime" })}
                </Form.Label>
                <Form.Control
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end mx-10 mt-3 mb-10">
          <Link to="/list-of-claims?tab=incoming">
            <button className="btn btn-secondary style-button-invitation-details me-2">
              {intl.formatMessage({ id: "Cancel" })}
            </button>
          </Link>
          <button
            className="btn btn-success style-button-invitation-details"
            onClick={() => {
              setModalAddShow(true);
            }}
          >
            {intl.formatMessage({ id: "Add" })}
          </button>
        </div>
      </div>

      <div className="modal fade" id="rega_modal_committeesAcceptUser">
        <AddPopup
          show={modalAddShow}
          handleClose={() => setModalAddShow(false)}
        />
      </div>
    </>
  );
};

export default AddAnIncomingClaim;
