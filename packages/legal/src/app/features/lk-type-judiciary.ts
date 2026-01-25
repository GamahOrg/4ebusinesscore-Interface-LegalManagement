import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { LegalConsume } from "@4eplatform/shared/apis/legal";
import { LK_TypeJudiciaryModel } from "../models/LK_TypeJudiciaryModel";

interface LKTypeJudiciaryState {
  loading: boolean;
  lkTypeJudiciary: LK_TypeJudiciaryModel[];
  lkTypeJudiciaryById: LK_TypeJudiciaryModel | null;
  pagination: Pagination;
  status: RequestStatus;
  error: string | null;
}

const initialState: LKTypeJudiciaryState = {
  loading: false,
  lkTypeJudiciary: [],
  lkTypeJudiciaryById: null,
  pagination: new Pagination(),
  status: RequestStatus.idle,
  error: "",
};

export const fetchAllLKTypeJudiciary = createAsyncThunk<ResponseModel, any>(
  "lkTypeJudiciary/fetchAll",
  async (params = {}, thunkApi) => {
    try {
      const response = await LegalConsume.getAllLKTypeJudiciary(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchLKTypeJudiciaryById = createAsyncThunk<ResponseModel, any>(
  "lkTypeJudiciary/fetchById",
  async (id, thunkApi) => {
    try {
      const response = await LegalConsume.getLKTypeJudiciaryById(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const lkTypeJudiciarySlice = createSlice({
  name: "lkTypeJudiciary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLKTypeJudiciary.fulfilled, (state, action) => {
        state.loading = false;
        state.status = RequestStatus.succeeded;
        state.lkTypeJudiciary = (action.payload?.result || []) as LK_TypeJudiciaryModel[];
        state.pagination.pageIndex = action.payload?.pageIndex;
        state.pagination.pageSize = action.payload?.pageSize;
        state.pagination.totalItems = action.payload?.totalItems;
        state.pagination.totalPages = action.payload?.totalPages;
      })
      .addCase(fetchAllLKTypeJudiciary.pending, handlePending)
      .addCase(fetchAllLKTypeJudiciary.rejected, handleRejected)

      .addCase(fetchLKTypeJudiciaryById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = RequestStatus.succeeded;
        state.lkTypeJudiciaryById = action.payload?.result as LK_TypeJudiciaryModel;
      })
      .addCase(fetchLKTypeJudiciaryById.pending, handlePending)
      .addCase(fetchLKTypeJudiciaryById.rejected, handleRejected);
  },
});

const handlePending = (state: LKTypeJudiciaryState) => {
  state.status = RequestStatus.loading;
  state.loading = true;
};

const handleRejected = (state: LKTypeJudiciaryState, action: any) => {
  state.status = RequestStatus.failed;
  state.loading = false;
  state.error = action.error?.message ?? "AnErrorOccurred";
};

export default lkTypeJudiciarySlice.reducer;


