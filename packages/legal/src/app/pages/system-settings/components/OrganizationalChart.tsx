import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { Nav } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import ConfidentialityType from "./ConfidentialityType";
import DocumentationClass from "./DocumentationClass";
import ExternalAuthorities from "./ExternalAuthorities";
import TasksStatus from "./TasksStatus";

const OrganizationalChart: FC = () => {
  const intl = useIntl();
  const [buttonName, setButtonName] = useState<string>("");
  const handleButtonClick = (buttonName: any) => {
    setButtonName(buttonName);
  };

  return (
    <>
      <div className=" card-xl-stretch mb-xl-0">
        <div className="card-header px-3 pt-3 pb-2 mb-3  d-flex justify-content-between">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fs-4  fw-bolder  my-5 ">
              {intl.formatMessage({ id: "PleaseChooseFromTheFollowingData" })}{" "}
            </span>
          </h3>
        </div>
      </div>
      <div id="kt_content_container">
        <Tab.Container id="left-tabs-example" defaultActiveKey="1">
          <Row>
            <Col sm={4}>
              <div className=" card-xl-stretch mb-xl-0">
                <div className="border-1 pt-3 pb-2">
                  <div className="card-title align-items-start flex-column">
                    <h3 className="text-dark mb-2 fs-4 fw-bolder  mt-3">
                      {intl.formatMessage({
                        id: "Settings",
                      })}
                    </h3>
                  </div>
                  <div className="card-title w-100 ">
                    <div className="d-flex align-items-center position-relative">
                      <span
                        className={`svg-icon svg-icon-1 position-absolute ${
                          getCurrentSystemLanguage() === "ar" ? "me-6" : "ms-6"
                        }`}
                      >
                        <KTSVG path="/media/icons/duotune/general/gen114_search.svg" />
                      </span>
                      <input
                        type="text"
                        data-kt-filemanager-table-filter="search"
                        className={`form-control form-control-solid  ${
                          getCurrentSystemLanguage() === "ar"
                            ? "pe-15"
                            : "ps-15"
                        }`}
                        placeholder={intl.formatMessage({
                          id: "Search",
                        })}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Nav
                    variant="pills"
                    className="flex-column overflow-auto flex-nowrap basic "
                    style={{ height: "50vh" }}
                  >
                    <Nav.Link
                      className={
                        "fw-bolder  pt-4 pb-4 fs-5 d-flex justify-content-between align-items-center"
                      }
                      eventKey={1}
                      onClick={() => handleButtonClick("ExternalAuthorities")}
                    >
                      <div>
                        {" "}
                        <i className="bi bi-diagram-3 mx-3 fs-1"></i>
                        <span className="basic-item" role="button">
                          {intl.formatMessage({
                            id: "ExternalAuthorities",
                          })}{" "}
                        </span>
                      </div>
                      {getCurrentSystemLanguage() === "ar" ? (
                        <i className="fas fa-chevron-left px-3"></i>
                      ) : (
                        <i className="fas fa-chevron-right"></i>
                      )}
                    </Nav.Link>
                    <Nav.Link
                      className={`fw-bolder pt-4 pb-4 fs-5 d-flex justify-content-between align-items-center `}
                      eventKey={2}
                      onClick={() => handleButtonClick("TasksStatus")}
                    >
                      <div>
                        {" "}
                        <i className="bi bi-diagram-3 mx-3 fs-1"></i>
                        <span className="basic-item" role="button">
                          {intl.formatMessage({
                            id: "TasksStatus",
                          })}{" "}
                        </span>
                      </div>
                      {getCurrentSystemLanguage() === "ar" ? (
                        <i className="fas fa-chevron-left px-3"></i>
                      ) : (
                        <i className="fas fa-chevron-right"></i>
                      )}
                    </Nav.Link>
                    <Nav.Link
                      className={`fw-bolder pt-4 pb-4 fs-5 d-flex justify-content-between align-items-center `}
                      eventKey={3}
                      onClick={() => handleButtonClick("DocumentationClass")}
                    >
                      <div>
                        {" "}
                        <i className="bi bi-diagram-3 mx-3 fs-1"></i>
                        <span className="basic-item" role="button">
                          {intl.formatMessage({
                            id: "DocumentationClass",
                          })}{" "}
                        </span>
                      </div>
                      {getCurrentSystemLanguage() === "ar" ? (
                        <i className="fas fa-chevron-left px-3"></i>
                      ) : (
                        <i className="fas fa-chevron-right"></i>
                      )}
                    </Nav.Link>
                    <Nav.Link
                      className={`fw-bolder pt-4 pb-4 fs-5 d-flex justify-content-between align-items-center `}
                      eventKey={4}
                      onClick={() => handleButtonClick("ConfidentialityType")}
                    >
                      <div>
                        {" "}
                        <i className="bi bi-diagram-3 mx-3 fs-1"></i>
                        <span className="basic-item" role="button">
                          {intl.formatMessage({
                            id: "ConfidentialityType",
                          })}{" "}
                        </span>
                      </div>
                      {getCurrentSystemLanguage() === "ar" ? (
                        <i className="fas fa-chevron-left px-3"></i>
                      ) : (
                        <i className="fas fa-chevron-right"></i>
                      )}
                    </Nav.Link>
                  </Nav>
                </div>
              </div>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                <Tab.Pane eventKey={1}>
                  <ExternalAuthorities buttonName={buttonName} />
                </Tab.Pane>
                <Tab.Pane eventKey={2}>
                  <TasksStatus buttonName={buttonName} />
                </Tab.Pane>
                <Tab.Pane eventKey={3}>
                  <DocumentationClass buttonName={buttonName} />
                </Tab.Pane>
                <Tab.Pane eventKey={4}>
                  <ConfidentialityType buttonName={buttonName} />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  );
};

export { OrganizationalChart };
