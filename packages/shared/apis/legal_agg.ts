import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";
let version = `v1/`;

const LegalAggEndpoints: { [key: string]: Endpoint } = {
  getAppliedCourseStage: {
    url: `${version}AppliedCourseStage/GetAllAppliedCourses`,
    method: `get`,
  },
  getCause: {
    url: `${version}Cause/GetAllCauses`,
    method: `get`,
  },
  getCauseById: {
    url: `${version}Cause/GetCauseById`,
    method: `getById`,
  },
  getCauseAttachment: {
    url: `${version}Cause/GetCauseAttachmentByCauseId`,
    method: `get`,
  },
  getAllCauseStageAttachments: {
    url: `${version}CauseStageAttachments/GetAllCauseStageAttachments`,
    method: `get`,
  },
  getCauseHistories: {
    url: `${version}Cause/GetCauseHistoriesByCauseId`,
    method: `get`,
  },
  getAllCauseStages: {
    url: `${version}CauseStage/GetAllCauseStages`,
    method: `get`,
  },
  getCauseStageById: {
    url: `${version}CauseStage/GetCauseStageById`,
    method: `get`,
  },
  getAllJudgementGround: {
    url: `${version}JudgementGround/GetAllJudgementGround`,
    method: `get`,
  },

  getAllLawyers: {
    url: `${version}Lawyer/GetAllLawyer`,
    method: `get`,
  },
  getAllLawyersNames: {
    url: `${version}Lawyer/GetAllLawyersNames`,
    method: `get`,
  },
  getLawyerById: {
    url: `${version}Lawyer/GetLawyerById`,
    method: `get`,
  },
  getSessionById: {
    url: `${version}Session/GetSessionById`,
    method: `getById`,
  },
  getAllSessionNotes: {
    url: `${version}SessionNote/GetAllSessionNote`,
    method: `get`,
  },
  getAssignMember: {
    url: `${version}AssignMember`,
    method: `get`,
  },
  getSessionByIdParams: {
    url: `${version}Session/GetSessionById`,
    method: `getByIdParams`,
  },
};
const LegalAggBaseUrl = `${
  (window as any)._env_?.REACT_APP_API_Legal_Agg_Url
}/api/`;
export const LegalAggRootUrl = `${
  (window as any)._env_?.REACT_APP_API_Legal_Agg_Url
}/`;

export const LegalAggConsume = initializeConsume(
  LegalAggBaseUrl,
  LegalAggEndpoints
);
