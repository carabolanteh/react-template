import React, { useState, useEffect, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../../../store/ducks/auth.duck";

const schema = Yup.string().required();

const StepTwo = ({ previous, email }) => {
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("");
  const [loadingLocal, setLoading] = useState(false);
  const [errorLocal, setError] = useState(false);
  const { error } = useSelector(state => ({
    loading: state.auth.loading,
    error: state.auth.error
  }));
  const inputRef = useRef();

  useEffect(()=>{
    setError(error)
  },[error]);

  useEffect(()=>{
    inputRef.current.focus();
  })



  const dispatch = useDispatch();

  const handleOnKeyDown = e => {
    if (e.keyCode === 13) {
      login();
    }
  };

  const login = async () => {
    setLoading(true);
    setError(false);
    const valid = await schema.isValid(password);
    if (!valid) {
      setLoading(false);
      setError(true);
      return;
    }

    const payload = {
      email,
      password
    };
    dispatch(actions.login(payload));
  };

  const setPreviousStep = () => {
    previous(0);
  };

  const changeShowPass = () => {
    setShowPass(!showPass);
  };
  return (
    <>
      <h5>Ahora ingresa tu contraseña</h5>
      <div className="password-wrapper  mt-4">
        <input
          type={showPass ? "text" : "password"}
          className={`input-text ${errorLocal && "input-text--danger"}`}
          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          onChange={e => setPassword(e.target.value)}
          onKeyDown={handleOnKeyDown}
          value={password}
          name="password"
          ref={inputRef}
        />
        {showPass ? (
          <FaEyeSlash
            className="password-eye"
            onClick={changeShowPass}
          ></FaEyeSlash>
        ) : (
          <FaEye className="password-eye" onClick={changeShowPass}></FaEye>
        )}
      </div>
      {errorLocal && (
        <span className="span span--error pt-1">Revisa tu contraseña</span>
      )}

      <Link to="/reset" className="link">Olvidé la contraseña</Link>
      <div className="d-flex justify-content-around w-100">
        <button
          className="button button--white mt-3 mb-5"
          onClick={setPreviousStep}
        >
          Volver
        </button>
        <button className="button mt-3 mb-5" onClick={login}>
          Inicia sesión
        </button>
      </div>

      <Link to="/register"> Crear una cuenta</Link>
    </>
  );
};

export default StepTwo;
