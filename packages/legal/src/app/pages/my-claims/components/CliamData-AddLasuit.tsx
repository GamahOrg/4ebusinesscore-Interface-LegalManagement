import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Form, Col, Row } from "react-bootstrap";
import { ShowMore } from "../propus/ShowMore";

export default function CliamDataAddLAsuit() {
  const intl = useIntl();
  const [showModel, setShowModel] = useState(false);

  const study = {
    id: 2541851,
    info: `الموضوع: مذكرة رد على الدعوى العمالية المقدمة من المدعي (اسم المدعي) ضد المدعى المقدمة من المدعي (اسم المدعي) ضد المدعى عليه اسم المدعى علي الموضوع: مذكرة رد على الدعوى العمالية المقدمة من المدعي (اسم المدعي) ضد المدعى عليه اسم المدعى عليه الموضوع: مذكرة رد على الدعوى العمالية المقدمة من المدعي (اسم المدعي) ضد المدعى عليه اسم المدعى عليه`,
    created_at: "2022-01-01",
    status: "UnderSettlement",
  };

  const numbers = [
    { number: 123456, date: "2023-01-01" },
    { number: 123457, date: "2023-02-02" },
    { number: 123458, date: "2023-03-03" },
    { number: 123459, date: "2023-04-04" },
    { number: 123460, date: "2023-05-05" },
  ];

  const [selectedNumber, setSelectedNumber] = useState(numbers[0].number);
  const [selectedDate, setSelectedDate] = useState(numbers[0].date);

  const handleSelectChange = (e: any) => {
    const selectedNum = parseInt(e.target.value);
    const selectedItem = numbers.find((item) => item.number === selectedNum);
    setSelectedNumber(selectedNum);
    setSelectedDate(selectedItem?.date || "");
  };

  const [inputValue, setInputValue] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");

  const dropdownOptions2 = [
    `${intl.formatMessage({ id: "Nationaldentity" })}`,
    `${intl.formatMessage({ id: "ResidentID" })}`,
    `${intl.formatMessage({ id: "LicenseNumber" })}`,
    `${intl.formatMessage({ id: "CommercialRegister" })}`,
    `${intl.formatMessage({ id: "UnifiedNumber" })}`,
  ];
  const [selectedOption, setSelectedOption] = useState(dropdownOptions2[0]);
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  const dropdownOptions = [
    `${intl.formatMessage({ id: "ElementaryCourt" })}`,
    `${intl.formatMessage({ id: "Appeal" })}`,
    `${intl.formatMessage({ id: "Alia" })}`,
  ];

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    setInputValue1("");
    setInputValue2("");
  };

  const getSecondInputLabel = () => {
    if (
      selectedOption === intl.formatMessage({ id: "Nationaldentity" }) ||
      selectedOption === intl.formatMessage({ id: "ResidentID" })
    ) {
      return "أسم المدعي علية";
    }
    if (selectedOption === intl.formatMessage({ id: "LicenseNumber" })) {
      return "اسم الجمعية / المؤسسية";
    }
    if (
      selectedOption === intl.formatMessage({ id: "CommercialRegister" }) ||
      selectedOption === intl.formatMessage({ id: "UnifiedNumber" })
    ) {
      return "اسم الشركة";
    }
    return "";
  };
  const getFirstInputLabel = () => {
    if (
      selectedOption === intl.formatMessage({ id: "LicenseNumber" }) ||
      selectedOption === intl.formatMessage({ id: "UnifiedNumber" })
    ) {
      return selectedOption;
    }
    return `${intl.formatMessage({ id: "Number" })} ${selectedOption} `;
  };
  return (
    <>
      <div className="bg-light p-10 mb-9 pb-5 rounded ">
        <div className="mb-8 me-3">
          <h4 className=" fst-normal">
            {intl.formatMessage({ id: "TheNote" })}
          </h4>
        </div>

        <Row className="w-100">
          <Col md={3} className="">
            <Form.Group controlId="numberSelect">
              <Form.Label>
                {intl.formatMessage({ id: "StudyClaimNumber" })}
              </Form.Label>
              <Form.Select onChange={handleSelectChange} value={selectedNumber}>
                {numbers.map(({ number }) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={3} className="me-5">
            <Form.Group controlId="">
              <Form.Label>
                {intl.formatMessage({ id: "StudyClaimDate" })}
              </Form.Label>
              <Form.Control
                type="text"
                className="bg-secondary h-50 rounded pe-3 pt-3 lawsuit-text-left"
                value={selectedDate}
                readOnly
                disabled
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="mt-3 pb-5 fs-5">
          {intl.formatMessage({ id: "StudyClaimInfo" })}
          <div className="bg-secondary rounded  mt-3">
            <p className=" fw-normal  py-5 me-2">
              {study?.info?.slice(0, 200)}
              {study?.info?.length > 200 && (
                <span
                  className="mx-2 text-primary fw-normal cursor-pointer"
                  onClick={() => setShowModel(true)}
                >
                  {intl.formatMessage({ id: "ReadMore" })}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-light p-10 mb-9 pb-5 rounded ">
        <div className="mb-8">
          <h4 className=" fst-normal">
            {intl.formatMessage({ id: "Lawist" })}
          </h4>
        </div>
        <Row className="w-100">
          <Col md={4} className="mb-3">
            <Form.Group controlId="caseNumberInput">
              <Form.Label className="mb-3">
                {intl.formatMessage({ id: "CaseNumber" })}
              </Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-file-earmark-text"></i>
                </span>
                <Form.Control
                  type="text"
                  className="bg-white"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={intl.formatMessage({ id: "CaseNumber" })}
                />
              </div>
            </Form.Group>
          </Col>

          <Col md={4} className="mb-3">
            <Form.Group controlId="dropdownSelect">
              <Form.Label className="mb-3">
                {intl.formatMessage({ id: "CompetentCourt" })}
              </Form.Label>
              <div className="input-group">
                <Form.Select
                  value={dropdownValue}
                  onChange={(e) => setDropdownValue(e.target.value)}
                >
                  {dropdownOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </Form.Group>
          </Col>

          <Col md={4} className="mb-5">
            <Form.Group controlId="dateInput">
              <Form.Label className="mb-3">
                {intl.formatMessage({ id: "DateOfTheCase" })}
              </Form.Label>
              <div className="input-group">
                <Form.Control type="date" className="bg-white" />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row className="w-100">
          <Col md={12} className="mt-5 mb-5">
            <Form.Group controlId="subjectOfTheLawsuitInput">
              <Form.Label className="mb-3">
                {intl.formatMessage({ id: "SubjectOfTheLawsuit" })}
              </Form.Label>
              <div className="input-group">
                <Form.Control
                  as="textarea"
                  className="bg-white"
                  placeholder={intl.formatMessage({
                    id: "SubjectOfTheLawsuit",
                  })}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>
      </div>
      <div className="bg-light p-10 mb-9 pb-5 rounded ">
        <div className="mb-8 me-3">
          <h3 className=" fst-normal">
            {intl.formatMessage({ id: "Defendant" })}
          </h3>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Form.Group controlId="dropdownSelect">
              <Form.Label className="mb-3">
                {intl.formatMessage({ id: "Defendant'sIDType" })}
              </Form.Label>
              <Form.Select
                value={selectedOption}
                onChange={handleDropdownChange}
              >
                {dropdownOptions2.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>

          {selectedOption && (
            <div className="col-md-8">
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group controlId="inputField1">
                    <Form.Label className="mb-3">
                      {getFirstInputLabel()}
                    </Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-pencil"></i>
                      </span>
                      <Form.Control
                        type="text"
                        className="bg-white"
                        value={inputValue1}
                        onChange={(e) => setInputValue1(e.target.value)}
                        placeholder={getFirstInputLabel()}
                      />
                    </div>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="inputField2">
                    <Form.Label className="mb-3">
                      {getSecondInputLabel()}
                    </Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-file-earmark-text"></i>
                      </span>
                      <Form.Control
                        type="text"
                        className="bg-white"
                        value={inputValue2}
                        onChange={(e) => setInputValue2(e.target.value)}
                        placeholder={getSecondInputLabel()}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          )}
        </div>
        <div className="col-md-12 mt-5">
          <Form.Group controlId="subjectOfTheLawsuitInput">
            <Form.Label className="mb-3">
              {intl.formatMessage({ id: "Email" })}
            </Form.Label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
              <Form.Control
                className="bg-white"
                placeholder={intl.formatMessage({ id: "Email" })}
              />
            </div>
          </Form.Group>
        </div>
      </div>
      <ShowMore
        show={showModel}
        handleClose={() => setShowModel(false)}
        data={study.info}
      />{" "}
    </>
  );
}
