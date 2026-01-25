export class LKStage {
  id: number;
  nameAr: string;
  nameEn: string;

  constructor(id: number, nameAr: string, nameEn: string) {
    this.id = id;
    this.nameAr = nameAr;
    this.nameEn = nameEn;
  }
}

export class CauseHistoryModel {
  id: string;
  createdBy: string;
  createdOn: string;
  recordId: string;
  tableName: string;
  action: string;
  oldValue: string;
  newValue: string;
  fullName: string;
  createdByOrg:string;
  lk_Stage: LKStage;

  constructor(
    id: string="",
    createdBy: string="",
    createdOn: string="",
    recordId: string="",
    tableName: string="",
    action: string="",
    oldValue: string="",
    newValue: string="",
    fullName: string="",
    createdByOrg:string="",
    lk_Stage: LKStage=new LKStage(0, "", ""),
  ) {
    this.id = id;
    this.createdBy = createdBy;
    this.createdOn = createdOn;
    this.recordId = recordId;
    this.tableName = tableName;
    this.action = action;
    this.oldValue = oldValue;
    this.newValue = newValue;
    this.fullName = fullName;
    this.createdByOrg = createdByOrg;
    this.lk_Stage = lk_Stage;
  }
}

export class CauseHistoryResponse {
  lK_Stage: LKStage;
  causeHistories: CauseHistoryModel[];

  constructor(lK_Stage: LKStage, causeHistories: CauseHistoryModel[]) {
    this.lK_Stage = lK_Stage;
    this.causeHistories = causeHistories;
  }
}
