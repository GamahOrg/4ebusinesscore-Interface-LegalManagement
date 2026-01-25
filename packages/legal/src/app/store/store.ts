import { Action, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import attachmentSourceSlice from "../features/attachment-source";

import litigantConsumeSlice from "../features/litigant-consume";
import eLibrarySlice from "../features/e-library";
import lkCauseCategoriesSlice from "../features/lk-cause-categories";
import lkIdentityTypeSlice from "../features/lk-identity-type";
import causeLawyerSlice from "../features/cause-layer";
import causeSlice from "../features/cause";
import judgementGroundSlice from "../features/judgement-ground";
import lKJudgementControllersSlice from "../features/lk-judgement-controllers";
import sessionNoteSlice from "../features/session-note";
import sessionAttachmentSlice from "../features/session-attachment";
import sessionAssignSlice from "../features/session-assign";
import lkStageSlice from "../features/stage";
import lawyerSlice from "../features/lawyer";
import sessionSlice from "../features/session";
import causeStagesSlice from "../features/cause-stage";
import orgHierarchySlice from "../features/orgHierarchySlice";
import memberSlice from "../features/members";
import causesSlice from "../features/causes";
import getAllMyComponentsSlice from "../features/getAllMyComponentsSlice";
import judgementRequirementsSlice from "../features/judement-requirements";
import lkTypeJudiciarySlice from "../features/lk-type-judiciary";
import LK_ClassificationTypeElibrary from "../features/LK_ClassificationTypeElibrarySlice";
import { storeRegistry } from "@4eplatform/shared/store/storeRegistry";
import indicatorsSlice from "../features/legalIndicatorSlice";
import judgementRefernceSlice from "../features/judgement-refernce";
import CauseCommentsSlice from "../features/cause-comments";
import getAllMyComponentssSlice from "../features/workspace/getAllMyComponentsSlice";
import getAllHiddenWorkspacesSlice from "../features/workspace/getAllHiddenWorkspacesSlice";
import favouritesListSlice from "../features/workspace/getFavouriteListSlice";
import postHiddenWorkspacesSlice from "../features/workspace/postHiddenWorkspacesSlice";
import deleteHiddenWorkspacesSlice from "../features/workspace/deleteHiddenWorkspacesSlice";
const store = storeRegistry.createStore({
  attachmentSource: attachmentSourceSlice,
  eLibrary: eLibrarySlice,
  lkCauseCategories: lkCauseCategoriesSlice,
  lkIdentityType: lkIdentityTypeSlice,
  causeLawyer: causeLawyerSlice,
  causes: causeSlice,
  causesData: causesSlice,
  judgementGround: judgementGroundSlice,
  libability: litigantConsumeSlice,
  lawyer: lawyerSlice,
  members: memberSlice,
  lKJudgement: lKJudgementControllersSlice,
  sessionNote: sessionNoteSlice,
  sessionAttachment: sessionAttachmentSlice,
  sessionAssign: sessionAssignSlice,
  causeStages: causeStagesSlice,
  lkSatge: lkStageSlice,
  session: sessionSlice,
  orgHierarchy: orgHierarchySlice,
  legalWorkspace: getAllMyComponentsSlice,
  judgementRequirement: judgementRequirementsSlice,
  lkTypeJudiciary: lkTypeJudiciarySlice,
  LK_ClassificationTypeElibrary:LK_ClassificationTypeElibrary,
  Indicator: indicatorsSlice,
  judgementReference:judgementRefernceSlice,
  causecomments:CauseCommentsSlice,
  myComponents: getAllMyComponentssSlice,
  hiddenWorkspaces: getAllHiddenWorkspacesSlice,
  getFavouriteList: favouritesListSlice,
  postHiddenWorkspaces: postHiddenWorkspacesSlice,
  deleteHiddenWorkspaces: deleteHiddenWorkspacesSlice,

  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
