import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import partnerService from "services/PartnerService";

const initialState = {
  partners: [],
  partner: {},
  loading: false,
  error: null,
};

export const fetchPartner = createAsyncThunk(
  "partner/fetchPartner",
  async (_, { rejectWithValue }) => {
    try {
      const response = await partnerService.getPartner();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.data.message || "Erreur");
    }
  }
);

export const createPartner = createAsyncThunk(
  "partner/createPartner",
  async (data, { rejectWithValue }) => {
    try {
      const response = await partnerService.addPartner({
        data,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.error || "Erreur");
    }
  }
);
export const deletePartner = createAsyncThunk(
  "partner/deletePartner",
  async (id, { rejectWithValue }) => {
    try {
      await partnerService.deletePartner(id);

      return id;
    } catch (error) {
      // return rejectWithValue(error.response?.data?.data.message || "Erreur");
      return rejectWithValue(error.response.data.error || "Erreur");
    }
  }
);

export const updatePartner = createAsyncThunk(
  "partner/updatePartner",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await partnerService.UpdatePartner(id, data);

      return { id, updatedPartner: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data.error || "Erreur");
    }
  }
);

export const getOnePartner = createAsyncThunk(
  "palyers/getOnePartner",
  async (id, { rejectWithValue }) => {
    try {
      const response = await partnerService.getOnePartner(id);
      return response.data;
    } catch (error) {
      // return rejectWithValue(error.response?.data?.data.message || "Erreur");
      return rejectWithValue(error.response.data.error || "Erreur");
    }
  }
);
const partnerSlice = createSlice({
  name: "partner",
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

      .addCase(fetchPartner.fulfilled, (state, action) => {
        state.partners = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchPartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPartner.fulfilled, (state, action) => {
        state.partners.push(action.payload);
        state.loading = false;
        state.error = null;
      })

      .addCase(createPartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createPartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updatePartner.fulfilled, (state, action) => {
        const { id, updatedPartner } = action.payload;
        const partnerIndex = state.partners.findIndex(
          (partner) => partner._id === id
        );
        if (partnerIndex !== -1) {
          state.partners[partnerIndex] = {
            ...state.partners[partnerIndex],
            ...updatedPartner,
          };
        }
        state.loading = false;
        state.error = null;
      })

      .addCase(updatePartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updatePartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePartner.fulfilled, (state, action) => {
        const partnerId = action.payload;
        state.partners = state.partners.filter(
          (partner) => partner._id !== partnerId
        );
        state.loading = false;
        state.error = null;
      })

      .addCase(deletePartner.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
        state.error = action.payload;
      })
      .addCase(getOnePartner.fulfilled, (state, action) => {
        state.partner = action.payload;
        state.loading = true;
        state.error = null;
      })
      .addCase(getOnePartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOnePartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default partnerSlice.reducer;
export const { showLoading, hideLoading, hideError } = partnerSlice.actions;
