import { CauseStageAttachmentModel } from "./CauseStageAttachmentModel";
import { StageModel } from "./StageModel";
import { CauseJudgementGroundModel } from "./CauseJudgementGroundModel";
import {
  AssignationType,
  CauseStageStatus,
  LitigantStatus,
} from "./LegalEnums";
import { AttachmentSourceModel } from "./AttachmentSourceModel";
export class NewCauseStageModel {
  id: string;
  causeStageNumber: string;
  causeId: string;
  lK_StageId: number;
  status: CauseStageStatus;
  redirector: LitigantStatus;
  lK_Stage: StageModel;
  causeStageAttachment: CauseStageAttachmentModel[];
  sessions: SessionModel[];
  causeHistories: CauseHistoryDtoModel[];
  sessionNotes: SessionNoteDtoModel[];
  jedgementGrounds: CauseJudgementGroundModel[];
  judgementGroundAttachments: JudgementGroundAttachmentDtoModel[];
  sessionAttachments: SessionAttachmentDtoModel[];
  userId: string;
  fullName: string;

  constructor(
    id: string = "",
    causeStageNumber: string = "",
    causeId: string = "",
    lK_StageId: number = 0,
    status: CauseStageStatus = CauseStageStatus.IsActive,
    redirector: LitigantStatus = LitigantStatus.Client,
    lK_Stage: StageModel = new StageModel(),
    causeStageAttachment: CauseStageAttachmentModel[] = [],
    sessions: SessionModel[] = [],
    causeHistories: CauseHistoryDtoModel[] = [],
    sessionNotes: SessionNoteDtoModel[] = [],
    jedgementGrounds: CauseJudgementGroundModel[] = [],
    judgementGroundAttachments: JudgementGroundAttachmentDtoModel[] = [],
    sessionAttachments: SessionAttachmentDtoModel[] = [],
    userId: string = "",
    fullName: string = ""
  ) {
    this.id = id;
    this.causeStageNumber = causeStageNumber;
    this.causeId = causeId;
    this.lK_StageId = lK_StageId;
    this.status = status;
    this.redirector = redirector;
    this.lK_Stage = lK_Stage;
    this.causeStageAttachment = causeStageAttachment;
    this.sessions = sessions;
    this.causeHistories = causeHistories;
    this.sessionNotes = sessionNotes;
    this.jedgementGrounds = jedgementGrounds;
    this.judgementGroundAttachments = judgementGroundAttachments;
    this.sessionAttachments = sessionAttachments;
    this.userId = userId;
    this.fullName = fullName;
  }
}

class SessionAssigneesModel {
  owner: SessionAssigneeInfo[];
  supervisor: SessionAssigneeInfo[];
  lawyers: SessionAssigneeInfo[];
  dataEntry: SessionAssigneeInfo[];

  constructor(
    owner: SessionAssigneeInfo[] = [],
    supervisor: SessionAssigneeInfo[] = [],
    lawyers: SessionAssigneeInfo[] = [],
    dataEntry: SessionAssigneeInfo[] = []
  ) {
    this.owner = owner;
    this.supervisor = supervisor;
    this.lawyers = lawyers;
    this.dataEntry = dataEntry;
  }
}
class SessionModel {
  id: string;
  sessionDate: string;
  courtName: string;
  areaName: string;
  sessionAssignees: SessionAssigneesModel;

  constructor(
    id: string = "",
    sessionDate: string = "",
    courtName: string = "",
    areaName: string = "",
    sessionAssignees: SessionAssigneesModel = new SessionAssigneesModel()
  ) {
    this.id = id;
    this.sessionDate = sessionDate;
    this.courtName = courtName;
    this.areaName = areaName;
    this.sessionAssignees = sessionAssignees;
  }
}

class JudgementGroundAttachmentDtoModel {
  id: string;
  fileName: string;
  filePath: string;

  constructor(id: string = "", fileName: string = "", filePath: string = "") {
    this.id = id;
    this.fileName = fileName;
    this.filePath = filePath;
  }
}
export class SessionAttachmentDtoModel {
  id: string;
  fileName: string;
  filePath: string;
  lK_AttachmentSourceId: number;
  attachmentSource: AttachmentSourceModel;
  sessionId: string;

  constructor(
    id: string = "",
    fileName: string = "",
    filePath: string = "",
    lK_AttachmentSourceId: number = 0,
    attachmentSource: AttachmentSourceModel = new AttachmentSourceModel(),
    sessionId: string = ""
  ) {
    this.id = id;
    this.fileName = fileName;
    this.filePath = filePath;
    this.lK_AttachmentSourceId = lK_AttachmentSourceId;
    this.attachmentSource = attachmentSource;
    this.sessionId = sessionId;
  }
}
class SessionNoteDtoModel {
  id: string;
  description: string;
  constructor(id: string = "", description: string = "") {
    this.id = id;
    this.description = description;
  }
}
class CauseHistoryDtoModel {
  id: string;
  recordId: string;
  tableName: string;
  action: string;
  oldValue: string;
  newValue: string;

  constructor(
    id: string = "",
    recordId: string = "",
    tableName: string = "",
    action: string = "",
    oldValue: string = "",
    newValue: string = ""
  ) {
    this.id = id;
    this.recordId = recordId;
    this.tableName = tableName;
    this.action = action;
    this.oldValue = oldValue;
    this.newValue = newValue;
  }
}
export class SessionAssigneeInfo {
  id: string;
  userId?: string;
  externalLawyer: string;
  assignationType: AssignationType;
  fullName: string;

  constructor(
    id: string = "",
    fullName: string = "",
    assignationType: AssignationType = AssignationType.Owner,
    userId: string,
    externalLawyer: string
  ) {
    this.id = id;
    this.fullName = fullName;
    this.assignationType = assignationType;
    this.userId = userId;
    this.externalLawyer = externalLawyer;
  }
}
