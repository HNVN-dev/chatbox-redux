import { SocketProvider } from "../../../gateways/SocketProvider";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const endChat = createAsyncThunk<
  void,
  void,
  { extra: { socketProvider: SocketProvider } }
>("endChat", async (_, { extra }) => {
  extra.socketProvider.disconnect();
});
