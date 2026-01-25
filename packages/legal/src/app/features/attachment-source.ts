import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { LegalConsume } from "@4eplatform/shared/apis/legal";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { AttachmentSourceModel } from "../models/AttachmentSourceModel";

interface AttachmentSourceState {
  loading: boolean;
  pagination: Pagination;
  lkAttachmentSources: AttachmentSourceModel[];
  lkAttachmentSource: AttachmentSourceModel;
  status: RequestStatus;
  error: string | null;
}

const initialState: AttachmentSourceState = {
  loading: false,
  lkAttachmentSources: [],
  lkAttachmentSource: new AttachmentSourceModel(),
  pagination: new Pagination(),
  status: RequestStatus.idle,
  error: "",
};

export const fetchAllLkAttachmentSources = createAsyncThunk<ResponseModel, any>(
  "attachmentSource/fetchAllLkAttachmentSources",
  async (params = {}, thunkApi) => {
    try {
      const response = await LegalConsume.getAllLkAttachmentSources(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchLkAttachmentSourceById = createAsyncThunk<ResponseModel, any>(
  "attachmentSource/fetchLkAttachmentSourceById ",
  async (id, thunkApi) => {
    try {
      const response = await LegalConsume.getLkAttachmentSourceById(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const postLK_AttachmentSource = createAsyncThunk<ResponseModel, any>(
  "attachmentSource/postLK_AttachmentSource",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.postLK_AttachmentSource(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const putLK_AttachmentSource = createAsyncThunk<ResponseModel, any>(
  "attachmentSource/putLK_AttachmentSource",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.putLK_AttachmentSource(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const deleteLK_AttachmentSource = createAsyncThunk<ResponseModel, any>(
  "attachmentSource/deleteLK_AttachmentSource",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.deleteLK_AttachmentSource(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
const attachmentSourceSlice = createSlice({
  name: "attachmentSource",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLkAttachmentSources.fulfilled, (state, action) => {
        state.loading = false;
        state.status = RequestStatus.succeeded;
        state.lkAttachmentSources = action.payload
          ?.result as AttachmentSourceModel[];
        state.pagination.pageIndex = action.payload?.pageIndex;
        state.pagination.pageSize = action.payload?.pageSize;
        state.pagination.totalItems = action.payload?.totalItems;
        state.pagination.totalPages = action.payload?.totalPages;
      })
      .addCase(fetchAllLkAttachmentSources.pending, handlePending)
      .addCase(fetchAllLkAttachmentSources.rejected, handleRejected)
      .addCase(fetchLkAttachmentSourceById.fulfilled, (state, action) => {
        state.lkAttachmentSource = action.payload
          ?.result as AttachmentSourceModel;
      })
      .addCase(fetchLkAttachmentSourceById.pending, handlePending)
      .addCase(fetchLkAttachmentSourceById.rejected, handleRejected);
  },
});

const handlePending = (state: AttachmentSourceState) => {
  state.status = RequestStatus.loading;
  state.loading = true;
};

const handleRejected = (state: AttachmentSourceState, action: any) => {
  state.status = RequestStatus.failed;
  state.loading = false;
  state.error = action.error.message ?? "An error occurred";
};

export default attachmentSourceSlice.reducer;
