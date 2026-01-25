import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { LK_ClassificationTypeElibraryConsume } from "@4eplatform/shared/apis/LK_ClassificationTypeElibrary";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { LK_ClassificationTypeElibrary } from "../models/LK_ClassificationTypeElibrary";

interface ELibraryState {
  loading: boolean;
  pagination: Pagination;
  libraries: LK_ClassificationTypeElibrary[];
  status: RequestStatus;
  error: string | null;
}

const initialState: ELibraryState = {
  loading: false,
  libraries: [],
  pagination: new Pagination(),
  status: RequestStatus.idle,
  error: "",
};

export const fetchAllLK_ClassificationTypeElibrary = createAsyncThunk<ResponseModel, object>(
  "eLibrary/fetchAllLkAttachmentSources ",
  async (params = {}, thunkApi) => {
    try {
      const response = await LK_ClassificationTypeElibraryConsume.getAllLK_ClassificationTypeElibrary();
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const LK_ClassificationTypeElibrarySlice = createSlice({
  name: "LK_ClassificationTypeElibrary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLK_ClassificationTypeElibrary.fulfilled, (state, action) => {
        state.loading = false;
        state.status = RequestStatus.succeeded;
        state.libraries = action.payload?.result as LK_ClassificationTypeElibrary[];
        state.pagination.pageIndex = action.payload?.pageIndex;
        state.pagination.pageSize = action.payload?.pageSize;
        state.pagination.totalItems = action.payload?.totalItems;
        state.pagination.totalPages = action.payload?.totalPages;
      })
      .addCase(fetchAllLK_ClassificationTypeElibrary.pending, handlePending)
      .addCase(fetchAllLK_ClassificationTypeElibrary.rejected, handleRejected)
      
  },
});



const handlePending = (state: ELibraryState) => {
  state.status = RequestStatus.loading;
  state.loading = true;
};

const handleRejected = (state: ELibraryState, action: any) => {
  state.status = RequestStatus.failed;
  state.loading = false;
  state.error = action.error.message ?? "An error occurred";
};

export default LK_ClassificationTypeElibrarySlice.reducer;
