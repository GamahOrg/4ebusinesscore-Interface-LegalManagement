import { useIntl } from "react-intl";

export default function LawistData() {
  const intl = useIntl();
  return (
    <div>
      <div className="main-container-followLawsuits p-7">
        <h4 className="main-title-lawsuit">
          {intl.formatMessage({ id: "Lawist" })}
        </h4>
        <div className="d-flex">
          <p className="text-gray-400">
            {intl.formatMessage({ id: "ThePlaintiff" })}
          </p>
          <span className="ms-2 me-2">:</span>
          <p className="lawsuit-text-left">
            {intl.formatMessage({ id: "FahdAbdulAziz" })}
          </p>
        </div>

        <div className="d-flex justify-content-between w-70 mt-3">
          <div className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "CaseNumber" })}
            </p>
            <span className="ms-2 me-2">:</span>
            <p className="lawsuit-text-left">746578345</p>
          </div>

          <div className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "CompetentCourt" })}
            </p>
            <span className="ms-2 me-2">:</span>
            <p className="lawsuit-text-left">
              {intl.formatMessage({ id: "Alia" })}
            </p>
          </div>

          <div className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "DateOfTheCase" })}
            </p>
            <span className="ms-2 me-2">:</span>
            <p className="lawsuit-text-left">23/8/2024</p>
          </div>
        </div>

        <div className="mt-4 mb-9">
          <p className="text-gray-400">
            {intl.formatMessage({ id: "SubjectOfTheLawsuit" })}
          </p>
          <p className="lawsuit-text-left">
            {intl.formatMessage({ id: "paragraphOfLawsuit" })}
          </p>
        </div>
      </div>

      <div className="main-container-followLawsuits mb-9 mt-6 p-7">
        <h4 className="main-title-lawsuit">
          {intl.formatMessage({ id: "Defendant" })}
        </h4>

        <div className="d-flex justify-content-between w-70 mt-3">
          <div className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "DefendantName" })}
            </p>
            <span className="ms-2 me-2">:</span>
            <p className="lawsuit-text-left">
              {intl.formatMessage({ id: "AbdulrahmanFaisal" })}
            </p>
          </div>

          <div className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "IDNumber" })}
            </p>
            <span className="ms-2 me-2">:</span>
            <p className="lawsuit-text-left">454645756</p>
          </div>

          <div className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "Defendant'sIDType" })}
            </p>
            <span className="ms-2 me-2">:</span>
            <p className="lawsuit-text-left">
              {intl.formatMessage({ id: "NationalIdentity" })}
            </p>
          </div>
        </div>

        <div className="d-flex mb-6 mt-3">
          <p className="text-gray-400">{intl.formatMessage({ id: "Email" })}</p>
          <span className="ms-2 me-2">:</span>
          <p className="lawsuit-text-left">abd.fasal@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
