import React, { useState, useRef, useEffect } from 'react';
import './navbar.scss';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { BsPerson } from 'react-icons/bs';
import config from '../../../config';
import { actions } from '../../../store/ducks/auth.duck';
import Notification from './components/Notification';

const Img = styled.img`
  width: ${(props) => props.width || '100px'};
`;

const Navbar = ({ name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);

  const node = useRef();

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setIsOpen(false);
    setIsOpenNotification(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(actions.logOut());
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleNotifications = () => {
    setIsOpenNotification(!isOpenNotification);
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white ">
      <div className="container">
        <ul className="nav navbar-nav flex-row justify-content-between">
          <li className="px-3">
            <NavLink exact activeClassName="selected" to="/">
              Inicio
            </NavLink>
          </li>
          <li className="px-3">
            <NavLink activeClassName="selected" to="/actividad">
              Actividades
            </NavLink>
          </li>
          {config.has_hours &&
          <li className="px-3">
            <NavLink activeClassName="selected" to="/horas">
              Horas
            </NavLink>
          </li>
          }
        </ul>
        <Link to="/" className="navbar-brand">
          <Img
            src={config.logo}
            width={config.logo_width}
            className="d-inline-block align-top"
            alt=""
          />
        </Link>
        {/* <button
        className="navbar-toggler"
        type="button"
      >
        <span className="navbar-toggler-icon" />
      </button> */}

        <ul
          className="nav navbar-nav flex-row justify-content-between"
          ref={node}
        >
          <li className="dropdown order-1">
            <Notification isOpen={isOpenNotification} toggle={toggleNotifications} ></Notification>
          </li>
          <li className="dropdown order-1">
            <button
              type="button"
              id="dropdownMenu1"
              data-toggle="dropdown"
              className="btn btn-link dropdown-toggle d-flex align-items-center"
              onClick={toggleMenu}
            >
              <BsPerson className="mr-1" />
              {name}
              <span className="caret" />
            </button>
            <ul className={`dropdown-menu rounded ${isOpen ? 'show' : null}`}>
              <li className="flex my-2">
                <Link className="item-menu" to="/management">
                  Datos de gestión
                </Link>
              </li>
              <li className="flex my-2">
                <Link className="item-menu" to="/profile">
                  Mi perfil
                </Link>
              </li>
              <hr className="m-0" />
              <li className="flex my-2">
                <span className="item-menu" onClick={logout}>
                  Cerrar Sesión
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
