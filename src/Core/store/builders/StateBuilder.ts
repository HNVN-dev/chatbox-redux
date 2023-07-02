import { Chat } from "../slices/chat";
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

  withChat(chatsSlice: Chat) {
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
