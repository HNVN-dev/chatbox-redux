export enum ChatStatus {
  INITIALIZED = "initialized",
  ENDED = "ended",
  IDLE = "idle",
}

export interface Chat<Status extends ChatStatus = ChatStatus> {
  id: string;
  messageIds: string[];
  status: Status;
}

export type InitializedChat = Chat<ChatStatus.INITIALIZED>;
export type EndedChat = Chat<ChatStatus.ENDED>;
