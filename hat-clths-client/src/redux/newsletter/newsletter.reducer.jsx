import NewsletterTypes from "./newsletter.types";

const INITIAL_STATE = {
  isFetching: false,
  error: null,
  subscriptionStatus: false,
};

const newsletterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NewsletterTypes.SUBSCRIBE_START:
    case NewsletterTypes.UNSUBSCRIBE_START:
      return {
        ...state,
        isFetching: true,
      };
    case NewsletterTypes.SUBSCRIBE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        subscriptionStatus: true,
      };
    case NewsletterTypes.UNSUBSCRIBE_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case NewsletterTypes.SUBSCRIBE_FAILURE:
    case NewsletterTypes.UNSUBSCRIBE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case NewsletterTypes.CLEAR_SUBSCRIPTION_STATUS:
      return {
        ...state,
        isFetching: false,
        subscriptionStatus: false,
        error: null,
      };
    default:
      return state;
  }
};

export default newsletterReducer;
