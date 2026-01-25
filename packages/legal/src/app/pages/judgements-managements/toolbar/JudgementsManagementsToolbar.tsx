import { useState, FC } from "react";
import { useIntl } from "react-intl";
import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import AddJudgmentPopup from "../popups/AddJudgmentPopup";

type JudgementsManagementsToolbarProps = {
  pageNumber: number;
  pageSize: number;
  searchTerm: string;
  selectedCause: string;
  selectedDegree: string;
};
const JudgementsManagementsToolbar: FC<JudgementsManagementsToolbarProps> = ({
  pageNumber,
  pageSize,
  searchTerm,
  selectedCause,
  selectedDegree,
}) => {
  const intl = useIntl();
  const [showAddJudgment, setShowAddJudgment] = useState<boolean>(false);

  return (
    <>
      <div
        id="kt_toolbar_container"
        className="container d-flex flex-stack flex-wrap p-0"
      >
        <div>
          <GenericToolbar
            list={[
              {
                key: "JudgmentAdministration",
                value: "/legal-workspace/judgements-managements",
              },
            ]}
          />
        </div>
        <div>
          <div className="d-flex justify-content-sm-end align-items-center flex-wrap">
            <div
              className="btn d-flex gap-2 align-items-center btn-light text-gray-800"
              onClick={() => {
                setShowAddJudgment(true);
              }}
            >
              {intl.formatMessage({ id: "AddingTheTermsOfTheSession" })}
            </div>
          </div>
        </div>
      </div>
      {showAddJudgment && (
        <AddJudgmentPopup
          show={showAddJudgment}
          handleClose={() => setShowAddJudgment(false)}
          causeStageId={""}
          pageNumber={pageNumber}
          pageSize={pageSize}
          searchTerm={searchTerm}
          selectedCause={selectedCause}
          selectedDegree={selectedDegree}
        />
      )}
    </>
  );
};

export default JudgementsManagementsToolbar;
