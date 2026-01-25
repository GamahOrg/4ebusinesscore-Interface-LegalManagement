import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";
let version = `v1/`;

const LegalEndpoints: { [key: string]: Endpoint } = {
  
  getAllLK_ClassificationTypeElibrary: {
    url: `${version}LK_ClassificationTypeElibrary/GetAllLK_ClassificationTypeElibraries`,
    method: `get`,
  },
};
const LegalBaseUrl = `${(window as any)._env_?.REACT_APP_API_Legal_Url}/api/`;
export const LegalRootUrl = `${
  (window as any)._env_?.REACT_APP_API_Legal_Url
}/`;

export const LK_ClassificationTypeElibraryConsume = initializeConsume(LegalBaseUrl, LegalEndpoints);
