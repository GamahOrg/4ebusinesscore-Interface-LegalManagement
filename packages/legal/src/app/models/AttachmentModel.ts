export class AttachmentModel {
    id: string;
    fileName: string;
    filePath: string;
    attachmentName?: string;
  
    constructor(id: string = "", fileName: string = "", filePath: string = "", attachmentName: string = "") {
      this.id = id;
      this.fileName = fileName;
      this.filePath = filePath;
      this.attachmentName = attachmentName;
    }
  }