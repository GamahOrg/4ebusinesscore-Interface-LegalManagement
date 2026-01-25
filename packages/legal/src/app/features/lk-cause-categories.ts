import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { LKCauseCategoriesModel } from "../models/LKCauseCategoriesModel";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { LegalConsume } from "@4eplatform/shared/apis/legal";

interface LKCauseCategoriesState {
  loading: boolean;
  lkCauseCategories: LKCauseCategoriesModel[];
  lkCauseCategoryById: LKCauseCategoriesModel;
  pagination: Pagination;
  status: RequestStatus;
  error: string | null;
}

const initialState: LKCauseCategoriesState = {
  loading: false,
  lkCauseCategories: [],
  lkCauseCategoryById: new LKCauseCategoriesModel(),
  pagination: new Pagination(),
  status: RequestStatus.idle,
  error: "",
};

export const addLKCauseCategory = createAsyncThunk<ResponseModel, any>(
  "lkCauseCategories/addLKCauseCategory",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.addLKCauseCategory(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const editLKCauseCategory = createAsyncThunk<ResponseModel, any>(
  "lkCauseCategories/editLKCauseCategory",
  async (data, thunkApi) => {
    try {
      let body = {
        nameAr: data.nameAr,
        nameEn: data.nameEn,
      };
      const response = await LegalConsume.editLKCauseCategory({
        body,
        id: data?.id,
      });
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchAllLKCauseCategories = createAsyncThunk<ResponseModel, any>(
  "lkCauseCategories/fetchAllLKCauseCategories",
  async (params = {}, thunkApi) => {
    try {
      const response = await LegalConsume.getAllLKCauseCategories(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const fetchLKCauseCategoryById = createAsyncThunk<ResponseModel, any>(
  "lkCauseCategories/fetchLKCauseCategoryById",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.getLKCauseCategoryById(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteLKCauseCategory = createAsyncThunk<ResponseModel, any>(
  "lkCauseCategories/deleteLKCauseCategory",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.deleteLKCauseCategory(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const lkCauseCategoriesSlice = createSlice({
  name: "lkCauseCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLKCauseCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.status = RequestStatus.succeeded;
        state.lkCauseCategories = action.payload
          ?.result as LKCauseCategoriesModel[];
        state.pagination.pageIndex = action.payload?.pageIndex;
        state.pagination.pageSize = action.payload?.pageSize;
        state.pagination.totalItems = action.payload?.totalItems;
        state.pagination.totalPages = action.payload?.totalPages;
      })
      .addCase(fetchAllLKCauseCategories.pending, handlePending)
      .addCase(fetchAllLKCauseCategories.rejected, handleRejected)

      .addCase(fetchLKCauseCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = RequestStatus.succeeded;
        state.lkCauseCategoryById = action.payload
          ?.result as LKCauseCategoriesModel;
      })
      .addCase(fetchLKCauseCategoryById.pending, handlePending)
      .addCase(fetchLKCauseCategoryById.rejected, handleRejected)

      .addCase(addLKCauseCategory.pending, handlePending)
      .addCase(addLKCauseCategory.fulfilled, handleFulfilled)
      .addCase(addLKCauseCategory.rejected, handleRejected)
      .addCase(editLKCauseCategory.pending, handlePending)
      .addCase(editLKCauseCategory.fulfilled, handleFulfilled)
      .addCase(editLKCauseCategory.rejected, handleRejected)
      .addCase(deleteLKCauseCategory.pending, handlePending)
      .addCase(deleteLKCauseCategory.fulfilled, handleFulfilled)
      .addCase(deleteLKCauseCategory.rejected, handleRejected);
  },
});

const handlePending = (state: LKCauseCategoriesState) => {
  state.status = RequestStatus.loading;
  state.loading = true;
};
const handleFulfilled = (state: LKCauseCategoriesState) => {
  state.status = RequestStatus.succeeded;
};
const handleRejected = (state: LKCauseCategoriesState, action: any) => {
  state.status = RequestStatus.failed;
  state.loading = false;
  state.error = action.error.message ?? "AnErrorOccurred";
};

export default lkCauseCategoriesSlice.reducer;
