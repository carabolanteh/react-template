import React from 'react';
import moment from 'moment';

const index = ({ activity }) => {
  const deadline = moment(activity.deadline);
  const now = moment();

  return (
    <div className="list text-dark">
      <b>Tipo de Actividad</b>
:
{' '}
{activity.alternative_type}
      <br />
      <b>Estado de la actividad</b>
:
{' '}
{activity.status_alias}
      <br />
      <b>Límite de postulación</b>
:
{' '}
      <span className={now < deadline ? 'text-success' : 'text-danger'}>
        {activity.deadline.slice(0, 10)}
      </span>
      <br />
      <b>Fecha de la actividad</b>
:
{' '}
{activity.activity_to}
      <br />
    </div>
  );
};
export default index;
