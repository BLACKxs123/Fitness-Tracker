import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// Create the UserContext
const UserContext = createContext();

// Create the UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Adding prop types for validation
UserProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children are of type node and are required
};

// Export the UserContext to use in other components
export default UserContext;
