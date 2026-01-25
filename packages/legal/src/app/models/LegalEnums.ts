export enum LawyerStatus {
  Active = 1,
  Banned = 2,
}
export enum LitigantStatus {
  Opponent = 1,
  Client = 2,
}
export enum ClientType {
  Plaintiff = 1, // مندعي
  Defendant = 2, // مدعي عليه
}
export enum CauseStageStatus {
  IsActive = 1,
  IsFinished = 2,
}
export enum CauseStatus {
  NewCause = 1,
  InProgress,
  Finished,
}
export enum SessionJedgementStatus {
  ForMe = 2,
  Against = 1,
  Equality = 3,
}
export enum JudgmentSituation{
  AjudgmentIssued = 1,
  AdjudmentExpired = 2,
  InSessions = 3,
}
export enum AssignationType {
  Owner = 1,
  Supervisor = 2,
  Lawyers = 3,
  DataEntry = 4,
}
export enum RequirementType {
  Opponent = 1,
  Client = 2,
}
export enum LawyerType {
  Person = 1,
  Office = 2,
}

export enum GetAllLawyerStatus {
  Active = 0,
  Banned = 1,
  Both = 2,
}

export enum GetAllLawyerType {
  Internal = 0,
  External = 1,
  IsBoth = 2,
}
export enum AttachmentType {
  Unknown = 0,
  SessionAttachment = 1,
  CauseAttachment = 2,
  SessionNoteAttachment = 3,
}
export enum JudgmentRequirementType {
  Client = 1,
  Opponent = 2,
}
export enum LitigationStatus {
  Opponent = 1,
  Client = 2,
}
export enum CauseStatusV2 {
  NewCause = 1,
  InProgress,
  JudgmentWasIssued,
}