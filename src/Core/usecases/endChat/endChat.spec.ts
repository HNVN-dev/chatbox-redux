import { SpyWebSocketProvider } from "../../../Secondary-Adapters/WebSocketProvider/SpyWebSocketProvider";
import { StateBuilder } from "../../store/builders/StateBuilder";
import { ChatStatus } from "../../store/slices/chat";
import { StoreBuilder } from "../../store/store";

import { endChat } from "./endChat";
import { DATA } from "./fixture";

describe("endChat usecase", () => {
  const webSocketProvider = new SpyWebSocketProvider();
  webSocketProvider.defineBaseUrl(DATA.FAKE_BASE_URL);

  const preloadedStateWithInitializedChat = StateBuilder.init()
    .withChat({
      id: DATA.INITIALIZED_CHAT_ID,
      messageIds: [],
      status: ChatStatus.INITIALIZED,
    })
    .build();

  const store = StoreBuilder.init()
    .withPreloadedState(preloadedStateWithInitializedChat)
    .withDependencies({ webSocketProvider })
    .build();

  const initialState = store.getState();

  it("should end chat", async () => {
    await store.dispatch(endChat());

    expect(webSocketProvider.BaseUrl).toEqual("");

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
