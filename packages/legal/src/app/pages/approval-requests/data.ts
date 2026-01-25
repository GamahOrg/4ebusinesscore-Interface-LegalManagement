import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";

const langIsArabic = getCurrentSystemLanguage() === "ar";

export interface TempData {
  MemoId?: number;
  CaseId?: number;
  MemoCaseId?: number;
  PlaintiffDefendant?: string;
  ClaimCreator?: string;
  Defendant?: string;
  MemoText?: string;
  MemoDate?: string;
  SessionDate?: string;
  MemoSessionDate?: string;
  DocumentType?: "StudyCase" | "IssuedClaims" | "ClaimsIncoming";
  CompetentCourt?: "CourtHigh" | "CourtElementary" | "CourtAppeal";
  Status?: "InWaiting" | "Approve" | "Reject";
}
export type StatusType = TempData["Status"];
export type CompetentCourtType = TempData["CompetentCourt"];
export type DocumentType = TempData["DocumentType"];

const tempDataRow = {
  MemoId: 23435356,
  CaseId: 23435356,
  MemoCaseId: 23435356,
  PlaintiffDefendant: langIsArabic
    ? "سعود محمد علي القحطاني"
    : "Saud Mohammed Ali Al-Qahtani",
  ClaimCreator: langIsArabic
    ? "سعود محمد علي القحطاني"
    : "Saud Mohammed Ali Al-Qahtani",
  Defendant: langIsArabic ? "سعود محمد علي" : "Saud Mohammed Ali",
  MemoText: langIsArabic
    ? "التأخير أو عدم دفع الأجور: عدم دفع الأجور في موعدها أو الامتناع عن دفع المستحقات"
    : "Delay or non-payment of wages: failure to pay wages on time or withholding dues",
  MemoDate: "08-02-2024",
  SessionDate: "08-02-2024",
  MemoSessionDate: "08-02-2024",
  DocumentType: "StudyCase",
  CompetentCourt: "CourtHigh",
  Status: "InWaiting",
};

export const dataStatus = ["InWaiting", "Approve", "Reject"];
export const dataCompetentCourt = [
  "CourtHigh",
  "CourtElementary",
  "CourtAppeal",
];
export const dataDocumentType = ["StudyCase", "IssuedClaims", "ClaimsIncoming"];

export const tableData = Array.from({ length: 7 }, (_, index) => ({
  ...tempDataRow,
  Status: index < 2 ? "InWaiting" : index < 5 ? "Approve" : "Reject",
  CompetentCourt:
    index % 3 === 0
      ? "CourtHigh"
      : index % 3 === 1
      ? "CourtElementary"
      : "CourtAppeal",
  DocumentType:
    index < 3 ? "StudyCase" : index < 6 ? "IssuedClaims" : "ClaimsIncoming",
}));
