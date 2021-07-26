import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import * as auth from './ducks/auth.duck';
import * as activities from './ducks/activities.duck';
import * as modal from './ducks/modal.duck';
import * as userActivities from './ducks/user/activities.duck';
import * as loadHours from './ducks/hours/loadHours.duck';
import * as userActivitiesHours from './ducks/user/activitiesHours.duck';
import * as security from './ducks/security/index.duck';
import * as toast from './ducks/toast.duck';

export const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth: auth.reducer,
  activities: activities.reducer,
  modal: modal.reducer,
  userActivities: userActivities.reducer,
  loadHours: loadHours.reducer,
  userActivitiesHours: userActivitiesHours.reducer,
  security: security.reducer,
  toast: toast.reducer,
});

export function* rootSaga() {
  yield all([
    auth.saga(),
    activities.saga(),
    userActivities.saga(),
    loadHours.saga(),
    userActivitiesHours.saga(),
    security.saga(),
  ]);
}
