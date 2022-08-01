import MobileMenuTypes from "./menu.types";

const INITIAL_STATE = {
  hidden: true,
};

const menuReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MobileMenuTypes.TOGGLE_MENU_HIDDEN:
      return {
        hidden: !state.hidden,
      };
    default:
      return state;
  }
};

export default menuReducer;
