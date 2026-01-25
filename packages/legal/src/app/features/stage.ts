import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { StageModel } from "../models/LKStageModel";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { LegalConsume } from "@4eplatform/shared/apis/legal";

interface LKStageState {
  loading: boolean;
  lkStages: StageModel[];
  lkStageById: StageModel;
  pagination: Pagination;
  status: RequestStatus;
  error: string | null;
}

const initialState: LKStageState = {
  loading: false,
  lkStages: [],
  lkStageById: new StageModel(),
  pagination: new Pagination(),
  status: RequestStatus.idle,
  error: "",
};

export const fetchAllLKStage = createAsyncThunk<ResponseModel, any>(
  "lkStage/fetchAllLKStage",
  async (params = {}, thunkApi) => {
    try {
      const response = await LegalConsume.getAllLKStage(params); 
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchLKStageById = createAsyncThunk<ResponseModel, any>(
  "lkStage/fetchLKStageById",
  async (id, thunkApi) => {
    try {
      const response = await LegalConsume.getLKSatgebyid(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const addLKStage = createAsyncThunk<ResponseModel, any>(
  "lkStage/addLKStage",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.addLKStage(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const editLKStage = createAsyncThunk<ResponseModel, any>(
  "lkStage/editLKStage",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.editLKStage(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteLKStage = createAsyncThunk<ResponseModel, any>(
  "lkStage/deleteLKStage",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.deleteLKStage(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const lkStageSlice = createSlice({
  name: "lkStage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLKStage.fulfilled, (state, action) => {
        state.loading = false;
        state.status = RequestStatus.succeeded;
        state.lkStages = action?.payload?.result as StageModel[];
        state.pagination.pageIndex = action?.payload?.pageIndex;
        state.pagination.pageSize = action?.payload?.pageSize;
        state.pagination.totalItems = action?.payload?.totalItems;
        state.pagination.totalPages = action?.payload?.totalPages;
      })
      .addCase(fetchAllLKStage.pending, handlePending)
      .addCase(fetchAllLKStage.rejected, handleRejected)
      .addCase(fetchLKStageById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = RequestStatus.succeeded;
        state.lkStageById = action?.payload?.result as StageModel;
      })
      .addCase(fetchLKStageById.pending, handlePending)
      .addCase(fetchLKStageById.rejected, handleRejected)

      .addCase(addLKStage.pending, handlePending)
      .addCase(addLKStage.fulfilled, handleFulfilled)
      .addCase(addLKStage.rejected, handleRejected)
      .addCase(editLKStage.pending, handlePending)
      .addCase(editLKStage.fulfilled, handleFulfilled)
      .addCase(editLKStage.rejected, handleRejected)
      .addCase(deleteLKStage.pending, handlePending)
      .addCase(deleteLKStage.fulfilled, handleFulfilled)
      .addCase(deleteLKStage.rejected, handleRejected);
  },
});

const handlePending = (state: LKStageState) => {
  state.status = RequestStatus.loading;
  state.loading = true;
};
const handleFulfilled = (state: LKStageState) => {
  state.status = RequestStatus.succeeded;
};
const handleRejected = (state: LKStageState, action: any) => {
  state.status = RequestStatus.failed;
  state.loading = false;
  state.error = action.error.message ?? "AnErrorOccurred";
};

export default lkStageSlice.reducer;
