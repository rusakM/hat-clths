import { createSelector } from "reselect";

const selectNewsletter = (state) => state.newsletter;

export const selectIsFetchingData = createSelector(
  [selectNewsletter],
  (newsletter) => newsletter.isFetching
);

export const selectError = createSelector(
  [selectNewsletter],
  (newsletter) => newsletter.error
);

export const selectSubscriptionStatus = createSelector(
  [selectNewsletter],
  (newsletter) => newsletter.subscriptionStatus
);
