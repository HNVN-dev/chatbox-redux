import { FakeSocketProvider } from "../../../../../Secondary-Adapters/SocketProvider/FakeSocketProvider";

import { ChatStatus } from "../../../../domain/Chat";
import { EventType } from "../../../../domain/Events/ChatBoxEvent";
import { Message } from "../../../../domain/Message";
import {
  ChatFixture,
  CHAT_FIXTURE_DATA,
} from "../../../../usecases/chat/chatFixture";

import { StateBuilder } from "../../../builders/StateBuilder";
import { ReduxStore, RootState } from "../../../store";

class DATA {
  static RECEIVED_MESSAGE: Message = {
    id: "1234",
    from: "Mr Mackey",
    text: "How can I help you ?",
  };
}

export class Fixture {
  private initialState!: RootState;
  private store!: ReduxStore;
  private socketProvider!: FakeSocketProvider;

  constructor(private chatFixture: ChatFixture) {}

  givenAuthenticatedUserAndInitializedChat() {
    this.store = this.chatFixture
      .withSocketProvider(new FakeSocketProvider())
      .buildStoreWithAuthenticatedUserAndInitializedChat();
    this.socketProvider =
      this.chatFixture.getSocketProvider() as FakeSocketProvider;
    this.initialState = this.store.getState();
  }

  async whenUserReceiveMessage() {
    this.socketProvider.simulateOnEventReceived(
      EventType.MESSAGE_RECEIVED,
      DATA.RECEIVED_MESSAGE
    );
  }

  thenTheMessageIsReceived() {
    expect(this.store.getState()).toStrictEqual({
      ...StateBuilder.init()
        .withInitialState(this.initialState)
        .withChat({
          id: CHAT_FIXTURE_DATA.FAKE_INITIALIZED_CHAT.id,
          messageIds: [DATA.RECEIVED_MESSAGE.id],
          status: ChatStatus.INITIALIZED,
        })
        .withMessages({
          ids: [DATA.RECEIVED_MESSAGE.id],
          entities: {
            [DATA.RECEIVED_MESSAGE.id]: DATA.RECEIVED_MESSAGE,
          },
        })
        .build(),
    });
  }
}
