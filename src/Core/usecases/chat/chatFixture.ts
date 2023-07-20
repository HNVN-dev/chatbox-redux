import { StubIdProvider } from "../../../Secondary-Adapters/IdProvider/StubIdProvider";
import { SpySocketProvider } from "../../../Secondary-Adapters/SocketProvider/SpySocketProvider";
import { Chat, ChatStatus } from "../../domain/Chat";
import { User } from "../../domain/User";
import { SocketProvider } from "../../gateways/SocketProvider";
import { StateBuilder } from "../../store/builders/StateBuilder";
import { ReduxStore, StoreBuilder } from "../../store/store";

export class CHAT_FIXTURE_DATA {
  static FAKE_USER: User = {
    id: "32311",
    firstName: "Jack",
    lastName: "Burton",
  };
  static FAKE_INITIALIZED_CHAT: Chat = {
    id: "34312312",
    messageIds: [],
    status: ChatStatus.INITIALIZED,
  };
}

export type ChatFixtureDependencies = {
  store: ReduxStore;
  socketProvider: SocketProvider;
  idProvider: StubIdProvider;
};

export class ChatFixture {
  private idProvider = new StubIdProvider();
  private socketProvider: SocketProvider = new SpySocketProvider();
  private store!: ReduxStore;

  static init() {
    return new ChatFixture();
  }

  withSocketProvider(socketProvider: SocketProvider) {
    this.socketProvider = socketProvider;
    return this;
  }

  withStoreWithAuthenticatedUserAndInitializedChat() {
    const preloadedStateWithUserAndChat = StateBuilder.init()
      .withUser({
        ...CHAT_FIXTURE_DATA.FAKE_USER,
      })
      .withChat({ ...CHAT_FIXTURE_DATA.FAKE_INITIALIZED_CHAT })
      .build();

    this.store = StoreBuilder.init()
      .withDependencies({
        idProvider: this.idProvider,
        socketProvider: this.socketProvider,
      })
      .withPreloadedState(preloadedStateWithUserAndChat)
      .build();

    return this;
  }

  withStoreWithAuthenticatedUser() {
    const preloadedStateWithUser = StateBuilder.init()
      .withUser({
        ...CHAT_FIXTURE_DATA.FAKE_USER,
      })
      .build();

    this.store = StoreBuilder.init()
      .withDependencies({
        idProvider: this.idProvider,
        socketProvider: this.socketProvider,
      })
      .withPreloadedState(preloadedStateWithUser)
      .build();

    return this;
  }

  build() {
    return {
      store: this.store,
      socketProvider: this.socketProvider,
      idProvider: this.idProvider,
    };
  }
}
