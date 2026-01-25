export class CauseCommentsModel {
  id: string;
  causeId: string;
  comment: string;
  attchments: { id: string; filePath: string; fileName: string }[];
  createdBy: string; 
  createdOn: string;

  constructor(
    id: string = "",
    causeId: string = "",
    comment: string = "",
    attchments: { id: string; filePath: string; fileName: string }[] = [],
    createdBy: string = "",
    createdOn: string = ""
  ) {
    this.id = id;
    this.causeId = causeId;
    this.comment = comment;
    this.attchments = attchments;
    this.createdBy = createdBy;
    this.createdOn = createdOn;
  }
}
