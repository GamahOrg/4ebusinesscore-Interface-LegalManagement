import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { LegalConsume } from "@4eplatform/shared/apis/legal";
import { LKIdentityTypeModel } from "../models/LKIdentityTypeModel";

interface LKJudgementControllersState {
  loading: boolean;
  lKJudgement: LKIdentityTypeModel[];
  lKJudgementById: LKIdentityTypeModel;
  pagination: Pagination;
  status: RequestStatus;
  error: string | null;
}

const initialState: LKJudgementControllersState = {
  loading: false,
  lKJudgement: [],
  lKJudgementById: new LKIdentityTypeModel(),
  pagination: new Pagination(),
  status: RequestStatus.idle,
  error: "",
};

export const addLKJudgement = createAsyncThunk<ResponseModel, any>(
  "lKJudgementControllers/addLKJudgement",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.addLKJudgement(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const editLKJudgement = createAsyncThunk<ResponseModel, any>(
  "lKJudgementControllers/editLKJudgement",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.editLKJudgement(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchAllLKJudgement = createAsyncThunk<ResponseModel, any>(
  "lKJudgementControllers/fetchAllLKJudgementControllers",
  async (params = {}, thunkApi) => {
    try {
      const response = await LegalConsume.getAllLKJudgement(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchLKJudgement = createAsyncThunk<ResponseModel, any>(
  "lKJudgementControllers/fetchLKJudgementControllers",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.getLKJudgementById(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteLKJudgement = createAsyncThunk<ResponseModel, any>(
  "lKJudgementControllers/deleteLKJudgement",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.deleteLKJudgement(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const lKJudgementControllersSlice = createSlice({
  name: "lKJudgementControllers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLKJudgement.fulfilled, (state, action) => {
        state.loading = false;
        state.status = RequestStatus.succeeded;
        state.lKJudgement = action.payload?.result as LKIdentityTypeModel[];
        state.pagination.pageIndex = action.payload?.pageIndex;
        state.pagination.pageSize = action.payload?.pageSize;
        state.pagination.totalItems = action.payload?.totalItems;
        state.pagination.totalPages = action.payload?.totalPages;
      })
      .addCase(fetchAllLKJudgement.pending, handlePending)
      .addCase(fetchAllLKJudgement.rejected, handleRejected)

      .addCase(fetchLKJudgement.fulfilled, (state, action) => {
        state.loading = false;
        state.status = RequestStatus.succeeded;
        state.lKJudgementById = action.payload?.result as LKIdentityTypeModel;
      })
      .addCase(fetchLKJudgement.pending, handlePending)
      .addCase(fetchLKJudgement.rejected, handleRejected)

      .addCase(addLKJudgement.pending, handlePending)
      .addCase(addLKJudgement.fulfilled, handleFulfilled)
      .addCase(addLKJudgement.rejected, handleRejected)
      .addCase(editLKJudgement.pending, handlePending)
      .addCase(editLKJudgement.fulfilled, handleFulfilled)
      .addCase(editLKJudgement.rejected, handleRejected)
      .addCase(deleteLKJudgement.pending, handlePending)
      .addCase(deleteLKJudgement.fulfilled, handleFulfilled)
      .addCase(deleteLKJudgement.rejected, handleRejected);
  },
});

const handlePending = (state: LKJudgementControllersState) => {
  state.status = RequestStatus.loading;
  state.loading = true;
};
const handleFulfilled = (state: LKJudgementControllersState) => {
  state.status = RequestStatus.succeeded;
};
const handleRejected = (state: LKJudgementControllersState, action: any) => {
  state.status = RequestStatus.failed;
  state.loading = false;
  state.error = action.error.message ?? "AnErrorOccurred";
};

export default lKJudgementControllersSlice.reducer;
