import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuth } from '../utils/auth';

const Nav = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const signin = () => {
    navigate('/signin');
  };

  return (
    <div>
      {isAuth() && <button onClick={logout}>Logout</button>}
      {!isAuth() && <button onClick={signin}>Signin</button>}
    </div>
  );
};

export default Nav;
