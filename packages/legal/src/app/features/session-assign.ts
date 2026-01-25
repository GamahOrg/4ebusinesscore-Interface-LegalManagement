import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { LegalConsume } from "@4eplatform/shared/apis/legal";

interface SessionAssignState {}

const initialState: SessionAssignState = {};

export const postSessionAssign = createAsyncThunk<ResponseModel, any>(
  "sessionAssign/postSessionAssign",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.addSessionAsign(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const deleteSessionAssign = createAsyncThunk<ResponseModel, any>(
  "sessionAssign/deleteSessionAssign",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.deleteSessionAsign(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
const sessionAssignSlice = createSlice({
  name: "sessionAssign",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default sessionAssignSlice.reducer;
