import { StubIdProvider } from "../../Secondary-Adapters/IdProvider/StubIdProvider";
import { SpyWebSocketProvider } from "../../Secondary-Adapters/WebSocketProvider/SpyWebSocketProvider";
import { StateBuilder } from "../store/builders/StateBuilder";
import { ChatStatus } from "../store/slices/chat";
import { StoreBuilder } from "../store/store";
import { DATA } from "./fixture";
import { initializeChat } from "./initializeChat";

describe("initializeChat usecase", () => {
  const webSocketProvider = new SpyWebSocketProvider();
  webSocketProvider.defineBaseUrl(DATA.FAKE_BASE_URL);

  const idProvider = new StubIdProvider();
  idProvider.StubValue = DATA.STUB_CHAT_ID;

  const store = StoreBuilder.init()
    .withDependencies({ idProvider, webSocketProvider })
    .build();

  const initialState = store.getState();

  it("should initialize a chat given an authenticated user", async () => {
    await store.dispatch(initializeChat());

    expect(webSocketProvider.Args).toStrictEqual([
      `${DATA.FAKE_BASE_URL + DATA.STUB_CHAT_ID}`,
    ]);

    expect(store.getState()).toStrictEqual({
      ...StateBuilder.init()
        .withInitialState(initialState)
        .withChat({
          id: DATA.STUB_CHAT_ID,
          messageIds: [],
          status: ChatStatus.INITIALIZED,
        })
        .build(),
    });
  });
});
