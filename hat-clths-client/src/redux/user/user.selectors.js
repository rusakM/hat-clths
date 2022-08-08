import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectLoginError = createSelector(
  [selectUser],
  (user) => user.error
);

export const selectSignUpError = createSelector(
  [selectUser],
  (user) => user.signUpError
);
