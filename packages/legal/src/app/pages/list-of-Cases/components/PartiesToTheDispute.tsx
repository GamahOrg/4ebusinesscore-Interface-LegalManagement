import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import CaseInfo from "./CaseInfo";
import { RootState } from "../../../store/store";
import { Fragment } from "react/jsx-runtime";
import { LitigantStatus } from "../../../models/LegalEnums";
import Spinner from "react-bootstrap/esm/Spinner";

type props = {
  LitigationStatus: string;
};

function PartiesToTheDispute(LitigationStatus: props) {
  const intl = useIntl();

  let cause = useSelector((state: RootState) => {
    return state?.causes?.causeById;
  });
  let loadingForCause = useSelector((state: RootState) => {
    return state?.causes?.loadingForCause;
  });

  // Filter opponents to check if any exist
  const opponents = Array.isArray(cause?.causeLitigants)
    ? cause?.causeLitigants?.filter(
        (item) => item?.litigant?.litigantStatus === 1
      )
    : [];
 
  return (
    <>
      <CaseInfo />

      <div className="bg-gray-100  p-6 rounded-2">
        <h4 className="fw-bolder mb-8">
          {intl.formatMessage({ id: "PartiesToTheDispute" })}
        </h4>
        {loadingForCause ? (
          <div className="d-flex gap-4 justify-content-center align-items-center py-4">
            {intl.formatMessage({ id: "DataIsLoaded..." })}
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            <div className="grid row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <div className="bg-white bg-fix-dark border-fix-dark  py-5 px-4 mb-4 rounded">
                  <div className="mb-5">
                    <h5>{intl.formatMessage({ id: "Clients" })}</h5>
                  </div>
                  {Array.isArray(cause?.causeLitigants) &&
                    cause?.causeLitigants
                      ?.filter((item) => {
                        return item?.litigant?.litigantStatus == 2;
                      })
                      ?.map((ligitant) => {
                        return (
                          <Fragment key={ligitant?.id}>
                            <div className="bg-light-primary border border-primary bg-fix-dark border-fix-dark py-3 px-4 rounded d-flex flex-column mb-3">
                              <div className="d-flex mb-3">
                              <p className="text-gray-700 m-0">
                                  {intl.formatMessage({ id: "Name" })} {" : "}
                                </p>
                                <p className="my-0 mx-3 fw-bolder">{ligitant?.litigant?.name}</p>
                              </div>
                              <div className="d-flex align-middle align-items-center">
                                <div className="">
                                  <p className="text-gray-700 ">
                                    {intl.locale == "ar"
                                      ? ligitant?.litigant?.lK_IdentityType
                                          ?.nameAr
                                      : ligitant?.litigant?.lK_IdentityType
                                          ?.nameEn}
                                   {" : "}
                                  </p>
                                </div>
                                <p className="me-2 fw-bolder">
                                  {ligitant?.litigant?.identityNumber}
                                </p>
                              </div>
                            </div>
                          </Fragment>
                        );
                      })}
                </div>
                <div className="bg-white bg-fix-dark border-fix-dark  py-5 px-4 mb-2 rounded">
                  <div className="mb-5">
                    <h5>{intl.formatMessage({ id: "Clients' Status" })}</h5>
                  </div>
                  <div className="bg-light-primary border border-primary bg-fix-dark border-fix-dark p-3 rounded d-flex align-middle align-items-center">
                    <p className="m-0">
                      {cause?.clientType == "Plaintiff"
                        ? intl.formatMessage({ id: "Claimant" })
                        : intl.formatMessage({ id: "Respondent" })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <div className="bg-white bg-fix-dark border-fix-dark  p-5 rounded">
                  <h5 className="mb-5">
                    {intl.formatMessage({ id: "Opponents" })}
                  </h5>
                  {opponents?.length > 0 ? (
                    opponents?.map((ligitant) => {
                      return (
                        <Fragment key={ligitant?.id}>
                          <div className="bg-light-primary border border-primary bg-fix-dark border-fix-dark py-3 px-4 rounded mb-3">
                            <div className="d-flex  py-4 px-4 rounded">
                              <div className="d-flex align-middle align-items-center">
                                <p className="text-gray-700 m-0">
                                  {intl.formatMessage({ id: "Name" })} {" : "}
                                </p>
                              </div>
                              <div className="d-flex align-middle align-items-center">
                                <p className="my-0 mx-3 fw-bolder">
                                  {ligitant?.litigant?.name}
                                </p>
                              </div>
                            </div>
                            <div className="d-flex  py-4 px-4 mb-2 rounded">
                              <div className="d-flex align-middle align-items-center">
                                <p className="text-gray-700 m-0">
                                  {intl.locale == "ar"
                                    ? ligitant?.litigant?.lK_IdentityType
                                        ?.nameAr
                                    : ligitant?.litigant?.lK_IdentityType
                                        ?.nameEn} {" : "}
                                </p>
                              </div>
                              <div className="d-flex align-middle align-items-center">
                                <p className="my-0 mx-3 fw-bolder">
                                  {ligitant?.litigant?.identityNumber}
                                </p>
                              </div>
                            </div>
                            <div className="bg-white bg-fix-dark border-fix-dark  p-3 rounded">
                              <p className="text-gray-700">
                                {intl.formatMessage({ id: "ConmplainReason" })}{" : "}
                              </p>
                              <p className="my-0 mx-3">
                                {ligitant?.compliment
                                  ? ligitant?.compliment
                                  : intl.formatMessage({ id: "NotFound" })}
                              </p>
                            </div>
                          </div>
                        </Fragment>
                      );
                    })
                  ) : (
                    <div className="bg-gray-100 py-4 px-4 rounded text-center">
                      <p className="m-0">
                        {intl.formatMessage({ id: "ThereAreNoOpponents" }) ||
                          "There are no opponents"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default PartiesToTheDispute;
