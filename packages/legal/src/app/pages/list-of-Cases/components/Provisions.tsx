import { useIntl } from "react-intl";
import CaseInfo from "./CaseInfo";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllJudgementGrounds } from "../../../features/judgement-ground";
import { JudgementGroundModel } from "../../../models/JudgementGroundModel";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import getIconSrcError from "@4eplatform/shared/functions/getIconSrcError";
import { LegalRootUrl } from "@4eplatform/shared/apis/legal";
import Spinner from "react-bootstrap/esm/Spinner";
import ViewJudgmentTextPopup from "../../judgements-managements/popups/ViewJudgmentTextPopup";
function Provisions() {
  let dispatch = useDispatch();
  let [loading, setLoading] = useState(false);
  const intl = useIntl();
  moment.locale("en");
  let judgmentMap = (status) => {
    switch (status) {
      case 2:
        return {
          text: intl.formatMessage({ id: "ForTheAuthority" }),
          styleColor: "bg-light-primary text-primary border-light-primary",
        };
      case 3:
        return {
          text: intl.formatMessage({ id: "EndTheDispute" }),
          styleColor: "bg-light-warning text-warning border-light-warning",
        };
      case 1:
        return {
          text: intl.formatMessage({ id: "AgainstTheAuthority" }),
          styleColor: "bg-light-danger text-danger border-light-danger",
        };
    }
  };
  let { id: caseId } = useParams();
  let causeIds = [caseId];
  let [jedgementGrounds, setJedgementGrounds] = useState<
    JudgementGroundModel[]
  >([]);
  useEffect(() => {
    const params = new URLSearchParams();
    params.append("pageNumber", "1");
    params.append("pageSize", "1000");
    causeIds?.forEach((id) => {
      if (id) {
        params.append("causeId", id);
      }
    });
    setLoading(true);
    dispatch(fetchAllJudgementGrounds(params) as any).then((res) => {
      setJedgementGrounds(res?.payload?.result);
      setLoading(false);
    });
  }, [caseId]);

  console.log("judgementGround", jedgementGrounds);
  const [showViewJudgmentText, setShowViewJudgmentText] =
    useState<boolean>(false);
  const [judgementId, setJudgementId] = useState<any>(null);
  return (
    <div>
      <CaseInfo
        color="gray-100"
        caseTitle="نزاع أرض الرياض"
        caseNumber="#5645645"
        caseName="الدعوى #7"
        caseStatus="منتهية"
      />

      <Row className="bg-gray-100 p-6 rounded-2 mx-0">
        <h4 className="fw-bolder mb-4 px-0">
          {intl.formatMessage({ id: "Provisions" })}
        </h4>

        <Row className="g-3 mx-0 px-0">
          {loading ? (
            <div className="d-flex gap-4 justify-content-center align-items-center py-4">
              {intl.formatMessage({ id: "DataIsLoaded..." })}
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            // <>
            //   <Col xs={12} className="px-0">
            //     <Row className="g-3">
            //       {Array.isArray(jedgementGrounds) &&
            //       jedgementGrounds?.length > 0 ? (
            //         jedgementGrounds?.map((judgementGround) => (
            //           <Col key={Math.random() * 1000} xs={12} className="px-0">
            //             <div
            //               style={{ overflow: "hidden" }}
            //               className="bg-light-primary mb-3 border border-primary bg-fix-dark border-fix-dark rounded-2 p-3 fs-5"
            //             >
            //               <div className="d-flex flex-column flex-md-row justify-content-start align-items-start justify-content-md-between align-items-md-center gap-4 ">
            //                 <div className="mb-0 col-md-6 col-xs-12">
            //                   <div className="d-flex justify-content-between align-items-center w-100 fw-bolder gap-2">
            //                     <div className="d-flex align-items-center gap-2 row w-100">
            //                       <div className="col-md-6 col-xs-12">
            //                         {intl.formatMessage({ id: "TheLawsuit" })} #
            //                         {intl.locale == "ar"
            //                           ? judgementGround?.lkStageNameAr
            //                           : judgementGround?.lkStageNameEn}
            //                         {judgementGround?.causeStageNumber}
            //                       </div>
            //                       <div className="d-flex col-md-5 col-xs-12 align-items-center gap-2 fs-7 text-gray-500">
            //                         <span className="bg-primary text-white d-flex align-items-center justify-content-center rounded-pill w-25px h-20px">
            //                           {judgementGround?.countOfSessions}
            //                         </span>
            //                         <span className="text-gray-500 fs-7">
            //                           {intl.formatMessage({ id: "Sessions" })}
            //                         </span>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div className="col-md-6 col-xs-12 fs-7 min-h-35px fw-bolder">
            //                   <div className="row w-100">
            //                     <div className="d-flex  col-md-6 col-xs-12 mb-3">
            //                       {Array.isArray(
            //                         judgementGround?.attachmentJudgementGroundDto
            //                       ) && (
            //                         <>
            //                           {judgementGround?.attachmentJudgementGroundDto?.map(
            //                             (judgementGround) => {
            //                               return (
            //                                 <Fragment
            //                                   key={Math.random() * 1000}
            //                                 >
            //                                   <div className="w-100">
            //                                     <a
            //                                       className="d-flex align-items-center justify-content-center gap-3 bg-body p-3 rounded-2 h-35px stretch-on-hover cursor-pointer"
            //                                       download
            //                                       target="_blank"
            //                                       rel="noreferrer"
            //                                       href={
            //                                         LegalRootUrl +
            //                                         judgementGround?.filePath?.replace(
            //                                           "wwwroot/",
            //                                           ""
            //                                         )
            //                                       }
            //                                     >
            //                                       <div className="d-flex align-items-center justify-content-center gap-3 bg-body p-3 rounded-2 h-35px stretch-on-hover cursor-pointer">
            //                                         <img
            //                                           src={getIconSrc(
            //                                             judgementGround?.fileName,
            //                                             {
            //                                               filePath:
            //                                                 judgementGround?.filePath?.replace(
            //                                                   "wwwroot/",
            //                                                   ""
            //                                                 ),
            //                                             },
            //                                             LegalRootUrl
            //                                           )}
            //                                           onError={(e: any) => {
            //                                             e.target.src =
            //                                               getIconSrcError(
            //                                                 judgementGround?.fileName
            //                                               );
            //                                           }}
            //                                           className="w-20px h-20px"
            //                                           alt={
            //                                             judgementGround?.fileName as string
            //                                           }
            //                                         />
            //                                         <div className="text-primary text-truncate mw-150px">
            //                                           {
            //                                             judgementGround?.fileName
            //                                           }
            //                                         </div>
            //                                         <div className="stretch-area">
            //                                           <i className="fad fa-download fa-fw fs-5 text-primary"></i>
            //                                         </div>
            //                                       </div>
            //                                     </a>
            //                                   </div>
            //                                 </Fragment>
            //                               );
            //                             }
            //                           )}
            //                         </>
            //                       )}
            //                     </div>

            //                     <div className="d-flex mb-3 col-lg-6 col-md-12 col-xs-12 gap-3 bg-body p-3 rounded-2 h-35px">
            //                       <div className="row w-100 d-flex align-items-center justify-content-between">
            //                         <div className="col-md-8 col-xs-12 d-flex  gab-3 ">
            //                           <svg
            //                             className="text-primary"
            //                             width="20"
            //                             height="20"
            //                             viewBox="0 0 24 24"
            //                             fill="currentColor"
            //                             xmlns="http://www.w3.org/2000/svg"
            //                           >
            //                             <svg
            //                               width="24"
            //                               height="24"
            //                               viewBox="0 0 24 24"
            //                               fill="currentColor"
            //                               xmlns="http://www.w3.org/2000/svg"
            //                             >
            //                               <path d="M10.4827 2.52996C10.7757 2.23696 10.7757 1.76299 10.4827 1.46999C10.1897 1.17699 9.71475 1.17699 9.42175 1.46999L4.46975 6.42195C4.17675 6.71495 4.17675 7.18998 4.46975 7.48298C4.76275 7.77598 5.23671 7.77598 5.52971 7.48298L5.54675 7.46599C5.72775 7.69599 5.94875 7.972 6.19875 8.278C6.90275 9.138 7.84871 10.2429 8.80271 11.1969C9.75671 12.1509 10.8618 13.097 11.7218 13.801C12.0278 14.051 12.3037 14.272 12.5337 14.453L12.5167 14.47C12.2237 14.763 12.2237 15.237 12.5167 15.53C12.8097 15.823 13.2847 15.823 13.5777 15.53L18.5297 10.578C18.8227 10.285 18.8227 9.80997 18.5297 9.51697C18.2367 9.22397 17.7627 9.22397 17.4697 9.51697L17.4527 9.53396C17.2717 9.30396 17.0507 9.02797 16.8007 8.72097C16.0977 7.86197 15.1508 6.757 14.1968 5.803C13.2428 4.849 12.1377 3.902 11.2787 3.199C10.9717 2.949 10.6957 2.72795 10.4657 2.54695L10.4827 2.52996Z" />
            //                               <path d="M1.98111 18.02C3.01111 19.05 4.7011 18.982 5.6461 17.873L9.01813 13.915L9.02242 13.9099C9.19857 13.7023 9.28705 13.598 9.27911 13.478C9.27217 13.358 9.16983 13.2646 8.96626 13.0787L8.96109 13.074C8.60809 12.752 8.2551 12.4179 7.9191 12.0809C7.5831 11.7449 7.24911 11.3919 6.92711 11.0389C6.73815 10.832 6.64409 10.729 6.52311 10.721C6.40221 10.714 6.29631 10.8038 6.08568 10.9825L2.12711 14.3549C1.01811 15.2989 0.951114 16.989 1.98111 18.02Z" />
            //                               <path d="M15.888 18.25C15.1753 18.25 14.6519 18.25 14.177 18.402C13.788 18.526 13.428 18.725 13.122 18.99C12.742 19.318 12.496 19.761 12.182 20.328L12.033 20.596C11.98 20.691 11.88 20.75 11.771 20.75H11C10.448 20.75 10 21.198 10 21.75C10 22.302 10.436 22.738 10.978 22.75H21.022C21.564 22.738 22 22.295 22 21.75C22 21.205 21.552 20.75 21 20.75H20.229C20.12 20.75 20.02 20.691 19.967 20.596L19.818 20.328C19.504 19.761 19.258 19.318 18.878 18.99C18.572 18.725 18.212 18.526 17.823 18.402C17.3512 18.25 16.8321 18.25 16.1265 18.25H15.888Z" />
            //                               <path d="M22.3831 11.774C22.8111 11.424 22.8741 10.794 22.5241 10.367C22.1741 9.93902 21.5441 9.876 21.1171 10.226L19.1171 11.862C18.6901 12.212 18.6271 12.842 18.9761 13.27C19.3261 13.697 19.9561 13.76 20.3831 13.41L22.3831 11.774Z" />
            //                               <path d="M20.2291 15.031C19.7441 14.767 19.1371 14.945 18.8721 15.43C18.6081 15.915 18.7861 16.523 19.2711 16.787L21.2711 17.8781C21.7561 18.1421 22.3641 17.964 22.6281 17.479C22.8931 16.994 22.7141 16.387 22.2291 16.122L20.2291 15.031Z" />
            //                             </svg>
            //                           </svg>
            //                           <div
            //                             className="text-truncate mw-200px"
            //                             title={
            //                               judgementGround?.judgementStatement
            //                             }
            //                           >
            //                             {judgementGround?.judgementStatement}
            //                           </div>
            //                         </div>
            //                         <div
            //                           className={`${
            //                             judgmentMap(
            //                               judgementGround?.sessionJedgementStatus
            //                             )?.styleColor
            //                           } px-2 py-1 fs-7 mt-xs-3 col-md-3 col-xs-12 mt-md-0 w-fit h-25px rounded-2 border border-primary bg-fix-dark border-fix-dark`}
            //                         >
            //                           {
            //                             judgmentMap(
            //                               judgementGround?.sessionJedgementStatus
            //                             )?.text
            //                           }
            //                         </div>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //               </div>
            //             </div>
            //           </Col>
            //         ))
            //       ) : (
            //         <div className="text-center fw-bolder mt-8 fs-4">
            //           {intl.formatMessage({ id: "ThereAreNoRulings" })}
            //         </div>
            //       )}
            //     </Row>
            //   </Col>
            // </>

            <>
              {Array.isArray(jedgementGrounds) &&
              jedgementGrounds.length > 0 ? (
                <div className="table-responsive mb-3">
                  <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4 text-center">
                    <thead className="table-primary">
                      <tr>
                        <th className="text-center">
                          {intl.formatMessage({ id: "TheLawsuit" })}
                        </th>
                        <th className="text-center">
                          {intl.formatMessage({ id: "countOfSessions" })}
                        </th>
                        <th className="text-center">
                          {intl.formatMessage({ id: "SessionReportDate" })}
                        </th>
                        <th className="text-center">
                          {intl.formatMessage({ id: "Attachments" })}
                        </th>
                        <th className="text-center">
                          {intl.formatMessage({
                            id: "TextOnTheTermsOfTheSession",
                          })}
                        </th>
                        <th className="text-center">
                          {intl.formatMessage({ id: "JudicialRuling" })}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {jedgementGrounds.map((judgementGround, index) => (
                        <tr key={index}>
                          {/* الدعوى */}
                          <td className="text-center">
                            #
                            {intl.locale === "ar"
                              ? judgementGround?.lkStageNameAr
                              : judgementGround?.lkStageNameEn}
                            {judgementGround?.causeStageNumber}
                          </td>

                          {/* عدد الجلسات */}
                          <td className="text-center">
                            <span className="badge bg-primary">
                              {judgementGround?.countOfSessions}
                            </span>
                          </td>

                          {/*تاريخ اصدار حيثيات الجلسة  */}

                          <td>
                            <span className="text-center d-block" dir="ltr">
                              {/* { new Date(judgementGround?.judgementDate).toLocaleDateString() }                        */}
                              {moment(judgementGround?.judgementDate).format(
                                "DD MMM YYYY"
                              )}
                            </span>
                          </td>
                          {/* المرفقات */}
                          <td>
                            {Array.isArray(
                              judgementGround?.attachmentJudgementGroundDto
                            ) &&
                              judgementGround.attachmentJudgementGroundDto.map(
                                (file, fIndex) => (
                                  <a
                                    key={fIndex}
                                    href={
                                      LegalRootUrl +
                                      file?.filePath?.replace("wwwroot/", "")
                                    }
                                    download
                                    target="_blank"
                                    rel="noreferrer"
                                    className="d-inline-flex align-items-center gap-2 me-2"
                                  >
                                    <img
                                      src={getIconSrc(
                                        file?.fileName,
                                        {
                                          filePath: file?.filePath?.replace(
                                            "wwwroot/",
                                            ""
                                          ),
                                        },
                                        LegalRootUrl
                                      )}
                                      onError={(e: any) =>
                                        (e.target.src = getIconSrcError(
                                          file?.fileName
                                        ))
                                      }
                                      className="w-20px h-20px"
                                      alt={file?.fileName}
                                    />
                                    <span className="text-primary text-truncate mw-150px">
                                      {file?.fileName}
                                    </span>
                                  </a>
                                )
                              )}
                          </td>

                          {/* نص الحكم */}
                          <td>
                            <span
                              className="text-center text-truncate cursor-pointer d-block mx-auto"
                              style={{ maxWidth: "200px" }}
                              onClick={() => {
                                setShowViewJudgmentText(true);
                                setJudgementId(judgementGround?.id);
                              }}
                            >
                              {judgementGround?.judgementStatement}
                            </span>
                          </td>

                          {/* الحالة */}
                          <td>
                            <span
                              className={`${
                                judgmentMap(
                                  judgementGround?.sessionJedgementStatus
                                )?.styleColor
                              } px-4 py-1 rounded-2 text-center`}
                            >
                              {
                                judgmentMap(
                                  judgementGround?.sessionJedgementStatus
                                )?.text
                              }
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center fw-bolder mt-8 fs-4">
                  {intl.formatMessage({ id: "ThereAreNoRulings" })}
                </div>
              )}

              {showViewJudgmentText && (
                <ViewJudgmentTextPopup
                  show={showViewJudgmentText}
                  handleClose={() => setShowViewJudgmentText(false)}
                  judgmentId={judgementId}
                />
              )}
            </>
          )}
        </Row>
      </Row>
    </div>
  );
}

export default Provisions;
