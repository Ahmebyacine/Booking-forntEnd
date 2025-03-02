import React, { useEffect, useState } from 'react';
import api from '@/Services/api';
import ErrorPage from '@/Pages/Common/ErrorPage';
import LoadingPage from '@/Pages/Common/LoadingPage';
import CustomersEmployeeCard from '@/Layouts/Employee/CustomersEmployeeCard';

const CustomersEmployee = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
    
  }, []);
  const fetchUsers = async () => {
    api.get('/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.response.data);
        setLoading(false);
      });
  };
  const handleUpdate = () => {
    fetchUsers();
  };
  const filteredUsers = users.filter(user => user.role === 'user');
  if (error){ return <ErrorPage error={error} />}
  if (loading){ return <LoadingPage/>}
  return (
    <>
    <div className="grid gap-6">
      <ul className="grid p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredUsers.map((user, index) => (
            <CustomersEmployeeCard key={index} user={user} onUpdate={handleUpdate} />
          ))}
      </ul>
    </div>
    </>
  );
};

export default CustomersEmployee;