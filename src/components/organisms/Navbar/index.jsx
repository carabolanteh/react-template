import React, { useState, useRef, useEffect } from 'react';
import './navbar.scss';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { BsPerson } from 'react-icons/bs';
import config from '../../../config';
import { actions } from '../../../store/ducks/auth.duck';

const Img = styled.img`
  width: ${(props) => props.width || '100px'};
`;

const Navbar = ({ name }) => {
  const [isOpen, setIsOpen] = useState(false);

  const node = useRef();

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setIsOpen(false);
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

  const toogleMenu = () => {
    setIsOpen(!isOpen);
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
          <li className="px-3">
            <NavLink activeClassName="selected" to="/horas">
              Horas
            </NavLink>
          </li>
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
          <li className="nav-item order-2 order-md-1">
            <div>
              <div className="nav-link" title="settings">
                <i className="fa fa-cog fa-fw fa-lg" />
              </div>
              <i className="fa fa-cog fa-fw fa-lg" />
            </div>
          </li>
          <li className="dropdown order-1">
            <button
              type="button"
              id="dropdownMenu1"
              data-toggle="dropdown"
              className="btn btn-link dropdown-toggle d-flex align-items-center"
              onClick={toogleMenu}
            >
              <BsPerson className="mr-1" />
              {' '}
              {name}
              <span className="caret" />
            </button>
            <ul className={`dropdown-menu rounded ${isOpen ? 'show' : null}`}>
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

/*    { <nav className="navbar">
      <div className="navbar__menu">
        <div className="navbar__brand">
          <Link to="/">
            <img src={Logo} alt="" className="navbar__brand__logo" />
          </Link>
          <span className="navbar__brand__text" />
        </div>
        <div className="navbar__mobile_menu">
          <button
            type="button"
            className="navbar__mobile_menu__button"
            onClick={toogleMenu}
          >
            <svg
              className="navbar__mobile_menu__icon"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              {isOpen ? (
                <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
              ) : (
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              )}
            </svg>
          </button>
        </div>
      </div>
      <div className={`navbar__items ${isOpen ? 'block' : 'hidden'}`}>
        <button className="navbar__item">{email}</button>
      </div>
    </nav>
    */
