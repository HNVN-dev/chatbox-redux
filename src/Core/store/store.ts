import {
  Action,
  Store,
  ThunkDispatch,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

export interface Dependencies {
  foo: "bar";
}

export const reducer = combineReducers({});

export const initReduxStore = (
  dependencies: Partial<Dependencies>,
  preloadedState?: Partial<RootState>
) => {
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
      });
    },
    preloadedState,
  });
};

export type RootState = ReturnType<typeof reducer>;

export type ReduxStore = Store<RootState> & {
  dispatch: ThunkAppDispatch;
};

export type ThunkAppDispatch = ThunkDispatch<RootState, Dependencies, Action>;
