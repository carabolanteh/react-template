import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Card from "../../../molecules/Card";
import Loading from "../../../molecules/Loading";
import Map from "../../../molecules/Map";

import VolunteerExperiences from "../../../molecules/VolunteerExperiences";
import "./cardContainer.scss";
import { useBreackpoint } from "../../../../utils/hooks/useBreackpoint";
import ActivitiesCard from "../../../molecules/ActivitiesCard";
import { apiCall } from "../../../../crud/api.crud";
import { invercionMatriz } from "../../../../utils/helper";
import Toast from "../../../molecules/Toast";
import config from "../../../../config";
import Modal from "./components/Modal";
import Filter from "./components/Filter";

const converFilterToUrl = (filters) => {
  let aux = "";
  for (const filter in filters) {
    const filterData = filters[filter];
    if(!filterData ) continue;
    const data = Array.isArray(filterData)
      ? filterData.map((v) => v.value).join()
      : filters[filter];
    aux += `&filter[${filter}]=${data}`;
  }
  return aux;
};

const CardsContainer = () => {
  const [activities, setActivities] = useState(null);
  const [activitiesUser, setActivitiesUser] = useState(null);
  const [page, setPage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState({});

  const { user_id } = useSelector((state) => ({
    user_id: state.auth.user.id,
  }));
  useEffect(() => {
    const pageApi = page ? `page[number]=${page}` : "";
    apiCall(
      `activity/?${pageApi}&filter[entity_origin_id]=${
        process.env.REACT_APP_ID_ENTITY
      }${converFilterToUrl(filter)}&filter[status]=1,2&include=locations,form.fields.options`,
      null,
      "GET"
    ).then((response) => setActivities(response.data));
  }, [page, filter]);

  useEffect(() => {
    apiCall(`user/${user_id}/activities`, null, "GET").then((response) =>
      setActivitiesUser(response.data)
    );
  }, []);

  const colums = useBreackpoint();

  if (!activities || !activitiesUser) return <Loading />;
  const activitiesColumns = invercionMatriz(activities.data, colums);
  const activitiesUserOnlyId = activitiesUser.data.map((ac) => ac.id);

  const now = moment().subtract(1, "days");

  return (
    <>
      <Toast />
      <Modal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        setFilter={setFilter}
        filter={filter}
      />
      <div className="container mt-4">
        {config.map_top &&
          <div className="card-deck">
          {config.banner ? (
            <div className="card">
              <img src={config.banner} alt="banner" />
            </div>
          ) : (
            <>
              <Card
                description={<Map activities={activities} />}
                title="Actividades de voluntariado"
                style={{ flexGrow: 200 }}
              />
              <VolunteerExperiences />
            </>
          )}
        </div>
        }
        <Filter setIsOpen={setIsOpen} setPage={setPage} meta={activities.meta}></Filter>
        <div className="card__container">
          {activitiesColumns.map((activitiesColumn,index) => (
            <div className="card__container__columns"  key={`cardActivityColumn${index}`}>
              {activitiesColumn.map((activity) => (
                <ActivitiesCard
                  key={`cardActivity${activity.id}`}
                  activity={activity}
                  userId={user_id}
                  isApply={activitiesUserOnlyId.includes(activity.id)}
                  isEnable={now <= moment(activity.deadline)}
                />
              ))}
            </div>
          ))}
        </div>
        {config.map_bottom &&
          <div className="card-deck mb-4">
          {config.banner ? (
            <div className="card">
              <img src={config.banner} alt="banner" />
            </div>
          ) : (
            <>
              <Card
                description={<Map activities={activities} />}
                title="Actividades de voluntariado"
                style={{ flexGrow: 200 }}
              />
              <VolunteerExperiences />
            </>
          )}
        </div>
        }
      </div>
    </>
  );
};

export default CardsContainer;
