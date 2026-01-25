import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useParams } from "react-router-dom";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import ChatInterface from "./ChatInterface";

const IntelligentInterLocutor: FC = () => {
  const intl = useIntl();
  const { workspaceName } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const initialItems: any[] = [
    {
      id: 1,
      text: intl.formatMessage({
        id: "HowManyHospitalsAreAvailableInTheSouthernRegion",
      }),
      hasLikeIcon: true,
    },
    {
      id: 2,
      text: intl.formatMessage({
        id: "NamesOfTheDoctorsInChargeOfTheSouthernHospital",
      }),
      hasLikeIcon: false,
    },
    {
      id: 3,
      text: intl.formatMessage({
        id: "HasTheIdeaOfResidentialComplexesInTheNorthernRegionBeenProposedBefore",
      }),
      hasLikeIcon: false,
    },
    {
      id: 4,
      text: intl.formatMessage({
        id: "NamesOfMPsIn2020AndHowToDealWithTheGlobalCrisisInBahrain",
      }),
      hasLikeIcon: true,
    },
    {
      id: 5,
      text: intl.formatMessage({
        id: "HasTheIdeaOfResidentialComplexesInTheNorthernRegionBeenProposedBefore",
      }),
      hasLikeIcon: false,
    },
  ];
  const filteredItems = initialItems.filter((item) => item.text.toLowerCase().includes(searchTerm.toLowerCase()));
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <div className="toolbar py-5 py-lg-15" id="kt_toolbar">
        <div id="kt_toolbar_container" className="container-xxl p-0 d-flex flex-stack flex-wrap">
          <div className="page-title d-flex flex-column me-3">
            <h1 className="d-flex text-white fw-bolder my-1 fs-3"> {intl.formatMessage({ id: "intelligentInterlocutor" })}</h1>
            <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1">
              <li className="breadcrumb-item text-white opacity-75">
                <Link to={"/home-workspace"} className="text-white text-hover-primary">
                  {intl.formatMessage({ id: "Home" })}
                </Link>
              </li>
              <li className="breadcrumb-item">
                <span className="bullet bg-white opacity-75 w-5px h-2px"></span>
              </li>
              <li className="breadcrumb-item text-white opacity-75">
                <Link to={`/${workspaceName}-workspace`} className="text-white text-hover-primary">
                  {intl.formatMessage({ id: "Workspace" })}
                </Link>
              </li>
              <li className="breadcrumb-item">
                <span className="bullet bg-white opacity-75 w-5px h-2px"></span>
              </li>
              <li className="breadcrumb-item text-white opacity-75"> {intl.formatMessage({ id: "intelligentInterlocutor" })}</li>
            </ul>
          </div>
        </div>
      </div>

      <div id="kt_content_container" className="d-flex flex-column-fluid align-items-start container-xxl p-0">
        <div className="content flex-row-fluid" id="kt_content">
          <div className="flex-lg-row-fluid" data-select2-id="select2-data-129-tmo1">
            <div className="card mb-xl-8 position-relative">
              <div className="card-body py-3">
                <div className="card-header pt-3 pb-2  d-flex bg-light  border-secondary border-0 border-top-1 border-bottom-1 mt-10 mb-5 ">
                  <div className="card-title align-items-start flex-column">
                    <h2 className="card-label fw-bolder fs-2 mb-6">
                      {intl.formatMessage({
                        id: "ChatGPT",
                      })}
                    </h2>
                    <span className="fw-semibold fs-6 text-muted">
                      {intl.formatMessage({
                        id: "TalkToTheSmartInterlocutorToKnowAnyInformation",
                      })}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="row d-flex">
                    <div className="col-md-7 flex-grow-1">
                      <ChatInterface />
                    </div>
                    <div className="col-md-5 flex-grow-1">
                      <div className="bg-light pt-6 pb-1 px-5 mb-5 border rounded">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <h2 className="card-label fw-bolder fs-2 mb-0">
                              {intl.formatMessage({
                                id: "PreviousAndUsefulConversations",
                              })}
                            </h2>
                          </div>
                          <div className="d-flex align-items-center">
                            <button className="btn d-flex align-items-center text-primary">
                              <i className="fas fa-check"></i>
                              <div className="me-2 fs-6 font-weight-bold">
                                {intl.formatMessage({
                                  id: "SelectChatGpt",
                                })}
                              </div>
                            </button>
                          </div>
                        </div>

                        <div className="d-flex flex-stack flex-wrap pt-2 pb-2 w-100 mb-3">
                          <div className="col-12 d-flex align-items-center position-relative">
                            <KTSVG path="/media/icons/duotune/general/gen021.svg" className="svg-icon-1 position-absolute text-muted mx-3" />
                            <input
                              type="text"
                              data-kt-user-table-filter="search"
                              className="form-control form-control-solid px-11"
                              placeholder={intl.formatMessage({
                                id: "Search",
                              })}
                              value={searchTerm}
                              onChange={handleSearch}
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-stack flex-wrap pt-2 pb-2 w-100 mb-10">
                          <div>
                            {filteredItems.map((item, index) => (
                              <div key={index} className="d-flex align-items-center justify-content-between bg-white pt-4 pb-4 px-5 mb-5 border w-100">
                                <div className="fs-5">{item.text}</div>
                                {item.hasLikeIcon ? (
                                  <button className="btn px-2">
                                    <i className="fas fa-thumbs-up fs-1 text-hover-primary"></i>
                                  </button>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default IntelligentInterLocutor;
