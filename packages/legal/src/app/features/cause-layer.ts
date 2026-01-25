import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { LegalConsume } from "@4eplatform/shared/apis/legal";
import { RequestStatus } from "@4eplatform/shared/enums/enums";

const initialState = {};

export const postCauseLawyer = createAsyncThunk<ResponseModel, any>(
  "causeLawyer/postCauseLawyer",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.postCauseLawyer(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const putCauseLawyer = createAsyncThunk<ResponseModel, any>(
  "causeLawyer/putCauseLawyer",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.putCauseLawyer(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const deleteCauseLawyer = createAsyncThunk<ResponseModel, any>(
  "causeLawyer/deleteCauseLawyer",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.deleteCauseLawyer(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const causeLawyerSlice = createSlice({
  name: "causeLawyer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(postCauseLawyer.pending, handlePending)
    .addCase(postCauseLawyer.fulfilled, handleFulfilled)
    .addCase(postCauseLawyer.rejected, handleRejected)
    .addCase(putCauseLawyer.pending, handlePending)
    .addCase(putCauseLawyer.fulfilled, handleFulfilled)
    .addCase(putCauseLawyer.rejected, handleRejected)
    .addCase(deleteCauseLawyer.pending, handlePending)
    .addCase(deleteCauseLawyer.fulfilled, handleFulfilled)
    .addCase(deleteCauseLawyer.rejected, handleRejected)
  },
});


const handlePending = (state: any) => {
  state.status = RequestStatus.loading;
  state.loading = true;
};
const handleFulfilled = (state: any) => {
  state.status = RequestStatus.succeeded;
};
const handleRejected = (state: any, action: any) => {
  state.status = RequestStatus.failed;
  state.loading = false;
  state.error = action.error.message ?? "AnErrorOccurred";
};

export default causeLawyerSlice.reducer;
