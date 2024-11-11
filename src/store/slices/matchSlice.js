// matchSlice.js

import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import MatchService from "services/MatchService";

export const fetchMatchs = createAsyncThunk(
  "matchs/fetchMatchs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await MatchService.getMatchs();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.data.message || "Erreur");
    }
  }
);

export const fetchPlayersByPosition = createAsyncThunk(
  "match/fetchPlayersByPosition",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const goalkeeper = await MatchService.playersPosition("goalkeeper");
      const defender = await MatchService.playersPosition("defender");
      const midfielder = await MatchService.playersPosition("midfielder");
      const attacker = await MatchService.playersPosition("attacker");

      const playersByPosition = {
        goalkeeper: goalkeeper.data,
        defender: defender.data,
        midfielder: midfielder.data,
        attacker: attacker.data,
      };

      dispatch(setAllPlayersByPosition(playersByPosition));

      return playersByPosition;
    } catch (error) {
      return rejectWithValue(error.response?.data?.data.message || "Erreur");
    }
  }
);

export const setAllPlayersByPosition = createAction(
  "match/setAllPlayersByPosition"
);

export const createMatch = createAsyncThunk(
  "matchs/createMatch",
  async (matchData, { rejectWithValue }) => {
    try {
      const response = await MatchService.addMatch(matchData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Erreur");
    }
  }
);

export const updateMatch = createAsyncThunk(
  "matchs/updateMatch",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await MatchService.UpdateMatch(id, data);
      return { id, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.data.message || "Erreur");
    }
  }
);

export const deleteMatch = createAsyncThunk(
  "matchs/deleteMatch",
  async (id, { rejectWithValue }) => {
    try {
      await MatchService.deleteMatch(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.data.message || "Erreur");
    }
  }
);

export const fetchOneMatch = createAsyncThunk(
  "matchs/fetchOneMacth",
  async (id, { rejectWithValue }) => {
    try {
      const response = await MatchService.getOneMatch(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.data.message || "Erreur");
    }
  }
);

const initialState = {
  matchs: [],
  match: {},
  loading: false,
  error: null,
  playersByPosition: {},
};

const matchSlice = createSlice({
  name: "matchs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state, action) => {
      state.loading = false;
    },
    hideError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch matchs
      .addCase(fetchMatchs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatchs.fulfilled, (state, action) => {
        state.loading = false;
        state.matchs = action.payload;
      })
      .addCase(fetchMatchs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //fetch players by position
      // .addCase(fetchPlayersByPosition.fulfilled, (state, action) => {

      //   const { position, players } = action.payload;
      //   state.playersByPosition[position] = players;
      //   console.log(state.playersByPosition,'hhhh');
      // })

      .addCase(setAllPlayersByPosition, (state, action) => {
        state.playersByPosition = action.payload;
      })

      // Create match
      .addCase(createMatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMatch.fulfilled, (state, action) => {
        state.matchs.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(createMatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update match
      .addCase(updateMatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMatch.fulfilled, (state, action) => {
        const { matchId, updatedJob } = action.payload;
        const index = state.matchs.findIndex((match) => match.id === matchId);
        if (index !== -1) {
          state.matchs[index] = { ...state.matchs[index], ...updatedJob };
        }
        state.loading = false;
      })
      .addCase(updateMatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete match
      .addCase(deleteMatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMatch.fulfilled, (state, action) => {
        const matchId = action.payload;
        state.matchs = state.matchs.filter((match) => match._id !== matchId);
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteMatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchOneMatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneMatch.fulfilled, (state, action) => {
        state.loading = false;
        state.match = action.payload;
        state.error = null;
      })
      .addCase(fetchOneMatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
// export const selectPlayersByPosition = (state) => state.match.playersByPosition;
export default matchSlice.reducer;
export const { showLoading, hideLoading, hideError } = matchSlice.actions;
