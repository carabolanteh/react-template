import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { actions } from '../../../store/ducks/toast.duck';
import { checkUser } from '../../../utils/checkUser';

const useCheckUser = (user) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!checkUser(user)) {
      dispatch(actions.addToast({
        item: {
          id: 'UserIncomplete',
          description: <p>
            Falta completar datos personales
            {' '}
            <Link to="/profile">click aqui</Link>
          </p>,
          type: 'warning',
        },
      }));
    }
  }, [dispatch,user]);
};

export default useCheckUser;
