import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { LegalConsume } from "@4eplatform/shared/apis/legal";

interface judgementRefernceState {
  loading: boolean;
  status: RequestStatus;
  error: string | null;
}

const initialState: judgementRefernceState = {
  loading: false,
  status: RequestStatus.idle,
  error: "",
};

export const PostJudgementRefernce = createAsyncThunk<ResponseModel, any>(
  "judgementRefernce/postJudgmentGround",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.addJudgementReferance(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const judgementRefernceSlice = createSlice({
  name: "judgementRefernce",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PostJudgementRefernce.fulfilled, handleFulfilled)
      .addCase(PostJudgementRefernce.pending, handlePending)
      .addCase(PostJudgementRefernce.rejected, handleRejected)

  },
});

const handleFulfilled = (state: judgementRefernceState) => {
  state.status = RequestStatus.succeeded;
};

const handlePending = (state: judgementRefernceState) => {
  state.status = RequestStatus.loading;
};

const handleRejected = (state: judgementRefernceState, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "AnErrorOccurred";
};

export default judgementRefernceSlice.reducer;
