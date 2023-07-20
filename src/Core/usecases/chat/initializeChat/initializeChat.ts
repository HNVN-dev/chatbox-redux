import { createAsyncThunk } from "@reduxjs/toolkit";
import { IdProvider } from "../../../gateways/IdProvider";

import { RootState } from "../../../store/store";
import { selectUserId } from "../../../store/slices/user/selectors/selectUser";

export interface InitializeChatProps {
  chatId: string;
  userId: string;
}

export const initializeChat = createAsyncThunk<
  InitializeChatProps,
  void,
  {
    state: RootState;
    extra: {
      idProvider: IdProvider;
    };
  }
>("initializeChat", async (_, { extra: { idProvider }, getState }) => {
  const newChatId = idProvider.generate();
  const userId = selectUserId(getState());

  return { chatId: newChatId, userId };
});
