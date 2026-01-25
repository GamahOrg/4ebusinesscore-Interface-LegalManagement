import { LegalConsume } from "@4eplatform/shared/apis/legal";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IdentityTypes, LitigantConsume } from "../models/LitigantConsumeModel";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { Pagination } from "@4eplatform/shared/models/Pagination";
interface PaginationState {
  loadingForClients:boolean;
  litigantConsume: LitigantConsume;
  pagination: Pagination;
  IdentityTypes: IdentityTypes[];
  error: string;
  counter: number;
  litigantById: any;
}

const initialState: PaginationState = {
  loadingForClients:false,
  litigantConsume: new LitigantConsume(),
  pagination: new Pagination(),
  IdentityTypes: [],
  error: "",
  counter: 0,
  litigantById: "",
};
export const getLitigantConsume = createAsyncThunk<ResponseModel, any>(
  "litigantConsume/getLitigantConsume",
  async function (params: void, thunkAPI) {
    let response = await LegalConsume.getAllLitigant(params);
    return response;
  }
);

export const getAllLK_IdentityTypes = createAsyncThunk(
  "litigantConsume/getAllLK_IdentityTypes",
  async function (params: void, thunkAPI) {
    let response = await LegalConsume.getAllLKIdentityTypes();
    return response;
  }
);

export const addLitigantConsume = createAsyncThunk<ResponseModel, any>(
  "litigantConsume/addLitigantConsume",
  async function (data, thunkAPI) {
    try {
      let response = await LegalConsume.addLitigant(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

export const putLitigant = createAsyncThunk<ResponseModel, any>(
  "litigantConsume/putLitigant",
  async (params: {}, thunkApi) => {
    try {
      const response = await LegalConsume.editLitigant(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchLitigantId = createAsyncThunk<ResponseModel, any>(
  "litigantConsume/fetchLitigantId",
  async (id, thunkApi) => {
    try {
      const response = await LegalConsume.getLitigantById(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const removeLitigantId = createAsyncThunk<ResponseModel, any>(
  "litigantConsume/removeLitigantId",
  async (data, thunkApi) => {
    try {
      const response = await LegalConsume.deleteLitigant(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

let litigantConsumeSlice = createSlice({
  name: "litigantConsume",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLitigantConsume.fulfilled, (state, action) => {
        state.litigantConsume = action.payload?.result as LitigantConsume;
        state.pagination.totalItems = action.payload?.totalItems;
        state.pagination.totalPages = action.payload?.totalPages;
        state.loadingForClients=false
      })
      .addCase(getLitigantConsume.rejected, (state, action) => {
        state.loadingForClients=false
        state.error =
          (action.payload as string) || "An error occurred while fetching data";
      })
      .addCase(getLitigantConsume.pending, (state, action) => {
        state.loadingForClients=true
      })
      .addCase(addLitigantConsume.fulfilled, (state, action) => {
      })
      .addCase(addLitigantConsume.rejected, (state, action) => {
        state.error =
          (action.payload as string) || "An error occurred while fetching data";
      })
      .addCase(getAllLK_IdentityTypes.fulfilled, (state, action) => {
        state.IdentityTypes = action.payload?.result as IdentityTypes[];
      })
      .addCase(getAllLK_IdentityTypes.rejected, (state, action) => {
        state.error =
          (action.payload as string) || "An error occurred while fetching data";
      })
      .addCase(fetchLitigantId.fulfilled, (state, action) => {
        state.litigantById = action.payload?.result as any;
      })
      .addCase(fetchLitigantId.rejected, (state, action) => {
        state.error =
          (action.payload as string) || "An error occurred while fetching data";
      })
      .addCase(removeLitigantId.fulfilled, (state, action) => {
      })
      .addCase(removeLitigantId.rejected, (state, action) => {
        state.error =
          (action.payload as string) || "An error occurred while fetching data";
      });
  },
});
export default litigantConsumeSlice.reducer;
