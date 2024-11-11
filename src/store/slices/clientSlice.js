import ClientService from "services/ClientService"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const initialState = {
  currentPage: 1,
  clients: null,
  client: {},
  searchedClients: [],
  loadedPages: [],
  loadedSearchPages: [],
  loading: false,
  message: "",
  totalItems: null,
  totalItemsSearched: null,
  searchValue: null,
  showMessage: false,
  validateModelOpen: false,
  bannedModelOpen: false,
}

export const getAllClients = createAsyncThunk(
  "client/getAll",
  async (page, { dispatch, rejectWithValue }) => {
    try {
      const response = await ClientService.getAllClients(page)
      dispatch(addPage(page)) // Ajout de la page chargée
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error")
    }
  }
)

export const getClientById = createAsyncThunk(
  "client/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await ClientService.getClientById(id)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error")
    }
  }
)

export const getSearchClient = createAsyncThunk(
  "client/search",
  async ({ page, value }, { dispatch, getState, rejectWithValue }) => {
    try {
      const response = await ClientService.getSearchClients(value, page)
      dispatch(addSearchPage(page))
      const state = getState()
      const currentPage = state.client.currentPage
      if (currentPage === 1) {
        dispatch(clearSearchedClients())
      }
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error")
    }
  }
)

export const validateClientAccount = createAsyncThunk(
  "client/validateAccount",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await ClientService.validateAccount(id)
      dispatch(clearStates())
      dispatch(getAllClients(1))
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error")
    }
  }
)

export const banClientAccount = createAsyncThunk(
  "client/banAccount",
  async ({ id, reason }, { rejectWithValue, dispatch }) => {
    try {
      const response = await ClientService.banAccount(id, reason)
      dispatch(clearStates())
      dispatch(getAllClients(1)) // Recharger les clients après le bannissement
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Error")
    }
  }
)

export const deleteClientAccount = createAsyncThunk(
  "client/delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await ClientService.deleteAccount(id)
      dispatch(clearStates())
      dispatch(getAllClients(1)) // Recharger les clients après le bannissement
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Error")
    }
  }
)

export const clientSlice = createSlice({
  name: "client",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllClients.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllClients.fulfilled, (state, action) => {
        state.loading = false
        state.clients = action.payload.data.clients
        state.totalItems = action.payload.totalItems
      })
      .addCase(getAllClients.rejected, (state, action) => {
        state.message = action.payload
        state.loading = false
        state.showMessage = true
      })
      .addCase(getClientById.pending, (state) => {
        state.loading = true
      })
      .addCase(getClientById.fulfilled, (state, action) => {
        state.loading = false
        state.client = action.payload
      })
      .addCase(getClientById.rejected, (state, action) => {
        state.message = action.payload
        state.loading = false
        state.showMessage = true
      })
      .addCase(getSearchClient.pending, (state) => {
        state.loading = true
      })
      .addCase(getSearchClient.fulfilled, (state, action) => {
        state.loading = false
        state.searchedClients = [
          ...state.searchedClients,
          ...action.payload.data,
        ]
        state.totalItemsSearched = action.payload.totalItems
      })
      .addCase(getSearchClient.rejected, (state, action) => {
        state.message = action.payload
        state.loading = false
        state.showMessage = true
      })
      .addCase(validateClientAccount.pending, (state) => {
        state.loading = true
      })
      .addCase(validateClientAccount.fulfilled, (state, action) => {
        state.loading = false
        state.validateModelOpen = false
      })
      .addCase(validateClientAccount.rejected, (state, action) => {
        state.loading = false
        state.message = action.payload
        state.showMessage = true
      })
      .addCase(banClientAccount.pending, (state) => {
        state.loading = true
      })
      .addCase(banClientAccount.fulfilled, (state, action) => {
        state.loading = false

        state.bannedModelOpen = false
      })
      .addCase(banClientAccount.rejected, (state, action) => {
        state.loading = false
        state.message = action.payload
        state.showMessage = true
      })
      .addCase(deleteClientAccount.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteClientAccount.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(deleteClientAccount.rejected, (state, action) => {
        state.loading = false
        state.message = action.payload
        state.showMessage = true
      })
  },
  reducers: {
    addPage: (state, action) => {
      state.loadedPages = [...state.loadedPages, action.payload]
    },
    addSearchPage: (state, action) => {
      state.loadedSearchPages = [...state.loadedSearchPages, action.payload]
    },
    clearSearchedClients: (state) => {
      state.searchedClients = []
    },
    clearStates: (state) => {
      state.clients = []
      state.currentPage = 1
      state.loadedPages = []
      state.loadedSearchPages = []
      state.totalItems = null
      state.totalItemsSearched = null
      state.searchedClients = []
      state.searchValue = null
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    setValidateModel: (state, action) => {
      state.validateModelOpen = action.payload.etat
    },
    setBanModel: (state, action) => {
      state.bannedModelOpen = action.payload.etat
    },
  },
})

export const {
  addPage,
  addSearchPage,
  clearSearchedClients,
  clearStates,
  setCurrentPage,
  setSearchValue,
  setValidateModel,
  setBanModel,
} = clientSlice.actions

export default clientSlice.reducer
