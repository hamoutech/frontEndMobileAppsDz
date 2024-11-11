import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import RoleService from "services/RoleService";

export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await RoleService.getRoles();

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.data.message || "Erreur ");
    }
  }
);

export const fetchOneRole = createAsyncThunk(
  "roles/fetchOneRole",
  async (id, { rejectWithValue }) => {
    try {
      const response = await RoleService.getOneRole(id);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.data.message || "Erreur ");
    }
  }
);
export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await RoleService.updateOneRole(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.data.message || "Erreur");
    }
  }
);

export const addRole = createAsyncThunk(
  "roles/addRole",
  async (role, { rejectWithValue }) => {
    try {
      console.log("rani f slice", role);
      const response = await RoleService.addOneRole(role);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.data.message || "Erreur");
    }
  }
);
export const deleteRole = createAsyncThunk(
  "Roles/deleteRole",
  async (id, { rejectWithValue }) => {
    try {
      await RoleService.deleteRole(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data.data.message || "Erreur");
    }
  }
);

const rolesSlice = createSlice({
  name: "roles",
  initialState: {
    roles: [],
    role: null,
    loading: false,
    error: null,
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
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOneRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOneRole.fulfilled, (state, action) => {
        state.loading = true;
        state.role = action.payload;
      })
      .addCase(fetchOneRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        const updatedRole = action.payload;
        const index = state.roles.findIndex(
          (role) => role.id === updatedRole.id
        );
        if (index !== -1) {
          state.roles[index] = updatedRole;
        }
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.error = null;
      })

      .addCase(addRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.loading = false;
        const newRole = {
          ...action.payload,
          privileges: action.meta.arg.privileges,
        };
        state.roles.push(newRole);
        state.error = null;
      })
      .addCase(addRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteRole.fulfilled, (state, action) => {
        const RoleId = action.payload;
        state.roles = state.roles.filter((role) => role.id !== RoleId);
        state.loading = false;
        state.error = null;
      })

      .addCase(deleteRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default rolesSlice.reducer;
export const { showLoading, hideLoading, hideError } = rolesSlice.actions;
