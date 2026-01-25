import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { LegalConsume } from "@4eplatform/shared/apis/legal";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { SessionAttachmentModel } from "../models/SessionAttachmentModel";

interface SessionAttachmentState {
  loading: boolean;
  pagination: Pagination;
  sessionAttachments: SessionAttachmentModel[];
  status: RequestStatus;
  error: string | null;
}

const initialState: SessionAttachmentState = {
  loading: false,
  sessionAttachments: [],
  pagination: new Pagination(),
  status: RequestStatus.idle,
  error: "",
};

export const fetchSessionAttachment = createAsyncThunk<ResponseModel, any>(
  "sessionAttachment/getSessionAttachment",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.getSessionAttachment(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const postSessionAttachment = createAsyncThunk<ResponseModel, any>(
  "sessionAttachment/postSessionAttachment",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.addSessionAttachment(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const deleteSessionAttachment = createAsyncThunk<ResponseModel, any>(
  "sessionAttachment/deleteSessionAttachment",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.deleteSessionAttachment(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
const sessionAttachmentSlice = createSlice({
  name: "sessionAttachment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSessionAttachment.fulfilled, (state, action) => {
        state.loading = false;
        state.status = RequestStatus.succeeded;
        state.sessionAttachments = action.payload
          ?.result as SessionAttachmentModel[];
        state.pagination.pageIndex = action.payload?.pageIndex;
        state.pagination.pageSize = action.payload?.pageSize;
        state.pagination.totalItems = action.payload?.totalItems;
        state.pagination.totalPages = action.payload?.totalPages;
      })
      .addCase(fetchSessionAttachment.pending, handlePending)
      .addCase(fetchSessionAttachment.rejected, handleRejected);
  },
});

const handlePending = (state: SessionAttachmentState) => {
  state.status = RequestStatus.loading;
  state.loading = true;
};

const handleRejected = (state: SessionAttachmentState, action: any) => {
  state.status = RequestStatus.failed;
  state.loading = false;
  state.error = action.error.message ?? "An error occurred";
};

export default sessionAttachmentSlice.reducer;
