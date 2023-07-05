import { createListenerMiddleware } from "@reduxjs/toolkit";
import { Dependencies, RootState, ThunkAppDispatch } from "../store";

export const createAppListenerMiddleware = () =>
  createListenerMiddleware<RootState, ThunkAppDispatch, Dependencies>();
