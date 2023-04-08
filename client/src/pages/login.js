import React, { useState } from 'react';
import { signinApi } from '../utils/api';
import { saveToken } from '../services/auth';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email: </label>
          <input type="text" name="email" onChange={onChange}></input>
        </div>
        <div>
          <label>Password: </label>
          <input type="text" name="password" onChange={onChange}></input>
        </div>
        <button type="submit">Send</button>
      </form>
      {errors.map((err) => (
        <div key={err.message}>{err.message}</div>
      ))}
    </div>
  );
};

export default Login;
