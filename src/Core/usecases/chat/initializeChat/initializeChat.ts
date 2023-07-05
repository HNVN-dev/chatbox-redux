import { createAsyncThunk } from "@reduxjs/toolkit";
import { IdProvider } from "../../../gateways/IdProvider";

import { RootState } from "../../../store/store";

export const initializeChat = createAsyncThunk<
  { chatId: string },
  void,
  {
    state: RootState;
    extra: {
      idProvider: IdProvider;
    };
  }
>("initializeChat", async (_, { extra: { idProvider } }) => {
  const newChatId = idProvider.generate();

  return { chatId: newChatId };
});
