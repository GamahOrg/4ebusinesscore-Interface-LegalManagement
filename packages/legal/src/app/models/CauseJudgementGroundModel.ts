import { SessionJedgementStatus } from "./LegalEnums";

export class CauseJudgementGroundModel {
  id: string;
  lK_JudgementId: number;
  lK_Judgement: { id: number; nameAr: string; nameEn: string };
  sessionJedgementStatus: SessionJedgementStatus;
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
    sessionJedgementStatus: SessionJedgementStatus = SessionJedgementStatus.Against,
    judgementStatement: string = "",
    nextSession: string = ""
  ) {
    this.id = id;
    this.lK_JudgementId = lK_JudgementId;
    this.lK_Judgement = lK_Judgement;
    this.sessionJedgementStatus = sessionJedgementStatus;
    this.judgementStatement = judgementStatement;
    this.nextSession = nextSession;
  }
}
