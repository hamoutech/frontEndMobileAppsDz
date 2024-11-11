import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "services/AuthService";

export const modifyAccount = createAsyncThunk(
  "user/modifyAccount",
  async (accountData, { rejectWithValue }) => {
    try {
      const response = await AuthService.modifyAccount(accountData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.data.message || "Erreur");
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      console.log(passwordData);
    } catch (error) {
      return rejectWithValue(error.response.data.data.message || "Erreur");
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: null,
    error: null,
    loading: false,
  },
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
      .addCase(modifyAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(modifyAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.account = action.payload;
      })
      .addCase(modifyAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.account = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default accountSlice.reducer;
export const { showLoading, hideLoading, hideError } = accountSlice.actions;
