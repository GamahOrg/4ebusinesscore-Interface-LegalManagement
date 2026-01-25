export class CausejedgementGroundModel {
  id: string;
  lK_JudgementId: number;
  lK_Judgement: {
    id: number;
    nameAr: string;
    nameEn: string;
  };
  sessionJudgementStatus: number;
  judgementStatement: string;
  nextSession: string;

  constructor(
    id: string = "",
    lK_JudgementId: number = 0,
    lK_Judgement: { id: number; nameAr: string; nameEn: string } = {
      id: 0,
      nameAr: "",
      nameEn: "",
    },
    sessionJudgementStatus: number = 0,
    judgementStatement: string = "",
    nextSession: string = ""
  ) {
    this.id = id;
    this.lK_JudgementId = lK_JudgementId;
    this.lK_Judgement = lK_Judgement;
    this.sessionJudgementStatus = sessionJudgementStatus;
    this.judgementStatement = judgementStatement;
    this.nextSession = nextSession;
  }
}
