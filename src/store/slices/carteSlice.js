import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { act } from "react"
import CardService from "services/CarteService"

export const initialState = {
  loading: false,
  message: "",
  showMessage: false,
  redirect: "",
  cards: [],
  card: null,
  searchedCards: [],
  selectedCard: {},
  totalItems: null,
  totalItemsSearched: null,
  loadedPages: [],
  loadedSearchPages: [],
  currentPage: 1,
  searchValue: null,
}

export const getAllCards = createAsyncThunk(
  "card/getAll",
  async (page, {rejectWithValue, dispatch}) => {
    try {
      const response = await CardService.getAllCards(page)
      dispatch(addPage(page))
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error")
    }
  }
)

export const getSearchCartes = createAsyncThunk(
  "card/search",
  async ({ value, page }, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await CardService.getSearchCards(value, page)
      dispatch(addSearchPage(page))
      const state = getState()
      const currentPage = state.card.currentPage
      if (currentPage === 1) {
        dispatch(clearSearchedCards())
      }
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error")
    }
  }
)

export const deleteCardById = createAsyncThunk(
  "card/delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await CardService.deleteCardById(id)
      dispatch(clearStates())
      dispatch(getAllCards(1))
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error")
    }
  }
)

export const createCard = createAsyncThunk(
  "card/create",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await CardService.createCard(data)
      dispatch(clearStates())
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error")
    }
  }
)

export const updateCardById = createAsyncThunk(
  "card/update",
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      const response = await CardService.updateCardById(id, data)
      dispatch(clearStates())
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error")
    }
  }
)

export const getCardById = createAsyncThunk(
  "card/getByID",
  async (id, { rejectWithValue }) => {
    try {
      const response = await CardService.getCardById(id)

      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error")
    }
  }
)

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    showCardMessage: (state, action) => {
      state.message = action.payload
      state.showMessage = true
      state.loading = false
    },
    hideCardMessage: (state) => {
      state.message = ""
      state.showMessage = false
    },
    showLoading: (state) => {
      state.loading = true
    },
    hideLoading: (state) => {
      state.loading = false
    },
    setSelectedCard: (state, action) => {
      state.selectedCard = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    clearStates: (state) => {
      state.cards = []
      state.searchedCards = []
      state.currentPage = 1
      state.loadedPages = []
      state.loadedSearchPages = []
      state.totalItems = null
      state.totalItemsSearched = null
      state.searchValue = null
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    addPage: (state, action) => {
      state.loadedPages = [...state.loadedPages, action.payload]
    },
    addSearchPage: (state, action) => {
      state.loadedSearchPages = [...state.loadedSearchPages, action.payload]
    },
    clearSearchedCards: (state) => {
      state.searchedCards = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCards.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllCards.fulfilled, (state, action) => {
        state.loading = false
        state.cards = action.payload.data.cartes
        state.totalItems = action.payload.totalItems
      })
      .addCase(getAllCards.rejected, (state, action) => {
        state.message = action.payload
        state.showMessage = true
        state.loading = false
      })
      .addCase(getSearchCartes.pending, (state) => {
        state.loading = true
      })
      .addCase(getSearchCartes.fulfilled, (state, action) => {
        state.loading = false
        state.searchedCards = [...state.searchedCards, ...action.payload.cards]
        state.totalItemsSearched = action.payload.totalItems
      })
      .addCase(getSearchCartes.rejected, (state, action) => {
        state.message = action.payload
        state.showMessage = true
        state.loading = false
      })
      .addCase(deleteCardById.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteCardById.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(deleteCardById.rejected, (state, action) => {
        state.message = action.payload
        state.showMessage = true
        state.loading = false
      })
      .addCase(createCard.pending, (state) => {
        state.loading = true
      })
      .addCase(createCard.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(createCard.rejected, (state, action) => {
        state.message = action.payload
        state.showMessage = true
        state.loading = false
      })
      .addCase(updateCardById.pending, (state) => {
        state.loading = true
      })
      .addCase(updateCardById.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(updateCardById.rejected, (state, action) => {
        state.message = action.payload
        state.showMessage = true
        state.loading = false
      })

      .addCase(getCardById.pending, (state) => {
        state.loading = true
      })
      .addCase(getCardById.fulfilled, (state, action) => {
        state.loading = false
        state.card = action.payload.carte
      })
      .addCase(getCardById.rejected, (state, action) => {
        state.message = action.payload
        state.showMessage = true
        state.loading = false
      })
  },
})

export const {
  showCardMessage,
  hideCardMessage,
  showLoading,
  setSelectedCard,
  setCurrentPage,
  clearStates,
  setSearchValue,
  addPage,
  addSearchPage,
  clearSearchedCards,
  hideLoading,
} = cardSlice.actions

export default cardSlice.reducer
