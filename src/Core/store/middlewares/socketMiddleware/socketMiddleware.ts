import { SocketProvider } from "../../../gateways/SocketProvider";

import { initializeChat } from "../../../usecases/chat/initializeChat/initializeChat";
import { createAppListenerMiddleware } from "../createListenerMiddleware";
import { EventType } from "../../../domain/Events/ChatBoxEvent";
import { endChat } from "../../../usecases/chat/endChat/endChat";
import { sendMessage } from "../../../usecases/chat/sendMessage/sendMessage";
import { selectUserId } from "../../slices/user/selectors/selectUser";

export const listener = createAppListenerMiddleware();

const startListen = listener.startListening;

export const socketMiddleware = ({
  socketProvider,
}: {
  socketProvider: SocketProvider;
}) => {
  startListen({
    actionCreator: initializeChat.fulfilled,
    effect: async ({ payload: { chatId, userId } }) => {
      socketProvider.connect({ chatId, userId });
    },
  });
  startListen({
    actionCreator: endChat,
    effect: () => {
      socketProvider.disconnect();
    },
  });

  startListen({
    actionCreator: sendMessage.fulfilled,
    effect: async ({ payload }, { getState }) => {
      const selectedUserId = selectUserId(getState());

      socketProvider.send({
        type: EventType.MESSAGE_SENDED,
        userId: selectedUserId,
        payload: { ...payload },
      });
    },
  });

  return listener.middleware;
};
