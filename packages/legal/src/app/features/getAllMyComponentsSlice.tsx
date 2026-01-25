import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { WorkspaceCardModel } from "../models/WorkspaceCardModel";

export const getAllMyComponents = createAsyncThunk<any, {}>(
  "legalWorkspace/getAllMyComponents",
  async (param: any) => {
    const response = await ControlPanelAggConsume.GetAllMyComponents(param);

    return response;
  }
);
interface SubsystemState {
  loading: boolean;
  pagination: Pagination;
  status: RequestStatus;
  error: string | null;
  items: WorkspaceCardModel[];
}

const initialState: SubsystemState = {
  loading: false,
  pagination: new Pagination(),
  status: RequestStatus.idle,
  error: "",
  items: [],
};

const getAllMyComponentsSlice = createSlice({
  name: "legalWorkspace",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllMyComponents.fulfilled, (state, action) => {
         state.loading = false;
          state.status = RequestStatus.succeeded;
          state.items =  action?.payload?.result?.map((item: any) => ({
          ...item,
          isChecked: false,
        })) as WorkspaceCardModel[];
          state.pagination.pageIndex = action.payload?.pageIndex;
          state.pagination.pageSize = action.payload?.pageSize;
          state.pagination.totalItems = action.payload?.totalItems;
          state.pagination.totalPages = action.payload?.totalPages;
      })
      .addCase(getAllMyComponents.pending, handlePending)
      .addCase(getAllMyComponents.rejected, handleRejected);
  },
});

const handlePending = (state: SubsystemState) => {
  state.status = RequestStatus.loading;
  state.loading = true;
};

const handleRejected = (state: SubsystemState, action: any) => {
  state.status = RequestStatus.failed;
  state.loading = false;
  state.error = action.error.message ?? "An error occurred";
};
export default getAllMyComponentsSlice.reducer;
