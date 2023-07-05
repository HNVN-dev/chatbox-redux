import { FakeSocketProvider } from "../../../../Secondary-Adapters/WebSocketProvider/FakeSocketProvider";
import { StateBuilder } from "../../../store/builders/StateBuilder";

import { StoreBuilder } from "../../../store/store";

import { endChat } from "./endChat";
import { DATA } from "./fixture";
import { ChatStatus } from "../../../domain/Chat";

describe("endChat usecase", () => {
  const socketProvider = new FakeSocketProvider();

  const preloadedStateWithInitializedChat = StateBuilder.init()
    .withChat({
      id: DATA.INITIALIZED_CHAT_ID,
      messageIds: [],
      status: ChatStatus.INITIALIZED,
    })
    .build();

  const store = StoreBuilder.init()
    .withPreloadedState(preloadedStateWithInitializedChat)
    .withDependencies({ socketProvider })
    .build();

  const initialState = store.getState();

  it("should end chat", async () => {
    await store.dispatch(endChat());

    expect(store.getState()).toStrictEqual({
      ...StateBuilder.init()
        .withInitialState(initialState)
        .withChat({
          id: DATA.INITIALIZED_CHAT_ID,
          messageIds: [],
          status: ChatStatus.ENDED,
        })
        .build(),
    });
  });
});
