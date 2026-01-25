import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { LegalAggConsume } from "@4eplatform/shared/apis/legal_agg";
import {
  JudgementGroundModel,
  JudgementModel,
} from "../models/JudgementGroundModel";
import { LegalConsume } from "@4eplatform/shared/apis/legal";

interface JudgementGroundState {
  loading: boolean;
  judgementGrounds: JudgementGroundModel[];
  judgementGroundsById: JudgementModel;
  pagination: Pagination;
  status: RequestStatus;
  error: string | null;
}

const initialState: JudgementGroundState = {
  loading: false,
  judgementGrounds: [],
  pagination: new Pagination(),
  judgementGroundsById: new JudgementModel(),
  status: RequestStatus.idle,
  error: "",
};

export const fetchAllJudgementGrounds = createAsyncThunk<ResponseModel, any>(
  "judgementGround/fetchAllJudgementGrounds",
  async (params = {}, thunkApi) => {
    try {
      const response = await LegalAggConsume.getAllJudgementGround(params);

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchJudgementById = createAsyncThunk<ResponseModel, any>(
  "judgementGround/fetchJudgementById",
  async (Id, thunkApi) => {
    try {
      if (!Id) {
        return thunkApi.rejectWithValue("Invalid ID");
      }
      const response = await LegalConsume.getJedgementGroundById(Id);

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const postJudgmentGround = createAsyncThunk<ResponseModel, any>(
  "judgementGround/postJudgmentGround",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.postJudgmentGround(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const putJudgmentGround = createAsyncThunk<ResponseModel, any>(
  "judgementGround/putJudgmentGround",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.putJudgmentGround(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteJudgmentGround = createAsyncThunk<ResponseModel, any>(
  "judgementGround/deleteJudgmentGround",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.deleteJudgmentGroundWithQuerry(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const judgementGroundSlice = createSlice({
  name: "judgementGround",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJudgementGrounds.fulfilled, (state, action) => {
        state.loading = false;
        state.status = RequestStatus.succeeded;
        state.judgementGrounds = action.payload
          ?.result as JudgementGroundModel[];
        state.pagination.pageIndex = action.payload?.pageIndex;
        state.pagination.pageSize = action.payload?.pageSize;
        state.pagination.totalItems = action.payload?.totalItems;
        state.pagination.totalPages = action.payload?.totalPages;
      })
      .addCase(fetchAllJudgementGrounds.pending, (state) => {
        state.loading = true;
        state.status = RequestStatus.loading;
      })
      .addCase(fetchAllJudgementGrounds.rejected, (state) => {
        state.loading = false;
        state.status = RequestStatus.failed;
      })
      .addCase(fetchJudgementById.fulfilled, (state, action) => {
        // state.loading = false;
        state.status = RequestStatus.succeeded;
        state.judgementGroundsById = action.payload?.result as JudgementModel;
      })
      .addCase(fetchJudgementById.pending, handlePending)
      .addCase(fetchJudgementById.rejected, handleRejected)
      .addCase(postJudgmentGround.fulfilled, handleFulfilled)
      .addCase(postJudgmentGround.pending, handlePending)
      .addCase(postJudgmentGround.rejected, handleRejected)
      .addCase(putJudgmentGround.fulfilled, handleFulfilled)
      .addCase(putJudgmentGround.pending, handlePending)
      .addCase(putJudgmentGround.rejected, handleRejected)
      .addCase(deleteJudgmentGround.fulfilled, handleFulfilled)
      .addCase(deleteJudgmentGround.pending, handlePending)
      .addCase(deleteJudgmentGround.rejected, handleRejected);
  },
});

const handleFulfilled = (state: JudgementGroundState) => {
  state.status = RequestStatus.succeeded;
};

const handlePending = (state: JudgementGroundState) => {
  state.status = RequestStatus.loading;
};

const handleRejected = (state: JudgementGroundState, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "AnErrorOccurred";
};

export default judgementGroundSlice.reducer;
