import React, { useEffect, useState } from "react";
import "./VolunteerExperiences.scss";
import { apiCall } from "../../../crud/api.crud";
import Card from "../Card";

const url = `activity/getCommentary?filter[entity_origin_id]=${process.env.REACT_APP_ID_ENTITY}`;

const VolunteerExperiences = () => {
  const [commentary, setCommentary] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiCall(url, null, "GET");
      setCommentary(response.data.data);
    };

    fetchData();
  }, []);

  if (commentary.length === 0) return null;
  return (
    <Card
      description={commentary.map((commentary, index) => (
        <div className={`${index ? "commentContainer" : ""}`} key={`commentaryId${commentary.name}`}>
          <p className="font-weight-light text-md comment">
            {commentary.commentary}
          </p>
          <small className="font-italic text-sm quote text-primary">
            {commentary.name} <p>{commentary.title}</p>
          </small>
        </div>
      ))}
      title="Experiencias de voluntari@s"
      style={{ flexGrow: 100 }}
      classNameDescription="cardCommentary"
    />
  );
};

export default React.memo(VolunteerExperiences);
