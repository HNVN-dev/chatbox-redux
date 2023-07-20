import { Message } from "../../../domain/Message";
import { IdProvider } from "../../../gateways/IdProvider";

import { RootState } from "../../../store/store";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectFullName } from "../../../store/slices/user/selectors/selectFullName";

export const sendMessage = createAsyncThunk<
  Message,
  { messageText: string },
  {
    state: RootState;
    extra: {
      idProvider: IdProvider;
    };
  }
>("sendMessage", async ({ messageText }, { extra, getState }) => {
  const newId = extra.idProvider.generate();

  return {
    id: newId,
    text: messageText,
    from: selectFullName(getState()),
  };
});
