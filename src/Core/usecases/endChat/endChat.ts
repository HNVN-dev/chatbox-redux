import { WebSocketProvider } from "./../../gateways/WebSocketProvider";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const endChat = createAsyncThunk<
  void,
  void,
  { extra: { webSocketProvider: WebSocketProvider } }
>("endChat", async (_, { extra }) => {
  await extra.webSocketProvider.disconnect();
});
