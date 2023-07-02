import { WebSocketProvider } from "../../Core/gateways/WebSocketProvider";

export class SpyWebSocketProvider implements WebSocketProvider {
  private baseUrl = "";
  private args: string[] = [];

  private constructUrl(roomId: string) {
    this.baseUrl = this.baseUrl += roomId;
  }

  defineBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get Args() {
    return this.args;
  }

  get BaseUrl() {
    return this.baseUrl;
  }

  async connect(roomId: string) {
    this.constructUrl(roomId);
    this.args.push(this.baseUrl);
  }

  async disconnect() {
    this.baseUrl = "";
  }
}
