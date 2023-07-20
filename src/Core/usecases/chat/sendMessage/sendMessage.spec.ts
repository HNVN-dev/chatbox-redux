import { ChatFixture } from "../chatFixture";
import { Fixture } from "./fixture";

describe("send Message use case", () => {
  const _ = new Fixture(new ChatFixture());

  it("should be sent successfully", async () => {
    _.givenAuthenticatedUserAndInitializedChat();

    await _.whenUserSendMessage();

    _.thenTheMessageShouldBeSended();
  });
});
