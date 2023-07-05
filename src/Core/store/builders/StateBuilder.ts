import { RootState } from "../store";

export class StateBuilder {
  private buildedState: Partial<RootState> = {};

  static init() {
    return new StateBuilder();
  }

  withInitialState(rootState: RootState) {
    this.buildedState = { ...rootState };
    return this;
  }

  withUser(userSlice: RootState["user"]) {
    this.buildedState = {
      ...this.buildedState,
      user: {
        ...userSlice,
      },
    };
    return this;
  }

  withMessages(messagesSlice: RootState["messages"]) {
    this.buildedState = {
      ...this.buildedState,
      messages: {
        ...messagesSlice,
      },
    };
    return this;
  }

  withChat(chatsSlice: RootState["chat"]) {
    this.buildedState = {
      ...this.buildedState,
      chat: {
        ...chatsSlice,
      },
    };
    return this;
  }

  build() {
    return this.buildedState;
  }
}
