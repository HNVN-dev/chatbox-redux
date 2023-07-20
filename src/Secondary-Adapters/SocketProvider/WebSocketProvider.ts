import {
  ChatInitialized,
  EventType,
  MessageSended,
} from "../../Core/domain/Events/ChatBoxEvent";

import { Message } from "../../Core/domain/Message";
import { SocketProvider } from "../../Core/gateways/SocketProvider";
import { InitializeChatProps } from "../../Core/usecases/chat/initializeChat/initializeChat";

export class WebSocketProvider implements SocketProvider {
  private webSocket?: WebSocket;

  connect({ chatId, userId }: InitializeChatProps) {
    this.webSocket = new WebSocket("ws://localhost:8080");

    this.webSocket.onopen = () => {
      this.send({
        userId,
        type: EventType.CHAT_INITIALIZED,
        payload: { chatId },
      });
    };
  }

  disconnect() {
    this.webSocket?.close();
  }

  on(eventName: string, callback: (props: Message) => void) {
    this.webSocket!.onmessage = (message: { data: string }) => {
      const receivedMessage = JSON.parse(message.data);

      if (receivedMessage.event === eventName) {
        callback(receivedMessage);
      }
    };
  }
  send(message: MessageSended | ChatInitialized) {
    this.webSocket!.send(JSON.stringify(message));
  }
}
