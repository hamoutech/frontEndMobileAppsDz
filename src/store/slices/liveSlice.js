// liveSlice.js

import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit"
import axios from "axios"
import LiveService from "services/LiveService"

export const fetchLives = createAsyncThunk(
  "lives/fetchLives",
  async (_, { rejectWithValue }) => {
    try {
      const response = await LiveService.getLives()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.data.message || "Erreur")
    }
  }
)

export const createLive = createAsyncThunk(
  "live/createLive",
  async (liveData, { rejectWithValue }) => {
    try {
      const response = await LiveService.addlive({ liveData })
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.data.message || "Erreur")
    }
  }
)

export const updateLive = createAsyncThunk(
  "lives/updateLive",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await LiveService.UpdateLive(id, data)
      return { id, updatedJob: response.data }
    } catch (error) {
      return rejectWithValue(error.response?.data?.data.message || "Erreur")
    }
  }
)

export const deleteLive = createAsyncThunk(
  "lives/deleteLive",
  async (id, { rejectWithValue }) => {
    try {
      await LiveService.deleteLive(id)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.data.message || "Erreur")
    }
  }
)

export const fetchOneLive = createAsyncThunk(
  "lives/fetchOneLive", // erreur potentiel f ta3 live a verifier
  async (id, { rejectWithValue }) => {
    try {
      const response = await LiveService.getOneLive(id)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.data.message || "Erreur")
    }
  }
)

const initialState = {
  lives: [],
  live: {},
  loading: false,
  error: null,
  playersByPosition: {},
}

const liveSlice = createSlice({
  name: "lives",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.loading = true
    },
    hideLoading: (state, action) => {
      state.loading = false
    },
    hideError: (state, action) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch lives
      .addCase(fetchLives.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchLives.fulfilled, (state, action) => {
        state.loading = false
        state.lives = action.payload
      })
      .addCase(fetchLives.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Create Live
      .addCase(createLive.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createLive.fulfilled, (state, action) => {
        state.lives.push(action.payload)
        state.loading = false
        state.error = null
      })
      .addCase(createLive.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Update live
      .addCase(updateLive.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateLive.fulfilled, (state, action) => {
        // const { liveId, updatedJob } = action.payload;
        // const index = state.lives.findIndex((live) => live.id === liveId);
        // if (index !== -1) {
        //   state.lives[index] = { ...state.lives[index], ...updatedJob };
        // }
        state.loading = false
      })
      .addCase(updateLive.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Delete live
      .addCase(deleteLive.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteLive.fulfilled, (state, action) => {
        const liveId = action.payload
        state.lives = state.lives.filter((live) => live._id !== liveId)
        state.loading = false
        state.error = null
      })
      .addCase(deleteLive.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(fetchOneLive.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOneLive.fulfilled, (state, action) => {
        state.loading = false
        state.live = action.payload
        state.error = null
      })
      .addCase(fetchOneLive.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})
export default liveSlice.reducer
export const { showLoading, hideLoading, hideError } = liveSlice.actions
