import { DATA, Fixture } from "./fixture";

describe("chatConversation", () => {
  const _ = new Fixture();

  describe("case of sending a message", () => {
    it("should be sent successfully", async () => {
      await _.givenAuthenticatedUserAndInitializedChat();

      await _.whenUserSendMessage();

      _.thenTheChatShouldContain({
        message: DATA.MESSAGES.sendedMessage,
        messageId: DATA.MESSAGES.sendedMessage.id,
      });
    });
  });

  describe("case of receiving a message", () => {
    it("it should be successfully received", async () => {
      await _.givenAuthenticatedUserAndInitializedChat();

      _.whenUserReceiveMessage();

      _.thenTheChatShouldContain({
        message: DATA.MESSAGES.receivedMessage,
        messageId: DATA.MESSAGES.receivedMessage.id,
      });
    });
  });
});
