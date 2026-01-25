import { AttachmentModel } from "./AttachmentModel";

export class SessionAttachmentModel {
  attachmentSourceName: string;
  attachments: AttachmentModel[];

  constructor(
    attachmentSourceName: string = "",
    attachments: AttachmentModel[] = []
  ) {
    this.attachmentSourceName = attachmentSourceName;
    this.attachments = attachments;
  }
}
