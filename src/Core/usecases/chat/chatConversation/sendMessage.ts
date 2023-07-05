import { Message } from "../../../domain/Message";
import { IdProvider } from "../../../gateways/IdProvider";

import { RootState } from "../../../store/store";
import { SocketProvider } from "../../../gateways/SocketProvider";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectFullName } from "../../../store/slices/user/selectors/selectFullName";
import { selectUserId } from "../../../store/slices/user/selectors/selectUser";
import { EventType } from "../../../domain/Events/ChatBoxEvent";

export const sendMessage = createAsyncThunk<
  Message,
  { messageText: string },
  {
    state: RootState;
    extra: {
      socketProvider: SocketProvider;
      idProvider: IdProvider;
    };
  }
>("sendMessage", async ({ messageText }, { extra, getState }) => {
  const newId = extra.idProvider.generate();
  const selectedUserId = selectUserId(getState());
  const selectedUserFullName = selectFullName(getState());

  const newMessage = {
    id: newId,
    text: messageText,
    from: selectedUserFullName,
  };

  extra.socketProvider.send({
    type: EventType.MESSAGE_SENDED,
    userId: selectedUserId,
    payload: newMessage,
  });

  return newMessage;
});
