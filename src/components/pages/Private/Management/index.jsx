import React, { useEffect, useState } from 'react';
import { apiCall } from '../../../../crud/api.crud';
import Table from './components/Table';

const Management = ({ user }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    apiCall(`management/${user.id}`, null, 'GET').then((response) => setData(response.data.data));
  }, [user.id]);

  return (
    <div className="container mt-4">
      <div className="card shadow  bg-white rounded">
        <div className="card-block">
          <div className="card-body">
            <Table data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Management;
