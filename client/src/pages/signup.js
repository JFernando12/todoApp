import React, { useState } from 'react';
import { signupApi } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../services/auth';
import '../styles/signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const onChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await signupApi({ email, password });

    if (response.errors != null) {
      setErrors(response.errors);
      return;
    }

    saveToken(response.token);
    navigate('/');
  };

  return (
    <div className="signup">
      <div className="container-signup">
        <h2>Signup</h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
          />
          <button className="button-login" type="submit">
            Signup
          </button>
        </form>
        <ul className="container-errors">
          {errors.map((error) => {
            return <li>{error.message}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Signup;
