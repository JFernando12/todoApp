import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuth } from '../utils/auth';

const Nav = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const signup = () => {
    navigate('/signup');
  };

  return (
    <div>
      {isAuth() && <button onClick={logout}>Logout</button>}
      {!isAuth() && <button onClick={signup}>Signup</button>}
    </div>
  );
};

export default Nav;
