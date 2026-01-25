import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { LegalConsume } from "@4eplatform/shared/apis/legal";
import { SessionNoteDetailsModel } from "../models/SessionNoteDetailsModel";

interface SessionNoteState {
  sessionNote: SessionNoteDetailsModel;
}

const initialState: SessionNoteState = {
  sessionNote: new SessionNoteDetailsModel(),
};

export const fetchSessionNoteById = createAsyncThunk<ResponseModel, any>(
  "sessionNote/fetchSessionNoteById",
  async (id, thunkApi) => {
    try {
      const response = await LegalConsume.getSessionNoteById(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const postSessionNote = createAsyncThunk<ResponseModel, any>(
  "sessionNote/postSessionNote",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.addSessionNote(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const putSessionNote = createAsyncThunk<ResponseModel, any>(
  "sessionNote/putSessionNote",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.editSessionNote(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const deleteSessionNote = createAsyncThunk<ResponseModel, any>(
  "sessionNote/deleteSessionNote",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.deleteSessionNote(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
const sessionNoteSlice = createSlice({
  name: "sessionNote",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSessionNoteById.fulfilled, (state, action) => {
      state.sessionNote = action.payload?.result as SessionNoteDetailsModel;
    });
  },
});

export default sessionNoteSlice.reducer;
