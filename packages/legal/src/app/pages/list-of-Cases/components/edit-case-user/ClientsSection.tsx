import React from "react";
import { Row } from "react-bootstrap";
import RightSection from "./RightSection";
import LeftSection from "./LeftSection";

export default function ClientsSection() {
  return (
    <>
      <div className="d-flex w-100">
        <Row className="g-5 w-100 px-8 cleint-section-responsive">
          <RightSection />
          <LeftSection />
        </Row>
      </div>
    </>
  );
}
