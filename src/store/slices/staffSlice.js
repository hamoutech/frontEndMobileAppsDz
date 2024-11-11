import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StaffService from "services/StaffService";

const initialState = {
  users: [],
  user: {},
  loading: false,
  error: null,
};

export const fetchStaffs = createAsyncThunk(
  "staff/fetchStaffs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await StaffService.getStaffs();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.data.message || "Erreur");
    }
  }
);

export const getOneStaff = createAsyncThunk(
  "staffs/fetchOneStaff",
  async (id, { rejectWithValue }) => {
    try {
      const response = await StaffService.getOneStaff(id);
      return response.data;
    } catch (error) {
      // return rejectWithValue(error.response?.data?.data.message || "Erreur");
      return rejectWithValue(error.response.data.error || "Erreur");
    }
  }
);

export const createStaff = createAsyncThunk(
  "staffs/createStaff",
  async (data, { rejectWithValue }) => {
    try {
      const response = await StaffService.addStaff(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error || "Erreur");
    }
  }
);

export const updateStaff = createAsyncThunk(
  "staffs/updateStaff",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await StaffService.UpdateStaff(id, data);
      return { id, updatedStaff: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data.error || "Erreur");
    }
  }
);

export const deleteStaff = createAsyncThunk(
  "staff/deleteStaff",
  async (id, { rejectWithValue }) => {
    try {
      await StaffService.deleteStaff(id);
      return id;
    } catch (error) {
      // return rejectWithValue(error.response?.data?.data.message || "Erreur");
      return rejectWithValue(error.response.data.error || "Erreur");
    }
  }
);
export const toggleStatusParent = createAsyncThunk(
  "parents/toggleStatusParent",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await StaffService.toggleStatus(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.data.message || "Erreur");
    }
  }
);

const staffSlice = createSlice({
  name: "staffs",
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

      .addCase(fetchStaffs.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchStaffs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaffs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createStaff.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.loading = false;
        state.error = null;
      })

      .addCase(createStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateStaff.fulfilled, (state, action) => {
        const { id, updatedStaff } = action.payload;
        const staffIndex = state.users.findIndex((user) => user._id === id);
        if (staffIndex !== -1) {
          state.users[staffIndex] = {
            ...state.users[staffIndex],
            ...updatedStaff,
          };
        }
        state.loading = false;
        state.error = null;
      })

      .addCase(updateStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteStaff.fulfilled, (state, action) => {
        const staffId = action.payload;
        // state.users = state.users.filter(
        //   (staff) => staff.id !== staffId
        // );
        state.users = state.users.filter((staff) => staff._id !== staffId);
        state.loading = false;
        state.error = null;
      })

      .addCase(deleteStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteStaff.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
        state.error = action.payload;
      })
      .addCase(getOneStaff.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleStatusParent.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleStatusParent.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (parent) => parent.id === action.payload.id
        );
        state.users[index] = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(toggleStatusParent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default staffSlice.reducer;
export const { showLoading, hideLoading, hideError } = staffSlice.actions;
