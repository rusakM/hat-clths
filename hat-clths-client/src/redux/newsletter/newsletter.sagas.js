import { all, call, takeLatest, put } from "redux-saga/effects";
import NewsletterTypes from "./newsletter.types";

import {
  subscribeSuccess,
  subscribeFailure,
  unsubscribeSuccess,
  unsubscribeFailure,
} from "./newsletter.actions";

import { sendSubscription, unsubscribe } from "../../api/newsletter.functions";

export function* sendSubscriptionStart({ payload }) {
  try {
    const subscription = yield sendSubscription(payload);
    yield put(subscribeSuccess(subscription));
  } catch (error) {
    yield put(subscribeFailure(error));
  }
}

export function* unsubscribeStart({ payload }) {
  try {
    const unsubscription = yield unsubscribe(payload);
    yield put(unsubscribeSuccess(unsubscription));
  } catch (error) {
    yield put(unsubscribeFailure(error));
  }
}

export function* onSubscriptionStart() {
  yield takeLatest(NewsletterTypes.SUBSCRIBE_START, sendSubscriptionStart);
}

export function* onUnsubscribeStart() {
  yield takeLatest(NewsletterTypes.UNSUBSCRIBE_START, unsubscribeStart);
}

export function* newsletterSagas() {
  yield all([call(onSubscriptionStart), call(onUnsubscribeStart)]);
}
