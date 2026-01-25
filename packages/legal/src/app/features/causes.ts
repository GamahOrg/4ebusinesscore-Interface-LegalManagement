import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { LegalConsume } from "@4eplatform/shared/apis/legal";
import { CauseAttachmentModel } from "../models/CauseAttachmentModel";
import { CauseTitleModel } from "../models/CauseTitleModel";
import { CauseHistoryModel } from "../models/CauseHistoryModel";
import { RequestStatus } from "@4eplatform/shared/enums/enums";

interface CausesState {
  causeHistory: CauseHistoryModel;
  causeAttachments: CauseAttachmentModel;
  causeTitles: CauseTitleModel[];
  loading: boolean;
  error: string | null;
  status: RequestStatus;
}

const initialState: CausesState = {
  causeHistory: new CauseHistoryModel(
    "", // id
    "", // createdBy
    "", // createdOn
    "", // recordId
    "", // tableName
    "", // action
    "", // oldValue
    "", // newValue
    ""  // fullName
  ),
  causeAttachments: new CauseAttachmentModel(),
  causeTitles: [],
  loading: false,
  error: "",
  status: RequestStatus.idle,
};

export const fetchCauseAttachement = createAsyncThunk<ResponseModel, any>(
  "causes/fetchCauseAttachement",
  async (params = {}, thunkApi) => {
    try {
      const response = await LegalConsume.getCauseAttachement(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchCauseTitles = createAsyncThunk<ResponseModel, any>(
  "causes/fetchCauseTitles",
  async (params = {}, thunkApi) => {
    try {
      const response = await LegalConsume.getCauseTitles(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchCauseHistoryByCauseId = createAsyncThunk<ResponseModel, any>(
  "causes/fetchCauseHistoryByCauseId",
  async (params = {}, thunkApi) => {
    try {
      const response = await LegalConsume.getCauseHistoryByCauseId(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const postCause = createAsyncThunk<ResponseModel, any>(
  "causes/postCause",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.postCause(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const addCauseAssignees = createAsyncThunk<ResponseModel, any>(
  "causes/postCauseAssignees",
  async (payload, thunkApi) => {
    try {
      const response = await LegalConsume.postCauseAssignees(payload);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const postAlternativeLawyer = createAsyncThunk<ResponseModel, any>(
  "causes/postAlternativeLawyer",
  async (payload, thunkApi) => {
    try {
      const response = await (LegalConsume as any).PostAlternativeLawyer(payload);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const finishCause = createAsyncThunk<ResponseModel, any>(
  "causes/finishCause",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.finishCause(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const putCause = createAsyncThunk<ResponseModel, any>(
  "causes/putCause",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.putCause(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const deleteCause = createAsyncThunk<ResponseModel, any>(
  "causes/deleteCause",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.deleteCause(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const causesSlice = createSlice({
  name: "causes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCauseAttachement.fulfilled, (state, action) => {
        state.causeAttachments = action.payload?.result as CauseAttachmentModel;
      })

      .addCase(fetchCauseTitles.fulfilled, (state, action) => {
        state.causeTitles = action.payload?.result as CauseTitleModel[];
      })
      .addCase(fetchCauseHistoryByCauseId.fulfilled, (state, action) => {
        state.causeHistory = action.payload?.result as CauseHistoryModel;
      })
      .addCase(postCause.fulfilled, handleFulfilled)
      .addCase(postCause.pending, handlePending)
      .addCase(postCause.rejected, handleRejected)
      .addCase(putCause.fulfilled, handleFulfilled)
      .addCase(putCause.pending, handlePending)
      .addCase(putCause.rejected, handleRejected)
  },
});

const handleFulfilled = (state: CausesState) => {
  state.status = RequestStatus.succeeded;
  state.loading = false;
};

const handlePending = (state: CausesState) => {
  state.status = RequestStatus.loading;
  state.loading = true;
};

const handleRejected = (state: CausesState, action: any) => {
  state.status = RequestStatus.failed;
  state.loading = false;
  state.error = action.error.message ?? "An error occurred";
};
export default causesSlice.reducer;
