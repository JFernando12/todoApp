import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ Component }) => {
  return localStorage.getItem('token') !== null ? (
    <Component></Component>
  ) : (
    <Navigate to="/login" replace></Navigate>
  );
};

export default PrivateRoute;
