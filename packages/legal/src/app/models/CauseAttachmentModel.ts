export class CauseAttachmentModel {
  lK_Stage: string | null;
  causeStageAttachment: {
    id: string;
    createdBy: string;
    createdOn: string;
    fileName: string;
    filePath: string;
    causeStageId: string;
    lK_AttachmentSourceId: number;
    fullName: string;
    attachmentSource: {
      id: number;
      nameAr: string;
      nameEn: string;
    };
  }[];
  sessionAttachments: any[];

  constructor(
    lK_Stage: string | null = null,
    causeStageAttachment: {
      id: string;
      createdBy: string;
      createdOn: string;
      fileName: string;
      filePath: string;
      causeStageId: string;
      lK_AttachmentSourceId: number;
      fullName: string;
      attachmentSource: {
        id: number;
        nameAr: string;
        nameEn: string;
      };
    }[] = [],
    sessionAttachments: any[] = []
  ) {
    this.lK_Stage = lK_Stage;
    this.causeStageAttachment = causeStageAttachment;
    this.sessionAttachments = sessionAttachments;
  }
}
