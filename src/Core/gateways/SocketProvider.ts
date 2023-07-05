import { MessageSended } from "../domain/Events/ChatBoxEvent";
import { Message } from "../domain/Message";

export interface SocketProvider {
  connect: (chatId: string) => void;
  disconnect: () => void;
  on: (eventName: string, callback: (props: Message) => void) => void;
  send: (eventName: MessageSended) => void;
}
