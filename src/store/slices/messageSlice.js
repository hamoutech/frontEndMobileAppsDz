// MessageSlice.js

import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import MessageService from "services/MessageService";

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await MessageService.getMessages();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.data.message || "Erreur");
    }
  }
);

export const createMessage = createAsyncThunk(
  "message/createMessage",
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await MessageService.addmessage({ messageData });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.data.message || "Erreur");
    }
  }
);

// export const updateMessage = createAsyncThunk(
//   "messages/updateMessage",
//   async ({ messageId, updatedJobData }, { rejectWithValue }) => {
//     console.log("slice");
//     try {
//       const response = await MessageService.UpdateMessage(
//         messageId,
//         updatedJobData
//       );
//       return { messageId, updatedJob: response.data };
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.data.message || "Erreur");
//     }
//   }
// );

export const deleteMessage = createAsyncThunk(
  "messages/deleteMessage",
  async (id, { rejectWithValue }) => {
    try {
      await MessageService.deleteMessage(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.data.message || "Erreur");
    }
  }
);

export const fetchOneMessage = createAsyncThunk(
  "messages/fetchOneMessage", // erreur potentiel f ta3 message a verifier
  async (id, { rejectWithValue }) => {
    try {
      const response = await MessageService.getOneMessage(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.data.message || "Erreur");
    }
  }
);

const initialState = {
  messages: [],
  message: {},
  loading: false,
  error: null,
  playersByPosition: {},
};

const messageSlice = createSlice({
  name: "messages",
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
      // Fetch messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create Message
      .addCase(createMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //fetch one message
      .addCase(fetchOneMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(fetchOneMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) //   // Delete Message
      .addCase(deleteMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        const messageId = action.payload;
        state.messages = state.messages.filter(
          (message) => message._id !== messageId
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // Update Message
    //   .addCase(updateMessage.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(updateMessage.fulfilled, (state, action) => {
    //     const { messageId, updatedJob } = action.payload;
    //     const index = state.messages.findIndex(
    //       (message) => message.id === messageId
    //     );
    //     if (index !== -1) {
    //       state.messages[index] = { ...state.messages[index], ...updatedJob };
    //     }
    //     state.loading = false;
    //   })
    //   .addCase(updateMessage.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message;
    //   })
  },
});
export default messageSlice.reducer;
export const { showLoading, hideLoading, hideError } = messageSlice.actions;
