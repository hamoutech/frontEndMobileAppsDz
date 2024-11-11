// stadiumSlice.js

import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit"
import axios from "axios"
import StadiumService from "services/StadiumService"

export const setStadiumData = createAction("stadium/setStadiumData")

// Action pour mettre à jour les données du stade
export const updateStadiumData = createAction("stadium/updateStadiumData")

// export const fetchStadium = createAsyncThunk("stadium/fetchStadium", async (_, {rejectWithValue }) => {
//   try {
//     const response = await StadiumService.getStadium();
//     return response.data;
//   } catch (error) {
//      return rejectWithValue(error.response?.data?.data.message || "Erreur");
//   }
// });

export const createStadium = createAsyncThunk(
  "stadium/createStadium",
  async (satdiumData, { rejectWithValue, dispatch }) => {
    try {
      const response = await StadiumService.addStadium(satdiumData)
      dispatch(setStadiumData(response.data))
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.data.message || "Erreur")
    }
  }
)

export const updateStadium = createAsyncThunk(
  "stadium/updateStadium",
  async ({ updatedStadiumData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await StadiumService.UpdateStadium(updatedStadiumData)
      dispatch(updateStadiumData(response[0]))

      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.data.message || "Erreur")
    }
  }
)

export const fetchStadium = createAsyncThunk(
  "stadium/fetchStadium",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await StadiumService.getStadium()
      const stadiumData = response.data
      if (stadiumData.length === 0) {
        // Si le tableau est vide, appelez createStadium
        // const createResponse = await dispatch(createStadium({ stadiumData }));
        // setStadiumData avec les données retournées après la création c
        //dispatch(setStadiumData(createResponse.payload)); c
      } else {
        // Si le tableau n'est pas vide, appelez simplement setStadiumData
        dispatch(setStadiumData(stadiumData))
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.data.message || "Erreur")
    } finally {
      dispatch(hideLoading())
    }
  }
)

const initialState = {
  stadium: [],
  loading: false,
  error: null,
}

const stadiumSlice = createSlice({
  name: "stadium",
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
    setUpdatedStadiumData: (state, action) => {
      state.stadium = action.payload
    },
  },
  extraReducers: (builder) => {
    // builder
    // Fetch stadium
    // .addCase(fetchStadium.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(fetchStadium.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.stadium = action.payload;
    // })
    // .addCase(fetchStadium.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // })

    // // Create stadium
    // .addCase(createStadium.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(createStadium.fulfilled, (state, action) => {
    //   state.stadium.push(action.payload);
    //   state.loading = false;
    //   state.error = null;

    // })
    // .addCase(createStadium.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // })
    // // Update stadium
    // .addCase(updateStadium.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(updateStadium.fulfilled, (state, action) => {
    //   state.stadium.push(action.payload);
    //   state.loading = false;
    //   state.error = null;
    // })
    // .addCase(updateStadium.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // })
    builder
      .addCase(setStadiumData, (state, action) => {
        state.stadium = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(updateStadiumData, (state, action) => {
        const updatedStadium = action.payload
        // Mettez à jour le tableau des stades avec les nouvelles données
        state.stadium = state.stadium.map((stadium) =>
          stadium.id === updatedStadium.id ? updatedStadium : stadium
        )
        state.loading = false
        state.error = null
      })
      .addCase(fetchStadium.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchStadium.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(updateStadium.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateStadium.fulfilled, (state, action) => {
        state.stadium = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(updateStadium.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default stadiumSlice.reducer
export const { showLoading, hideLoading, hideError } = stadiumSlice.actions
