/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsBell, BsBellFill } from "react-icons/bs";
import { apiCall } from "../../../../crud/api.crud";
import useGetUserId from "../../../../hooks/api/useGetUserId";

// const notifications = [{message: 'Se agrego la activada tanto',"link":"/detail/244"},{message: 'Se agrego la activada otra',"link":"/detail/120"}]

const Notification = ({ isOpen, toggle }) => {
  const [notifications, setNotifications] = useState([]);
  const [cantNotifications, setCantNotifications] = useState(0);
  const userId = useGetUserId();
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiCall(
        `notifications/entity/${process.env.REACT_APP_ID_ENTITY}/user/${userId}`,
        null,
        "GET"
      );
      setNotifications(response.data.data);
    };

    fetchData();
  }, []);
  const markAsRead = (id, isRead) => {
    if (isRead) return;
    apiCall(`notifications/markasread/${id}`, null, "GET");
    const auxNotification = [...notifications];
    const index = auxNotification.findIndex((noti) => noti.id == id);
    auxNotification[index].read_at = true;
    setNotifications(auxNotification);
  };

  useEffect(() => {
    if (notifications.length > 0) {
      setCantNotifications(
        notifications.reduce((acc, notification) => {
          if (!notification.read_at) {
            acc++;
          }
          return acc;
        }, 0)
      );
    }
  }, [notifications]);

  return (
    <li className="dropdown order-1">
      <button
        type="button"
        id="dropdownMenu1"
        data-toggle="dropdown"
        className="btn btn-link dropdown-toggle d-flex align-items-center"
        onClick={toggle}
      >
        {notifications.length > 0 ? (
          <>
            {cantNotifications > 0 ? (
              <BsBellFill className="mr-1" />
            ) : (
              <BsBell className="mr-1" />
            )}
            {cantNotifications > 0 && (
              <span className="badge badge-primary">{cantNotifications}</span>
            )}
            <span className="caret" />
          </>
        ) : (
          <BsBell className="mr-1" />
        )}
      </button>
      <ul className={`dropdown-menu rounded ${isOpen ? "show" : null}`}>
        <li className="text-center">Notificaciones</li>
        <li className="flex my-2">
          {notifications.length > 0 &&
            notifications.map((notification) => (
              <Link
                onClick={() =>
                  markAsRead(notification.id, notification.read_at)
                }
                key={notification.url}
                className={`item-menu-notification ${
                  notification.read_at && "bg-light"
                }`}
                to={notification.url}
              >
                <div>{notification.title}</div>
                <small className="text-muted">{notification.created_at}</small>
              </Link>
            ))}
        </li>
      </ul>
    </li>
  );
};

export default Notification;
