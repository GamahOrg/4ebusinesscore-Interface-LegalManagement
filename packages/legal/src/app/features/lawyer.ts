import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { LegalAggConsume } from "@4eplatform/shared/apis/legal_agg";
import { LawyerModel } from "../models/LawyerModel";
import { LegalConsume } from "@4eplatform/shared/apis/legal";

interface LawyerState {
  loading: boolean;
  loadingForLawyers:boolean;
  lawyers: LawyerModel[];
  lawyerById: LawyerModel;
  lawyerNames: { id: string; lawyerName: string }[];
  causeForLitigant: any;
  lawyersPagination: Pagination;
  lawyerNamesPagination: Pagination;
  status: RequestStatus;
  error: string | null;
}

const initialState: LawyerState = {
  loading: false,
  loadingForLawyers:false,
  lawyers: [],
  lawyerById: new LawyerModel(),
  lawyerNames: [],
  causeForLitigant: [],
  lawyersPagination: new Pagination(),
  lawyerNamesPagination: new Pagination(),
  status: RequestStatus.idle,
  error: "",
};

export const fetchAllLawyers = createAsyncThunk<ResponseModel, any>(
  "lawyer/fetchAllLawyers",
  async (params = {}, thunkApi) => {
    try {
      const response = await LegalAggConsume.getAllLawyers(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchCausesForLitigant = createAsyncThunk<ResponseModel, number>(
  "lawyer/fetchCausesForLitigant",
  async (id, thunkApi) => {
    try {
      const response = await LegalConsume.getCausesForLitigant(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchAllLawyerNames = createAsyncThunk<ResponseModel, void>(
  "lawyer/fetchAllLawyerNames",
  async (_, thunkApi) => {
    try {
      const response = await LegalAggConsume.getAllLawyersNames();
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchLawyerById = createAsyncThunk<ResponseModel, number>(
  "lawyer/fetchLawyerById",
  async (id, thunkApi) => {
    try {
      const response = await LegalAggConsume.getLawyerById({ id });
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const lawyerSlice = createSlice({
  name: "lawyer",
  initialState,
  reducers: {
    updateLawyerCauseCount: (state, action) => {
      const { lawyerId, increment } = action.payload;
      const lawyer = state.lawyers.find(l => l.userId === lawyerId);
      if (lawyer) {
        lawyer.causeCount = Math.max(0, lawyer.causeCount + increment);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLawyers.fulfilled, (state, action) => {
        state.loadingForLawyers = false;
        state.status = RequestStatus.succeeded;
        state.lawyers = action.payload?.result as LawyerModel[];
        state.lawyersPagination.pageIndex = action.payload?.pageIndex;
        state.lawyersPagination.pageSize = action.payload?.pageSize;
        state.lawyersPagination.totalItems = action.payload?.totalItems;
        state.lawyersPagination.totalPages = action.payload?.totalPages;
      })
      .addCase(fetchAllLawyers.pending, (state, action)=>{
        state.loadingForLawyers=true
        state.status = RequestStatus.idle;
      })
      .addCase(fetchAllLawyers.rejected, (state, action)=>{
        state.loadingForLawyers=false
        state.status = RequestStatus.failed;
      })

      .addCase(fetchAllLawyerNames.fulfilled, (state, action) => {
        state.loading = false;
        state.status = RequestStatus.succeeded;
        state.lawyerNames = action.payload?.result as { id: string; lawyerName: string }[];
        state.lawyerNamesPagination.pageIndex = action.payload?.pageIndex;
        state.lawyerNamesPagination.pageSize = action.payload?.pageSize;
        state.lawyerNamesPagination.totalItems = action.payload?.totalItems;
        state.lawyerNamesPagination.totalPages = action.payload?.totalPages;
      })
      .addCase(fetchAllLawyerNames.pending, handlePending)
      .addCase(fetchAllLawyerNames.rejected, handleRejected)

      .addCase(fetchLawyerById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = RequestStatus.succeeded;
        state.lawyerById = action.payload?.result as LawyerModel;
      })
      .addCase(fetchLawyerById.pending, handlePending)
      .addCase(fetchLawyerById.rejected, handleRejected)

      .addCase(fetchCausesForLitigant.fulfilled, (state, action) => {
        state.loading = false;
        state.status = RequestStatus.succeeded;
        state.causeForLitigant = action.payload?.result as any;
      })
      .addCase(fetchCausesForLitigant.pending, handlePending)
      .addCase(fetchCausesForLitigant.rejected, handleRejected)
  },
});

const handlePending = (state: LawyerState) => {
  state.status = RequestStatus.loading;
  state.loading = true;
};

const handleRejected = (state: LawyerState, action: any) => {
  state.status = RequestStatus.failed;
  state.loading = false;
  state.error = action.error.message ?? "AnErrorOccurred";
};

export const { updateLawyerCauseCount } = lawyerSlice.actions;
export default lawyerSlice.reducer;
