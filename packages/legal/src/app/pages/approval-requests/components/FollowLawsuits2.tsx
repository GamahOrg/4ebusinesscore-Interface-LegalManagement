import React, { useState } from "react";
import { useIntl } from "react-intl";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { Container } from "react-bootstrap";
import { ShowMore } from "../../study-of-lawsuits/popup/ShowMore";
import { ShowMore2 } from "../propus/showMore2";

export default function FollowLawsuits2() {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(true);
  const [isOpen2, setIsOpen2] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showModel2, setShowModel2] = useState(false);

  const study = {
    id: 2541851,
    info: `الموضوع: مذكرة رد على الدعوى العمالية المقدمة من المدعي (اسم المدعي) ضد المدعى المقدمة من المدعي (اسم المدعي) ضد المدعى عليه اسم المدعى علي الموضوع: مذكرة رد على الدعوى العمالية المقدمة من المدعي (اسم المدعي) ضد المدعى عليه اسم المدعى عليه الموضوع: مذكرة رد على الدعوى العمالية المقدمة من المدعي (اسم المدعي) ضد المدعى عليه اسم المدعى عليه`,
    created_at: "2022-01-01",
    status: "UnderSettlement",
  };
  const toggleContainer = () => {
    setIsOpen(!isOpen);
  };

  const toggleContainer2 = () => {
    setIsOpen2(!isOpen2);
  };
  return (
    <>
      <div>
        <h3 className="follow-title me-8">
          {intl.formatMessage({ id: "Sessions" })}
        </h3>
       
      </div>
{/* <div className="me-8"> <Steps/></div> */}
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
                {intl.formatMessage({ id: "HumanResourcesManagementCourse" })}
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
                {intl.formatMessage({ id: "HumanResourcesManagementCourse" })}
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
        </div>
      </div>

      </div>
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


    </>
    
  );
}
