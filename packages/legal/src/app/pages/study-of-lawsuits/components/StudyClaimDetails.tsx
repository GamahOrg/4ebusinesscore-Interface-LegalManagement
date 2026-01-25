import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import { Link } from "react-router-dom";
import { ShowMore } from "../popup/ShowMore";
import { useLocation } from "react-router-dom";
export const StudyClaimDetails: FC = () => {
  const intl = useIntl();
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [showModel, setShowModel] = useState(false);

  const study = {
    id: 2541851,
    info: `هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء.`,
    created_at: "2022-01-01",
  };
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");

  return (
    <>
      <div
        id="kt_content_container"
        className="d-flex flex-column-fluid align-items-start container-xxl p-0"
      >
        <div className="content flex-row-fluid" id="kt_content">
          <div
            className="flex-lg-row-fluid"
            data-select2-id="select2-data-129-tmo1"
          >
            <div className="card mb-5 mb-xl-8">
              <div className="card-body py-3">
                <div className="d-flex justify-content-between mt-10 mb-5">
                  <div>
                    <h2 className="text-dark mb-3 fs-2">
                      {intl.formatMessage({ id: "showStudy" })}
                    </h2>
                    <span className="text-muted fs-6">
                      {intl.formatMessage({
                        id: "WeDisplayAllStudyClaimDetails",
                      })}
                    </span>
                  </div>
                  {status === "Drafts" && (
                    <div>
                      <div
                        className="btn text-danger fw-bolder mx-1 text-center mw-100"
                        onClick={() => setShowDeleteModel(true)}
                      >
                        <i className="fas fa-trash fs-3"></i>
                      </div>
                      <Link to="/edit-claim-study">
                        <div className="btn btn-primary w-auto fw-bolder mx-1 text-center mw-100">
                          <span className="svg-icon svg-icon-3 me-2">
                            <KTSVG path="/media/icons/duotune/general/gen087.svg" />
                          </span>
                          {intl.formatMessage({ id: "Edit" })}
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
                <div className="card bg-light  p-6 mb-7">
                  <div className="px-3 mb-1">
                    <p className="fw-bolder fs-4">
                      {intl.formatMessage({ id: "StudyData" })}
                    </p>
                  </div>
                  <div className="row gy-5 p-3">
                    <div className="col-lg-4 col-sm-12">
                      <p className="text-gray-400">
                        {intl.formatMessage({ id: "StudyNumber" })} :
                        <span className="mx-1 text-dark fw-bold">
                          {study?.id}
                        </span>
                      </p>
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <p className="text-gray-400">
                        {" "}
                        {intl.formatMessage({ id: "StudyDate" })} :
                        <span className="mx-2 text-dark fw-bold">
                          {study?.created_at}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card bg-light p-6 mb-7">
                  <div className="px-3 mb-1">
                    <h4 className="fw-bolder fs-4">
                      {intl.formatMessage({ id: "Defendant" })}
                    </h4>
                  </div>
                  <div className="row gy-3 px-3">
                    <div className="col-md-3">
                      <p className="text-gray-400 d-inline">
                        {intl.formatMessage({ id: "IdentityType" })}
                      </p>
                      <span className="mx-2">:</span>
                      <p className="d-inline">
                        {intl.formatMessage({ id: "NationalIdentity" })}
                      </p>
                    </div>
                    <div className="col-md-3">
                      <p className="text-gray-400 d-inline">
                        {intl.formatMessage({ id: "NationalIdentity" })}
                      </p>
                      <span className="mx-2">:</span>
                      <p className="d-inline">
                        {intl.formatMessage({ id: "NationalIdentity" })}
                      </p>
                    </div>
                    <div className="col-md-3">
                      <p className="text-gray-400 d-inline">
                        {intl.formatMessage({ id: "DefendantName" })}
                      </p>
                      <span className="mx-2">:</span>
                      <p className="d-inline">
                        {intl.formatMessage({
                          id: "AbdullahbinMohammedbinIbrahim",
                        })}
                      </p>
                    </div>

                    <div className="col-md-3">
                      <p className="text-gray-400 d-inline">
                        {intl.formatMessage({ id: "Email" })}
                      </p>
                      <span className="mx-2">:</span>
                      <p className="d-inline">abd.fasal@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="card bg-light  p-6 mb-7">
                  <div className="px-3 mb-1">
                    <p className="fw-bolder fs-4">
                      {intl.formatMessage({ id: "StudyClaimInfo" })}
                    </p>
                  </div>
                  <div className="row gy-5 p-3">
                    <div className="col-12">
                      <p className="mx-2 text-dark fw-bold">
                        {study?.info?.slice(0, 200)}

                        {study?.info?.length > 200 && (
                          <span
                            className="mx-2 text-primary fw-bold cursor-pointer"
                            onClick={() => setShowModel(true)}
                          >
                            {intl.formatMessage({ id: "ReadMore" })}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card bg-light  p-6 mb-7">
                  <div className="px-3 mb-1">
                    <p className="fw-bolder fs-4">
                      {intl.formatMessage({ id: "ATTACHMENTS" })}
                    </p>
                  </div>
                  <p className="pt-2 fs-6">
                    <div className="d-flex gap-3">
                      <div className="bg-light-primary text-primary border border-primary p-2 rounded-2">
                        <i className="fas fa-paperclip"></i>
                        <span className="me-2 fs-7">
                          {intl.formatMessage({ id: "FirstFile" })}
                        </span>
                      </div>
                      <div className="bg-light-primary text-primary border border-primary p-2 rounded-2">
                        <i className="fas fa-paperclip"></i>
                        <span className="me-2 fs-7">
                          {intl.formatMessage({ id: "SecondFile" })}
                        </span>
                      </div>
                    </div>
                  </p>
                </div>
                {status === "Drafts" ? (
                  ""
                ) : (
                  <div className="bg-light pt-5 pb-1 px-5 border">
                    <div>
                      <h3 className="card-title align-items-start flex-column">
                        <h3 className="card-label fw-bolder fs-4 mb-5 ">
                          {intl.formatMessage({ id: "Approvals" })}
                        </h3>
                      </h3>
                    </div>
                    <div className="d-flex pt-2 mb-2 align-items-center">
                      <p className="fontSz-6">
                        {intl.formatMessage({ id: "Approvals" })} :{" "}
                      </p>
                      <p className="px-2 fs-6 fw-bolder">
                        {intl.formatMessage({ id: "Default" })}
                      </p>
                    </div>

                    <div className="style-first-approvals">
                      <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center circle-number-approvals">
                        1
                      </div>

                      <div className="d-flex align-items-center">
                        <p className="fs-6 fw-bolder">
                          {intl.formatMessage({
                            id: "HumanResourcesManagementCourse",
                          })}
                        </p>
                        <p className="fontSz-6 mx-5 text-gray-400">
                          {intl.formatMessage({ id: "ExceptionDated" })}
                        </p>
                      </div>

                      <div className="d-flex align-items-center mb-3">
                        <div className="">
                          {intl.formatMessage({ id: "AcceptanceReason" })}:
                          <span className="me-3">:</span>
                          <span>
                            {" "}
                            {intl.formatMessage({ id: "LoremIpsum1" })}
                          </span>
                        </div>
                      </div>

                      <div className="d-flex align-items-center">
                        <p className="fontSz-6 text-gray-400">
                          {intl.formatMessage({ id: "ShowSLA" })}
                        </p>
                        <p className="fs-6 fw-bolder">
                          {intl.formatMessage({ id: "No" })}
                        </p>
                      </div>
                    </div>

                    <div className="style-second-approvals">
                      <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center circle-number-approvals">
                        2
                      </div>

                      <div className="d-flex align-items-center">
                        <p className="fs-6 fw-bolder">
                          {intl.formatMessage({
                            id: "HumanResourcesManagementCourse",
                          })}
                        </p>
                        <p className="fontSz-6 mx-5 text-gray-400">
                        {status === "Rejected"?intl.formatMessage({ id: "RejectDate" }): intl.formatMessage({ id: "ExceptionDated" })};
                        </p>
                      </div>

                      <div className="d-flex align-items-center mb-3">
                        <div className="">
                          {status === "Rejected"
                            ? intl.formatMessage({ id: "ReasonForRejection" })
                            : intl.formatMessage({
                                id: "AcceptanceReason",
                              })}{" "}
                          <span className="me-3">:</span>
                          <span>
                            {" "}
                            {intl.formatMessage({ id: "LoremIpsum1" })}
                          </span>
                        </div>
                      </div>

                      <div className="d-flex align-items-center ">
                        <p className="fontSz-6 text-gray-400">
                          {intl.formatMessage({ id: "ShowSLA" })}
                        </p>
                        <p className="fs-6 fw-bolder">
                          {intl.formatMessage({ id: "No" })}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDeleteModel && (
        <div className="modal fade" aria-hidden="true">
          <DeletePopup
            showDelete={showDeleteModel}
            handleCloseDelete={() => setShowDeleteModel(false)}
          />
        </div>
      )}
      {showModel && (
        <div className="modal fade" aria-hidden="true">
          <ShowMore
            show={showModel}
            handleClose={() => setShowModel(false)}
            data={study?.info}
          />
        </div>
      )}
    </>
  );
};
