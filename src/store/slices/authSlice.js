import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { AUTH_TOKEN } from "constants/AuthConstant";
import { REFRESH_TOKEN } from "constants/AuthConstant";
import FirebaseService from "services/FirebaseService";
import AuthService from "services/AuthService";
import { useNavigate } from "react-router-dom";

export const initialState = {
  loading: false,
  user: null,
  message: "",
  showMessage: false,
  redirect: "",
  token: localStorage.getItem(AUTH_TOKEN) || null,
  refresh: localStorage.getItem(REFRESH_TOKEN) || null,
  didRefresh: false,
  status: "idle",
};

export const signIn = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    const { email, password } = data;
    try {
      const response = await AuthService.login({ email, password });
      const token = response.data.token;
      const rfToken = response.data.refresh_token;
      localStorage.setItem(AUTH_TOKEN, token);
      localStorage.setItem(REFRESH_TOKEN, rfToken);
      // return token;
      if (response.data.adminname) {
        localStorage.setItem("adminname", response.data.adminname);
        localStorage.setItem("adminemail", response.data.adminemail);
        localStorage.setItem("role", response.data.role);
      }
      return response.data;
    } catch (err) {
      // console.log(err.response.data.error,'err response')
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    // const { name,headName,email,description,photo,phoneNumber,address,password } = data;

    try {
      const response = await AuthService.register({
        data,
      });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   return rejectWithValue(errorData);
      // }
      // const data = await response.json();

      return response;
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const refresh = createAsyncThunk(
  "api/refresh",
  async (args, { getState, rejectWithValue }) => {
    try {
      let newToken = getState().auth.refresh;

      const response = await AuthService.refresh();
      const newAccessToken = response.data.newAccessToken;
      const rfToken = response.data.newRefreshToken;
      localStorage.setItem(AUTH_TOKEN, newAccessToken);
      localStorage.setItem(REFRESH_TOKEN, rfToken);

      return newAccessToken;
    } catch (err) {
      return rejectWithValue(err.response?.data.data.message || "Erreur");
    }
  }
);

export const signOut = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem("adminname");
  localStorage.removeItem("adminemail");
  localStorage.removeItem("role");
});

export const getUser = createAsyncThunk(
  "auth/currentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.getUser();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data.message || "Erreur");
    }
  }
);

export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.loginInOAuth();
      const token = response.data.token;
      localStorage.setItem(AUTH_TOKEN, token);
      return token;
    } catch (err) {
      return rejectWithValue(err.response?.data.data.message || "Erreur");
    }
  }
);

export const signInWithFacebook = createAsyncThunk(
  "auth/signInWithFacebook",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.loginInOAuth();
      const token = response.data.token;
      localStorage.setItem(AUTH_TOKEN, token);
      return token;
    } catch (err) {
      return rejectWithValue(err.response?.data.data.message || "Erreur");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticated: (state, action) => {
      state.loading = false;
      state.redirect = "/";
      state.token = action.payload;
    },
    showAuthMessage: (state, action) => {
      state.message = action.payload;
      state.showMessage = true;
      state.loading = false;
    },
    hideAuthMessage: (state) => {
      state.message = "";
      state.showMessage = false;
    },
    signOutSuccess: (state) => {
      state.loading = false;
      state.token = null;
      state.redirect = "/";
    },
    showLoading: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload;
    },
    setRefresh: (state, action) => {
      state.refresh = true; // added that
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.redirect = "/";
        state.status = "succeeded";
        state.token = action.payload.token;
        // state.user=action.payload.name
        // console.log(state.user,'user')
        // console.log(state.token,'token')
        // state.refresh = action.payload.rfToken;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.message = action.payload;
        state.showMessage = true;
        state.loading = false;
        state.status = "failed";
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.token = null;
        state.refresh = null;

        state.user = {};
        state.redirect = "/";
      })
      .addCase(signOut.rejected, (state) => {
        state.loading = false;
        state.token = null;
        state.refresh = null;
        state.user = {};
        state.redirect = "/";
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.redirect = "/";
        // state.token = action.payload.token;
        // state.refresh = action.payload.rfToken;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.message = action.payload;
        state.showMessage = true;
        state.loading = false;
      })
      .addCase(refresh.pending, (state) => {
        state.loading = true;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.newToken;
        state.refresh = action.payload.rfToken;
        state.didRefresh = true;
        window.location.reload();
      })
      .addCase(refresh.rejected, (state, action) => {
        state.message = action.payload;
        state.showMessage = true;
        state.loading = false;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.message = action.payload;
        state.showMessage = true;
        state.loading = false;
      });
    // .addCase(signInWithGoogle.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(signInWithGoogle.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.redirect = "/";
    //   state.token = action.payload;
    // })
    // .addCase(signInWithGoogle.rejected, (state, action) => {
    //   state.message = action.payload;
    //   state.showMessage = true;
    //   state.loading = false;
    // })
    // .addCase(signInWithFacebook.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(signInWithFacebook.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.redirect = "/";
    //   state.token = action.payload;
    // })
    // .addCase(signInWithFacebook.rejected, (state, action) => {
    //   state.message = action.payload;
    //   state.showMessage = true;
    //   state.loading = false;
    // });
  },
});

export const {
  authenticated,
  showAuthMessage,
  hideAuthMessage,
  signOutSuccess,
  showLoading,
  signInSuccess,
  setRefresh,
} = authSlice.actions;

export default authSlice.reducer;
