import { createSelector } from "reselect";

const selectMenu = (state) => state.mobileMenu;

export const selectMenuHidden = createSelector(
  [selectMenu],
  (menu) => menu.hidden
);
