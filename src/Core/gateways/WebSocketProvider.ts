export interface WebSocketProvider {
  defineBaseUrl: (baseUrl: string) => void;
  connect: (chatId: string) => Promise<void>;
  disconnect: () => Promise<void>;
}
