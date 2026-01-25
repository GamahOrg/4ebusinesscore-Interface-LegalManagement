import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { LegalAggConsume } from "@4eplatform/shared/apis/legal_agg";
import { CauseModel } from "../models/CauseModel";
import { CauseAttachmentModel } from "../models/CauseAttachmentModel";
import { CauseHistoryModel } from "../models/CauseHistoryModel";
import { LegalConsume } from "@4eplatform/shared/apis/legal";

interface CauseState {
  loading:boolean;
  loadingForArchive: boolean;
  loadingForCauses: boolean;
  loadingForCause: boolean;
  causes: CauseModel[];
  causeById: CauseModel;
  causeAttachments: CauseAttachmentModel;
  causeHistories: CauseHistoryModel[];
  causesPagination: Pagination;
  status: RequestStatus;
  error: string | null;
}

const initialState: CauseState = {
  loading:false,
  loadingForArchive: false,
  loadingForCauses: false,
  loadingForCause: false,
  causes: [],
  causeById: new CauseModel(),
  causeAttachments: {
    lK_Stage: null,
    causeStageAttachment: [],
    sessionAttachments: []
  },
  causeHistories: [],
  causesPagination: new Pagination(),
  status: RequestStatus.idle,
  error: "",
};

export const fetchAllCauses = createAsyncThunk<ResponseModel, any>(
  "cause/fetchAllCauses",
  async (params = {}, thunkApi) => {
    try {
      const response = await LegalAggConsume.getCause(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchCauseById = createAsyncThunk<ResponseModel, string>(
  "cause/fetchCauseById",
  async (causeId, thunkApi) => {
    try {
      const response = await LegalAggConsume.getCauseById( causeId );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchCauseAttachments = createAsyncThunk<ResponseModel, any>(
  "cause/fetchCauseAttachments",
  async (params={}, thunkApi) => {
    try {
      const response = await LegalAggConsume.getCauseAttachment(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchCauseHistories = createAsyncThunk<ResponseModel, any>(
  "cause/fetchCauseHistories",
  async (params={}, thunkApi) => {
    try {
      const response = await LegalAggConsume.getCauseHistories(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const deleteCauseAssignment = createAsyncThunk<ResponseModel, any>(
  "cause/deleteCauseAssign",
  async (params = {}, thunkApi) => {
    try {
      const response = await LegalConsume.deleteCauseAssign(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const causeSlice = createSlice({
  name: "cause",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCauses.fulfilled, (state, action) => {
        state.loading = false;
        state.status = RequestStatus.succeeded;
        state.causes = action.payload?.result as CauseModel[];
        state.causesPagination.pageIndex = action.payload?.pageIndex;
        state.causesPagination.pageSize = action.payload?.pageSize;
        state.causesPagination.totalItems = action.payload?.totalItems;
        state.causesPagination.totalPages = action.payload?.totalPages;
        state.loadingForCauses=false
      })
      .addCase(fetchAllCauses.pending, (state,action)=>{
        state.status = RequestStatus.idle;
        state.loadingForCauses=true;
      })
      .addCase(fetchAllCauses.rejected, (state,action)=>{
        state.status = RequestStatus.failed;
        state.loadingForCauses=false;
      })

      .addCase(fetchCauseById.fulfilled, (state, action) => {
        state.loadingForCause = false;
        state.status = RequestStatus.succeeded;
        state.causeById = action.payload?.result as CauseModel;
      })
      .addCase(fetchCauseById.pending, (state, action) => {
        state.loadingForCause = true;
        state.status = RequestStatus.idle;
      })
      .addCase(fetchCauseById.rejected,(state, action) => {
        state.loadingForCause = false;
        state.status = RequestStatus.failed;
      })

      .addCase(fetchCauseAttachments.fulfilled, (state, action) => {
        state.loading = false;
        state.status = RequestStatus.succeeded;
        state.causeAttachments = action.payload?.result as CauseAttachmentModel;
      })
      .addCase(fetchCauseAttachments.pending, handlePending)
      .addCase(fetchCauseAttachments.rejected, handleRejected)

      .addCase(fetchCauseHistories.fulfilled, (state, action) => {
        state.loadingForArchive = false;
        state.status = RequestStatus.succeeded;
        state.causeHistories = action.payload?.result as CauseHistoryModel[];
      })
      .addCase(fetchCauseHistories.pending, (state, action) => {
        state.loadingForArchive = true;
        state.status = RequestStatus.idle;
      })
      .addCase(fetchCauseHistories.rejected, (state, action) => {
        state.loadingForArchive = false;
        state.status = RequestStatus.failed;
      })
      .addCase(deleteCauseAssignment.pending, handlePending)
      .addCase(deleteCauseAssignment.fulfilled, handleFulfilled)
      .addCase(deleteCauseAssignment.rejected, handleRejected)
  },
});

const handleFulfilled = (state: CauseState) => {
  state.status = RequestStatus.succeeded;
};
const handlePending = (state: CauseState) => {
  state.status = RequestStatus.loading;
  state.loading = true;
};

const handleRejected = (state: CauseState, action: any) => {
  state.status = RequestStatus.failed;
  state.loading = false;
  state.error = action.error.message ?? "AnErrorOccurred";
};

export default causeSlice.reducer;
