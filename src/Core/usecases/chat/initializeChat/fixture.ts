import { IdProvider } from "./../../../gateways/IdProvider";
import { SpySocketProvider } from "../../../../Secondary-Adapters/SocketProvider/SpySocketProvider";
import { ChatStatus } from "../../../domain/Chat";
import { StateBuilder } from "../../../store/builders/StateBuilder";
import { RootState, ReduxStore } from "../../../store/store";
import { CHAT_FIXTURE_DATA, ChatFixtureDependencies } from "../chatFixture";
import { initializeChat } from "./initializeChat";

const DATA = {
  STUB_CHAT_ID: "1234",
};

export class Fixture {
  private initialState!: RootState;
  private store!: ReduxStore;
  private socketProvider!: SpySocketProvider;

  constructor(private chatFixture: ChatFixtureDependencies) {}

  givenAuthenticatedUser() {
    this.store = this.chatFixture.store;
    this.socketProvider = this.chatFixture.socketProvider as SpySocketProvider;
    this.initialState = this.store.getState();
    this.chatFixture.idProvider.StubValue(DATA.STUB_CHAT_ID);
  }

  async whenUserInitializeChat() {
    await this.store.dispatch(initializeChat());
  }

  thenTheChatIsInitialized() {
    expect(this.socketProvider.ConnectArgs).toStrictEqual([
      { userId: CHAT_FIXTURE_DATA.FAKE_USER.id, chatId: DATA.STUB_CHAT_ID },
    ]);

    expect(this.store.getState()).toStrictEqual({
      ...StateBuilder.init()
        .withInitialState(this.initialState)
        .withChat({
          id: DATA.STUB_CHAT_ID,
          messageIds: [],
          status: ChatStatus.INITIALIZED,
        })
        .build(),
    });
  }
}
