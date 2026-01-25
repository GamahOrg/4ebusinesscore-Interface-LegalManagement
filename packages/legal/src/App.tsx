import { Suspense, lazy } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import AddClaimStudy from "./app/pages/study-of-lawsuits/components/add-claim-study";
import AddBook from "./app/pages/electronic-library/add-book";
import EditBook from "./app/pages/electronic-library/edit-book";
import StudyDetails from "./app/pages/study-of-lawsuits/study-details";
import EditClaimStudy from "./app/pages/study-of-lawsuits/components/edit-claim-study";
import { Provider } from "react-redux";
import store from "./app/store/store";
import { DynamicWorkSpace } from "@npm-react/react-redux-routing";

const ViewLawsuit2ListCliams = lazy(
  () => import("./app/pages/list-of-claims/components/ViewTheLawsuit2")
);

const ViewClaimsListCliams = lazy(
  () => import("./app/pages/list-of-claims/components/view-claims-list-cliams")
);
const StudyOfLawsuits = lazy(
  () => import("./app/pages/study-of-lawsuits/study-of-lawsuits")
);
const ListOfClaims = lazy(
  () => import("./app/pages/list-of-claims/list-of-claims")
);
const InvitationDetails = lazy(
  () => import("./app/pages/list-of-claims/components/invitation-details")
);
const ViewLawsuitTwo = lazy(
  () => import("./app/pages/list-of-claims/components/view-lawsuit-two")
);
const LawsuitDataEdit = lazy(
  () => import("./app/pages/list-of-claims/components/lawsuit-data-edit")
);
const AddAnIncomingClaim = lazy(
  () => import("./app/pages/list-of-claims/components/add-incoming-claim")
);
const EditAnIncomingClaim = lazy(
  () => import("./app/pages/list-of-claims/components/edit-incoming-claim")
);

const Archives = lazy(() => import("./app/pages/archives/archives"));
const MyClaims = lazy(() => import("./app/pages/my-claims/my-claims"));
const ElectronicLibrary = lazy(
  () => import("./app/pages/electronic-library/electronic-library")
);
const IntelligentInterLocutor = lazy(
  () => import("./app/pages/intelligent-interlocutor/intelligent-interlocutor")
);
const SystemSettings = lazy(
  () => import("./app/pages/system-settings/system-settings")
);
const ViewLawsuit = lazy(
  () => import("./app/pages/archives/components/ViewTheLawsuit")
);
const ViewLawsuit3 = lazy(
  () => import("./app/pages/approval-requests/components/ViewTheLawsuit")
);
const ViewLawsuit2 = lazy(
  () => import("./app/pages/archives/components/ViewTheLawsuit2")
);

const ViewLawsuit4 = lazy(
  () => import("./app/pages/approval-requests/components/ViewTheLawsuit2")
);

const ViewClaims = lazy(
  () => import("./app/pages/my-claims/components/view-claims")
);

const AddLawsuit = lazy(
  () => import("./app/pages/my-claims/components/AddLawsuit")
);

const ModifyClaim = lazy(
  () => import("./app/pages/my-claims/components/ModifyClaim")
);
const ViewClaims2 = lazy(
  () => import("./app/pages/my-claims/components/view-claims2")
);
const ViewClaims3 = lazy(
  () => import("./app/pages/approval-requests/components/view-claims3")
);
const EditLawsuits = lazy(
  () => import("./app/pages/my-claims/components/EditLawsuits")
);
const ApprovalRequests = lazy(
  () => import("./app/pages/approval-requests/approval-requests")
);
const StudyClaimDetails2 = lazy(
  () => import("./app/pages/approval-requests/components/StudyClaimDetails2")
);
const StudyDetails3 = lazy(
  () => import("./app/pages/approval-requests/components/study-details")
);
const StudyDetails4 = lazy(
  () => import("./app/pages/approval-requests/components/study-details3")
);
const LegalIndicators = lazy(
  () => import("./app/pages/legal-indicators/legal-indicators")
);

const TeamWork = lazy(
  () => import("./app/pages/list-of-Cases/components/team-work/TeamWork")
);

const CasesView = lazy(
  () => import("./app/pages/list-of-Cases/components/CasesView")
);
const ListOfCases = lazy(() => import("./app/pages/list-of-Cases/ListOfCases"));

const JudgementsManagements = lazy(
  () => import("./app/pages/judgements-managements/JudgementsManagements")
);

const CaseJudgement = lazy(
  () => import("./app/pages/judgements-managements/CaseJudgement")
);
const AddAcaseUser = lazy(
  () =>
    import("./app/pages/list-of-Cases/components/add-case-user/AddAcaseUser")
);
const EditAcaseUser = lazy(
  () =>
    import("./app/pages/list-of-Cases/components/edit-case-user/EditAcaseUser")
);
const Editcase = lazy(() => import("./app/pages/list-of-Cases/EditCase"));
const SessionsHome = lazy(
  () => import("./app/pages/sessions-management/SessionsHome")
);
const SessionDetailsForAddHome = lazy(
  () => import("./app/pages/sessions-management/SessionDetailsForAddHome")
);
const SessionDetailsHome = lazy(
  () => import("./app/pages/sessions-management/SessionDetailsHome")
);
const ClientManagement = lazy(
  () => import("./app/pages/client-management/ClientManagement")
);

const LawyersManagment = lazy(
  () => import("./app/pages/lawyers-management/lawyers-managment")
);
const LegalNotes = lazy(() => import("./app/pages/legal-notes/legal-notes"));
const LiabilityManagement = lazy(
  () => import("./app/pages/liability-management/LiabilityManagement")
);
const LitigationManagement = lazy(
  () => import("./app/pages/litigation-Management/LitigationManagement")
);
function App() {
  return (
    <Provider store={store}>
      <Suspense
      // fallback={<Loader />}
      >
        <Routes>
          <Route path="/" element={<DynamicWorkSpace />} />
          <Route
            path="/approval-requests/StudyClaimDetails2"
            element={<StudyClaimDetails2 />}
          />
          <Route path="/study-details" element={<StudyDetails3 />} />
          <Route path="/study-details2" element={<StudyDetails4 />} />
          <Route path="/view-cliams3" element={<ViewClaims3 />} />
          <Route path="/edit-lawsuits" element={<EditLawsuits />} />
          <Route path="/view-lawsuit-three" element={<ViewLawsuit3 />} />
          <Route path="/view-lawsuit-four" element={<ViewLawsuit4 />} />
          <Route
            path="/view-claims-list-cliams"
            element={<ViewClaimsListCliams />}
          />
          <Route
            path="/view-claims-list-cliams2"
            element={<ViewLawsuit2ListCliams />}
          />
          <Route path="/approval-requests" element={<ApprovalRequests />} />
          <Route path="/add-claim-study" element={<AddClaimStudy />} />
          <Route path="/edit-claim-study" element={<EditClaimStudy />} />
          <Route path="/my-claims" element={<MyClaims />} />
          <Route path="/add-lawsuit" element={<AddLawsuit />} />
          <Route path="/modify-claim" element={<ModifyClaim />} />
          <Route path="/study-of-lawsuits" element={<StudyOfLawsuits />} />
          <Route path="/study-of-lawsuits/details" element={<StudyDetails />} />
          <Route path="/list-of-claims" element={<ListOfClaims />} />
          <Route path="/invitation-details" element={<InvitationDetails />} />
          <Route path="/view-lawsuit-two" element={<ViewLawsuitTwo />} />
          <Route path="/lawsuit-data-edit" element={<LawsuitDataEdit />} />
          <Route path="/add-incoming-claim" element={<AddAnIncomingClaim />} />
          <Route
            path="/edit-incoming-claim"
            element={<EditAnIncomingClaim />}
          />
          <Route path="/archives" element={<Archives />} />
          <Route path="/electronic-library" element={<ElectronicLibrary />} />
          <Route path="/electronic-library/add-book" element={<AddBook />} />
          <Route
            path="/electronic-library/edit-book/:id"
            element={<EditBook />}
          />
          <Route
            path="/intelligent-interlocutor/:workspaceName"
            element={<IntelligentInterLocutor />}
          />
          <Route path="/system-settings" element={<SystemSettings />} />
          <Route path="/view-lawsuit" element={<ViewLawsuit />} />
          <Route path="/view-lawsuit-2" element={<ViewLawsuit2 />} />
          <Route path="/view-claims" element={<ViewClaims />} />
          <Route path="/view-claims-2" element={<ViewClaims2 />} />
          <Route path="/view-claims-3" element={<ViewClaims3 />} />
          <Route path="/legal-indicators" element={<LegalIndicators />} />
          <Route path="/team-work" element={<TeamWork />} />

          <Route path="list-of-cases" element={<ListOfCases />} />
          {/* Delete Later */}

          <Route
            path="/cases-view/list-of-cases/:id"
            element={<ListOfCases />}
          />
          <Route
            path="/sessions-view/list-of-cases/:id"
            element={<ListOfCases />}
          />
          <Route
            path="/legal-notes/list-of-cases/:id"
            element={<ListOfCases />}
          />
          <Route
            path="/liability-management/list-of-cases/:id"
            element={<ListOfCases />}
          />
          <Route
            path="/litigation-management/list-of-cases/:id"
            element={<ListOfCases />}
          />
          <Route
            path="/client-management/list-of-cases/:id"
            element={<ListOfCases />}
          />
          <Route
            path="/lawyers-managment/list-of-cases/:id"
            element={<ListOfCases />}
          />

          <Route path="/cases-view" element={<CasesView />} />
          <Route
            path="/judgements-managements"
            element={<JudgementsManagements />}
          />

          <Route
            path="/judgements-managements/case-judgement/:id"
            element={<CaseJudgement />}
          />
          <Route path="/cases-view/add-case-user" element={<AddAcaseUser />} />
          <Route path="/edit-case-user" element={<EditAcaseUser />} />
          <Route path="/cases-view/edit-case/:id" element={<Editcase />} />
          {/* sessions mangment */}
          <Route path="/sessions-view" element={<SessionsHome />} />
          <Route
            path="/session-details-for-add/:id"
            element={<SessionDetailsForAddHome />}
          />
          <Route
            path="/sessions-view/session-details/:id"
            element={<SessionDetailsHome />}
          />

          {/* client management */}
          <Route path="/client-management" element={<ClientManagement />} />
          <Route path="/lawyers-managment" element={<LawyersManagment />} />
          <Route path="/legal-notes" element={<LegalNotes />} />

          <Route
            path="/liability-management"
            element={<LiabilityManagement />}
          />

          {/* litigation management */}
          <Route
            path="/litigation-management"
            element={<LitigationManagement />}
          />
        </Routes>
      </Suspense>
    </Provider>
  );
}

export default App;
