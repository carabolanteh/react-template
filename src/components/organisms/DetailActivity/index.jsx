import React, { memo, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import Card from '../../molecules/Card';
import { actions } from '../../../store/ducks/activity/getActivity.duck';
import ActivitiesButtons from '../../molecules/ActivitiesButton';
import Detail from '../../molecules/Detail';
import { actions as userActivitiesAction } from '../../../store/ducks/user/activities.duck';
import useGetUserId from '../../../hooks/api/useGetUserId';

const activitySelector = createSelector(
  (state) => state.activity.activity,
  (activity) => activity,
);
const userActivitiesSelector = createSelector(
  (state) => state.userActivities.activities,
  (userActivities) => userActivities,
);

const DetailActivity = memo(() => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const activity = useSelector(activitySelector);
  const userActivities = useSelector(userActivitiesSelector);
  const user_id = useGetUserId();

  useEffect(() => {
    if (!activity) {
      dispatch(actions.getActivity(id));
    }
  }, [activity]);

  useEffect(() => {
    if (!userActivities) {
      dispatch(userActivitiesAction.getActivities(user_id));
    }
  }, []);

  if (activity && userActivities) {
    const isApply = userActivities.data.find((activityLocal) => activityLocal.id == id)
      === undefined;
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <Card title={activity.title} descriptionHtml={activity.description}>
              <ActivitiesButtons
                isApply={isApply}
                activity_id={id}
                user_id={user_id}
                title={activity.title}
                description={activity.short_description}
              />
            </Card>
          </div>
          <div className="col-6 mt-4">
            <Card title="Términos y condiciones" descriptionHtml={activity.terms_and_conditions} />
          </div>
          <div className="col-6 mt-4">
            <Card title="Otros datos" description={<Detail activity={activity} />} />
          </div>
        </div>
      </div>
    );
  }
  return null;
});

export default DetailActivity;
