import { useIntl } from "react-intl";
import CaseInfo from "../CaseInfo";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import moment from "moment";
import "moment/locale/ar";

import { useEffect } from "react";
import { fetchCauseById } from "../../../../features/cause";
import { useParams } from "react-router-dom";
import { CauseStatus } from "../../../../models/LegalEnums";

type props = {
  status: string;
};

function CaseDetailsWithAllStatus(status: props) {
  const intl = useIntl();
  moment.locale("en");
  const dispatch = useAppDispatch();
  const caseData = useAppSelector((state) => state.causes.causeById);
  const loading = useAppSelector((state) => state.causes.loading);
  let { id: caseId } = useParams();

  useEffect(() => {
    // dispatch(fetchCauseById(caseId as string)as any);
  }, [dispatch, caseId]);

  return (
    <>
      <div className="bg-gray-100 p-6 rounded">
        <h4 className="fw-bolder mb-8">
          {intl.formatMessage({ id: "CaseDetails" })}
        </h4>
        <CaseInfo />

        <div className="grid row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
            {caseData?.causeStatus !== CauseStatus.NewCause && (
              <div className="d-flex border border-secondary mb-3  bg-white bg-fix-dark border-fix-dark py-4 px-4 mb-2 rounded">
                <div className="d-flex align-middle align-items-center">
                  <p className="text-gray-700 my-0 mx-3">
                    {intl.formatMessage({ id: "Casenumber" })}
                  </p>
                  {" : "}
                </div>
                <div className="d-flex align-middle align-items-center">
                  <p className="my-0 mx-3">
                    {loading
                      ? "Loading..."
                      : caseData
                      ? caseData?.causeNumber
                      : intl.formatMessage({
                          id: "NoData",
                        })}
                  </p>
                </div>
              </div>
            )}

            <div className="d-flex border-fix-dark  mb-3 border border-secondary  bg-white bg-fix-dark border-fix-dark py-4 px-4 mb-2 rounded">
              <div className="d-flex  align-middle align-items-center">
                <p className="text-gray-700 my-0 mx-3">
                  {intl.formatMessage({ id: "IncidentLocation" })}
                </p>
                {" : "}
              </div>

              <div className="d-flex align-middle align-items-center">
                <p className="my-0 mx-3">
                  {loading
                    ? "Loading..."
                    : caseData?.incidentLocation
                    ? caseData?.incidentLocation
                    :"------"}
                </p>
              </div>
            </div>
            <div className="border-fix-dark border  mb-3 border-secondary d-flex  bg-white bg-fix-dark border-fix-dark py-4 px-4 mb-2 rounded">
              <div className="d-flex align-middle align-items-center">
                <p className="text-gray-700 my-0 mx-3">
                  {intl.formatMessage({ id: "IncidentDate" })}
                </p>
                {" : "}
              </div>
              <div className="d-flex align-middle align-items-center">
                <p className="my-0 mx-3" dir="ltr">
                  {loading
                    ? "Loading..."
                    : caseData?.incidentDate &&
                      moment(caseData?.incidentDate).isValid()
                    ? moment(caseData?.incidentDate).format("DD MMM YYYY")
                    : "------"}
                </p>
              </div>
            </div>
            {caseData?.causeStatus !== CauseStatus.NewCause && (
              <div className="border-fix-dark border  mb-3 border-secondary d-flex  bg-white bg-fix-dark border-fix-dark py-4 px-4 mb-2 rounded">
                <div className="d-flex align-middle align-items-center">
                  <p className="text-gray-700 my-0 mx-3">
                    {intl.formatMessage({ id: "CaseDate" })}
                  </p>
                  {" : "}
                </div>
                <div className="d-flex align-middle align-items-center ">
                  <p className="my-0 mx-3" dir="ltr">
                    {loading
                      ? "loading..."
                      : caseData?.causeDate
                      ? moment(caseData?.causeDate).format("DD MMM YYYY")
                      : "- - - -"}
                  </p>
                </div>
              </div>
            )}

            <div className="d-flex border-fix-dark   mb-3  border border-secondary bg-white bg-fix-dark border-fix-dark py-4 px-4 mb-2 rounded">
              <div className="d-flex align-middle align-items-center">
                <p className="text-gray-700 my-0 mx-3">
                  {intl.formatMessage({ id: "CaseClassification" })}
                </p>
                {" : "}
              </div>
              <div className="d-flex align-middle align-items-center ">
                <p className="my-0 mx-3">
                  {loading
                    ? "Loading..."
                    : intl.locale === "ar"
                    ? caseData?.lK_CauseCategories?.nameAr
                    : caseData?.lK_CauseCategories?.nameEn
                    ? intl.locale == "ar"
                      ? caseData?.lK_CauseCategories?.nameAr
                      : caseData?.lK_CauseCategories?.nameEn
                    : intl.formatMessage({
                        id: "NoData",
                      })}
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
            <div
              className="bg-white bg-fix-dark border-fix-dark p-5 rounded"
              style={{ minHeight: "254px" }}
            >
              <p className="text-gray-700">
                {intl.formatMessage({ id: "Topic" })}:
              </p>
              <p>
                {loading
                  ? "loading..."
                  : caseData?.subject
                  ? caseData?.subject
                  : intl.formatMessage({
                      id: "NoData",
                    })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CaseDetailsWithAllStatus;
