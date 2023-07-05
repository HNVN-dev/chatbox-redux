import { Message } from "../Message";

export enum EventType {
  MESSAGE_RECEIVED = "MESSAGE_RECEIVED",
  MESSAGE_SENDED = "MESSAGE_SENDED",
  CHAT_INITIALIZED = "CHAT_INITIALIZED",
}

export interface ChatBoxEvent<T extends EventType, P> {
  type: T;
  userId: string;
  payload: P;
}

export type MessageSended = ChatBoxEvent<EventType.MESSAGE_SENDED, Message>;

export type ChatInitialized = ChatBoxEvent<
  EventType.CHAT_INITIALIZED,
  { chatId: string }
>;
