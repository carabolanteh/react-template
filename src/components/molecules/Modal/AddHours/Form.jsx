import React, { useEffect } from 'react';
/*
import Hours from './Hours';
import TextArea from './TextArea';
import SelectActivity from './SelectActivity';
import { ButtonPrimary } from '../../Button';
*/
import { useDispatch, useSelector } from 'react-redux';
import { default as FormTest } from '../../Form/Form';
import Input from '../../Form/components/Input';
import Select from '../../Form/components/Select';
import TextArea from '../../Form/components/TextArea';
import SubmitButton from '../../Form/components/SubmitButton';
import { apiCall } from '../../../../crud/api.crud';
import { actions as userActivitiesHoursAction } from '../../../../store/ducks/user/activitiesHours.duck';

import { actions as userActivitiesAction } from '../../../../store/ducks/user/activities.duck';
import Hours from '../../Form/components/Hours';

const parseOptions = (data) => data.map((opt) => ({ value: opt.id, label: opt.title }));

const Form = ({ closeModal }) => {
  const dispatch = useDispatch();

  const { user_id, userActivities } = useSelector(
    (state) => ({
      user_id: state.auth.user.id,
      userActivities: state.userActivities.activities,
    }),
  );

  useEffect(() => {
    if (!userActivities) {
      dispatch(userActivitiesAction.getActivities(user_id));
    }
  }, [user_id, userActivities,dispatch]);

  const save = async (values) => {
    await apiCall('activityHours', values, 'POST');
    dispatch(userActivitiesHoursAction.getHours({ user_id }));
    closeModal();
  };

  return (
    <FormTest
      className="form"
      defaultValue={{
        user_id,
        upload_type: process.env.REACT_APP_ID_ENTITY,
      }}
      submit={save}
    >
      <div className="row">
        <div className="col-md-12 mb-4">
          <Select
            label="Activitidades"
            name="activity_id"
            validations={[
              { key: 'required', val: true },
            ]}
            options={userActivities ? parseOptions(userActivities.data) : null}
          />
        </div>
        <div className="col-md-6  mb-4">
          <Hours
            label="Horas"
            name="hours"
            validations={[
              { key: 'required', val: true },
            ]}
          />
        </div>
        <div className="col-md-6  mb-4">
          <Input
            label="Fecha"
            name="activity_day"
            type="date"
            validations={[
              { key: 'required', val: true },
              { key: 'only_numbers', val: true },
            ]}
          />
        </div>
        <div className="col-md-12 mb-4">
          <TextArea
            label="Cuéntanos qué tareas realizaste"
            name="commentary"
            type="date"
            validations={[
              { key: 'required', val: true },
            ]}
          />
        </div>
      </div>
      <SubmitButton />
    </FormTest>
  );
};

export default Form;
