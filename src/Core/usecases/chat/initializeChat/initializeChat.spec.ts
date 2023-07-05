import { StubIdProvider } from "../../../../Secondary-Adapters/IdProvider/StubIdProvider";
import { FakeSocketProvider } from "../../../../Secondary-Adapters/WebSocketProvider/FakeSocketProvider";
import { StateBuilder } from "../../../store/builders/StateBuilder";
import { StoreBuilder } from "../../../store/store";
import { DATA } from "./fixture";
import { initializeChat } from "./initializeChat";
import { ChatStatus } from "../../../domain/Chat";

describe("initializeChat usecase", () => {
  const webSocketProvider = new FakeSocketProvider();

  const idProvider = new StubIdProvider();
  idProvider.StubValue = DATA.STUB_CHAT_ID;

  const store = StoreBuilder.init()
    .withDependencies({ idProvider, socketProvider: webSocketProvider })
    .build();

  const initialState = store.getState();

  it("should initialize a chat given an authenticated user", async () => {
    await store.dispatch(initializeChat());

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
