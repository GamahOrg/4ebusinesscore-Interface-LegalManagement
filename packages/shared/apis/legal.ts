import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";
let version = `v1/`;

const LegalEndpoints: { [key: string]: Endpoint } = {
  // define user 1 endpoints
  // attachment source controller
  postLK_AttachmentSource: {
    url: `${version}AttachmentSource/PostLK_AttachmentSource`,
    method: `postByParamsWithBody`,
  },
  putLK_AttachmentSource: {
    url: `${version}AttachmentSource/PutLK_AttachmentSource`,
    method: `putByQuery`,
  },
  deleteLK_AttachmentSource: {
    url: `${version}AttachmentSource/DeleteLK_AttachmentSource`,
    method: `delete`,
  },
  getAllLkAttachmentSources: {
    url: `${version}AttachmentSource/GetAllLkAttachmentSources`,
    method: `get`,
  },
  getLkAttachmentSourceById: {
    url: `${version}AttachmentSource/GetLkAttachmentSourceById`,
    method: `getById`,
  },
  // Cause Assign controller
  deleteCauseAssign: {
    url: `${version}CauseAssign/DeleteCausAssign/Id`,
    method: `deleteByQuery`,
  },
  // cause lawyer controller
  postCauseLawyer: {
    url: `${version}CauseLawyer/Post`,
    method: `post`,
  },
  putCauseLawyer: {
    url: `${version}CauseLawyer/Put`,
    method: `put`,
  },
  deleteCauseLawyer: {
    url: `${version}CauseLawyer/Delete`,
    method: `deleteByBody`,
  },
  // causes controller
  postCause: {
    url: `${version}Causes/PostCause`,
    method: `post`,
  },
  finishCause: {
    url: `${version}Causes/FinishCause`,
    method: `putById`,
  },
  getCauseById: {
    url: `${version}Causes`,
    method: `getById`,
  },
  getCauseAttachement: {
    url: `${version}Causes/GetCauseAttachement`,
    method: `get`,
  },
  getCauseHistoryByCauseId: {
    url: `${version}Causes/GetCauseHistoryByCauseId`,
    method: `get`,
  },
  putCause: {
    url: `${version}Causes/PutCause`,
    method: `put`,
  },
  deleteCause: {
    url: `${version}Causes/DeleteCause`,
    method: `delete`,
  },
  getCauseTitles: {
    url: `${version}Causes/GetCauseTitles`,
    method: `get`,
  },
  postCauseAssignees: {
    url: `${version}Causes/PostCauseAssignees`,
    method: `post`,
  },

 PostAlternativeLawyer:{
    url: `${version}Causes/PostAlternativeLawyer`,
    method: `post`,
  },
  // cause stage controller
  changeCauseStage: {
    url: `${version}CauseStage/ChangeCauseStage`,
    method: `post`,
  },
  changeRedirectorStage: {
    url: `${version}CauseStage/ChangeRedirectorStage`,
    method: `put`,
  },
  changeUserCauseStage: {
    url: `${version}CauseStage/ChangeUserCauseStage`,
    method: `put`,
  },
  getAllLK_StageIdsForChange: {
    url: `${version}CauseStage/GetAllLK_StageIdsForChange`,
    method: `getById`,
  },
  getCauseStageName: {
    url: `${version}CauseStage/GetCauseStageNames`,
    method: `getById`,
  },
  deleteCauseStageAttachment: {
    url: `${version}CauseStage/DeleteCauseStageAttachment`,
    method: `deleteByBody`,
  },
  // E library controller
  getAllELibrary: {
    url: `${version}ELibrary/GetAllELibrary`,
    method: `get`,
  },
  getELibraryById: {
    url: `${version}ELibrary/GetELibraryById`,
    method: `getById`,
  },
  postELibrary: {
    url: `${version}ELibrary/PostELibrary`,
    method: `post`,
  },
  putELibrary: {
    url: `${version}ELibrary/PutELibrary`,
    method: `putById`,
  },
  deleteELibrary: {
    url: `${version}ELibrary/DeleteELibrary`,
    method: `delete`,
  },
  // Jedgement ground controller
  postJudgmentGround: {
    url: `${version}JedgementGround/PostJedgementGround`,
    method: `post`,
  },
  putJudgmentGround: {
    url: `${version}JedgementGround/PutJedgementGround`,
    method: `putById`,
  },
  deleteJudgmentGround: {
    url: `${version}JedgementGround/DeleteJedgementGround`,
    method: `delete`,
  },
  getJedgementGroundById: {
    url: `${version}JedgementGround/GetJedgementGroundById`,
    method: `getById`,
  },

  // define user 2 endpoints
  // Litigant
  getAllLitigant: {
    url: `${version}Litigant/GetAllLitigant`,
    method: `get`,
  },
  getLitigantById: {
    url: `${version}Litigant/GetLitigantById`,
    method: `getById`,
  },
  addLitigant: {
    url: `${version}Litigant/PostLitigant`,
    method: `post`,
  },
  editLitigant: {
    url: `${version}Litigant/PutLitigant`,
    method: `putById`,
  },
  deleteLitigant: {
    url: `${version}Litigant/DeleteLitigant`,
    method: `delete`,
  },
  getCausesForLitigant: {
    url: `${version}Litigant/GetCausesForLitigant`,
    method: `getById`,
  },
  // LK_CauseCategory
  getAllLKCauseCategories: {
    url: `${version}LK_CauseCategory/GetAllLK_CauseCategories`,
    method: `get`,
  },
  getLKCauseCategoryById: {
    url: `${version}LK_CauseCategory/GetLK_CauseCategoryById`,
    method: `getById`,
  },
  addLKCauseCategory: {
    url: `${version}LK_CauseCategory/PostLK_CauseCategory`,
    method: `postByParamsWithBody`,
  },
  editLKCauseCategory: {
    url: `${version}LK_CauseCategory/PuttLK_CauseCategory`,
    method: `putByQuery`,
  },
  deleteLKCauseCategory: {
    url: `${version}LK_CauseCategory/DeleteLK_CauseCategory`,
    method: `delete`,
  },
  // LK_IdentityType
  getAllLKIdentityTypes: {
    url: `${version}LK_IdentityType/GetAllLK_IdentityTypes`,
    method: `get`,
  },
  getLKIdentityTypeById: {
    url: `${version}LK_IdentityType/GetLK_IdentityTypeById`,
    method: `getById`,
  },
  addLKIdentityType: {
    url: `${version}LK_IdentityType/PostLK_IdentityType`,
    method: `postByParamsWithBody`,
  },
  editLKIdentityType: {
    url: `${version}LK_IdentityType/PuttLK_IdentityType`,
    method: `putByQuery`,
  },
  deleteLKIdentityType: {
    url: `${version}LK_IdentityType/DeleteLK_IdentityType`,
    method: `delete`,
  },
  // LK_JudgementControllers
  getAllLKJudgement: {
    url: `${version}LK_Judgement/GetAllLK_Judgement`,
    method: `get`,
  },
  getLKJudgementById: {
    url: `${version}LK_Judgement/GetLK_Judgementbyid`,
    method: `get`,
  },
  addLKJudgement: {
    url: `${version}LK_Judgement/PostLK_Judgement`,
    method: `postByParamsWithBody`,
  },
  editLKJudgement: {
    url: `${version}LK_Judgement/PutLK_Judgement`,
    method: `putByQuery`,
  },
  deleteLKJudgement: {
    url: `${version}LK_Judgement/DeleteLK_Judgement`,
    method: `deleteByIdQuery`,
  },
  // LK_Stage
  getAllLKStage: {
    url: `${version}LK_Stage/GetAllLK_Stage`,
    method: `get`,
  },
  getLKSatgebyid: {
    url: `${version}LK_Stage/GetLK_Satgebyid`,
    method: `get`,
  },
  addLKStage: {
    url: `${version}LK_Stage/PostLK_Stage`,
    method: `postByParamsWithBody`,
  },
  editLKStage: {
    url: `${version}LK_Stage/PutLK_Stage`,
    method: `putByIdWithQuery`,
  },
  deleteLKStage: {
    url: `${version}LK_Stage/DeleteLK_Stage`,
    method: `deleteByIdQuery`,
  },
  // Session
  getAllSessions: {
    url: `${version}Session/GetAllSessions`,
    method: `get`,
  },
  getActiveSession: {
    url: `${version}Session/GetActiveSession`,
    method: `getById`,
  },
  addSession: {
    url: `${version}Session/PostSession`,
    method: `post`,
  },
  editSession: {
    url: `${version}Session/PutSession`,
    method: `putByQueryWithBody`,
  },
  deleteSession: {
    url: `${version}Session/DeleteSession`,
    method: `deleteByQueryWithId`,
  },

  // define user 3 endpoints
  // Session Assign controller
  addSessionAsign: {
    url: `${version}SessionAsign/PostSessionAsign`,
    method: `postByDynamicParamsWithBody`,
  },
  deleteSessionAsign: {
    url: `${version}SessionAsign/DeleteSessionAsign`,
    method: `deleteByDynamicParams`,
  },

  //SessionAttachment
  addSessionAttachment: {
    url: `${version}SessionAttachment/PostSessionAttachment`,
    method: `postByParamsWithBody`,
  },
  deleteSessionAttachment: {
    url: `${version}SessionAttachment/DeleteSessionAttachment`,
    method: `deleteByQuery`,
  },
  getSessionAttachment: {
    url: `${version}SessionAttachment/GetSessionAttachment`,
    method: `get`,
  },

  // SessionNote

  addSessionNote: {
    url: `${version}SessionNote`,
    method: `post`,
  },
  editSessionNote: {
    url: `${version}SessionNote/PutSessionNote`,
    method: `putById`,
  },
  deleteSessionNote: {
    url: `${version}SessionNote/DeleteSessionNote`,
    method: `deleteByQueryWithId`,
  },
  getSessionNoteById: {
    url: `${version}SessionNote/GetSessionNoteById`,
    method: `getById`,
  },
  getAllSessionsNew: {
    url: `${version}Session/GetSessions`,
    method: `get`,
  },
  deleteJudgmentGroundWithQuerry: {
    url: `${version}JedgementGround/DeleteJedgementGround`,
    method: `deleteByQueryWithId`,
  },
  deletejudgementRequirements: {
    url: `${version}JudgementRequirements/JudgementRequierments`,
    method: `deleteByQueryWithId`,
  },
  //LK_TypeJudiciary
  getAllLKTypeJudiciary: {
    url: `${version}LK_TypeJudiciary`,
    method: `get`,
  },
  getLKTypeJudiciaryById: {
    url: `${version}/LK_TypeJudiciary/Id?Id=`,
    method: `getById`,
  },

  //Indicators
  getIndicatorsAttachments: {
    url: `${version}IndicatorsAttachments`,
    method: `get`,
  },
  getIndicatorsCauseStage: {
    url: `${version}IndicatorsCauseStage`,
    method: `get`,
  },
  getIndicatorsELibraries: {
    url: `${version}IndicatorsELibraries`,
    method: `get`,
  },
  getIndicatorsJudgementGround: {
    url: `${version}IndicatorsJudgementGround`,
    method: `get`,
  },
  getIndicatorsLawyers: {
    url: `${version}IndicatorsLawyers`,
    method: `get`,
  },
  getIndicatorsLitigants: {
    url: `${version}IndicatorsLitigants`,
    method: `get`,
  },
  getIndicatorsSessionsAndSessionNotes: {
    url: `${version}IndicatorsSessionsAndSessionNotes`,
    method: `get`,
  },
  getIndicatorsTime: {
    url: `${version}IndicatorsTime`,
    method: `get`,
  },
  getCausesCount: {
    url: `${version}JudicialIndicators/GetCausesCount`,
    method: `get`,
  },
  getCausesDuration: {
    url: `${version}JudicialIndicators/GetCausesDuration`,
    method: `get`,
  },

  addJudgementReferance: {
    url: `${version}JudgementRefernce/PostJudgementRefernce`,
    method: `post`,
  },
  getCauseComments:{
    url: `${version}CauseComment`,
    method: `get`,
  },
   postCauseComment:{
    url: `${version}CauseComment`,
    method: `post`,
  },
  getCauseCommentById:{
    url: `${version}CauseComment/Id`,
    method: `getByQuery`,
  },
    deleteCauseComment:{
    url: `${version}CauseComment`,
    method: `deleteByQuery`,
  },
   editCauseComment:{
    url: `${version}CauseComment`,
    method: `put`,
  },
    getIsConsultive:{
    url: `${version}CauseComment/IsConsultative`,
    method: `get`,
  },
};
const LegalBaseUrl = `${(window as any)._env_?.REACT_APP_API_Legal_Url}/api/`;
export const LegalRootUrl = `${
  (window as any)._env_?.REACT_APP_API_Legal_Url
}/`;

export const LegalConsume = initializeConsume(LegalBaseUrl, LegalEndpoints);
