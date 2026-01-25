import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { LegalConsume } from "@4eplatform/shared/apis/legal";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { ELibraryModel } from "../models/ELibraryModel";

interface ELibraryState {
  loading: boolean;
  pagination: Pagination;
  libraries: ELibraryModel[];
  library: ELibraryModel;
  status: RequestStatus;
  error: string | null;
}

const initialState: ELibraryState = {
  loading: false,
  libraries: [],
  library: new ELibraryModel(),
  pagination: new Pagination(),
  status: RequestStatus.idle,
  error: "",
};

export const fetchAllELibrary = createAsyncThunk<ResponseModel, any>(
  "eLibrary/fetchAllLkAttachmentSources ",
  async (params = {}, thunkApi) => {
    try {
      const response = await LegalConsume.getAllELibrary(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchELibraryById = createAsyncThunk<ResponseModel, any>(
  "eLibrary/fetchELibraryById ",
  async (id, thunkApi) => {
    try {
      const response = await LegalConsume.getELibraryById(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const postELibrary = createAsyncThunk<ResponseModel, any>(
  "eLibrary/postELibrary",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.postELibrary(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const putELibrary = createAsyncThunk<ResponseModel, any>(
  "eLibrary/putELibrary",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.putELibrary(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const deleteELibrary = createAsyncThunk<ResponseModel, any>(
  "eLibrary/deleteELibrary",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.deleteELibrary(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
const eLibrarySlice = createSlice({
  name: "eLibrary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllELibrary.fulfilled, (state, action) => {
        state.loading = false;
        state.status = RequestStatus.succeeded;
        state.libraries = action.payload?.result as ELibraryModel[];
        state.pagination.pageIndex = action.payload?.pageIndex;
        state.pagination.pageSize = action.payload?.pageSize;
        state.pagination.totalItems = action.payload?.totalItems;
        state.pagination.totalPages = action.payload?.totalPages;
      })
      .addCase(fetchAllELibrary.pending, handlePending)
      .addCase(fetchAllELibrary.rejected, handleRejected)
      .addCase(fetchELibraryById.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.loading = false;
        state.library = action.payload?.result as ELibraryModel;
      })
      .addCase(fetchELibraryById.pending, handlePending)
      .addCase(fetchELibraryById.rejected, handleRejected)
      .addCase(postELibrary.fulfilled, handleFulfilled)
      .addCase(postELibrary.pending, handlePending)
      .addCase(postELibrary.rejected, handleRejected)
      .addCase(putELibrary.fulfilled, handleFulfilled)
      .addCase(putELibrary.pending, handlePending)
      .addCase(putELibrary.rejected, handleRejected)
      .addCase(deleteELibrary.fulfilled, handleFulfilled)
      .addCase(deleteELibrary.pending, handlePending)
      .addCase(deleteELibrary.rejected, handleRejected);
  },
});

const handleFulfilled = (state: ELibraryState) => {
  state.status = RequestStatus.succeeded;
  state.loading = false;
};

const handlePending = (state: ELibraryState) => {
  state.status = RequestStatus.loading;
  state.loading = true;
};

const handleRejected = (state: ELibraryState, action: any) => {
  state.status = RequestStatus.failed;
  state.loading = false;
  state.error = action.error.message ?? "An error occurred";
};

export default eLibrarySlice.reducer;
