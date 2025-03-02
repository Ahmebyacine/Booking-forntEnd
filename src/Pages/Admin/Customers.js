import React, { useEffect, useState } from 'react';
import api from '@/Services/api';
import ErrorPage from '@/Pages/Common/ErrorPage';
import LoadingPage from '@/Pages/Common/LoadingPage';
import CustomersCard from '@/Layouts/Admin/CustomersCard';

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('user');

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
  const filteredUsers = users.filter(user => user.role === currentView);
  if (error){ return <ErrorPage error={error} />}
  if (loading){ return <LoadingPage/>}
  return (
    <>
    <div className="flex border-x border-secondGray ">
        <button
          className={`flex-1 py-2 text-lg text-firstColor font-bold transition-colors duration-300 ${
            currentView === 'user' ? 'bg-secondColor' : 'bg-white hover:bg-bink-50'
          }`}
          onClick={() => setCurrentView('user')}
        >
          Users
        </button>
        <button
          className={`flex-1 py-2 text-lg text-firstColor font-bold transition-colors duration-300 ${
            currentView === 'employee' ? 'bg-secondColor' : 'bg-white hover:bg-bink-50'
          }`}
          onClick={() => setCurrentView('employee')}
        >
          Employee
        </button>
      </div>
    <div className="grid gap-6">
      <ul className="grid p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredUsers.map((user, index) => (
            <CustomersCard key={index} user={user} onUpdate={handleUpdate} />
          ))}
      </ul>
    </div>
    </>
  );
};

export default Customers;