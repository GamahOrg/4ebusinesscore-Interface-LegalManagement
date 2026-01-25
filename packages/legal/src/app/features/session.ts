import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ActiveSessionModel, SessionModel } from "../models/SessionModel";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LegalConsume } from "@4eplatform/shared/apis/legal";
import { LegalAggConsume } from "@4eplatform/shared/apis/legal_agg";
import { SessionNoteModel } from "../models/SessionNoteModel";

interface SessionState {
  loading: boolean;
  loadingForSessionNotes: boolean;
  sessionById: SessionModel;
  sessionByIdParams: SessionModel;
  activeSession: ActiveSessionModel;
  sessionNotes: SessionNoteModel[];
  sessions: SessionModel[];
  sessionsNew: any[];
  pagination: Pagination;
  status: RequestStatus;
  statuses: {
    sessionByIdStatus: RequestStatus;
    sessionByIdParamsStatus: RequestStatus;
  };
  error: string | null;
}

const initialState: SessionState = {
  loading: false,
  loadingForSessionNotes: false,
  sessionById: new SessionModel(),
  sessionByIdParams: new SessionModel(),
  activeSession: new ActiveSessionModel(),
  sessionNotes: [],
  sessions: [],
  sessionsNew: [],
  pagination: new Pagination(),
  status: RequestStatus.idle,
  statuses: {
    sessionByIdStatus: RequestStatus.idle,
    sessionByIdParamsStatus: RequestStatus.idle,
  },
  error: "",
};

export const fetchAllSessions = createAsyncThunk<ResponseModel, any>(
  "sessions/fetchAllSessions",
  async (params = {}, thunkApi) => {
    try {
      const response = await LegalConsume.getAllSessions(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchAllSessionsNew = createAsyncThunk<ResponseModel, any>(
  "sessions/fetchAllSessionsNew",
  async (params = {}, thunkApi) => {
    try {
      const response = await LegalConsume.getAllSessionsNew(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const AddSession = createAsyncThunk<ResponseModel, any>(
  "session/AddSession",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.addSession(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const UpdateSession = createAsyncThunk<ResponseModel, any>(
  "session/UpdateSession",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.editSession(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const DeleteSession = createAsyncThunk<ResponseModel, any>(
  "session/DeleteSession",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.deleteSession(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchSessionById = createAsyncThunk<ResponseModel, any>(
  "session/fetchSessionById",
  async (id, thunkApi) => {
    try {
      const response = await LegalAggConsume.getSessionById(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchSessionByIdParams = createAsyncThunk<ResponseModel, any>(
  "session/fetchSessionByIdParams",
  async (data, thunkApi) => {
    try {
      const response = await LegalAggConsume.getSessionByIdParams(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchActiveSession = createAsyncThunk<ResponseModel, string>(
  "session/fetchActiveSession",
  async (id, thunkApi) => {
    try {
      const response = await LegalConsume.getActiveSession(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchAllSessionNotes = createAsyncThunk<ResponseModel, any>(
  "session/fetchAllSessionNotes",
  async (params = {}, thunkApi) => {
    try {
      const response = await LegalAggConsume.getAllSessionNotes(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const sessionSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSessions.fulfilled, (state, action) => {
      state.loading = false;
      state.status = RequestStatus.succeeded;
      state.sessions = action.payload?.result as SessionModel[];
      state.pagination.pageIndex = action.payload?.pageIndex;
      state.pagination.pageSize = action.payload?.pageSize;
      state.pagination.totalItems = action.payload?.totalItems;
      state.pagination.totalPages = action.payload?.totalPages;
    });
    builder.addCase(fetchAllSessions.pending, handlePending);
    builder.addCase(fetchAllSessions.rejected, handleRejected);
    builder.addCase(fetchAllSessionsNew.fulfilled, (state, action) => {
      state.loading = false;
      state.status = RequestStatus.succeeded;
      state.sessionsNew = action.payload?.result as any[];
      state.pagination.pageIndex = action.payload?.pageIndex;
      state.pagination.pageSize = action.payload?.pageSize;
      state.pagination.totalItems = action.payload?.totalItems;
      state.pagination.totalPages = action.payload?.totalPages;
    });
    builder.addCase(fetchAllSessionsNew.pending, handlePending);
    builder.addCase(fetchAllSessionsNew.rejected, handleRejected);
    builder.addCase(fetchSessionById.fulfilled, (state, action) => {
      state.loading = false;
      state.statuses.sessionByIdStatus = RequestStatus.succeeded;
      state.sessionById = action.payload?.result as SessionModel;
    });
    builder.addCase(fetchSessionById.pending, handlePending);
    builder.addCase(fetchSessionById.rejected, handleRejected);
    builder.addCase(fetchSessionByIdParams.fulfilled, (state, action) => {
      state.loading = false;
      state.statuses.sessionByIdParamsStatus = RequestStatus.succeeded;
      state.sessionByIdParams = action.payload?.result as SessionModel;
    });
    builder.addCase(fetchSessionByIdParams.pending, handlePending);
    builder.addCase(fetchSessionByIdParams.rejected, handleRejected);


    builder.addCase(fetchActiveSession.fulfilled, (state, action) => {
      state.status = RequestStatus.succeeded;
      state.activeSession = action.payload?.result as ActiveSessionModel;
    });
    builder.addCase(fetchActiveSession.pending, handlePending);
    builder.addCase(fetchActiveSession.rejected, handleRejected);
    builder.addCase(fetchAllSessionNotes.fulfilled, (state, action) => {
      state.loadingForSessionNotes = false;
      state.status = RequestStatus.succeeded;
      state.sessionNotes = action.payload?.result as SessionNoteModel[];
      state.pagination.pageIndex = action.payload?.pageIndex;
      state.pagination.pageSize = action.payload?.pageSize;
      state.pagination.totalItems = action.payload?.totalItems;
      state.pagination.totalPages = action.payload?.totalPages;
    });
    builder.addCase(fetchAllSessionNotes.pending, (state, action) => {
      state.status = RequestStatus.idle;
      state.loadingForSessionNotes = true;
    });
    builder.addCase(fetchAllSessionNotes.rejected, (state, action) => {
      state.status = RequestStatus.failed;
      state.loadingForSessionNotes = false;
    });
    builder.addCase(AddSession.pending, handlePending);
    builder.addCase(AddSession.fulfilled, handleFulfilled);
    builder.addCase(AddSession.rejected, handleRejected);
    builder.addCase(UpdateSession.pending, handlePending);
    builder.addCase(UpdateSession.fulfilled, handleFulfilled);
    builder.addCase(UpdateSession.rejected, handleRejected);
    builder.addCase(DeleteSession.pending, handlePending);
    builder.addCase(DeleteSession.fulfilled, handleFulfilled);
    builder.addCase(DeleteSession.rejected, handleRejected);
  },
});

const handlePending = (state: SessionState) => {
  state.loading = true;
  state.status = RequestStatus.loading;
};

const handleRejected = (state: SessionState, action: any) => {
  state.status = RequestStatus.failed;
  state.loading = false;
  state.error = action.error.message ?? "An error occurred";
};

const handleFulfilled = (state: SessionState) => {
  state.status = RequestStatus.succeeded;
};

export default sessionSlice.reducer;
