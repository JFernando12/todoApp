import React, { useState } from 'react';
import { signinApi } from '../utils/api';
import { saveToken } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const onChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log({ email, password });
    const data = await signinApi({ email, password });
    console.log({ data });
    if (data.errors) {
      setErrors(data.errors);
      return;
    }
    if (!data.token) return;
    saveToken(data.token);

    navigate('/');
  };

  return (
    <div className="login">
      <div className="container-login-form">
        <h2>Login</h2>
        <form className="form-login" onSubmit={onSubmit}>
          <input
            type="text"
            name="email"
            onChange={onChange}
            placeholder="Email"
          ></input>
          <input
            type="text"
            name="password"
            onChange={onChange}
            placeholder="Password"
          ></input>
          <button type="submit" className="button-login">
            Send
          </button>
        </form>
        <ul className="container-errors">
          {errors.map((err) => (
            <li key={err.message}>{err.message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Login;
