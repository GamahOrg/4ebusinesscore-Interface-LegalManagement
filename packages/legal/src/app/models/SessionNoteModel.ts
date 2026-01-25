import { CauseStatus, ClientType } from "./LegalEnums";

export class SessionNoteModel {
  id: string;
  causeId:string;
  causeTitle: string;
  causeNumber: string;
  causeDate: string;
  lkStageNameAr: string;
  causeStageId: string;
  sessionname: string;
  sessionId: string;
  description: string;
  createdByName: string;
  createon: string;
  clientType: ClientType;
  causeStatus: CauseStatus;
  causeStageStatus:CauseStatus;
  lkStageNameEn:string;
  sessionNumber:string;
  sessionsLawyersDto:any[];
  isHasSessionNote:boolean;
  opponents: { id: string; opponentName: string }[];

  constructor(
    id: string = "",
    causeTitle: string = "",
    cuaseNumber: string = "",
    causeDate: string = "",
    causeId:string="",
    lkStageNameAr: string = "",
    causeStageId: string = "",
    sessionname: string = "",
    sessionId: string = "",
    description: string = "",
    createdByName: string = "",
    createon: string = "",
    clientType: ClientType = ClientType.Defendant,
    causeStatus: CauseStatus = CauseStatus.NewCause,
    causeStageStatus: CauseStatus = CauseStatus.NewCause,
    lkStageNameEn:string="",
    sessionNumber:string="",
    sessionsLawyersDto:any[]=[],
    isHasSessionNote:boolean=false,
    opponents: { id: string; opponentName: string }[]=[]
  ) {
    this.id = id;
    this.causeNumber = cuaseNumber;
    this.causeDate = causeDate;
    this.lkStageNameAr = lkStageNameAr;
    this.causeStageId = causeStageId;
    this.sessionname = sessionname;
    this.sessionId = sessionId;
    this.description = description;
    this.createdByName = createdByName;
    this.createon = createon;
    this.clientType = clientType;
    this.causeStatus = causeStatus;
    this.causeStageStatus = causeStageStatus;
    this.opponents = opponents;
    this.causeTitle = causeTitle;
    this.lkStageNameEn=lkStageNameEn;
    this.causeId=causeId;
    this.sessionNumber=sessionNumber;
    this.sessionsLawyersDto=sessionsLawyersDto;
    this.isHasSessionNote=isHasSessionNote
  }
}
