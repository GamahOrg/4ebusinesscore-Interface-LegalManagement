import { AttachmentSourceModel } from "./AttachmentSourceModel";

export class CauseStageAttachmentModel {
  id: string;
  fileName: string;
  filePath: string;
  causeStageId: string;
  lK_AttachmentSourceId: number;
  attachmentSource: AttachmentSourceModel;

  constructor(
    id: string = "",
    fileName: string = "",
    filePath: string = "",
    causeStageId: string = "",
    lK_AttachmentSourceId: number = 0,
    attachmentSource: AttachmentSourceModel = new AttachmentSourceModel()
  ) {
    this.id = id;
    this.fileName = fileName;
    this.filePath = filePath;
    this.causeStageId = causeStageId;
    this.lK_AttachmentSourceId = lK_AttachmentSourceId;
    this.attachmentSource = attachmentSource;
  }
}
