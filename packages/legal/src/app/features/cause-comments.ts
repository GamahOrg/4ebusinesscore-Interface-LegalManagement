import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { LegalConsume } from "@4eplatform/shared/apis/legal";
import { CauseCommentsModel } from "../models/CauseCommentsModel";


interface CauseCommentsState {
  loading: boolean;
  comments: CauseCommentsModel[];
  comment: CauseCommentsModel;
  pagination: Pagination;
  status: RequestStatus;
  error: string | null;
  loadingToCommentById:boolean;
  isConsultiveState:any;
}

const initialState: CauseCommentsState = {
  loading: false,
  comments: [],
  comment: new CauseCommentsModel(),
  pagination: new Pagination(),
  status: RequestStatus.idle,
  error: "",
  loadingToCommentById:false,
  isConsultiveState:{},
};

export const fetchAllCauseComments = createAsyncThunk<ResponseModel, any>(
  "CauseComments/fetchAllCauseComments",
  async (params = {}, thunkApi) => {
    try {
      const response = await LegalConsume.getCauseComments(params); 
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchCouseCommentById = createAsyncThunk<ResponseModel, any>(
  "CauseComments/fetchCouseCommentById",
  async (id, thunkApi) => {
    try {
      const response = await LegalConsume.getCauseCommentById(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const addCauseComments = createAsyncThunk<ResponseModel, any>(
  "CauseComments/addCauseComments",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.postCauseComment(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const editCauseComment = createAsyncThunk<ResponseModel, any>(
  "CauseComments/editCauseComment",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.editCauseComment(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteCauseComment = createAsyncThunk<ResponseModel, any>(
  "CauseComments/deleteCauseComment",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.deleteCauseComment(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchIsConsultative = createAsyncThunk<ResponseModel, any>(
  "CauseComments/fetchIsConsultative",
  async (param, thunkApi) => {
    try {
      const response = await LegalConsume.getIsConsultive(param); 
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const CauseCommentsSlice = createSlice({
  name: "CauseComments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCauseComments.fulfilled, (state, action) => {
        state.loading = false;
        state.status = RequestStatus.succeeded;
        state.comments = action?.payload?.result as CauseCommentsModel[];
        state.pagination.pageIndex = action?.payload?.pageIndex;
        state.pagination.pageSize = action?.payload?.pageSize;
        state.pagination.totalItems = action?.payload?.totalItems;
        state.pagination.totalPages = action?.payload?.totalPages;
      })
      .addCase(fetchAllCauseComments.pending, handlePending)
      .addCase(fetchAllCauseComments.rejected, handleRejected)
      .addCase(fetchCouseCommentById.fulfilled, (state, action) => {
        state.loadingToCommentById = false;
        state.status = RequestStatus.succeeded;
        state.comment = action?.payload?.result as CauseCommentsModel;
      })
      .addCase(fetchCouseCommentById.pending, handlePendingToCommentById)
      .addCase(fetchCouseCommentById.rejected, handleRejectedToCommentById)

      .addCase(addCauseComments.pending, handlePending)
      .addCase(addCauseComments.fulfilled, handleFulfilled)
      .addCase(addCauseComments.rejected, handleRejected)
      .addCase(editCauseComment.pending, handlePending)
      .addCase(editCauseComment.fulfilled, handleFulfilled)
      .addCase(editCauseComment.rejected, handleRejected)
      .addCase(deleteCauseComment.pending, handlePending)
      .addCase(deleteCauseComment.fulfilled, handleFulfilled)
      .addCase(deleteCauseComment.rejected, handleRejected)
      .addCase(fetchIsConsultative.fulfilled, (state, action) => {
        state.loading = false;
        state.status = RequestStatus.succeeded;
        state.isConsultiveState = action?.payload?.result as any;
      })
      .addCase(fetchIsConsultative.pending, handlePending)
      .addCase(fetchIsConsultative.rejected, handleRejected)
  },
});

const handlePending = (state: CauseCommentsState) => {
  state.status = RequestStatus.loading;
  state.loading = true;
};
const handlePendingToCommentById = (state: CauseCommentsState) => {
  state.status = RequestStatus.loading;
  state.loadingToCommentById = true;
};
const handleFulfilled = (state: CauseCommentsState) => {
  state.status = RequestStatus.succeeded;
};
const handleRejected = (state: CauseCommentsState, action: any) => {
  state.status = RequestStatus.failed;
  state.loading = false;
  state.error = action.error.message ?? "AnErrorOccurred";
};
const handleRejectedToCommentById = (state: CauseCommentsState, action: any) => {
  state.status = RequestStatus.failed;
  state.loadingToCommentById = false;
  state.error = action.error.message ?? "AnErrorOccurred";
};
export default CauseCommentsSlice.reducer;
