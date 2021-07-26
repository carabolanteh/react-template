import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { apiCall } from "../../../../../crud/api.crud";

const schema = Yup.string().email().required();

const StepOne = ({ next, email, setEmail }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();


  useEffect(()=>{
    inputRef.current.focus();
  })


  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13) {
      setNextStep();
    }
  };

  const setNextStep = async () => {
    setLoading(true);
    setError(false);
    const valid = await schema.isValid(email);
    if (!valid) {
      setLoading(false);
      setError(true);
      return;
    }

    const response = await apiCall(`user?filter[email]=${email}`, null, "GET");

    if (!response.data.data.length) {
      setLoading(false);
      setError(true);
      return;
    }
    next(1);
  };

  return (
    <>
      <h5 className="mt-2">¡Hola!</h5>
      <h5 className="mb-4">Inicia sesión con tu correo electrónico</h5>
      <div className="mb-5 col-12 p-0">
        <input
          type="text"
          className={`input-text ${error && "input-text--danger"}`}
          placeholder="usuario@email.com"
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleOnKeyDown}
          value={email}
          name="email"
          ref={inputRef}
        />
        {error && <span className="span span--error">Revisa tu correo</span>}
      </div>

      <button className="button mt-3 mb-5 w-100" onClick={setNextStep}>
        {loading ? "Validando..." : "Siguiente"}
      </button>
      <Link to="/register"> Crear una cuenta</Link>
    </>
  );
};

export default StepOne;
