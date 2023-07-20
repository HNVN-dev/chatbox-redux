import { Fixture } from "./fixture";

import { ChatFixture } from "../chatFixture";

describe("endChat usecase", () => {
  const _ = new Fixture({
    ...ChatFixture.init()
      .withStoreWithAuthenticatedUserAndInitializedChat()
      .build(),
  });

  it("should end chat", () => {
    _.givenAuthenticatedUserAndInitializedChat();

    _.whenUserEndChat();

    _.thenTheChatIsClosed();
  });
});
