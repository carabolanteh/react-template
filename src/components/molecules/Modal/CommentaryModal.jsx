import React, { useState } from 'react';
import './modal.scss';
import StepOne from './commentaryModal/StepOne';
import StepTwo from './commentaryModal/StepTwo';

const CommentaryModal = ({ closeModal, url, activity_id ,survey}) => {
  const [commentary, setCommentary] = useState("");
  const [formsSend, setFormsSend] = useState([]);

  const [step, setStep] = useState(0);
  const setAnswers = (name) => (value)=>{
    setFormsSend({ ...formsSend, [name]: value });
  }
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Comentario final de la experiencia</h5>
        <button
          type="button"
          className="close"
          onClick={closeModal}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      {!step ? (
        <StepOne
          commentary={commentary}
          setCommentary={setCommentary}
          closeModal={closeModal}
          setStep={setStep}
          survey={survey}
          setAnswers={setAnswers}
          formsSend={formsSend}
        />
      ) : (
        <StepTwo
          commentary={commentary}
          setStep={setStep}
          url={url}
          activity_id={activity_id}
          closeModal={closeModal}
          formsSend={formsSend}
        />
      )}
    </div>
  );
};

export default CommentaryModal;
