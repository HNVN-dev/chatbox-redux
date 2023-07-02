import { createAsyncThunk } from "@reduxjs/toolkit";
import { IdProvider } from "../../gateways/IdProvider";
import { WebSocketProvider } from "../../gateways/WebSocketProvider";
import { RootState } from "../../store/store";

export const initializeChat = createAsyncThunk<
  { chatId: string },
  void,
  {
    state: RootState;
    extra: {
      idProvider: IdProvider;
      webSocketProvider: WebSocketProvider;
    };
  }
>("initializeChat", async (_, { extra: { idProvider, webSocketProvider } }) => {
  const newChatId = idProvider.generate();

  await webSocketProvider.connect(newChatId);

  return { chatId: newChatId };
});
