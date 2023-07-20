import { Fixture } from "./fixture";

import { ChatFixture } from "../chatFixture";

describe("initializeChat usecase", () => {
  const _ = new Fixture(new ChatFixture());

  it("should initialize a chat given an authenticated user", async () => {
    _.givenAuthenticatedUser();

    await _.whenUserInitializeChat();

    _.thenTheChatIsInitialized();
  });
});
