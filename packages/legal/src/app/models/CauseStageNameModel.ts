import { CauseStageStatus } from "./LegalEnums";
export class CauseStageNameModel {
  caseStageId: string;
  lk_StageId: number;
  lk_StageNameAr: string;
  lk_StageNameEn: string;
  sessions: { causeStageId: ""; sessionId: "" }[];
  causeStageStatus: CauseStageStatus;
  causeStageNumber: string;
  constructor(
    caseStageId: string = "",
    lk_StageId: number = 0,
    lk_StageNameAr: string = "",
    lk_StageNameEn: string = "",
    sessions: { causeStageId: ""; sessionId: "" }[] = [],
    causeStageStatus: CauseStageStatus = CauseStageStatus.IsFinished,
    causeStageNumber: string = ""
  ) {
    this.caseStageId = caseStageId;
    this.lk_StageId = lk_StageId;
    this.lk_StageNameAr = lk_StageNameAr;
    this.lk_StageNameEn = lk_StageNameEn;
    this.sessions = sessions;
    this.causeStageNumber = causeStageNumber;
    this.causeStageStatus = causeStageStatus;
  }
}
