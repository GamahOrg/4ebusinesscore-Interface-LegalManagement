import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import CaseJudgementDetails from "./components/CaseJudgementDetails";
import { useState } from "react";
import { useIntl } from "react-intl";
import { useAppSelector } from "../../store/store";

const CaseJudgement = () => {
  const intl = useIntl();
  const [causeNumber, setCaseNumber] = useState("");
  const caseData = useAppSelector((state) => state.causes.causeById);

  return (
    <>
      <GenericToolbar
        list={[
          { key: "JudgmentAdministration", value: "/judgements-managements" },
          {
            key: `${
              caseData?.title || intl.formatMessage({ id: "CaseRuling" })
            }`,
            value: "",
          },
        ]}
      />
      <CaseJudgementDetails
        onDataLoaded={(judgeData) => setCaseNumber(judgeData.causeNumber)}
      />
    </>
  );
};

export default CaseJudgement;
