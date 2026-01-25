import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { CauseStagesModel } from "../models/CauseStagesModel";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { LegalConsume } from "@4eplatform/shared/apis/legal";
import { LegalAggConsume } from "@4eplatform/shared/apis/legal_agg";
import { CauseStageAttachment } from "../models/NewCauseStageAttachmentModel";

interface CauseStagesState {
  loading: boolean;
  loadingForCauseStages:boolean;
  loadingForCauseStageById: boolean;
  causeStages: CauseStagesModel[];
  causeStageAttachments:CauseStageAttachment[];
  causeStageById: CauseStagesModel;
  causeStageNames: any;
  allLKStageIds: any;
  pagination: Pagination;
  status: RequestStatus;
  error: string | null;
}

const initialState: CauseStagesState = {
  loading: false,
  loadingForCauseStages:false,
  loadingForCauseStageById: false,
  causeStages: [],
  causeStageById: new CauseStagesModel(),
  causeStageAttachments:[],
  causeStageNames: [],
  allLKStageIds: [],
  pagination: new Pagination(),
  status: RequestStatus.idle,
  error: "",
};

export const addChangeCauseStage = createAsyncThunk<ResponseModel, any>(
  "causeStages/addChangeCauseStage",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.changeCauseStage(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const changeRedirectorStage = createAsyncThunk<ResponseModel, any>(
  "causeStages/changeRedirectorStage",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.changeRedirectorStage(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const changeUserCauseStage = createAsyncThunk<ResponseModel, any>(
  "causeStages/changeUserCauseStage",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.changeUserCauseStage(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchAllCauseStages = createAsyncThunk<ResponseModel, any>(
  "causeStages/fetchAllCauseStages",
  async (params = {}, thunkApi) => {
    try {
      const response = await LegalAggConsume.getAllCauseStages(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchCauseStageById = createAsyncThunk<ResponseModel, any>(
  "causeStages/fetchCauseStageById",
  async (data, thunkApi) => {
    try {
      const response = await LegalAggConsume.getCauseStageById(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchCauseStageNameByCauseId = createAsyncThunk<
  ResponseModel,
  any
>("causeStages/fetchCauseStageNamesByCauseId", async (data, thunkApi) => {
  try {
    const response = await LegalConsume.getCauseStageName(data);
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const fetchAllLKStageIdsForChangeByCauseId = createAsyncThunk<
  ResponseModel,
  any
>(
  "causeStages/fetchAllLKStageIdsForChangeByCauseId",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.getAllLK_StageIdsForChange(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchAllCauseStageAttachments = createAsyncThunk<ResponseModel, any>(
  "causeStages/fetchAllCauseStageAttachments",
  async (params={}, thunkApi) => {
    try {
      const response = await LegalAggConsume.getAllCauseStageAttachments(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const deleteCauseStageAttachment = createAsyncThunk<ResponseModel, any>(
  "causeStages/deleteCauseStageAttachment",
  async (params = {}, thunkApi) => {
    try {
      const response = await LegalConsume.deleteCauseStageAttachment(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
const causeStagesSlice = createSlice({
  name: "causeStages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCauseStages.fulfilled, (state, action) => {
        state.loadingForCauseStages = false;
        state.status = RequestStatus.succeeded;
        state.causeStages = action.payload?.result as CauseStagesModel[];
        state.pagination.pageIndex = action.payload?.pageIndex;
        state.pagination.pageSize = action.payload?.pageSize;
        state.pagination.totalItems = action.payload?.totalItems;
        state.pagination.totalPages = action.payload?.totalPages;
      })
      .addCase(fetchAllCauseStages.pending, (state, action) => {
        state.loadingForCauseStages = true;
        state.status = RequestStatus.idle;
      })
      .addCase(fetchAllCauseStages.rejected, (state, action) => {
        state.loadingForCauseStages = false;
        state.status = RequestStatus.failed;
      })
      .addCase(fetchCauseStageById.fulfilled, (state, action) => {
        state.loadingForCauseStageById= false;
        state.status = RequestStatus.succeeded;
        state.causeStageById = action.payload?.result as CauseStagesModel;
      })
      .addCase(fetchCauseStageById.pending, (state, action) => {
        state.loadingForCauseStageById = true;
        state.status = RequestStatus.idle;
      })
      .addCase(fetchCauseStageById.rejected, (state, action) => {
        state.loadingForCauseStageById = false;
        state.status = RequestStatus.failed;
      })
      .addCase(fetchAllLKStageIdsForChangeByCauseId.pending, handlePending)
      .addCase(
        fetchAllLKStageIdsForChangeByCauseId.fulfilled,
        (state, action) => {
          state.status = RequestStatus.succeeded;
          state.allLKStageIds = action.payload?.result as any;
        }
      )
      .addCase(fetchAllLKStageIdsForChangeByCauseId.rejected, handleRejected)
      .addCase(fetchCauseStageNameByCauseId.pending, handlePending)
      .addCase(fetchCauseStageNameByCauseId.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.causeStageNames = action.payload?.result as any;
      })
      .addCase(fetchCauseStageNameByCauseId.rejected, handleRejected)
      .addCase(addChangeCauseStage.pending, handlePending)
      .addCase(addChangeCauseStage.fulfilled, handleFulfilled)
      .addCase(addChangeCauseStage.rejected, handleRejected)
      .addCase(changeRedirectorStage.pending, handlePending)
      .addCase(changeRedirectorStage.fulfilled, handleFulfilled)
      .addCase(changeRedirectorStage.rejected, handleRejected)
      .addCase(changeUserCauseStage.pending, handlePending)
      .addCase(changeUserCauseStage.fulfilled, handleFulfilled)
      .addCase(changeUserCauseStage.rejected, handleRejected)
      .addCase(deleteCauseStageAttachment.pending, handlePending)
      .addCase(deleteCauseStageAttachment.fulfilled, handleFulfilled)
      .addCase(deleteCauseStageAttachment.rejected, handleRejected)
      .addCase(fetchAllCauseStageAttachments.fulfilled, (state, action) => {
        state.causeStageAttachments = action.payload?.result as CauseStageAttachment[];
      });
  },
});

const handlePending = (state: CauseStagesState) => {
  state.status = RequestStatus.loading;
  state.loading = true;
};
const handleFulfilled = (state: CauseStagesState) => {
  state.status = RequestStatus.succeeded;
};
const handleRejected = (state: CauseStagesState, action: any) => {
  state.status = RequestStatus.failed;
  state.loading = false;
  state.error = action.error.message ?? "AnErrorOccurred";
};

export default causeStagesSlice.reducer;
