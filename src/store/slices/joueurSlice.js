import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import joueurService from "services/JoueurService";

const initialState = {
  stats: {},
  statsMatchs: [],
  // statsByMatch: {},
  joueurs: [],
  players: [],
  joueur: {},
  loading: false,
  error: null,
  playersByFullName: "",
};

export const fetchJoueurs = createAsyncThunk(
  "palyers/fetchJoueurs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await joueurService.getJoueurs();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.data.message || "Erreur");
    }
  }
);

export const getOnePlayer = createAsyncThunk(
  "palyers/getOnePlayer",
  async (id, { rejectWithValue }) => {
    try {
      const response = await joueurService.getOnePlayer(id);

      return response.data;
    } catch (error) {
      // return rejectWithValue(error.response?.data?.data.message || "Erreur");
      return rejectWithValue(error.response.data.error || "Erreur");
    }
  }
);
export const getPlayers = createAsyncThunk(
  "palyers/getPlayers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await joueurService.getPlayers();

      return response.data;
    } catch (error) {
      // return rejectWithValue(error.response?.data?.data.message || "Erreur");
      return rejectWithValue(error.response.data.error || "Erreur");
    }
  }
);
export const getPlayerStat = createAsyncThunk(
  "palyers/getPlayerStat",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await joueurService.getPlayerStat(id, data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      // return rejectWithValue(error.response?.data?.data.message || "Erreur");
      return rejectWithValue(error.response.data.error || "Erreur");
    }
  }
);
export const getplayermatch = createAsyncThunk(
  "palyers/getplayermatch",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await joueurService.getplayermatch(id, data);

      return response.data;
    } catch (error) {
      // return rejectWithValue(error.response?.data?.data.message || "Erreur");
      return rejectWithValue(error.response.data.error || "Erreur");
    }
  }
);
export const getplayerbymatchid = createAsyncThunk(
  "palyers/getplayerbymatchid",
  async ({ id, match }, { rejectWithValue }) => {
    try {
      const response = await joueurService.getplayerbymatchid(id, match);
      return response.data;
    } catch (error) {
      // return rejectWithValue(error.response?.data?.data.message || "Erreur");
      return rejectWithValue(error.response.data.error || "Erreur");
    }
  }
);
export const getPlayersByFullName = createAsyncThunk(
  "palyers/getPlayerByFullName",
  async (fullName, { rejectWithValue }) => {
    try {
      const response = await joueurService.getPlayersByFullName(fullName);

      return response.data;
    } catch (error) {
      // return rejectWithValue(error.response?.data?.data.message || "Erreur");
      return rejectWithValue(error.response.data.error || "Erreur");
    }
  }
);

export const createPlayer = createAsyncThunk(
  "player/createPlayer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await joueurService.addPlayer({
        data,
      });

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.error || "Erreur");
    }
  }
);

export const updatePlayer = createAsyncThunk(
  "players/updatePlayer",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await joueurService.UpdatePlayer(id, data);

      return { id, updatedPlayer: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data.error || "Erreur");
    }
  }
);

export const deletePlayer = createAsyncThunk(
  "palyers/deletePlayer",
  async (id, { rejectWithValue }) => {
    try {
      await joueurService.deletePlayer(id);

      return id;
    } catch (error) {
      // return rejectWithValue(error.response?.data?.data.message || "Erreur");
      return rejectWithValue(error.response.data.error || "Erreur");
    }
  }
);

const staffSlice = createSlice({
  name: "joueurs",
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
    setQuery: (state, action) => {
      state.playersByFullName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchJoueurs.fulfilled, (state, action) => {
        state.joueurs = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchJoueurs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJoueurs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPlayer.fulfilled, (state, action) => {
        state.joueurs.push(action.payload);
        state.loading = false;
        state.error = null;
      })

      .addCase(createPlayer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createPlayer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updatePlayer.fulfilled, (state, action) => {
        const { id, updatedPlayer } = action.payload;
        const playerIndex = state.joueurs.findIndex(
          (joueur) => joueur._id === id
        );
        if (playerIndex !== -1) {
          state.joueurs[playerIndex] = {
            ...state.joueurs[playerIndex],
            ...updatedPlayer,
          };
        }
        state.loading = false;
        state.error = null;
      })

      .addCase(updatePlayer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updatePlayer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deletePlayer.fulfilled, (state, action) => {
        const playerId = action.payload;
        // state.users = state.users.filter(
        //   (staff) => staff.id !== staffId
        // );
        state.joueurs = state.joueurs.filter(
          (joueur) => joueur._id !== playerId
        );
        state.loading = false;
        state.error = null;
      })

      .addCase(deletePlayer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deletePlayer.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
        state.error = action.payload;
      })
      .addCase(getOnePlayer.fulfilled, (state, action) => {
        state.joueur = action.payload;
        state.loading = true;
        state.error = null;
      })
      .addCase(getOnePlayer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOnePlayer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) // player stats
      .addCase(getPlayerStat.fulfilled, (state, action) => {
        state.stats = action.payload;
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlayerStat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlayerStat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) // get players from postgre
      .addCase(getPlayers.fulfilled, (state, action) => {
        state.players = action.payload;
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // player stats matchs
      .addCase(getplayermatch.fulfilled, (state, action) => {
        state.statsMatchs = action.payload;
        state.loading = true;
        state.error = null;
      })
      .addCase(getplayermatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getplayermatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // player stats by id matchs
      .addCase(getplayerbymatchid.fulfilled, (state, action) => {
        state.stats = action.payload;
        state.loading = true;
        state.error = null;
      })
      .addCase(getplayerbymatchid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getplayerbymatchid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPlayersByFullName.fulfilled, (state, action) => {
        state.joueurs = action.payload;
        state.error = null;
      })
      .addCase(getPlayersByFullName.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export const selectJoueurs = (state) => state.joueurs.joueurs;
export default staffSlice.reducer;
export const { showLoading, hideLoading, hideError } = staffSlice.actions;
