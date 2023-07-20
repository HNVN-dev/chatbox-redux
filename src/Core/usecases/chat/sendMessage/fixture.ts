import { Message } from "../../../domain/Message";

import { StateBuilder } from "../../../store/builders/StateBuilder";
import { ReduxStore, RootState } from "../../../store/store";

import { sendMessage } from "./sendMessage";

import { SpySocketProvider } from "../../../../Secondary-Adapters/SocketProvider/SpySocketProvider";
import { EventType, MessageSended } from "../../../domain/Events/ChatBoxEvent";
import { CHAT_FIXTURE_DATA, ChatFixture } from "../chatFixture";

export class DATA {
  static SENDED_MESSAGE: Message = {
    id: "1",
    from: `${CHAT_FIXTURE_DATA.FAKE_USER.firstName} ${CHAT_FIXTURE_DATA.FAKE_USER.lastName}`,
    text: "Hello",
  };
}

export class Fixture {
  private initialState!: RootState;
  private store!: ReduxStore;
  private socketProvider!: SpySocketProvider;

  constructor(private chatFixture: ChatFixture) {}

  givenAuthenticatedUserAndInitializedChat() {
    this.store =
      this.chatFixture.buildStoreWithAuthenticatedUserAndInitializedChat();
    this.initialState = this.store.getState();
    this.socketProvider =
      this.chatFixture.getSocketProvider() as SpySocketProvider;
    this.chatFixture.getIdProvider().StubValue(DATA.SENDED_MESSAGE.id);
  }

  async whenUserSendMessage() {
    await this.store.dispatch(
      sendMessage({ messageText: DATA.SENDED_MESSAGE.text })
    );
  }

  thenTheMessageShouldBeSended() {
    expect(this.socketProvider.messageArgs).toStrictEqual<MessageSended[]>([
      {
        payload: DATA.SENDED_MESSAGE,
        type: EventType.MESSAGE_SENDED,
        userId: CHAT_FIXTURE_DATA.FAKE_USER.id,
      },
    ]);

    expect(this.store.getState()).toStrictEqual({
      ...StateBuilder.init()
        .withInitialState(this.initialState)
        .withChat({
          ...CHAT_FIXTURE_DATA.FAKE_INITIALIZED_CHAT,
          messageIds: [DATA.SENDED_MESSAGE.id],
        })
        .withMessages({
          ids: [DATA.SENDED_MESSAGE.id],
          entities: {
            [DATA.SENDED_MESSAGE.id]: DATA.SENDED_MESSAGE,
          },
        })
        .build(),
    });
  }
}
