import {
  EntityState,
  createAction,
  createEntityAdapter,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import { Message } from "../../domain/Message";
import { sendMessage } from "../../usecases/chat/sendMessage/sendMessage";
import { EventType } from "../../domain/Events/ChatBoxEvent";

export type MessagesSlice = EntityState<Message>;

const messagesAdapter = createEntityAdapter<Message>();

export const MESSAGE_RECEIVED = createAction<Message>(
  EventType.MESSAGE_RECEIVED
);

export const messagesSlice = createSlice({
  name: "messages",
  initialState: messagesAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(sendMessage.fulfilled, MESSAGE_RECEIVED),
      (state, { payload: { text, from, id } }) => {
        messagesAdapter.addOne(state, {
          text,
          from,
          id,
        });
      }
    );
  },
});
