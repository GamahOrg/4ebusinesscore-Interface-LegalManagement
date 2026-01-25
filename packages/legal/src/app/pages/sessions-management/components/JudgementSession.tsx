import { useState } from "react";
import { useIntl } from "react-intl";
import { ShowMore } from "../popups/ShowMore";
import moment from "moment";
import "moment/locale/ar";
import { SessionJedgementStatus } from "../../../models/LegalEnums";
import { LegalRootUrl } from "@4eplatform/shared/apis/legal";
import { Button } from "react-bootstrap";

function JudgementSession({ session }) {
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ title: "", content: "" });
  const intl = useIntl();
  moment.locale("en");

  const openPopup = (title, content) => {
    setPopupData({ title, content });
    setShowPopup(true);
  };

  const closePopup = () => setShowPopup(false);

  const baseURL = (window as any)._env_?.REACT_APP_API_Legal_Url;

  const handleDownload = (filePath) => {
    const fileURL = `${LegalRootUrl}${filePath}`;
    const a = document.createElement("a");
    a.href = fileURL;
    a.setAttribute("download", filePath.split("/").pop() || "downloaded-file");
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  return (
    <>
      <div className="bg-light p-5 mb-5 rounded mt-4 mx-4">
        <h4 className="mb-6 fs-2 fw-bolder">
          {intl.formatMessage({ id: "JudgmentReport" })}
        </h4>

        <div>
          <div className="row row-cols-1 row-cols-lg-2 gy-5 gx-5">
            {/* Judgment Title Section */}
            <div className="col">
              <div className="card p-4 shadow-sm h-100">
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <h5 className="mb-0 fs-4 fw-bolder">
                    {intl.formatMessage({
                      id: "JudgmentTitle",
                    })}
                  </h5>
                  <div className="bg-light-success p-3 rounded">
                    <span className="text-success">
                      {session?.judgementGroundDto[0]?.lK_JudgementId ===
                        SessionJedgementStatus.ForMe &&
                        intl.formatMessage({
                          id: "Favorable",
                        })}
                      {session?.judgementGroundDto[0]?.lK_JudgementId ===
                        SessionJedgementStatus.Against &&
                        intl.formatMessage({
                          id: "Opponent",
                        })}
                      {session?.judgementGroundDto[0]?.lK_JudgementId ===
                        SessionJedgementStatus.Equality &&
                        intl.formatMessage({
                          id: "Equal",
                        })}
                    </span>
                  </div>
                </div>
                <p className="fs-5">
                  {session?.judgementGroundDto[0]?.titleJudement}
                </p>
                <div className="d-flex align-items-center gap-2 mb-5">
                  <div
                    className="rounded-circle bg-primary"
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                    }}
                  ></div>
                  <p className="mb-0">
                    {session?.judgementGroundDto[0]?.lK_JudgementNameAr}
                  </p>
                </div>
                {(() => {
                  const judgement = session?.judgementGroundDto?.[0];
                  const dateValue =
                    judgement?.judgementDate || judgement?.nextSession;
                  const m = dateValue ? moment(dateValue) : null;
                  return m && m.isValid() ? (
                    <p dir="ltr">
                      {m.format("hh:mm A")} {" | "}
                      {m.format("DD MMM YYYY")} {" | "}
                      {m.format("dddd")}
                    </p>
                  ) : null;
                })()}

                {session?.jedgementGroundAttachmentsDTO?.map((doc: any) => (
                  <a href={`${baseURL}/${doc?.filePath}`} download>
                    <div
                      key={doc?.id}
                      className="bg-light rounded text-primary d-flex justify-content-between align-items-center p-3 mb-2"
                    >
                      <div className="w-400px">
                        <span>
                          {doc?.attachmentName
                            ? doc?.attachmentName
                            : doc?.fileName}
                        </span>
                      </div>
                      <Button
                        variant="link"
                        onClick={() => {
                          handleDownload(
                            doc?.filePath?.replace("wwwroot/", "")
                          );
                        }}
                        className="p-0"
                      >
                        <i className="fa-solid fa-download dark-gray fs-4 mt-2"></i>
                      </Button>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Judgment Text Section */}
            {session?.judgementGroundDto[0]?.judgementStatement && (
              <div className="col">
                <div className="card p-6 shadow-sm h-100">
                  <div className="d-flex justify-content-between mb-5">
                    <h5 className="mb-0 fs-4 fw-bolder">
                      {intl.formatMessage({
                        id: "JudgmentText",
                      })}
                    </h5>
                  </div>
                  <p>{session?.judgementGroundDto[0]?.judgementStatement} </p>
                </div>
              </div>
            )}

            {session?.judgementRequirementsDto?.filter(
              (requiremnet: any) => requiremnet?.requirementType === 1
            )?.length > 0 && (
              <div className="col">
                <div className="card p-6 shadow-sm h-100">
                  <div className="d-flex justify-content-between mb-5">
                    <h5 className="mb-0 fs-4 fw-bolder">
                      {intl.formatMessage({
                        id: "PrincipalsRequests",
                      })}
                    </h5>
                  </div>

                  <div className="d-flex flex-column gap-2">
                    {session?.judgementRequirementsDto
                      ?.filter(
                        (requiremnet: any) => requiremnet?.requirementType === 1
                      )
                      ?.map((requirement: any, index: number) => (
                        <div key={requirement?.id} className="d-flex gap-3">
                          <span>{index + 1}:</span>
                          <span className="text-muted">
                            {" "}
                            {requirement?.text}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* Adversaries Requests Section */}
            {session?.judgementRequirementsDto?.filter(
              (requiremnet: any) => requiremnet?.requirementType === 1
            )?.length > 0 && (
              <div className="col">
                <div className="card p-6 shadow-sm h-100">
                  <div className="d-flex justify-content-between mb-5">
                    <h5 className="mb-0 fs-4 fw-bolder">
                      {intl.formatMessage({
                        id: "AdversariesRequests",
                      })}
                    </h5>
                  </div>
                  <div className="d-flex flex-column gap-2">
                    {session?.judgementRequirementsDto
                      ?.filter(
                        (requiremnet: any) => requiremnet?.requirementType === 2
                      )
                      ?.map((requirement: any, index: number) => (
                        <div key={requirement?.id} className="d-flex gap-3">
                          <span>{index + 1}:</span>
                          <span className="text-muted">
                            {" "}
                            {requirement?.text}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showPopup && (
        <ShowMore
          show={showPopup}
          handleClose={closePopup}
          data={popupData.content}
          title={popupData.title}
        />
      )}
    </>
  );
}

export default JudgementSession;
