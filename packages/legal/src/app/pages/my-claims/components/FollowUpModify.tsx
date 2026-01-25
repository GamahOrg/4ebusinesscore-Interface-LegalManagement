import { useState } from "react";
import { useIntl } from "react-intl";
import { Col, Container, Row } from "react-bootstrap";
import { SendPopup } from "../propus/SendPopup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function FollowUpModify() {
  const intl = useIntl();
  const handleSendClick = () => {
    setShowSendPopup(true);
  };

  const navigate = useNavigate();
  const [showSendPopup, setShowSendPopup] = useState<boolean>(false);
  const showSuccessAlert = () => {
    Swal.fire({
      timer: 2000,
      text: intl.formatMessage({ id: "SavedSuccessfully" }),
      icon: "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
  };
  return (
    <>
      <div>
        <div className="d-flex  justify-content-between">
          <h1 className="font-size-17 titleSession">
            {intl.formatMessage({ id: "Sessions" })}
          </h1>
        </div>
        <div className="main-container-follow">
          <div className="d-flex justify-content-between">
            <h4 className="m-5 Session1Text">
              {intl.formatMessage({ id: "Session1" })}
            </h4>
          </div>
          <div className="d-flex justify-content-between w-70 mt-3 mb-3 me-4">
            <div className="d-flex">
              <p className="text-gray-400">
                {intl.formatMessage({ id: "SessionDate" })}
              </p>
              <span className="ms-2 me-2">:</span>
              <p className="lawsuit-text-left">
                {intl.formatMessage({ id: "DateOfTheCase3" })}
              </p>
            </div>

            <div className="d-flex">
              <p className="text-gray-400">
                {intl.formatMessage({ id: "SessionDay" })}
              </p>
              <span className="ms-2 me-2">:</span>
              <p className="lawsuit-text-left">
                {intl.formatMessage({ id: "Wednesday" })}
              </p>
            </div>

            <div className="d-flex">
              <p className="text-gray-400">
                {intl.formatMessage({ id: "SessionTime" })}
              </p>
              <span className="ms-2 me-2">:</span>
              <p className="lawsuit-text-left">12:23</p>
            </div>
          </div>
          <div className="p-3">
            <Row className="mt-5">
              <Col lg={12}>
                <p className="fs-5 text-grey ms-2">
                  {intl.formatMessage({ id: "ReplyNote" })}
                </p>
                <textarea
                  className="custom-textarea w-100 rounded p-3"
                  placeholder={`${intl.formatMessage({
                    id: "EnterTheNoteFollow",
                  })}`}
                />
              </Col>
            </Row>
          </div>
          <div className="p-3">
            <Row>
              <Col lg={12}>
                <p className="fs-5 text-grey ms-2 mt-4 mb-0">
                  {intl.formatMessage({ id: "ATTACHMENTS" })}
                </p>
                <div className="d-flex align-items-center mt-0">
                  <div className="w-100 py-5 mx-auto">
                    <div className="notice bg-light-primary rounded border border-primary border-dashed mb-1">
                      <label
                        htmlFor="outputAttachment"
                        className="form-label px-2 fontSz-6 my-5 w-100 uploadFile-style inputAreaHeight d-flex justify-content-center align-items-center text-primary"
                      >
                        <i className="fas fa-paperclip mx-2"></i>
                        {intl.formatMessage({ id: "AttachDocument" })}
                      </label>
                      <input
                        multiple
                        type="file"
                        accept="image/*"
                        id="outputAttachment"
                        name="attachments"
                        className="d-none"
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        {/* Approvals */}
        <div className="main-container-follow">
          <div className="bg-light pt-5 pb-1 px-5 border">
            <div>
              <div className="card-title align-items-start flex-column">
                <h3 className="card-label fw-bolder fs-4 mb-5 ">
                  {intl.formatMessage({ id: "Approvals" })}
                </h3>
              </div>
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
                <p className="fontSz-6 mx-5">
                  {intl.formatMessage({ id: "ExceptionInApprovals" })}
                </p>
                <p className="fontSz-6 mx-5">
                  {intl.formatMessage({ id: "ApprovalDated10-14-2020" })}
                </p>
              </div>
              <div className="d-flex align-items-center">
                <p className="fs-6 fw-bolder">
                  {intl.formatMessage({ id: "AcceptanceReason" })}:
                </p>
                <p className="fontSz-6 mx-5">
                  {intl.formatMessage({ id: "paragraphOfLawsuit" })}
                </p>
              </div>

              <div className="d-flex align-items-center">
                <p className="fontSz-6">
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
                <p className="fontSz-6 mx-5">
                  {intl.formatMessage({ id: "ExceptionInApprovals" })}
                </p>
                <p className="fontSz-6 mx-5">
                  {intl.formatMessage({ id: "ApprovalDated10-14-2020" })}
                </p>
              </div>
              <div className="d-flex align-items-center">
                <p className="fs-6 fw-bolder">
                  {intl.formatMessage({ id: "ReasonForRejection" })}:
                </p>
                <p className="fontSz-6 mx-5">
                  {intl.formatMessage({ id: "paragraphOfLawsuit" })}
                </p>
              </div>
              <div className="d-flex align-items-center">
                <p className="fontSz-6">
                  {intl.formatMessage({ id: "ShowSLA" })}
                </p>
                <p className="fs-6 fw-bolder">
                  {intl.formatMessage({ id: "No" })}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Container>
          <Row>
            <Col lg={12} className="d-flex justify-content-end mt-3">
              <button
                className="m-2 cancelBtn"
                onClick={() => navigate("/my-claims")}
              >
                {" "}
                {intl.formatMessage({
                  id: "Cancel",
                })}
              </button>
              <button
                className="m-2 btn btn-primary"
                onClick={() => {
                  showSuccessAlert();
                }}
              >
                {intl.formatMessage({ id: "Save" })}
              </button>
              <button className="m-2 btn btn-success" onClick={handleSendClick}>
                {intl.formatMessage({ id: "Send" })}
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      <SendPopup
        show={showSendPopup}
        handleClose={() => setShowSendPopup(false)}
        onConfirm={() => console.log("Send confirmed")}
        title="Send Confirmation"
        text={intl.formatMessage({ id: "AreYouSureYouWantToSend" })}
        confirmText={intl.formatMessage({ id: "Yes" })}
        cancelText={intl.formatMessage({ id: "No" })}
        successText={intl.formatMessage({ id: "SentSuccessfully" })}
      />
    </>
  );
}
