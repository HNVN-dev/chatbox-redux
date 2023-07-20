import { Fixture } from "./fixture";

import { ChatFixture } from "../chatFixture";

describe("initializeChat usecase", () => {
  const _ = new Fixture({
    ...ChatFixture.init().withStoreWithAuthenticatedUser().build(),
  });

  it("should initialize a chat given an authenticated user", async () => {
    _.givenAuthenticatedUser();

    await _.whenUserInitializeChat();

    _.thenTheChatIsInitialized();
  });
});
