import { useIntl } from "react-intl";

export default function LawistDataTwo() {
  const intl = useIntl();
  return (
    <div>
      <div className="main-container-followLawsuits p-7">
        <h4 className="main-title-lawsuit">
          {intl.formatMessage({ id: "Lawist" })}
        </h4>

        <div className="d-flex flex-column w-70 mt-3">
          <div className="row">
            <div className="col-12 mb-3">
              <div className="row">
                <div className="col-4">
                  <div className="d-flex align-items-center">
                    <p className="text-gray-400 mb-0">
                      {intl.formatMessage({ id: "CaseNumber" })}
                    </p>
                    <span className="ms-2 me-2">:</span>
                    <p className="lawsuit-text-left mb-0">746578345</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="d-flex align-items-center">
                    <p className="text-gray-400 mb-0">
                      {intl.formatMessage({ id: "DateOfTheCase" })}
                    </p>
                    <span className="ms-2 me-2">:</span>
                    <p className="lawsuit-text-left mb-0">23/8/2024</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="d-flex align-items-center">
                    <p className="text-gray-400 mb-0">
                      {intl.formatMessage({ id: "Gender" })}
                    </p>
                    <span className="ms-2 me-2">:</span>
                    <p className="lawsuit-text-left mb-0">
                      {intl.formatMessage({ id: "administrative" })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="row">
                <div className="col-4">
                  <div className="d-flex align-items-center">
                    <p className="text-gray-400 mb-0">
                      {intl.formatMessage({ id: "TheCourt" })}
                    </p>
                    <span className="ms-2 me-2">:</span>
                    <p className="lawsuit-text-left mb-0">
                      {intl.formatMessage({ id: "Alia" })}
                    </p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="d-flex align-items-center">
                    <p className="text-gray-400 mb-0">
                      {intl.formatMessage({ id: "TheCircle" })}
                    </p>
                    <span className="ms-2 me-2">:</span>
                    <p className="lawsuit-text-left mb-0">
                      {intl.formatMessage({ id: "Fifteen" })}
                    </p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="d-flex align-items-center">
                    <p className="text-gray-400 mb-0">
                      {intl.formatMessage({ id: "TypeOfLawsuit" })}
                    </p>
                    <span className="ms-2 me-2">:</span>
                    <p className="lawsuit-text-left mb-0">
                      {intl.formatMessage({
                        id: "ObjectionToAnAdministrativeDecision",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
          {intl.formatMessage({ id: "Defendant2" })}
        </h4>

        <div className="d-flex mb-6 mt-3">
          <p className="text-gray-400">
            {intl.formatMessage({ id: "DefendantName2" })}
          </p>
          <span className="ms-2 me-2">:</span>
          <p className="lawsuit-text-left">
            {intl.formatMessage({ id: "AbdullahFaisalAlGhamdi" })}
          </p>
        </div>
      </div>
      <div className="main-container-followLawsuits mb-9 mt-6 p-7">
        <h4 className="main-title-lawsuit">
          {intl.formatMessage({ id: "Imputation" })}
        </h4>

        <div className="d-flex mb-6 mt-3">
          <p className="text-gray-400">
            {intl.formatMessage({ id: "ResponsibleOfficer" })}
          </p>
          <span className="ms-2 me-2">:</span>
          <p className="lawsuit-text-left">
            {intl.formatMessage({ id: "FahdAbdullah" })}
          </p>
        </div>
      </div>
    </div>
  );
}
