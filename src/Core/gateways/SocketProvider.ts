import { MessageSended } from "../domain/Events/ChatBoxEvent";
import { Message } from "../domain/Message";
import { InitializeChatProps } from "../usecases/chat/initializeChat/initializeChat";

export interface SocketProvider {
  connect: ({ chatId, userId }: InitializeChatProps) => void;
  disconnect: () => void;
  on: (eventName: string, callback: (props: Message) => void) => void;
  send: (eventName: MessageSended) => void;
}
