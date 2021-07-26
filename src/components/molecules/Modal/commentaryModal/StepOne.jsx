import React, { useState } from "react";
import Form from '../applyModal/Forms';

const StepOne = ({ commentary, setCommentary, closeModal, setStep ,survey,setAnswers,formsSend}) => {
  const [count, setCount] = useState(180);

  const onChange = (e) => {
    const value = e.target.value;
    setCommentary(value);
    if (180 - value.length >= 0) setCount(180 - value.length);
    else {
      setCommentary(value.slice(0, 180));
      setCount(0);
    }
  };

  return (
    <>
      <div className="modal-body">
        <div className="form-group">
          <label htmlFor="message-text" className="col-form-label">
            Ingrese un comentario {count}/180:
          </label>
          <textarea
            style={{ border: commentary.length ? "" : "1px solid #dc3545" }}
            className="form-control"
            id="message-text"
            value={commentary}
            onChange={onChange}
          />
           {survey && survey.fields.map(form=><Form key={`commentary${form.id}`} form={form} setAnswers={setAnswers} />)}
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={closeModal}
          data-dismiss="modal"
        >
          Cancelar
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={!commentary.length}
          onClick={() => {
            setStep(1);
          }}
        >
          Siguiente
        </button>
      </div>
    </>
  );
};

export default StepOne;
