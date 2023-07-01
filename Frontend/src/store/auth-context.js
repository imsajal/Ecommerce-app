import React, { useState } from 'react';

const AuthContext = React.createContext({
  user: {},
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  
  const [isLoggedIn, setIsLoggedIn] = useState(initialToken);
  const [user, setUser]=useState(JSON.parse(localStorage.getItem('user')));

  const loginHandler = (user) => {
    
    setUser(user);
    localStorage.setItem('token',1);
    localStorage.setItem('user',JSON.stringify(user));
    setIsLoggedIn(true);
    
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    setUser([]);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const contextValue = {
    user: user,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;