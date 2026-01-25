import React, { useState } from "react";
import { useIntl } from "react-intl";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { Container } from "react-bootstrap";
import { ShowMore } from "../../study-of-lawsuits/popup/ShowMore";
import { ShowMore2 } from "../propus/showMore2";
import { Modal } from "react-bootstrap";
import { RejectPopup } from "../propus/RejectPopup";
import { AcceptPopup } from "../propus/AcceptPopup";
import PopUp from "@4eplatform/shared/src/popups/pop-up";
import { useLocation } from "react-router";

export default function FollowLawsuits() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const intl = useIntl();
  const [show, setShow] = useState(false);

  const [isOpen, setIsOpen] = useState(true);
  const [isOpen2, setIsOpen2] = useState(false);

  const [isReadMore, setIsReadMore] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showModel2, setShowModel2] = useState(false);
  const [modalDShow, setModalDShow] = useState<boolean>(false);
  const [showAcceptPopup, setShowAcceptPopup] = useState<boolean>(false);
  const [showAttributionPopup, setAttributionPopup] = useState<boolean>(false);
  const study = {
    id: 2541851,
    info: `الموضوع: مذكرة رد على الدعوى العمالية المقدمة من المدعي (اسم المدعي) ضد المدعى المقدمة من المدعي (اسم المدعي) ضد المدعى عليه اسم المدعى علي الموضوع: مذكرة رد على الدعوى العمالية المقدمة من المدعي (اسم المدعي) ضد المدعى عليه اسم المدعى عليه الموضوع: مذكرة رد على الدعوى العمالية المقدمة من المدعي (اسم المدعي) ضد المدعى عليه اسم المدعى عليه`,
    created_at: "2022-01-01",
    status: "UnderSettlement",
  };
  const toggleContainer = () => {
    setIsOpen(!isOpen);
  };
  const emps = [
    "AbdullahbinMohammed",
    "SaudMohammedAliAl-Qahtani",
    "SaudMohammedAliAl-Qahtani",
    "AbdullahbinMohammed",
  ];
  const toggleContainer2 = () => {
    setIsOpen2(!isOpen2);
  };

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const handleShow2 = () => {
    setShow(!show); // Toggle the visibility
  };
  return (
    <>
      <div>
        <h3 className="follow-title me-8">
          {intl.formatMessage({ id: "Sessions" })}
        </h3>
      </div>
      <div className="main-container-follow">
        <div className="d-flex justify-content-between">
          <h4 className="m-5 Session1Text">
            {intl.formatMessage({ id: "Session1" })}
          </h4>
          <button
            className="text-primary ms-4 mt-3 btn-as-text"
            onClick={handleShow2}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-2"
            >
              <g clipPath="url(#clip0_1246_657)">
                <path
                  d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433286 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9971 7.34872 18.9426 4.80684 17.0679 2.9321C15.1932 1.05736 12.6513 0.00286757 10 0ZM10 18.3333C8.35183 18.3333 6.74066 17.8446 5.37025 16.9289C3.99984 16.0132 2.93174 14.7117 2.30101 13.189C1.67028 11.6663 1.50525 9.99076 1.82679 8.37425C2.14834 6.75774 2.94201 5.27288 4.10745 4.10744C5.27289 2.94201 6.75774 2.14833 8.37425 1.82679C9.99076 1.50525 11.6663 1.67027 13.189 2.301C14.7118 2.93173 16.0132 3.99984 16.9289 5.37025C17.8446 6.74066 18.3333 8.35182 18.3333 10C18.3309 12.2094 17.4522 14.3276 15.8899 15.8899C14.3276 17.4522 12.2094 18.3309 10 18.3333ZM14.1667 10C14.1667 10.221 14.0789 10.433 13.9226 10.5893C13.7663 10.7455 13.5544 10.8333 13.3333 10.8333H10.8333V13.3333C10.8333 13.5543 10.7455 13.7663 10.5893 13.9226C10.433 14.0789 10.221 14.1667 10 14.1667C9.77899 14.1667 9.56703 14.0789 9.41075 13.9226C9.25447 13.7663 9.16667 13.5543 9.16667 13.3333V10.8333H6.66667C6.44566 10.8333 6.2337 10.7455 6.07742 10.5893C5.92113 10.433 5.83334 10.221 5.83334 10C5.83334 9.77899 5.92113 9.56703 6.07742 9.41074C6.2337 9.25447 6.44566 9.16667 6.66667 9.16667H9.16667V6.66667C9.16667 6.44565 9.25447 6.23369 9.41075 6.07741C9.56703 5.92113 9.77899 5.83333 10 5.83333C10.221 5.83333 10.433 5.92113 10.5893 6.07741C10.7455 6.23369 10.8333 6.44565 10.8333 6.66667V9.16667H13.3333C13.5544 9.16667 13.7663 9.25447 13.9226 9.41074C14.0789 9.56703 14.1667 9.77899 14.1667 10Z"
                  fill="#009EF7"
                />
              </g>
              <defs>
                <clipPath id="clip0_1246_657">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {intl.formatMessage({ id: "AddNotes" })}
          </button>
        </div>

        <div className="d-flex justify-content-between w-70 mt-3 mb-3 me-4">
          <div className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "SessionDate" })}
            </p>
            <span className="ms-2 me-2">:</span>
            <p className="lawsuit-text-left">
              {intl.formatMessage({ id: "DateOfTheCase2" })}
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
            <p className="lawsuit-text-left">12:52</p>
          </div>
        </div>

        <div className="bg-white my-8 w-95 mx-auto pb-7 rounded">
          <h4 className="font-size-16 font-weight-700 line-height-20 pt-10 px-8">
            {intl.formatMessage({ id: "ReplyNote" })}
          </h4>

          <Container className="bg-light position-relative mt-8 mb-5 w-95 pe-4 rounded">
            <div
              className="d-flex justify-content-between align-items-center position-relative pb-4"
              style={{ cursor: "pointer" }}
              onClick={toggleContainer}
            >
              <div
                className="arrow-toggle position-absolute pt-5"
                style={{ left: "20px", top: "5px" }}
              >
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              <h4 className="font-size-16 font-weight-700  pt-5 line-height-20">
                {intl.formatMessage({ id: "NoteOne" })}
              </h4>
            </div>

            {isOpen && (
              <div className="toggle-content mt-3  pt-5 pb-3">
                <div className="d-flex">
                  <div className="black-text d-flex">
                    <p className="text-gray-500">
                      {intl.formatMessage({ id: "NoteCreator" })}
                    </p>
                    <span className="mx-2">:</span>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="32"
                        height="32"
                        rx="16"
                        fill="#009EF7"
                        fillOpacity="0.1"
                      />
                      <path
                        d="M15.9999 6C13.3799 6 11.2499 8.13 11.2499 10.75C11.2499 13.32 13.2599 15.4 15.8799 15.49C15.9599 15.48 16.0399 15.48 16.0999 15.49C16.1199 15.49 16.1299 15.49 16.1499 15.49C16.1599 15.49 16.1599 15.49 16.1699 15.49C18.7299 15.4 20.7399 13.32 20.7499 10.75C20.7499 8.13 18.6199 6 15.9999 6Z"
                        fill="#009EF7"
                      />
                      <path
                        d="M21.08 18.1499C18.29 16.2899 13.74 16.2899 10.93 18.1499C9.65996 18.9999 8.95996 20.1499 8.95996 21.3799C8.95996 22.6099 9.65996 23.7499 10.92 24.5899C12.32 25.5299 14.16 25.9999 16 25.9999C17.84 25.9999 19.68 25.5299 21.08 24.5899C22.34 23.7399 23.04 22.5999 23.04 21.3599C23.03 20.1299 22.34 18.9899 21.08 18.1499Z"
                        fill="#009EF7"
                      />
                    </svg>
                    <h3 className="lawsuit-text-left me-3">
                      {intl.formatMessage({ id: "FahdAbdulAziz" })}
                    </h3>
                  </div>

                  <div className="me-3 d-flex">
                    <span className="text-gray-400">
                      {intl.formatMessage({ id: "StudyClaimDate" })}
                    </span>
                    <span className="mx-2">:</span>

                    <h3 className="lawsuit-text-left me-3">
                      {intl.formatMessage({ id: "DateOfTheCase3" })}
                    </h3>
                  </div>
                </div>

                <div className="mt-8 mb-3">
                  <p>
                    {intl.formatMessage({
                      id: "HonorableJudge/RespectedHeadoftheLaborAuthority",
                    })}
                  </p>
                  <p>
                    {intl.formatMessage({
                      id: "Maythepeace,mercy,andblessingsofGodbeuponyou.",
                    })}
                  </p>

                  <div className="d-flex ">
                    {" "}
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
            )}
          </Container>

          <Container className="position-relative mt-8 mb-5 w-95 pe-4 bg-light rounded">
            <div
              className="d-flex justify-content-between align-items-center position-relative pb-4"
              onClick={toggleContainer2}
            >
              <div
                className="arrow-toggle position-absolute pt-5"
                style={{ left: "20px", top: "5px" }}
              >
                {isOpen2 ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              <h3 className="font-size-16 font-weight-700  pt-5 line-height-20">
                {intl.formatMessage({ id: "NoteTwo" })}
              </h3>
            </div>

            {isOpen2 && (
              <div className="toggle-content mt-3  pt-5 pb-3">
                <div className="d-flex">
                  <div className="black-text d-flex">
                    <p className="text-gray-500">
                      {intl.formatMessage({ id: "NoteCreator" })}
                    </p>
                    <span className="mx-2">:</span>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="32"
                        height="32"
                        rx="16"
                        fill="#009EF7"
                        fillOpacity="0.1"
                      />
                      <path
                        d="M15.9999 6C13.3799 6 11.2499 8.13 11.2499 10.75C11.2499 13.32 13.2599 15.4 15.8799 15.49C15.9599 15.48 16.0399 15.48 16.0999 15.49C16.1199 15.49 16.1299 15.49 16.1499 15.49C16.1599 15.49 16.1599 15.49 16.1699 15.49C18.7299 15.4 20.7399 13.32 20.7499 10.75C20.7499 8.13 18.6199 6 15.9999 6Z"
                        fill="#009EF7"
                      />
                      <path
                        d="M21.08 18.1499C18.29 16.2899 13.74 16.2899 10.93 18.1499C9.65996 18.9999 8.95996 20.1499 8.95996 21.3799C8.95996 22.6099 9.65996 23.7499 10.92 24.5899C12.32 25.5299 14.16 25.9999 16 25.9999C17.84 25.9999 19.68 25.5299 21.08 24.5899C22.34 23.7399 23.04 22.5999 23.04 21.3599C23.03 20.1299 22.34 18.9899 21.08 18.1499Z"
                        fill="#009EF7"
                      />
                    </svg>
                    <h3 className="lawsuit-text-left me-3">
                      {intl.formatMessage({ id: "FahdAbdulAziz" })}
                    </h3>
                  </div>

                  <div className="me-3 d-flex">
                    <span className="text-gray-400">
                      {intl.formatMessage({ id: "StudyClaimDate" })}
                    </span>
                    <span className="mx-2">:</span>

                    <h3 className="lawsuit-text-left me-3">
                      {intl.formatMessage({ id: "DateOfTheCase3" })}
                    </h3>
                  </div>
                </div>
                <div className="mt-8 ">
                  <p>
                    {intl.formatMessage({
                      id: "HonorableJudge/RespectedHeadoftheLaborAuthority",
                    })}
                  </p>
                  <p>
                    {intl.formatMessage({
                      id: "Maythepeace,mercy,andblessingsofGodbeuponyou.",
                    })}
                  </p>

                  <div className="d-flex">
                    {" "}
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
            )}
          </Container>
        </div>
        {show && (
          <div className="text-area-container">
            <label className="text-area-title">
              {intl.formatMessage({ id: "ReplyNote" })}
            </label>
            <textarea
              className="text-area-input"
              placeholder={intl.formatMessage({ id: "EnterTheNoteFollow" })}
            />

            <Modal.Body className="pb-0">
              <div className="mt-3  col-12 my-5">
                <p className="text-mute attachments-title my-3">
                  {intl.formatMessage({ id: "ATTACHMENTS" })}
                </p>
                <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed mb-1 ">
                  <label
                    htmlFor="outputAttachment"
                    className="form-label px-2  fontSz-6 dropzone-select   w-100 uploadFile-style inputAreaHeight"
                  >
                    <div className="d-flex justify-content-center align-items-center text-primary pt-2">
                      <i className="fas fa-paperclip mx-2"></i>
                      {intl.formatMessage({ id: "AttachDocument" })}
                    </div>
                  </label>
                  <div
                    className="dropzone dropzone-queue mb-2"
                    id="kt_dropzonejs_example_3"
                  >
                    <div className="dropzone-panel mb-lg-0 mb-2">
                      <input
                        multiple
                        type="file"
                        accept="image/*"
                        id="outputAttachment"
                        name="attachments"
                        placeholder="رفع الملفات"
                        className="dropzone-select w-100 uploadFile-style inputAreaHeight d-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </div>
        )}
      </div>
      {status === "Approve" || status === "Rejected" ? (
        ""
      ) : (
        <div className="d-flex justify-content-end me-9 mb-9">
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

      {showModel2 && (
        <div className="modal fade">
          <ShowMore2
            show={showModel2}
            handleClose={() => setShowModel2(false)}
            data={study?.info}
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
              borderWidth: "2px",
            }}
            className="btn btn-secondary text-center px-20  mb-2"
          >
            {intl.formatMessage({ id: "Cancel" })}
          </div>
          <div className="btn btn-primary text-center px-20  mb-2">
            {intl.formatMessage({ id: "Send" })}
          </div>
        </div>
      </PopUp>
    </>
  );
}
