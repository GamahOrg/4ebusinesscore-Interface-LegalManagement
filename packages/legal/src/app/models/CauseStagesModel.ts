import { LKStage } from './CauseHistoryModel';
import { CauseStageStatus, CauseStatus, ClientType, LitigantStatus } from './LegalEnums';
export class CauseStagesModel {
  id: string;
  createdBy: string;
  createdOn: string;
  causeStageNumber: string;
  causeId: string;
  lK_StageId: number;
  status: CauseStatus;
  redirector: LitigantStatus;
  fullName: string;
  lK_Stage:   null | LKStage;
  sessions: any;
  userId: any;
  causeStatus:CauseStatus;
  clientType:ClientType 
  causeTitle:string;
  opponents:{
    opponentName: string;
    id: string;
  }[];
  causeStageStatus:CauseStageStatus
  constructor(
    id: string = "",
    createdBy: string = "",
    createdOn: string = "",
    causeStageNumber: string = "",
    causeId: string = "",
    lK_StageId: number = 0,
    status: CauseStatus = CauseStatus.InProgress,
    redirector: LitigantStatus = LitigantStatus.Client,
    fullName: string = "",
    lK_Stage:  null | LKStage= null,
    userId: string = "",
    clientType:ClientType=ClientType.Defendant,
    causeTitle:string="",
    opponents:{
      opponentName: string;
      id: string;
    }[]=[],
    causeStatus:CauseStatus=CauseStatus.NewCause,
    causeStageStatus:CauseStageStatus=CauseStageStatus.IsActive

  ) {
    this.id = id;
    this.createdBy = createdBy;
    this.createdOn = createdOn;
    this.causeStageNumber = causeStageNumber;
    this.causeId = causeId;
    this.lK_StageId = lK_StageId;
    this.status = status;
    this.redirector = redirector;
    this.fullName = fullName;
    this.lK_Stage = lK_Stage;
    this.userId = userId;
    this.clientType=clientType;
    this.causeTitle=causeTitle;
    this.opponents=opponents;
    this.causeStatus=causeStatus;
    this.causeStageStatus=causeStageStatus
  }
}
