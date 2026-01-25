import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { LegalConsume } from "@4eplatform/shared/apis/legal";
import { RequestStatus } from "@4eplatform/shared/enums/enums";

interface JudgementRequirementsState {
    status: RequestStatus;
    error: string | null;
}

const initialState: JudgementRequirementsState = {
    status: RequestStatus.idle,
    error: "",
};


export const deletejudgementRequirements = createAsyncThunk<ResponseModel, any>(
  "judgementRequirement/deleteSessionAssign",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.deletejudgementRequirements(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
const judgementRequirementsSlice = createSlice({
  name: "judgementRequirement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
          .addCase(deletejudgementRequirements.fulfilled, handleFulfilled)
          .addCase(deletejudgementRequirements.pending, handlePending)
          .addCase(deletejudgementRequirements.rejected, handleRejected);
  },
});

const handleFulfilled = (state: JudgementRequirementsState) => {
  state.status = RequestStatus.succeeded;
};

const handlePending = (state: JudgementRequirementsState) => {
  state.status = RequestStatus.loading;
};

const handleRejected = (state: JudgementRequirementsState, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "AnErrorOccurred";
};
export default judgementRequirementsSlice.reducer;
