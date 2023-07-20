import { EventType } from "../../../domain/Events/ChatBoxEvent";
import { Message } from "../../../domain/Message";
import { SocketProvider } from "../../../gateways/SocketProvider";
import { MESSAGE_RECEIVED } from "../../slices/messages";
import { ThunkAppDispatch } from "../../store";

export const initializeOnMessageReceived = ({
  dispatch,
  socketProvider,
}: {
  dispatch: ThunkAppDispatch;
  socketProvider: SocketProvider;
}) => {
  socketProvider.on(EventType.MESSAGE_RECEIVED, (message: Message) => {
    dispatch(MESSAGE_RECEIVED(message));
  });
};
