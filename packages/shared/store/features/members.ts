import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { LegalAggConsume } from "@4eplatform/shared/apis/legal_agg";

interface MemberState {
  loading: boolean;
  members: any;
  pagination: Pagination;
  status: RequestStatus;
  error: string | null;
}

const initialState: MemberState = {
  loading: false,
  members: { owner: [], supervisor: [], laywer: [], dataEntry: [] },
  pagination: new Pagination(),
  status: RequestStatus.idle,
  error: "",
};

const fetchAssignMember = createAsyncThunk<ResponseModel, any>(
  "member/fetchAssignMember",
  async (params = {}, thunkApi) => {
    try {
      const response = await LegalAggConsume.getAssignMember(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignMember.fulfilled, (state, action) => {
        state.loading = false;
        state.status = RequestStatus.succeeded;
        state.members = action?.payload?.result;
        state.pagination.pageIndex = action?.payload?.pageIndex;
        state.pagination.pageSize = action?.payload?.pageSize;
        state.pagination.totalItems = action?.payload?.totalItems;
        state.pagination.totalPages = action?.payload?.totalPages;
      })
      .addCase(fetchAssignMember.pending, handlePending)
      .addCase(fetchAssignMember.rejected, handleRejected);
  },
});

const handlePending = (state: MemberState) => {
  state.status = RequestStatus.loading;
  state.loading = true;
};

const handleRejected = (state: MemberState, action: any) => {
  state.status = RequestStatus.failed;
  state.loading = false;
  state.error = action.error.message ?? "AnErrorOccurred";
};

export { fetchAssignMember };
export default memberSlice.reducer;
