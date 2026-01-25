import { useState } from "react";
import { useIntl } from "react-intl";

enum JudgementForOptions {
  FOR_ME = "ForMe",
  OPPOSE_ME = "OpposeMe",
  EQUAL = "Equal",
}
function JudgmentSessionData() {
  let intl = useIntl();

  const [selectedOption, setSelectedOption] =
    useState<JudgementForOptions | null>(null);
  let theme = localStorage.getItem("Theme");

  return (
    <>
      <div className="container my-3">
        <div className={`row d-flex align-items-center`}>
          <div className="col-md-6 col-sm-12  mt-3">
            <label
              htmlFor="JudgmentSituation"
              className="form-label px-2 fontSz-6 required"
            >
              {intl.formatMessage({ id: "JudgmentSituation" })}
            </label>
            <select className="form-select">
              <option value="#1"> تأجيل</option>
              <option value="#2"> صدر حكم</option>
            </select>
          </div>

          <div className="col-md-6 col-12 mt-3">
            <label className="form-label required">
              {intl.formatMessage({ id: "JudgementFor" })}
            </label>
            <div className="d-flex align-items-center gap-4 border border-1 rounded py-4 px-2">
              {Object.entries(JudgementForOptions).map(([key, value]) => (
                <div className="d-flex gap-2" key={key}>
                  <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                    <input
                      type="radio"
                      id={key}
                      name="JudgementFor"
                      checked={selectedOption === value}
                      onChange={() => setSelectedOption(value)}
                      style={{ cursor: "pointer" }}
                      className="form-check-input widget-9-radio xRadioBg"
                    />
                  </div>
                  <label
                    className="form-check-label"
                    htmlFor={key}
                    style={{ cursor: "pointer" }}
                  >
                    {intl.formatMessage({ id: value })}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 mt-3">
            <label className="mb-2 required">
              {intl.formatMessage({ id: "JudgmentDocument" })}
            </label>

            <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed p-5 h-80px">
              <label
                htmlFor="outputAttachment"
                className="form-label  dropzone-select  uploadFile-style inputAreaHeight"
              >
                <div role="button" className="d-flex align-items-center">
                  <div className="py-auto ps-3">
                    <i className="fa-solid fa-link fs-1 text-primary"></i>
                  </div>
                  <div className="row py-auto">
                    <span className="text-primary fw-bolder">
                      {intl.formatMessage({
                        id: "DragAndDropOrChooseFilesFromComputer",
                      })}
                    </span>
                    <span className="pt-3 pb-2">
                      {" "}
                      {intl.formatMessage({
                        id: "SupportFollowingFormats",
                      })}{" "}
                      pdf , png , jpeg
                    </span>
                  </div>
                </div>
              </label>
              <div
                className="dropzone dropzone-queue "
                id="kt_dropzonejs_example_3"
              >
                <div className="dropzone-panel">
                  <input
                    multiple
                    type="file"
                    accept="image/*"
                    id="outputAttachment"
                    name="attachments"
                    placeholder={intl.formatMessage({ id: "FileUpload" })}
                    className="dropzone-select  uploadFile-style inputAreaHeight d-none"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-3">
            <label htmlFor="JudgmentText" className="required mb-3">
              {intl.formatMessage({ id: "JudgmentText" })}
            </label>
            <textarea
              placeholder={intl.formatMessage({ id: "EnterJudgmentText" })}
              className="form-control"
              rows={4}
              id="JudgmentText"
            />
          </div>
        </div>
      </div>
      <div className="rounded mt-5">
        <div
          className={`main-container-followLawsuits p-7 bg-${
            theme == "dark" ? "light" : "white"
          }`}
        >
          <h4
            className={`main-title-lawsuit required text-${
              theme == "dark" ? "white" : "black"
            }`}
          >
            {intl.formatMessage({ id: "NextSessions" })}
          </h4>
          <div className="row">
            <div className="col-md-6 col-sm-12 my-2">
              <label
                htmlFor="SessionDate"
                className="form-label px-2 fontSz-6 required"
              >
                {intl.formatMessage({ id: "SessionDate" })}
              </label>
              <input
                id="SessionDate"
                placeholder={intl.formatMessage({ id: "EnterDate" })}
                type="date"
                className="form-control"
              />
            </div>
            <div className="col-md-6 col-sm-12 my-2">
              <label
                htmlFor="SessionTime"
                className="form-label px-2 fontSz-6 required"
              >
                {intl.formatMessage({ id: "SessionTime" })}
              </label>
              <input
                id="SessionTime"
                placeholder={intl.formatMessage({ id: "EnterTime" })}
                type="time"
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JudgmentSessionData;
