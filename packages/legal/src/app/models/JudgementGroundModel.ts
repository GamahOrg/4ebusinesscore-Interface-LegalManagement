import { AttachmentModel } from "./AttachmentModel";
import { SessionJedgementStatus } from "./LegalEnums";
export class JudgementModel {
  id: string;
  lK_JudgementId: number;
  lK_JudgementNameAr: string;
  lK_JudgementNameEn: string;
  sessionJedgementStatus: SessionJedgementStatus;
  causeStageId: string;
  judgementStatement: string;
  titleJudement: string;
  createOn: string;
  courtName:string;
  areaName:string;
  caseStatus:string;
  causeNumber:string;
  nextSession:string;
  causeId:string;
  sessionNumber:string;
  attachments: {id:string, filePath:string , fileName:string}[];
  judgementRequirementsDto: {requirementType:number, requirementsText:string }[];
  sessionDate : string ; 

  constructor(
    id: string = "",
    lK_JudgementId: number = 0,
    lK_JudgementNameAr: string = "",
    lK_JudgementNameEn: string = "",    
    sessionJedgementStatus:SessionJedgementStatus = SessionJedgementStatus.ForMe,
    causeStageId: string = "",
    judgementStatement: string = "",
    titleJudement: string = "",
    createOn: string = "",
    courtName:string="",
    areaName:string="",
    causeNumber:string = "",
    nextSession:string = "",
    attachments: { id: string, filePath: string, fileName: string }[] = [],
    judgementRequirementsDto:{requirementType:number, requirementsText:string}[]=[],
    caseStatus:string="",
    causeId:string="",
    sessionNumber:string="",
    sessionDate : string ="",
  
  ) {
    this.id = id;
    this.lK_JudgementId = lK_JudgementId;
    this.lK_JudgementNameAr = lK_JudgementNameAr;
    this.lK_JudgementNameEn = lK_JudgementNameEn;
    this.sessionJedgementStatus = sessionJedgementStatus;
    this.causeStageId = causeStageId;
    this.judgementStatement = judgementStatement;
    this.titleJudement = titleJudement;
    this.createOn = createOn;
    this.attachments = attachments;
    this.judgementRequirementsDto = judgementRequirementsDto;
    this.courtName=courtName;
    this.nextSession=nextSession
    this.areaName=areaName;
    this.caseStatus=caseStatus;
    this.causeNumber=causeNumber;
    this.causeId=causeId;
    this.sessionNumber=sessionNumber;
    this.sessionDate = sessionDate;

  }
}


export class JudgementGroundModel {
  id: string;
  causeNumber: string;
  clientType: number;
  sessionJudgementStatus: number;
  causeStatus: number;
  lK_Judgement: Judgement;
  judgementStatement: string;
  opponentName: string;
  nextSessionDate: string;
  judgementTitle: string;
  causeStageId: string;
  sessionJedgementStatus:SessionJedgementStatus;
  attachmentJudgementGroundDto:AttachmentModel[];
  lkStageNameAr:string;
  lkStageNameEn:string;
  causeStageNumber:string;
  countOfSessions:number;
  judgementDate : string ; 

  constructor(
      id: string = "",
      causeNumber: string = "",
      clientType: number = 0,
      sessionJudgementStatus: number = 0,
      causeStatus: number = 0,
      lK_Judgement: Judgement = new Judgement(),
      judgementStatement: string = "",
      opponentName: string = "",
      nextSessionDate: string = "",
      judgementTitle: string = "",
      causeStageId: string = "",
      sessionJedgementStatus:SessionJedgementStatus=SessionJedgementStatus.ForMe,
      attachmentJudgementGroundDto:AttachmentModel[]=[],
      lkStageNameAr:string="",
      lkStageNameEn:string="",
      causeStageNumber:string="",
      countOfSessions:number=0,
      judgementDate : string = "",
  ) {
      this.id = id;
      this.causeNumber = causeNumber;
      this.clientType = clientType;
      this.sessionJudgementStatus = sessionJudgementStatus;
      this.causeStatus = causeStatus;
      this.lK_Judgement = lK_Judgement;
      this.judgementStatement = judgementStatement;
      this.opponentName = opponentName;
      this.nextSessionDate = nextSessionDate;
      this.judgementTitle = judgementTitle;
      this.causeStageId = causeStageId;
      this.sessionJedgementStatus=sessionJedgementStatus;
      this.attachmentJudgementGroundDto=attachmentJudgementGroundDto;
      this.lkStageNameAr=lkStageNameAr;
      this.lkStageNameEn=lkStageNameEn;
      this.causeStageNumber=causeStageNumber;
      this.countOfSessions=countOfSessions;
      this.judgementDate = judgementDate;
  }
}

export class Judgement {
  id: number;
  nameAr: string;
  nameEn: string;

  constructor(
      id: number = 0,
      nameAr: string = "",
      nameEn: string = ""
  ) {
      this.id = id;
      this.nameAr = nameAr;
      this.nameEn = nameEn;
  }
}
