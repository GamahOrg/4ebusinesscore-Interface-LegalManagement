import React, { useState } from "react";
import { Row, Col, Button, Collapse } from "react-bootstrap";
import { useIntl } from "react-intl";
import RequestAvailableCoursePopup from "../../popups/AddOwnerPopup";

function DropDownConTeamWork() {
  const [openSections, setOpenSections] = useState([1, 2, 3, 4]);
  const [showPopup, setShowPopup] = useState(false);
  const intl = useIntl();

  const sections = [
    {
      id: 1,
      title: "Owner",
      items: [{ name: "MuhammadImadAbdelAzim", claim: "Claim#1" }],
    },
    {
      id: 2,
      title: "Supervisors",
      items: [
        { name: "MuhammadImadAbdelAzim", claim: "Claim#1" },
        { name: "MuhammadImadAbdelAzim", claim: "Claim#1" },
        { name: "MuhammadImadAbdelAzim", claim: "Claim#1" },
      ],
    },
    {
      id: 3,
      title: "Lawyers",
      items: [
        { name: "MuhammadImadAbdelAzim", claim: "Claim#1" },
        { name: "MuhammadImadAbdelAzim", claim: "Claim#1" },
        { name: "MuhammadImadAbdelAzim", claim: "Claim#1" },
      ],
    },
    {
      id: 4,
      title: "dataEntry",
      items: [
        { name: "MuhammadImadAbdelAzim", claim: "Claim#1" },
        { name: "MuhammadImadAbdelAzim", claim: "Claim#1" },
      ],
    },
  ];

  const handleToggle = (id: any) => {
    setOpenSections((prevState) =>
      prevState.includes(id)
        ? prevState.filter((sectionId) => sectionId !== id)
        : [...prevState, id]
    );
  };

  return (
    <>
      <Row className="g-3">
        {sections.map((section) => (
          <Col xs={12} key={section.id}>
            <div className="bg-secondary rounded p-3">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">
                  {intl.formatMessage({ id: section.title })}
                </h2>
                <div>
                  <Button
                    variant="link"
                    className="text-primary"
                    onClick={() => setShowPopup(true)}
                  >
                    <i className="fa-solid fa-circle-plus fs-2 my-5"></i>
                  </Button>
                  <Button
                    variant="link"
                    className="text-white"
                    onClick={() => handleToggle(section.id)}
                  >
                    <i
                      className={`fa-solid ${openSections.includes(section.id)
                          ? "fa-angle-up"
                          : "fa-angle-down"
                        } fs-3`}
                    ></i>
                  </Button>
                </div>
              </div>

              <Collapse in={openSections.includes(section.id)}>
                <div className="mt-3">
                  {section.items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded mb-3 d-flex flex-column flex-sm-row align-items-start align-items-sm-center"
                    >
                      <Col
                        xs={12}
                        sm={6}
                        className="d-flex align-items-center mb-2 mb-sm-0"
                      >
                        <i className="fa-solid fa-circle-user fs-3 text-primary me-3"></i>
                        <div>

                          <span className="fw-bold">
                            {intl.formatMessage({ id: item.name })}
                          </span>{" "}
                          <span className="text-muted">
                            ({intl.formatMessage({ id: "Internal" })})
                          </span>
                        </div>
                      </Col>
                      <Col
                        xs={12}
                        sm={12} 
                        className="d-flex justify-content-between align-items-center mb-2"
                      >
                        <div className="d-flex align-items-center">
                          <i className="fa-solid fa-circle-user fs-3 text-primary me-3"></i>
                          <div>
                            <span className="fw-bold">
                              {intl.formatMessage({ id: item.name })}
                            </span>{" "}
                            <span className="text-muted">
                              ({intl.formatMessage({ id: "Internal" })})
                            </span>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex flex-wrap">
                            {[...Array(3)].map((_, idx) => (
                              <div
                                key={idx}
                                className="bg-secondary text-dark py-2 px-3 rounded me-2 mb-2"
                              >
                                {intl.formatMessage({ id: item.claim })}
                                <span className="dark-gray ms-1">
                                  ({intl.formatMessage({ id: "Internal" })})
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Trash Icon */}
       
                        </div>
                      </Col>

                    </div>
                  ))}
                </div>
              </Collapse>
            </div>
          </Col>
        ))}
      </Row>

      <RequestAvailableCoursePopup
        show={showPopup}
        handleClose={() => setShowPopup(false)}
        title={sections.find((section) => section.id === openSections[0])?.title}
      />

    </>
  );
}

export default DropDownConTeamWork;
