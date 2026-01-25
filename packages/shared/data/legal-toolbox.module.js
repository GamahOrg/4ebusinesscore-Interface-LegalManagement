import { createWorkspaceItems } from "./workspace-generator";

const name = "Workspace";
const items = [
  {
    dept: "Services",
    title: "ListOfCases",
    icon: "fa-solid fa-table-list",
    link: "/cases-view",
    color: "warning",
  },
  {
    dept: "Services",
    title: "LitigationManagement",
    icon: "fas fa-balance-scale",
    link: "/litigation-management",
    color: "primary",
  },
  {
    dept: "Services",
    title: "ManagingSessions",
    icon: "fas fa-list-ol",
    link: "/sessions-view",
    color: "info",
  },
  {
    dept: "Services",
    title: "LiabilityManagement",
    icon: "fa-solid fa-users",
    link: "/liability-management",
    color: "danger",
  },
  {
    dept: "Services",
    title: "LawyersManagement",
    icon: "fa-solid fa-user-secret",
    link: "/lawyers-managment",
    color: "success",
  },
  {
    dept: "Services",
    title: "ClientManagement",
    icon: "fa-solid fas fa-users",
    link: "/client-management",
    color: "info",
  },
  {
    dept: "Services",
    title: "JudgmentAdministration",
    icon: "fa-solid fa-gavel",
    link: "/judgements-managements",
    color: "warning",
  },
  // {
  //   dept: "Services",
  //   title: "LegalProcedureAutomationSettings",
  //   icon: "fa-solid fa-screwdriver-wrench",
  //   link: "",
  //   color: "success",
  // },
  // {
  //   dept: "Services",
  //   title: "ObjectionsManagement",
  //   icon: "fa-solid fa-gear",
  //   link: "",
  //   color: "danger",
  // },
  {
    dept: "Services",
    title: "LitigationNotes",
    icon: "fa-regular fa-file",
    link: "/legal-notes",
    color: "primary",
  },
  // {
  //   dept: "Services",
  //   title: "StudyOfLawsuits",
  //   icon: "fa-solid fa-file-contract",
  //   link: "/study-of-lawsuits",
  //   color: "success",
  // },
  // {
  //   dept: "Services",
  //   title: "ListOfClaims",
  //   icon: "fa-solid fa-table-list",
  //   link: "/list-of-claims",
  //   color: "success",
  // },
  // {
  //   dept: "Services",
  //   title: "MyClaims",
  //   icon: "fa-solid fa-table-list",
  //   // link: "/my-claims",
  //   link: "#",
  //   color: "warning",
  // },
  // {
  //   dept: "Services",
  //   title: "ApprovalRequests",
  //   icon: "fas fa-list-ol",
  //   // link: "/approval-requests",
  //   link: "#",
  //   color: "info",
  // },
  // {
  //   dept: "Services",
  //   title: "Archives",
  //   icon: "fa-solid fa-boxes-stacked",
  //   link: "/archives",
  //   color: "danger",
  // },
  {
    dept: "Services",
    title: "ElectronicLibrary",
    icon: "fa-solid fa-book-open",
    link: "/electronic-library",
    color: "info",
  },
  {
    dept: "Services",
    title: "LegalIndicators",
    icon: "fas fa-chart-pie",
    link: "/legal-indicators",
    color: "primary",
  },
  {
    dept: "Services",
    title: "intelligentInterlocutor",
    icon: "fa-solid fa-magnifying-glass-chart",
    link: "/intelligent-interlocutor/legal",
    color: "success",
  },
  // {
  //   dept: "Services",
  //   title: "SystemSettings",
  //   icon: "fas fa-users-cog",
  //   // link: "/system-settings",
  //   link: "#",
  //   color: "danger",
  // },
];

const createdItems = createWorkspaceItems(name, items);
export const CardsListData = () => createdItems.map((item) => item.card);
export const ToolsBoxDrawerData = () =>
  createdItems.map((item) => item.toolboxItem);
export const TableListData = () => createdItems.map((item) => item.tableRow);
