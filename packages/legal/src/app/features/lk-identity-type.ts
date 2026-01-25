import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { LegalConsume } from "@4eplatform/shared/apis/legal";
import { LKIdentityTypeModel } from "../models/LKIdentityTypeModel";

interface LKIdentityTypeState {
  loading: boolean;
  lkIdentityType: LKIdentityTypeModel[];
  lkIdentityTypeById: LKIdentityTypeModel;
  pagination: Pagination;
  status: RequestStatus;
  error: string | null;
}

const initialState: LKIdentityTypeState = {
  loading: false,
  lkIdentityType: [],
  lkIdentityTypeById: new LKIdentityTypeModel(),
  pagination: new Pagination(),
  status: RequestStatus.idle,
  error: "",
};

export const addLKIdentityType = createAsyncThunk<ResponseModel, any>(
  "lkIdentityType/addLKIdentityType",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.addLKIdentityType(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const editLKIdentityType = createAsyncThunk<ResponseModel, any>(
  "lkIdentityType/editLKIdentityType",
  async (data, thunkApi) => {
    try {
      let body = {
        nameAr: data.nameAr,
        nameEn: data.nameEn,
      };
      const response = await LegalConsume.editLKIdentityType({
        body,
        id: data?.id,
      });
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const fetchAllLKIdentityType = createAsyncThunk<ResponseModel, any>(
  "lkIdentityType/fetchAllLKIdentityType",
  async (params = {}, thunkApi) => {
    try {
      const response = await LegalConsume.getAllLKIdentityTypes(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const fetchLKIdentityType = createAsyncThunk<ResponseModel, any>(
  "lkIdentityType/fetchLKIdentityType",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.getLKIdentityTypeById(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteLKIdentityType = createAsyncThunk<ResponseModel, any>(
  "lkIdentityType/deleteLKIdentityType",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.deleteLKIdentityType(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const lkIdentityTypeSlice = createSlice({
  name: "lkIdentityType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLKIdentityType.fulfilled, (state, action) => {
        state.loading = false;
        state.status = RequestStatus.succeeded;
        state.lkIdentityType = action.payload
          ?.result as LKIdentityTypeModel[];
        state.pagination.pageIndex = action.payload?.pageIndex;
        state.pagination.pageSize = action.payload?.pageSize;
        state.pagination.totalItems = action.payload?.totalItems;
        state.pagination.totalPages = action.payload?.totalPages;
      })
      .addCase(fetchAllLKIdentityType.pending, handlePending)
      .addCase(fetchAllLKIdentityType.rejected, handleRejected)

      .addCase(fetchLKIdentityType.fulfilled, (state, action) => {
        state.loading = false;
        state.status = RequestStatus.succeeded;
        state.lkIdentityTypeById = action.payload
          ?.result as LKIdentityTypeModel;
      })
      .addCase(fetchLKIdentityType.pending, handlePending)
      .addCase(fetchLKIdentityType.rejected, handleRejected)

      .addCase(addLKIdentityType.pending, handlePending)
      .addCase(addLKIdentityType.fulfilled, handleFulfilled)
      .addCase(addLKIdentityType.rejected, handleRejected)
      .addCase(editLKIdentityType.pending, handlePending)
      .addCase(editLKIdentityType.fulfilled, handleFulfilled)
      .addCase(editLKIdentityType.rejected, handleRejected)
      .addCase(deleteLKIdentityType.pending, handlePending)
      .addCase(deleteLKIdentityType.fulfilled, handleFulfilled)
      .addCase(deleteLKIdentityType.rejected, handleRejected);
  },
});

const handlePending = (state: LKIdentityTypeState) => {
  state.status = RequestStatus.loading;
  state.loading = true;
};
const handleFulfilled = (state: LKIdentityTypeState) => {
  state.status = RequestStatus.succeeded;
};
const handleRejected = (state: LKIdentityTypeState, action: any) => {
  state.status = RequestStatus.failed;
  state.loading = false;
  state.error = action.error.message ?? "AnErrorOccurred";
};

export default lkIdentityTypeSlice.reducer;
