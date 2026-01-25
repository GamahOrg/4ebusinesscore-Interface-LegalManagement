import { AttachmentModel } from "./AttachmentModel";
import { SessionNoteAttachment } from "./SessionNoteAttachment";
export class SessionNoteDetailsModel {
  id: string;
  sessionId: string;
  causeId: string;
  sessionNumber: string;
  causeStageNumber: string;
  causeStageId: string;
  description: string;
  attachments: AttachmentModel[];
  sessionNoteAttachmentDtos: SessionNoteAttachment[];

  constructor(
    id: string = "",
    sessionId: string = "",
    causeId: string = "",
    causeStageNumber: string = "",
    sessionNumber: string = "",
    causeStageId: string = "",
    description: string = "",
    attachments: AttachmentModel[] = [],
    sessionNoteAttachmentDtos: SessionNoteAttachment[] = []
  ) {
    this.id = id;
    this.sessionId = sessionId;
    this.causeStageId = causeStageId;
    this.description = description;
    this.attachments = attachments;
    this.causeId = causeId;
    this.sessionNumber = sessionNumber;
    this.causeStageNumber = causeStageNumber;
    this.sessionNoteAttachmentDtos = sessionNoteAttachmentDtos;
  }
}
