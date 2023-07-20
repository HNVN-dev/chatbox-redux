import { Message } from "../../Core/domain/Message";
import { SocketProvider } from "../../Core/gateways/SocketProvider";

export class FakeSocketProvider implements SocketProvider {
  private eventMapFn = new Map<string, (props: Message) => void>();

  async connect() {
    //
  }

  async disconnect() {
    //
  }

  send() {
    //
  }

  on(eventName: string, callback: (props: Message) => void) {
    this.eventMapFn.set(eventName, callback);
  }

  simulateOnEventReceived(eventName: string, payload: Message) {
    const maybeEventDispatcherFn = this.eventMapFn.get(eventName);
    return maybeEventDispatcherFn ? maybeEventDispatcherFn(payload) : null;
  }
}
