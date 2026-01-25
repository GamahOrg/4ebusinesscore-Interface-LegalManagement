import { AttachmentModel } from "./AttachmentModel";

export class SessionNoteAttachment {
  attachments: AttachmentModel[];
  lK_AttachmentSourceId: number;

  constructor(
    lK_AttachmentSourceId: number = 0,
    attchments: AttachmentModel[] = []
  ) {
    this.lK_AttachmentSourceId = lK_AttachmentSourceId;
    this.attachments = attchments;
  }
}
