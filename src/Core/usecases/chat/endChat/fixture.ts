import { SpySocketProvider } from "../../../../Secondary-Adapters/SocketProvider/SpySocketProvider";
import { ChatStatus } from "../../../domain/Chat";
import { StateBuilder } from "../../../store/builders/StateBuilder";
import { ReduxStore, RootState } from "../../../store/store";
import { ChatFixtureDependencies, CHAT_FIXTURE_DATA } from "../chatFixture";
import { endChat } from "./endChat";

export class Fixture {
  private initialState!: RootState;
  private store!: ReduxStore;
  private socketProvider!: SpySocketProvider;

  constructor(private chatFixture: ChatFixtureDependencies) {}

  givenAuthenticatedUserAndInitializedChat() {
    this.store = this.chatFixture.store;
    this.socketProvider = this.chatFixture.socketProvider as SpySocketProvider;
    this.initialState = this.store.getState();
  }

  whenUserEndChat() {
    this.store.dispatch(endChat());
  }

  thenTheChatIsClosed() {
    expect(this.socketProvider.isDisconnectCalledOnce()).toBeTruthy();

    expect(this.store.getState()).toStrictEqual({
      ...StateBuilder.init()
        .withInitialState(this.initialState)
        .withChat({
          ...CHAT_FIXTURE_DATA.FAKE_INITIALIZED_CHAT,
          status: ChatStatus.ENDED,
        })
        .build(),
    });
  }
}
