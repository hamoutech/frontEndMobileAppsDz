import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import adService from "services/AdService"

const initialState = {
  ads: [],
  ad: {},
  loading: false,
  error: null,
}

export const fetchAd = createAsyncThunk(
  "ad/fetchAd",
  async (companyName, { rejectWithValue }) => {
    try {
      const response = await adService.getAd(companyName)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.data.message || "Erreur")
    }
  }
)

export const createAd = createAsyncThunk(
  "ad/createAd",
  async (data, { rejectWithValue }) => {
    try {
      const response = await adService.addAd({
        data,
      })
      return response
    } catch (error) {
      return rejectWithValue(error.response.data.error || "Erreur")
    }
  }
)
export const deleteAd = createAsyncThunk(
  "ad/deleteAd",
  async (id, { rejectWithValue }) => {
    try {
      await adService.deleteAd(id)

      return id
    } catch (error) {
      // return rejectWithValue(error.response?.data?.data.message || "Erreur");
      return rejectWithValue(error.response.data.error || "Erreur")
    }
  }
)
export const changeVisibilityAd = createAsyncThunk(
  "ad/changeVisibilityAd",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await adService.changeVisibilityAd(id, data)

      return { id, theUpdatedAd: response.data }
    } catch (error) {
      return rejectWithValue(error.response.data.error || "Erreur")
    }
  }
)

export const updateAd = createAsyncThunk(
  "ad/updateAd",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await adService.UpdateAd(id, data)

      return { id, theUpdatedAd: response.data }
    } catch (error) {
      return rejectWithValue(error.response.data.error || "Erreur")
    }
  }
)

export const getOneAd = createAsyncThunk(
  "palyers/getOneAd",
  async (id, { rejectWithValue }) => {
    try {
      const response = await adService.getOneAd(id)
      console.log(response)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.data.message || "Erreur")
      //return rejectWithValue(error.response?.data?.error || "Erreur")
    }
  }
)
const adSlice = createSlice({
  name: "ad",
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

      .addCase(fetchAd.fulfilled, (state, action) => {
        state.ads = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(fetchAd.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAd.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createAd.fulfilled, (state, action) => {
        state.ads.push(action.payload)
        state.loading = false
        state.error = null
      })

      .addCase(createAd.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(createAd.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(updateAd.fulfilled, (state, action) => {
        const { id, updatedAd } = action.payload
        const adIndex = state.ads.findIndex((ad) => ad._id === id)
        if (adIndex !== -1) {
          state.ads[adIndex] = {
            ...state.ads[adIndex],
            ...updatedAd,
          }
        }
        state.loading = false
        state.error = null
      })

      .addCase(updateAd.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(updateAd.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteAd.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteAd.fulfilled, (state, action) => {
        const adId = action.payload
        state.ads = state.ads.filter((ad) => ad._id !== adId)
        state.loading = false
        state.error = null
      })

      .addCase(deleteAd.rejected, (state, action) => {
        state.loading = false
        // state.error = action.error.message;
        state.error = action.payload
      })
      .addCase(changeVisibilityAd.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(changeVisibilityAd.fulfilled, (state, action) => {
        const { id, theUpdatedAd } = action.payload
        state.ads = state.ads.map((ad) => (ad._id === id ? theUpdatedAd : ad))
        console.log(action.payload)
        // const adIndex = state.ads.findIndex((ad) => ad._id === id);
        // if (adIndex !== -1) {
        //   state.ads[adIndex] = {
        //     ...state.ads[adIndex],
        //     ...updatedAd,
        //   };
        // }
        state.loading = false
        state.error = null
      })

      .addCase(changeVisibilityAd.rejected, (state, action) => {
        state.loading = false
        // state.error = action.error.message;
        state.error = action.payload
      })
      .addCase(getOneAd.fulfilled, (state, action) => {
        state.ad = action.payload
        state.loading = true
        state.error = null
      })
      .addCase(getOneAd.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getOneAd.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default adSlice.reducer
export const { showLoading, hideLoading, hideError } = adSlice.actions
