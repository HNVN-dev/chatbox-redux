import { FakeSocketProvider } from "../../../../Secondary-Adapters/SocketProvider/FakeSocketProvider";
import { ChatStatus } from "../../../domain/Chat";
import { EventType } from "../../../domain/Events/ChatBoxEvent";

import { StateBuilder } from "../../builders/StateBuilder";
import { StoreBuilder } from "../../store";

describe("initializeOnMessageReceived events", () => {
  const socketProvider = new FakeSocketProvider();
  const preloadedState = StateBuilder.init()
    .withChat({
      id: "1",
      messageIds: [],
      status: ChatStatus.INITIALIZED,
    })
    .build();
  const store = StoreBuilder.init()
    .withDependencies({ socketProvider })
    .withPreloadedState(preloadedState)
    .build();

  const initialState = store.getState();

  it("should receive message", () => {
    socketProvider.simulateOnEventReceived(EventType.MESSAGE_RECEIVED, {
      id: "1234",
      from: "Mr Mackey",
      text: "How can I help you ?",
    });

    expect(store.getState()).toStrictEqual({
      ...StateBuilder.init()
        .withInitialState(initialState)
        .withChat({
          id: "1",
          messageIds: ["1234"],
          status: ChatStatus.INITIALIZED,
        })
        .withMessages({
          ids: ["1234"],
          entities: {
            "1234": {
              id: "1234",
              from: "Mr Mackey",
              text: "How can I help you ?",
            },
          },
        })
        .build(),
    });
  });
});
