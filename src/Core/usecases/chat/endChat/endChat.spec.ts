import { Fixture } from "./fixture";

import { ChatFixture } from "../chatFixture";

describe("endChat usecase", () => {
  const _ = new Fixture(new ChatFixture());

  it("should end chat", () => {
    _.givenAuthenticatedUserAndInitializedChat();

    _.whenUserEndChat();

    _.thenTheChatIsClosed();
  });
});
