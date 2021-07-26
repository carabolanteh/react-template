import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiCall } from "../../../../crud/api.crud";
import { actions as userActivitiesAction } from "../../../../store/ducks/user/activities.duck";

const StepTwo = ({ commentary, setStep, activity_id, closeModal, url ,formsSend}) => {
  const dispatch = useDispatch();

  const { user_id } = useSelector((state) => ({
    user_id: state.auth.user.id,
  }));

  const [isLoading, setIsLoading] = useState(false);
  const [response, setIsResponse] = useState(false);

  useEffect(() => {
    if (response) {
      dispatch(userActivitiesAction.getActivities(user_id));
      closeModal();
    }
  }, [response,closeModal,dispatch,user_id]);

  const save = async () => {
    const payload = {
      activity_id,
      user_id,
      commentary,
      formsSend
    };
    setIsLoading(true);
    setIsResponse(await apiCall(url, payload, "POST"));
  };
  return (
    <>
      <div className="modal-body">
        <div className="form-group">
          <label htmlFor="message-text" className="col-form-label">
            Enviar Comentario
          </label>
          <p>{commentary}</p>
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setStep(0)}
          data-dismiss="modal"
        >
          Cancelar
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={!commentary.length}
          onClick={save}
        >
          {isLoading ? "Enviado ..." : "Confirmar"}
        </button>
      </div>
    </>
  );
};

export default StepTwo;
