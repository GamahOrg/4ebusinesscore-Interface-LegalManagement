import { AttachmentType } from "./LegalEnums";

class CauseStage {
  id: string;
  fileName: string;
  filePath: string;
  sessionId: string;
  createdOn: string;
  createdById: string;
  createdByName: string;
  lK_AttachmentSourceId: number;
  lK_AttachmentSourceNameAr: string;
  lK_AttachmentSourceNameEn: string;
  session:{sessionId:string,sessionNumber:string};
  attachmentType:AttachmentType;


  constructor(
    id: string = "",
    fileName: string = "",
    filePath: string = "",
    sessionId: string = "",
    createdOn: string = "",
    createdById: string = "",
    createdByName: string = "",
    lK_AttachmentSourceId: number = 0,
    lK_AttachmentSourceNameAr: string = "",
    lK_AttachmentSourceNameEn: string = "",
    session:{sessionId:string,sessionNumber:string}={sessionId:"",sessionNumber:""},
    attachmentType:AttachmentType=AttachmentType.Unknown
  ) {
    this.id = id;
    this.fileName = fileName;
    this.filePath = filePath;
    this.sessionId = sessionId;
    this.createdOn = createdOn;
    this.createdById = createdById;
    this.createdByName = createdByName;
    this.lK_AttachmentSourceId = lK_AttachmentSourceId;
    this.lK_AttachmentSourceNameAr = lK_AttachmentSourceNameAr;
    this.lK_AttachmentSourceNameEn = lK_AttachmentSourceNameEn;
    this.session=session;
    this.attachmentType=attachmentType;
  }
}

export class CauseStageAttachment {
  causetageId: string;
  lkStageId: number;
  lkStageNameAr: string;
  lkStageNameEn: string;
  causeStageAttachmentsProtoModel: CauseStage[];

  constructor(
    causeStageId: string = "",
    lkStageId: number = 0,
    lkStageNameAr: string = "",
    lkStageNameEn: string = "",
    causeStageAttachmentsProtoModel: CauseStage[] = []
  ) {
    this.causetageId = causeStageId;
    this.lkStageId = lkStageId;
    this.lkStageNameAr = lkStageNameAr;
    this.lkStageNameEn = lkStageNameEn;
    this.causeStageAttachmentsProtoModel = causeStageAttachmentsProtoModel;
  }
}
