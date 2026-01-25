import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import { useLocation} from "react-router-dom";
import { ShowMore } from "../propus/ShowMore";
import { AcceptPopup } from "../propus/AcceptPopup";
import { RejectPopup } from "../propus/RejectPopup";
import PopUp from "@4eplatform/shared/src/popups/pop-up";

const StudyClaimDetails3: FC = () => {
  const intl = useIntl();
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [modalDShow, setModalDShow] = useState<boolean>(false);
  const [showAcceptPopup, setShowAcceptPopup] = useState<boolean>(false);
  const [showAttributionPopup, setAttributionPopup] = useState<boolean>(false);
  const emps = [
    "AbdullahbinMohammed",
    "SaudMohammedAliAl-Qahtani",
    "SaudMohammedAliAl-Qahtani",
    "AbdullahbinMohammed",
  ];

  const study = {
    id: 2541851,
    name: "سعود محمد علي",
    info: `هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء.`,
    created_at: "2022-01-01",
  };
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const status = params.get("status");

  return (
    <>
      <div
        id="kt_toolbar_container"
        className="container-xxl d-flex flex-stack flex-wrap p-0"
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
                    <div className="col-lg-4 col-sm-12">
                      <p className="text-gray-400">
                        {" "}
                        {intl.formatMessage({ id: "DefendantName" })} :
                        <span className="mx-2 text-dark fw-bold">
                          {study?.name}
                        </span>
                      </p>
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
                  <div className="pt-2 fs-6">
                    <div className="d-flex gap-3">
                      <div className="bg-light-primary text-primary border border-primary p-2 rounded-2">
                        <i className="fas fa-paperclip"></i>
                        <span className="me-2 fs-7">
                          {intl.formatMessage({ id: "Attached" })}
                        </span>
                      </div>
                      <div className="bg-light-primary text-primary border border-primary p-2 rounded-2">
                        <i className="fas fa-paperclip"></i>
                        <span className="me-2 fs-7">
                          {intl.formatMessage({ id: "Attached2" })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {status === "Approve" || status === "Rejected" ? (
                  <div className="card bg-light  p-6 mb-7">
                    <div className="px-3 mb-1">
                      <p className="fw-bolder fs-4">
                        {status === "Approve"
                          ? intl.formatMessage({ id: "ReasonForAcceptance" })
                          : intl.formatMessage({ id: "ReasonForRejection" })}
                      </p>
                    </div>
                    <div className="row gy-5 p-3">
                      <div className="col-12">
                        <p className="mx-2 text-dark fw-bold">
                          {study?.info?.slice(0, 200)}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-end mb-5">
                    <button
                      className="btn btn-white border border-dark text-dark"
                      onClick={() => setAttributionPopup(true)}
                    >
                      {intl.formatMessage({ id: "Imputation" })}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => setModalDShow(true)}
                    >
                      {intl.formatMessage({ id: "Reject" })}
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => setShowAcceptPopup(true)}
                    >
                      {intl.formatMessage({ id: "Acceptance" })}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDeleteModel && (
        <div className="modal fade">
          <DeletePopup
            showDelete={showDeleteModel}
            handleCloseDelete={() => setShowDeleteModel(false)}
          />
        </div>
      )}
      {showModel && (
        <div className="modal fade">
          <ShowMore
            show={showModel}
            handleClose={() => setShowModel(false)}
            data={study?.info}
          />
        </div>
      )}
      <RejectPopup
        handleClose={() => setModalDShow(false)}
        show={modalDShow}
        id={3}
        withReason={true}
        reasonRequired={true}
      />
      <AcceptPopup
        handleClose={() => setShowAcceptPopup(false)}
        show={showAcceptPopup}
        text="ConfirmAcceptClaim"
      />
      <PopUp
        title="TheAttribution"
        size="lg"
        withActions={false}
        handleClose={() => setAttributionPopup(false)}
        show={showAttributionPopup}
      >
        <hr className="mb-10" />
        <div className="question-title d-flex flex-column gap-2">
          <span>{intl.formatMessage({ id: "TheSubject" })}</span>
          <select
            className="form-select form-select-solid fw-bolder"
            data-kt-select2="true"
            data-placeholder="Select option"
            data-allow-clear="true"
            data-kt-user-table-filter="role"
            data-hide-search="true"
          >
            <option>{intl.formatMessage({ id: "SelectEmployee" })}</option>
            {emps.map((emp, index) => (
              <option key={index} value={index}>
                {intl.formatMessage({ id: emp })}
              </option>
            ))}
          </select>
        </div>
        <div className="answer d-flex flex-column gap-2 mt-6">
          <span>{intl.formatMessage({ id: "Notces" })}</span>
          <textarea
            className="text-area-form"
            placeholder={intl.formatMessage({ id: "EnterNotces" })}
          />
        </div>
        <div className="d-flex justify-content-center gap-5 py-5">
          <div
            onClick={() => setAttributionPopup(false)}
            style={{
              borderStyle: "solid",
              borderWidth: "2px",
            }}
            className="btn btn-secondary me-3 px-20 mb-2"
          >
            {intl.formatMessage({ id: "Cancel" })}
          </div>
          <div className="btn btn-primary text-center px-20 w-10 mb-2">
            {intl.formatMessage({ id: "Send" })}
          </div>
        </div>
      </PopUp>
    </>
  );
};
export default StudyClaimDetails3;
