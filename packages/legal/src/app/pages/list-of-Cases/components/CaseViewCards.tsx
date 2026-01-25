import { Row } from "react-bootstrap";
import LegalCaseCard from "./LegalCaseCard";
import { CauseModel } from "../../../models/CauseModel";

function CaseViewCards({
  causes,
  callingData,
}: {
  causes?: CauseModel[];
  callingData?: any;
}) {
  return (
    <div>
      <Row className="g-5 m-0 p-3">
        {Array.isArray(causes) &&
          causes?.map((cause) => (
            <LegalCaseCard
              cause={cause}
              key={cause?.id}
              callingData={callingData}
            />
          ))}
      </Row>
    </div>
  );
}

export default CaseViewCards;
