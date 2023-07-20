import { MessageSended } from "../../Core/domain/Events/ChatBoxEvent";
import { SocketProvider } from "../../Core/gateways/SocketProvider";
import { InitializeChatProps } from "../../Core/usecases/chat/initializeChat/initializeChat";

export class SpySocketProvider implements SocketProvider {
  private disconnectCallCount = 0;
  private connectArgs: InitializeChatProps[] = [];
  private msgArgs: MessageSended[] = [];

  isDisconnectCalledOnce() {
    return this.disconnectCallCount === 1;
  }

  get ConnectArgs() {
    return this.connectArgs;
  }

  get messageArgs() {
    return this.msgArgs;
  }
  connect(props: InitializeChatProps) {
    this.connectArgs.push(props);
  }

  send(eventName: MessageSended) {
    this.msgArgs.push(eventName);
  }

  disconnect() {
    this.disconnectCallCount++;
  }
  on() {
    //
  }
}
