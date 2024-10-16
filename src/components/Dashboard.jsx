import React, { useContext } from 'react';
import UserContext from '../context/UserContext'; // Use default import

const Dashboard = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <h2>Please log in</h2>
      )}
    </div>
  );
};

export default Dashboard;
