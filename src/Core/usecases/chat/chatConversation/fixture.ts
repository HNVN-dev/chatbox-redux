import { Message } from "../../../domain/Message";
import { User } from "../../../domain/User";
import { StubIdProvider } from "../../../../Secondary-Adapters/IdProvider/StubIdProvider";
import { StateBuilder } from "../../../store/builders/StateBuilder";
import { ReduxStore, RootState, StoreBuilder } from "../../../store/store";
import { FakeSocketProvider } from "../../../../Secondary-Adapters/WebSocketProvider/FakeSocketProvider";
import { initializeChat } from "../initializeChat/initializeChat";
import { sendMessage } from "./sendMessage";
import { ChatStatus } from "../../../domain/Chat";
import { EventType } from "../../../domain/Events/ChatBoxEvent";

export class DATA {
  static STUB_CHAT_ID = "1234";

  static USER: User = {
    firstName: "Jean",
    lastName: "Bon",
    id: "7777",
  };

  static MESSAGES = {
    sendedMessage: { id: "1", from: "Jean Bon", text: "Hello" },
    receivedMessage: { id: "2", from: "Luc SkyWalker", text: "Hello" },
  };

  static RECEIVED_MESSAGE: Message = {
    id: "2",
    from: "Luc SkyWalker",
    text: "Hello",
  };
}

export class Fixture {
  private idProvider = new StubIdProvider();
  private socketProvider = new FakeSocketProvider();
  private initialState?: RootState;
  private store?: ReduxStore;

  async givenAuthenticatedUserAndInitializedChat() {
    this.initStoreWithAuthenticatedUser();

    await this.initializeChat();
  }

  async whenUserSendMessage() {
    this.stubId("1");
    await this.store!.dispatch(sendMessage({ messageText: "Hello" }));
  }

  whenUserReceiveMessage() {
    this.socketProvider.simulateOnEventReceived(
      EventType.MESSAGE_RECEIVED,
      DATA.MESSAGES.receivedMessage
    );
  }

  thenTheChatShouldContain({
    messageId,
    message,
  }: {
    messageId: string;
    message: Message;
  }) {
    expect(this.store!.getState()).toStrictEqual({
      ...StateBuilder.init()
        .withInitialState(this.initialState!)
        .withChat({
          id: DATA.STUB_CHAT_ID,
          messageIds: [messageId],
          status: ChatStatus.INITIALIZED,
        })
        .withMessages({
          ids: [messageId],
          entities: {
            [messageId]: message,
          },
        })
        .build(),
    });
  }

  private initStoreWithAuthenticatedUser() {
    const preloadedStateWithUser = StateBuilder.init()
      .withUser(DATA.USER)
      .build();

    this.store = StoreBuilder.init()
      .withDependencies({
        socketProvider: this.socketProvider,
        idProvider: this.idProvider,
      })
      .withPreloadedState(preloadedStateWithUser)
      .build();

    this.initialState = this.store.getState();
  }

  private async initializeChat() {
    this.stubId(DATA.STUB_CHAT_ID);
    await this.store!.dispatch(initializeChat());
  }

  private stubId(id: string) {
    this.idProvider.StubValue = id;
  }
}
