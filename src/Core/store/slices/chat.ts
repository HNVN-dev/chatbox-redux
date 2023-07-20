import { sendMessage } from "../../usecases/chat/sendMessage/sendMessage";
import { endChat } from "../../usecases/chat/endChat/endChat";
import { initializeChat } from "../../usecases/chat/initializeChat/initializeChat";
import { createSlice } from "@reduxjs/toolkit";
import { MESSAGE_RECEIVED } from "./messages";
import {
  Chat,
  ChatStatus,
  EndedChat,
  InitializedChat,
} from "../../domain/Chat";

const chatInitialState: Chat = {
  id: "",
  messageIds: [],
  status: ChatStatus.IDLE,
};

export const chatsSlice = createSlice({
  name: "chat",
  initialState: chatInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeChat.fulfilled, (state, action) => {
        return chatInitialization(state, action.payload.chatId);
      })
      .addCase(endChat, (state) => {
        return chatEnd(state);
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messageIds.push(action.payload.id);
      })
      .addCase(MESSAGE_RECEIVED, (state, action) => {
        state.messageIds.push(action.payload.id);
      });
  },
});

const chatInitialization = (state: Chat, id: string): InitializedChat => {
  return {
    ...state,
    id,
    status: ChatStatus.INITIALIZED,
  };
};

const chatEnd = (state: Chat): EndedChat => {
  return {
    ...state,
    status: ChatStatus.ENDED,
  };
};
