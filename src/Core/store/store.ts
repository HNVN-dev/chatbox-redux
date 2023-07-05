import {
  Action,
  Store,
  ThunkDispatch,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

import { IdProvider } from "../gateways/IdProvider";
import { SocketProvider } from "../gateways/SocketProvider";

import { chatsSlice } from "./slices/chat";
import { messagesSlice } from "./slices/messages";
import { socketMiddleware } from "./middlewares/socketMiddleware";
import { userSlice } from "./slices/user/user";

export interface Dependencies {
  idProvider: IdProvider;
  socketProvider: SocketProvider;
}

export const reducer = combineReducers({
  [chatsSlice.name]: chatsSlice.reducer,
  [messagesSlice.name]: messagesSlice.reducer,
  [userSlice.name]: userSlice.reducer,
});

export class StoreBuilder {
  private preloadedState: Partial<RootState> = {};
  private dependencies: Partial<Dependencies> = {};

  static init() {
    return new StoreBuilder();
  }

  withPreloadedState(preloadedState: Partial<RootState>) {
    this.preloadedState = preloadedState;
    return this;
  }

  withDependencies(dependencies: Partial<Dependencies>) {
    this.dependencies = dependencies;
    return this;
  }

  build(): ReduxStore {
    const dependencies = this.dependencies;
    const preloadedState = this.preloadedState;
    return configureStore({
      reducer,
      middleware(getDefaultMiddleware) {
        return getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ["persist/PERSIST"],
          },
          thunk: {
            extraArgument: dependencies,
          },
        }).prepend(
          socketMiddleware({ socketProvider: dependencies.socketProvider! })
        );
      },
      preloadedState,
    });
  }
}

export type RootState = ReturnType<typeof reducer>;

export type ReduxStore = Store<RootState> & {
  dispatch: ThunkAppDispatch;
};

export type ThunkAppDispatch = ThunkDispatch<RootState, Dependencies, Action>;
