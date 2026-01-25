import { getStyleByStatus } from "@4eplatform/shared/functions/getStyleByStatus";
import React from "react";
import { useIntl } from "react-intl";
import { useAppSelector } from "../../../store/store";
import causeStatus from "./../../../../../../shared/functions/causeStatus"
import { useLocation } from "react-router-dom";

interface CaseInfoProps {
  color?: string | undefined;
  caseTitle?: string;
  caseNumber?: string | undefined;
  caseName?: string;
  caseStatus?: any;
  shadow?: boolean;
}

export const CaseInfo: React.FC<CaseInfoProps> = ({
  color,
  caseTitle,
  caseNumber,
  caseName,
  caseStatus,
  shadow = true,
}) => {
  const intl = useIntl();
  const location = useLocation();
  const comeFrom = location.state?.comeFrom;

  const caseData = useAppSelector((state) => state.causes.causeById);


 let theme=localStorage.getItem("Theme")
  return (
    <div
      className={`p-4 ${
        shadow ? "shadow" : "bg-body"
      } rounded-2 mb-8 d-flex justify-content-between align-items-center`}
    >
      <div className="text-dark fw-bolder fs-5">
        <span> {caseData?.title}{""}</span> {"  "}
        <span className="text-gray-500 fw-normal fs-6 mx-1">
          {caseData?.causeNumber === "------" ? " " : caseData?.causeNumber}
        </span>
      </div>
      <div className="d-flex justify-content-center align-items-center gap-4">
        <div className={`${theme == "light" ? " bg-white": "border"}
          p-3 fw-bolder fs-6 d-flex justify-content-center align-items-center rounded-2 text-primary
          `}>
          {intl.formatMessage({ id: "TheLawsuit" })}
          {" #"}
          {comeFrom === "judgements-managements" ? 
          intl.locale === "ar" ? location?.state?.item?.stageNameAr : location?.state?.item?.stageNameEn :
          intl.locale === "ar"
            ? caseData?.causeStages[caseData?.causeStages.length - 1]?.lK_Stage
                .nameAr
            : caseData?.causeStages[caseData?.causeStages.length - 1]?.lK_Stage
                .nameEn}
        </div>
        <div
          className={`bg-${getStyleByStatus(
            causeStatus(caseData?.causeStatus, intl)
              ?.statusEnum as number
          )} p-3 fw-bolder fs-6 d-flex justify-content-center align-items-center rounded-2`}
        >
          {causeStatus(caseData?.causeStatus, intl)?.name}
        </div>
      </div>
    </div>
  );
};

export default CaseInfo;
