import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddAlarm, MdComment } from 'react-icons/md';
import { actions as modalAction } from '../../../../store/ducks/modal.duck';
import { actions as userActivitiesAction } from '../../../../store/ducks/user/activities.duck';
import Loading from '../../../molecules/Loading';
import Table from '../../../molecules/Table';
import config from '../../../../config';

const Activities = () => {
  const dispatch = useDispatch();

  const hoursModal = (activity_id) => {
    dispatch(
      modalAction.modalShow({
        modalProps: {
          open: true,
          title: 'Carga de horas',
          activity_id,
        },
        modalType: 'hoursLoad',
      }),
    );
  };

  const commentaryModal = (activity_id,survey) => {
    dispatch(
      modalAction.modalShow({
        modalProps: {
          open: true,
          activity_id,
          url: 'activity/addCommentary',
          survey
        },
        modalType: 'commentary',
      }),
    );
  };

  const { user_id, userActivities, userActivitiesLoading } = useSelector(
    (state) => ({
      user_id: state.auth.user.id,
      userActivities: state.userActivities.activities,
      userActivitiesLoading: state.userActivities.loading,
    }),
  );

  useEffect(() => {
    if (!userActivities) {
      dispatch(userActivitiesAction.getActivities(user_id));
    }
  }, [dispatch, user_id, userActivities]);

  const iconStyle = {
    fontSize: '24px',
  };

  const columns = useMemo(
    () => {
      const array = [
      {
        name: 'Acciones',
        cell: (row) => (
          <>
            {row.selection_status === 'Seleccionad@' && (
            <button
              type="button"
              className="btn btn-primary btn-sm m-1"
              onClick={() => {
                hoursModal(row.id);
              }}
            >
              <MdAddAlarm style={iconStyle} />
            </button>
            )}
            {!row.commentary
                && row.status === 'Terminada'
                && row.selection_status === 'Seleccionad@' && (
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      commentaryModal(row.id,row.survey);
                    }}
                  >
                    <MdComment style={iconStyle} />
                  </button>
            )}
          </>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
      {
        name: 'Actividad',
        selector: 'activity',
        sortable: true,
        expandableRows: true,
        cell: (row) => <Link to={row.url}>{row.activity}</Link>,
      },
      {
        name: 'Estado',
        selector: 'status',
        sortable: true,
        center: true,
      },
      {
        name: 'Fecha límite de postulación',
        selector: 'deadline',
        sortable: true,
        center: true,
        defaultSortAsc: false,
      },
      {
        name: 'Estado de selección',
        selector: 'selection_status',
        sortable: true,
        center: true,
      },
      {
        name: 'Organizacion de origen',
        selector: 'entity_from',
        sortable: true,
        center: true,
      },
      {
        name: 'Organizacion beneficiaria',
        selector: 'entity_to',
        sortable: true,
        center: true,
      },
    ]
    if(config.activities_hours_table){
      array.push(...[  {
        name: 'Horas acumuladas',
        selector: 'hours_individual',
        sortable: true,
        center: true,
      },
      {
        name: 'Horas acumuladas en grupo',
        selector: 'hours_total',
        sortable: true,
        center: true,
      },])
    }

    return array;
  },


    [hoursModal, iconStyle],
  );

  const postulationStatus = (status) => {
    switch (status) {
      case 0:
        return 'Pendiente';
      case 1:
        return 'En revision';
      case 2:
        return 'Seleccionad@';
      case 3:
        return 'No seleccionad@';
      default:
        return '';
    }
  };

  if (userActivitiesLoading) {
    return <Loading />;
  }

  if (userActivities) {
    const tableStyles = {
      margin: '20px auto',
    };

    const data = userActivities.data.map((a) => ({
      id: a.id,
      activity: a.title,
      status: a.status_alias,
      deadline: a.deadline.slice(0, 10),
      selection_status: postulationStatus(a.status_postulation),
      url: `/detail/${a.id}`,
      from_entity: a.fromEntity.bussiness_name,
      to_entity: a.toEntity.bussiness_name,
      hours_total: a.hoursTotal,
      hours_individual: a.hoursIndividual,
      sdg: a.sdg_id,
      commentary: a.commentary,
      entity_to: a.fromEntity.bussiness_name,
      entity_from: a.toEntity.bussiness_name,
      survey: a.survey
    }));
    return (
      <div className="container mt-4">
        <div className="card shadow  bg-white rounded">
          <div className="card-block">
            <div className="card-body">
              <Table
                data={data}
                columns={columns}
                title="Mis actividades"
                styles={tableStyles}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Activities;
