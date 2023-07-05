import { RootState } from "../../../store";

export const selectFullName = (state: RootState) => {
  const { firstName, lastName } = state.user;

  return `${firstName} ${lastName}`;
};
