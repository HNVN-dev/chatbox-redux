import { MESSAGE_RECEIVED } from "./../slices/messages";
import { Message } from "../../domain/Message";
import { SocketProvider } from "../../gateways/SocketProvider";
import { initializeChat } from "../../usecases/chat/initializeChat/initializeChat";
import { createAppListenerMiddleware } from "./createListenerMiddleware";
import { EventType } from "../../domain/Events/ChatBoxEvent";

export const listener = createAppListenerMiddleware();

export const socketMiddleware = ({
  socketProvider,
}: {
  socketProvider: SocketProvider;
}) => {
  listener.startListening({
    actionCreator: initializeChat.fulfilled,
    effect: async ({ payload: { chatId } }, { dispatch }) => {
      socketProvider.connect(chatId);

      socketProvider.on(EventType.MESSAGE_RECEIVED, (message: Message) => {
        dispatch(MESSAGE_RECEIVED(message));
      });
    },
  });
  return listener.middleware;
};
