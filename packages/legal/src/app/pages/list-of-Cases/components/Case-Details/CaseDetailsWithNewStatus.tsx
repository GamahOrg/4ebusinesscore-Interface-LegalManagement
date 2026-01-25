import { useState } from "react";
import { useIntl } from "react-intl";
import CaseInfo from "../CaseInfo";

type props = {
  status: string;
};

function CaseDetailsWithNewStatus(status: props) {
  const intl = useIntl();
  const [showInputs, setShowInputs] = useState("");

  return (
    <>
      <div className="bg-gray-100 p-6 rounded-2">
        <h1 className="fs-1 fw-bolder mb-8">
          {intl.formatMessage({ id: "CaseDetails" })}
        </h1>
        <div className="grid row gx-10 mb-4">
          <div className="col-12 col-sm-12 col-md-7 col-lg-7">
            <CaseInfo
              color="gray-100"
              caseTitle="نزاع أرض الرياض"
              caseNumber="#5645645"
              caseName="الدعوى #7"
              caseStatus="منتهية"
              shadow={false}
            />

            <div className="d-flex justify-content-between bg-white py-4 px-4 mb-2 rounded">
              <div className="d-flex align-middle align-items-center">
                <p className="text-gray-400 m-0">
                  {intl.formatMessage({ id: "IncidentLocation" })}
                </p>
              </div>
              <div className="d-flex align-middle align-items-center">
                <p className="m-0">23 شارع القسيم ، الرياض</p>
              </div>
            </div>
            <div className="d-flex justify-content-between bg-white py-4 px-4 mb-2 rounded">
              <div className="d-flex align-middle align-items-center">
                <p className="text-gray-400 m-0">
                  {intl.formatMessage({ id: "CaseDate" })}
                </p>
              </div>
              <div className="d-flex align-middle align-items-center ">
                <p className="m-0">27 أكتوبر 2024</p>
              </div>
            </div>
            <div className="d-flex justify-content-between bg-white py-4 px-4 mb-2 rounded">
              <div className="d-flex align-middle align-items-center">
                <p className="text-gray-400 m-0">
                  {intl.formatMessage({ id: "CaseClassification" })}
                </p>
              </div>
              <div className="d-flex align-middle align-items-center ">
                <p className="m-0">جنائي</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded">
              <p className="text-gray-400">
                {intl.formatMessage({ id: "Topic" })}:
              </p>
              <p>
                هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما
                سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع
                الفقرات.
              </p>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-4">
            <div>
              <label className="mb-4">
                {intl.formatMessage({ id: "TheLawsuit" })}
              </label>
              <span className="required-asterisk">*</span>
              <select
                className="required form-select form-select-sm h-100 mb-5"
                aria-label="Default select example"
                value={showInputs}
                onChange={(e) => setShowInputs(e.target.value)}
                defaultValue={""}
              >
                <option disabled>{intl.formatMessage({ id: "Case6" })}</option>
                <option>{intl.formatMessage({ id: "Case1" })}</option>
                <option>{intl.formatMessage({ id: "Case2" })}</option>
                <option>{intl.formatMessage({ id: "Case3" })}</option>
                <option>{intl.formatMessage({ id: "Case4" })}</option>
                <option>{intl.formatMessage({ id: "Case5" })}</option>
                <option>{intl.formatMessage({ id: "Case6" })}</option>
              </select>
              {showInputs && (
                <>
                  <label className="mb-3 required">
                    {intl.formatMessage({ id: "Casenumber" })}
                  </label>
                  <input
                    type="text"
                    className="form-control bg-gray-100 mb-5"
                    placeholder={intl.formatMessage({ id: "Casenumber" })}
                  />
                  <label className="mb-3 required">
                    {intl.formatMessage({ id: "CaseDate" })}
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder={intl.formatMessage({ id: "CaseDate" })}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end mb-4">
          <button className="btn btn-outline-dark  px-15 py-4">
            {intl.formatMessage({ id: "Edit" })}
          </button>
          <button className="btn btn-primary px-15 py-4">
            {intl.formatMessage({ id: "Confirm" })}
          </button>
        </div>
      </div>
    </>
  );
}

export default CaseDetailsWithNewStatus;
