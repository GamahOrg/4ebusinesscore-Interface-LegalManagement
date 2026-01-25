import { SessionAttachmentDtoModel } from "./NewCauseStagesModel";
import { sessionsDtos } from "./sessionsDtos";

class sessionNotes {
  id: string;
  description: string;
  userName: string;
  userImage: string;
  createdOn: string;
  attachmentSessioNoteDTO:AttachmentSessioNoteDTOModel[];

  constructor(
    id: string = "",
    description: string = "",
    userName: string = "",
    userImage: string = "",
    createdOn: string = "",
    attachmentSessioNoteDTO:AttachmentSessioNoteDTOModel[]=[],
  ) {
    this.id = id;
    this.description = description;
    this.userName = userName;
    this.userImage = userImage;
    this.createdOn = createdOn;
    this.attachmentSessioNoteDTO=attachmentSessioNoteDTO;
  }
}

export class SessionModel {
  id: string;
  causeStageNumber: string;
  courtName: string;
  status: number;
  causeNumber: string;
  causeName: string;
  causeTitle: string;
  causeSubject: string;
  causeStatus: number;
  sessionsDtos: sessionsDtos[];
  litigantStatus: number;
  sessionDate: string;
  sessionNumber: string;
  areaName: string;
  sessionAssigneeDto: any;
  judgementRequirementsDto: any;
  judgementGroundDto: any;
  sessionNotes: sessionNotes[];
  lK_StageDto: any;
  sessionAttachmentDto: SessionAttachmentDtoModel[];
  causeId:string;
  causeStageId:string;
  constructor(
    id: string = "",
    causeStageNumber: string = "",
    courtName: string = "",
    status: number = 0,
    causeNumber: string = "",
    sessionNumber: string = "",
    causeName: string = "",
    causeTitle: string = "",
    causeSubject: string = "",
    causeStatus: number = 0,
    sessionsDtos: sessionsDtos[] = [],
    litigantStatus: number = 0,
    sessionDate: string = "",
    areaName: string = "",
    judgementGroundDto: any = [],
    sessionAssigneeDto: any = [],
    judgementRequirementsDto: any = [],
    sessionNotes: sessionNotes[] = [],
    sessionAttachmentDto: SessionAttachmentDtoModel[] = [],
    causeId:string = "",
    causeStageId:string ="",
  ) {
    this.id = id;
    this.causeStageNumber = causeStageNumber;
    this.courtName = courtName;
    this.status = status;
    this.causeNumber = causeNumber;
    this.sessionNumber = sessionNumber;
    this.causeName = causeName;
    this.causeTitle = causeTitle;
    this.causeSubject = causeSubject;
    this.causeStatus = causeStatus;
    this.sessionsDtos = sessionsDtos;
    this.litigantStatus = litigantStatus;
    this.sessionDate = sessionDate;
    this.areaName = areaName;
    this.judgementGroundDto = judgementGroundDto;
    this.sessionAssigneeDto = sessionAssigneeDto;
    this.judgementRequirementsDto = judgementRequirementsDto;
    this.sessionNotes = sessionNotes;
    this.sessionAttachmentDto = sessionAttachmentDto;
    this.causeId = causeId;
    this.causeStageId = causeStageId;
  }
}

export class ActiveSessionModel {
  id: string;
  sessionNumber: string;

  constructor(id: string = "", sessionNumber: string = "") {
    this.id = id;
    this.sessionNumber = sessionNumber;
  }
}

export class AttachmentSessioNoteDTOModel {
    id: string;
    fileName: string;                
    filePath:string;
    lK_AttachmentSourceId:number;
    lK_AttachmentSourceNameAr:string;
    lK_AttachmentSourceNameEn:string;
  attachmentName: ReactNode;

    constructor(
    id: string = "",
    fileName: string= "",             
    filePath:string= "",
    lK_AttachmentSourceId:number= 0,
    lK_AttachmentSourceNameAr:string= "",
    lK_AttachmentSourceNameEn:string= "",
    ){
     this.id=id;
     this.fileName=fileName;
     this.filePath=filePath;
     this.lK_AttachmentSourceId=lK_AttachmentSourceId;
     this.lK_AttachmentSourceNameAr=lK_AttachmentSourceNameAr;
     this.lK_AttachmentSourceNameEn=lK_AttachmentSourceNameEn;

    }
    }