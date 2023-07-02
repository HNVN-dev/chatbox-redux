import { initializeChat } from "./../../usecases/initializeChat";
import { createSlice } from "@reduxjs/toolkit";

export interface Chat<Status extends ChatStatus = ChatStatus> {
  id: string;
  messageIds: string[];
  status: Status;
}

type InitializedChat = Chat<ChatStatus.INITIALIZED>;
type ClosedChat = Chat<ChatStatus.CLOSED>;

export enum ChatStatus {
  INITIALIZED = "initialized",
  CLOSED = "closed",
}

const chatInitialState: Chat = {
  id: "",
  messageIds: [],
  status: ChatStatus.CLOSED,
};

export const chatsSlice = createSlice({
  name: "chat",
  initialState: chatInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initializeChat.fulfilled, (state, action) => {
      return chatInitialization(state, action.payload.chatId);
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
