import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { LegalConsume } from "@4eplatform/shared/apis/legal";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import {
  IndicatorsAttachments,
  IndicatorsCauseStage,
  IndicatorsELibraries,
  IndicatorsJudgementGround,
  IndicatorsLawyers,
  IndicatorsLitigants,
  IndicatorsSessionsAndSessionNotes,
  IndicatorsTime,
  CausesCount,
  CausesDuration,
} from "../models/IndicatorsModel";

// Define the state structure
interface IndicatorsState {
  indicatorsAttachments: IndicatorsAttachments | null;
  indicatorsCauseStage: IndicatorsCauseStage | null;
  indicatorsELibraries: IndicatorsELibraries | null;
  indicatorsJudgementGround: IndicatorsJudgementGround | null;
  indicatorsLawyers: IndicatorsLawyers | null;
  indicatorsLitigants: IndicatorsLitigants | null;
  indicatorsSessionsAndSessionNotes: IndicatorsSessionsAndSessionNotes | null;
  indicatorsTime: IndicatorsTime | null;
  causesCount: CausesCount | null;
  causesDuration: CausesDuration | null;
  loading: boolean;
  error: string | null;
  status: RequestStatus;
}

// Initialize state
const initialState: IndicatorsState = {
  indicatorsAttachments: null,
  indicatorsCauseStage: null,
  indicatorsELibraries: null,
  indicatorsJudgementGround: null,
  indicatorsLawyers: null,
  indicatorsLitigants: null,
  indicatorsSessionsAndSessionNotes: null,
  indicatorsTime: null,
  causesCount: null,
  causesDuration: null,
  loading: false,
  error: null,
  status: RequestStatus.idle,
};

// Create async thunks for API interactions
export const fetchIndicatorsAttachments = createAsyncThunk<
  ResponseModel,
  void
>(
  "indicators/fetchIndicatorsAttachments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await LegalConsume.getIndicatorsAttachments();
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch indicators attachments");
    }
  }
);

export const fetchIndicatorsCauseStage = createAsyncThunk<
  ResponseModel,
  void
>(
  "indicators/fetchIndicatorsCauseStage",
  async (_, { rejectWithValue }) => {
    try {
      const response = await LegalConsume.getIndicatorsCauseStage();
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch indicators cause stage");
    }
  }
);

export const fetchIndicatorsELibraries = createAsyncThunk<
  ResponseModel,
  void
>(
  "indicators/fetchIndicatorsELibraries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await LegalConsume.getIndicatorsELibraries();
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch indicators e-libraries");
    }
  }
);

export const fetchIndicatorsJudgementGround = createAsyncThunk<
  ResponseModel,
  void
>(
  "indicators/fetchIndicatorsJudgementGround",
  async (_, { rejectWithValue }) => {
    try {
      const response = await LegalConsume.getIndicatorsJudgementGround();
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch indicators judgement ground");
    }
  }
);

export const fetchIndicatorsLawyers = createAsyncThunk<
  ResponseModel,
  void
>(
  "indicators/fetchIndicatorsLawyers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await LegalConsume.getIndicatorsLawyers();
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch indicators lawyers");
    }
  }
);

export const fetchIndicatorsLitigants = createAsyncThunk<
  ResponseModel,
  void
>(
  "indicators/fetchIndicatorsLitigants",
  async (_, { rejectWithValue }) => {
    try {
      const response = await LegalConsume.getIndicatorsLitigants();
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch indicators litigants");
    }
  }
);

export const fetchIndicatorsSessionsAndSessionNotes = createAsyncThunk<
  ResponseModel,
  void
>(
  "indicators/fetchIndicatorsSessionsAndSessionNotes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await LegalConsume.getIndicatorsSessionsAndSessionNotes();
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch indicators sessions and session notes");
    }
  }
);

export const fetchIndicatorsTime = createAsyncThunk<
  ResponseModel,
  void
>(
  "indicators/fetchIndicatorsTime",
  async (_, { rejectWithValue }) => {
    try {
      const response = await LegalConsume.getIndicatorsTime();
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch indicators time");
    }
  }
);

export const fetchCausesCount = createAsyncThunk<
  ResponseModel,
  void
>(
  "indicators/fetchCausesCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await LegalConsume.getCausesCount();
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch causes count");
    }
  }
);

export const fetchCausesDuration = createAsyncThunk<
  ResponseModel,
  void
>(
  "indicators/fetchCausesDuration",
  async (_, { rejectWithValue }) => {
    try {
      const response = await LegalConsume.getCausesDuration();
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch causes duration");
    }
  }
);

// Create the slice
const indicatorsSlice = createSlice({
  name: "indicators",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    resetState: (state) => {
      state.indicatorsAttachments = null;
      state.indicatorsCauseStage = null;
      state.indicatorsELibraries = null;
      state.indicatorsJudgementGround = null;
      state.indicatorsLawyers = null;
      state.indicatorsLitigants = null;
      state.indicatorsSessionsAndSessionNotes = null;
      state.indicatorsTime = null;
      state.causesCount = null;
      state.causesDuration = null;
      state.loading = false;
      state.error = null;
      state.status = RequestStatus.idle;
    },
    setStatus: (state, action: PayloadAction<RequestStatus>) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Indicators Attachments
      .addCase(fetchIndicatorsAttachments.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = RequestStatus.pending;
      })
      .addCase(
        fetchIndicatorsAttachments.fulfilled,
        (state, action: PayloadAction<ResponseModel>) => {
          state.loading = false;
          state.indicatorsAttachments = action.payload?.result as IndicatorsAttachments;
          state.status = RequestStatus.succeeded;
        }
      )
      .addCase(fetchIndicatorsAttachments.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch indicators attachments";
        state.status = RequestStatus.failed;
      })

      // Indicators Cause Stage
      .addCase(fetchIndicatorsCauseStage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = RequestStatus.pending;
      })
      .addCase(
        fetchIndicatorsCauseStage.fulfilled,
        (state, action: PayloadAction<ResponseModel>) => {
          state.loading = false;
          state.indicatorsCauseStage = action.payload?.result as IndicatorsCauseStage;
          state.status = RequestStatus.succeeded;
        }
      )
      .addCase(fetchIndicatorsCauseStage.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch indicators cause stage";
        state.status = RequestStatus.failed;
      })

      // Indicators E-Libraries
      .addCase(fetchIndicatorsELibraries.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = RequestStatus.pending;
      })
      .addCase(
        fetchIndicatorsELibraries.fulfilled,
        (state, action: PayloadAction<ResponseModel>) => {
          state.loading = false;
          state.indicatorsELibraries = action.payload?.result as IndicatorsELibraries;
          state.status = RequestStatus.succeeded;
        }
      )
      .addCase(fetchIndicatorsELibraries.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch indicators e-libraries";
        state.status = RequestStatus.failed;
      })

      // Indicators Judgement Ground
      .addCase(fetchIndicatorsJudgementGround.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = RequestStatus.pending;
      })
      .addCase(
        fetchIndicatorsJudgementGround.fulfilled,
        (state, action: PayloadAction<ResponseModel>) => {
          state.loading = false;
          state.indicatorsJudgementGround = action.payload?.result as IndicatorsJudgementGround;
          state.status = RequestStatus.succeeded;
        }
      )
      .addCase(fetchIndicatorsJudgementGround.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch indicators judgement ground";
        state.status = RequestStatus.failed;
      })

      // Indicators Lawyers
      .addCase(fetchIndicatorsLawyers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = RequestStatus.pending;
      })
      .addCase(
        fetchIndicatorsLawyers.fulfilled,
        (state, action: PayloadAction<ResponseModel>) => {
          state.loading = false;
          state.indicatorsLawyers = action.payload?.result as IndicatorsLawyers;
          state.status = RequestStatus.succeeded;
        }
      )
      .addCase(fetchIndicatorsLawyers.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch indicators lawyers";
        state.status = RequestStatus.failed;
      })

      // Indicators Litigants
      .addCase(fetchIndicatorsLitigants.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = RequestStatus.pending;
      })
      .addCase(
        fetchIndicatorsLitigants.fulfilled,
        (state, action: PayloadAction<ResponseModel>) => {
          state.loading = false;
          state.indicatorsLitigants = action.payload?.result as IndicatorsLitigants;
          state.status = RequestStatus.succeeded;
        }
      )
      .addCase(fetchIndicatorsLitigants.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch indicators litigants";
        state.status = RequestStatus.failed;
      })

      // Indicators Sessions and Session Notes
      .addCase(fetchIndicatorsSessionsAndSessionNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = RequestStatus.pending;
      })
      .addCase(
        fetchIndicatorsSessionsAndSessionNotes.fulfilled,
        (state, action: PayloadAction<ResponseModel>) => {
          state.loading = false;
          state.indicatorsSessionsAndSessionNotes = action.payload?.result as IndicatorsSessionsAndSessionNotes;
          state.status = RequestStatus.succeeded;
        }
      )
      .addCase(fetchIndicatorsSessionsAndSessionNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch indicators sessions and session notes";
        state.status = RequestStatus.failed;
      })

      // Indicators Time
      .addCase(fetchIndicatorsTime.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = RequestStatus.pending;
      })
      .addCase(
        fetchIndicatorsTime.fulfilled,
        (state, action: PayloadAction<ResponseModel>) => {
          state.loading = false;
          state.indicatorsTime = action.payload?.result as IndicatorsTime;
          state.status = RequestStatus.succeeded;
        }
      )
      .addCase(fetchIndicatorsTime.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch indicators time";
        state.status = RequestStatus.failed;
      })

      // Causes Count
      .addCase(fetchCausesCount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = RequestStatus.pending;
      })
      .addCase(
        fetchCausesCount.fulfilled,
        (state, action: PayloadAction<ResponseModel>) => {
          state.loading = false;
          state.causesCount = action.payload?.result as CausesCount;
          state.status = RequestStatus.succeeded;
        }
      )
      .addCase(fetchCausesCount.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch causes count";
        state.status = RequestStatus.failed;
      })

      // Causes Duration
      .addCase(fetchCausesDuration.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = RequestStatus.pending;
      })
      .addCase(
        fetchCausesDuration.fulfilled,
        (state, action: PayloadAction<ResponseModel>) => {
          state.loading = false;
          state.causesDuration = action.payload?.result as CausesDuration;
          state.status = RequestStatus.succeeded;
        }
      )
      .addCase(fetchCausesDuration.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch causes duration";
        state.status = RequestStatus.failed;
      });
  },
});

// Export actions and reducer
export const { clearErrors, resetState, setStatus } = indicatorsSlice.actions;
export default indicatorsSlice.reducer;