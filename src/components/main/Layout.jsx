import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import Home from '../pages/Private/Home/index.jsx';
import Activities from '../pages/Private/Activities';
import Hours from '../pages/Private/Hours';
import ModalRoot from '../molecules/Modal/ModalRoot';
import DetailActivity from '../pages/Private/DetailActivity';
import Profile from '../pages/Private/Profile';
import './layout.scss';
import Toast from '../molecules/Toast';
import Management from '../pages/Private/Management';
import useCheckUser from './hooks/useCheckUser';
import config from '../../config';

const Main = () => {
  const user = useSelector((state) => state.auth.user);
  useCheckUser(user);

  return (
    <div className="bg-light" style={{ minHeight: '100vh' }}>
      <Navbar email={user.email} name={user.name} />
      <Route exact path="/detail/:id" component={DetailActivity} />
      <Route exact path="/" component={Home} />
      <Route exact path="/actividad" component={Activities} />
      {config.has_hours && <Route exact path="/horas" component={Hours} />}
      <Route exact path="/profile">
        <Profile user={user} />
      </Route>
      <Route exact path="/management">
        <Management user={user} />
      </Route>
      <Toast />
      <ModalRoot />
    </div>
  );
};

export default Main;
