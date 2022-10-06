import NewsletterTypes from "./newsletter.types";

export const subscribeStart = (email) => ({
  type: NewsletterTypes.SUBSCRIBE_START,
  payload: email,
});

export const subscribeSuccess = (newsletterData) => ({
  type: NewsletterTypes.SUBSCRIBE_SUCCESS,
  payload: newsletterData,
});

export const subscribeFailure = (error) => ({
  type: NewsletterTypes.SUBSCRIBE_FAILURE,
  payload: error,
});

export const unsubscribeStart = (id) => ({
  type: NewsletterTypes.UNSUBSCRIBE_START,
  payload: id,
});

export const unsubscribeSuccess = (newsletterData) => ({
  type: NewsletterTypes.UNSUBSCRIBE_SUCCESS,
  payload: newsletterData,
});

export const unsubscribeFailure = (error) => ({
  type: NewsletterTypes.UNSUBSCRIBE_FAILURE,
  payload: error,
});

export const clearSubscriptionStatus = () => ({
  type: NewsletterTypes.CLEAR_SUBSCRIPTION_STATUS,
});

export const clearUnsubscriptionStatus = () => ({
  type: NewsletterTypes.CLEAR_UNSUBSCRIPTION_STATUS,
});
