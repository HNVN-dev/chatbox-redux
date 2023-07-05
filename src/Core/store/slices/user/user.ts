import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../domain/User";

const userInitialState: User = {
  id: "",
  firstName: "",
  lastName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {},
});
