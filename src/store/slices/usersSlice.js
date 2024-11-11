import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import ExampleService from "services/ExampleService";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ExampleService.getUsers();

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.data.message || "Erreur ");
    }
  }
);

export const fetchOneUser = createAsyncThunk(
  "users/fetchOneUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await ExampleService.getOneUser(id);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.data.message || "Erreur ");
    }
  }
);
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await ExampleService.updateOneUser(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.data.message || "Erreur");
    }
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await ExampleService.addOneUser(user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.data.message || "Erreur");
    }
  }
);
export const deleteUser = createAsyncThunk(
  "Users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await ExampleService.deleteUser(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data.data.message || "Erreur");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: null,
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
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOneUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOneUser.fulfilled, (state, action) => {
        state.loading = true;
        state.user = action.payload;
      })
      .addCase(fetchOneUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        const index = state.users.findIndex(
          (user) => user.id === updatedUser.id
        );
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.error = null;
      })

      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        const newUser = {
          ...action.payload,
          privileges: action.meta.arg.privileges,
        };
        state.users.push(newUser);
        state.error = null;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        const UserId = action.payload;
        state.users = state.users.filter((user) => user.id !== UserId);
        state.loading = false;
        state.error = null;
      })

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
export const { showLoading, hideLoading, hideError } = usersSlice.actions;
