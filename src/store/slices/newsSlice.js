import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import newsService from "services/NewsService";

const initialState = {
  actualites: [],
  actualite: {},
  loading: false,
  error: null,
};

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await newsService.getNews();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.data.message || "Erreur");
    }
  }
);

export const createNews = createAsyncThunk(
  "news/createNews",
  async (data, { rejectWithValue }) => {
    try {
      const response = await newsService.addNews({
        data,
      });

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.error || "Erreur");
    }
  }
);
export const deleteNews = createAsyncThunk(
  "news/deleteNews",
  async (id, { rejectWithValue }) => {
    try {
      await newsService.deleteNews(id);

      return id;
    } catch (error) {
      // return rejectWithValue(error.response?.data?.data.message || "Erreur");
      return rejectWithValue(error.response.data.error || "Erreur");
    }
  }
);

export const updateNews = createAsyncThunk(
  "news/updateNews",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await newsService.UpdateNews(id, data);

      return { id, updatedNews: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data.error || "Erreur");
    }
  }
);

export const getOneNews = createAsyncThunk(
  "palyers/getOneNews",
  async (id, { rejectWithValue }) => {
    try {
      const response = await newsService.getOneNews(id);
      return response.data;
    } catch (error) {
      // return rejectWithValue(error.response?.data?.data.message || "Erreur");
      return rejectWithValue(error.response.data.error || "Erreur");
    }
  }
);
const newsSlice = createSlice({
  name: "news",
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

      .addCase(fetchNews.fulfilled, (state, action) => {
        state.actualites = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.actualites.push(action.payload);
        state.loading = false;
        state.error = null;
      })

      .addCase(createNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateNews.fulfilled, (state, action) => {
        const { id, updatedNews } = action.payload;
        const newsIndex = state.actualites.findIndex((news) => news._id === id);
        if (newsIndex !== -1) {
          state.actualites[newsIndex] = {
            ...state.actualites[newsIndex],
            ...updatedNews,
          };
        }
        state.loading = false;
        state.error = null;
      })

      .addCase(updateNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        const newsId = action.payload;
        state.actualites = state.actualites.filter(
          (news) => news._id !== newsId
        );
        state.loading = false;
        state.error = null;
      })

      .addCase(deleteNews.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
        state.error = action.payload;
      })
      .addCase(getOneNews.fulfilled, (state, action) => {
        state.actualite = action.payload;
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default newsSlice.reducer;
export const { showLoading, hideLoading, hideError } = newsSlice.actions;
