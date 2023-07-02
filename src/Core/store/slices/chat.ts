import { endChat } from "../../usecases/endChat/endChat";
import { initializeChat } from "../../usecases/initializeChat/initializeChat";
import { createSlice } from "@reduxjs/toolkit";

export interface Chat<Status extends ChatStatus = ChatStatus> {
  id: string;
  messageIds: string[];
  status: Status;
}

type InitializedChat = Chat<ChatStatus.INITIALIZED>;
type EndedChat = Chat<ChatStatus.ENDED>;

export enum ChatStatus {
  INITIALIZED = "initialized",
  ENDED = "ended",
  IDLE = "idle",
}

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
      .addCase(endChat.fulfilled, (state, action) => {
        return chatEnd(state);
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
