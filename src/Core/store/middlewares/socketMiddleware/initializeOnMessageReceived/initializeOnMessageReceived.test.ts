import { ChatFixture } from "../../../../usecases/chat/chatFixture";
import { Fixture } from "./fixture";

describe("initializeOnMessageReceived events", () => {
  const _ = new Fixture(new ChatFixture());

  it("should receive message", () => {
    _.givenAuthenticatedUserAndInitializedChat();

    _.whenUserReceiveMessage();

    _.thenTheMessageIsReceived();
  });
});
