import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import PrivateRoute from './components/PrivateRoute';
import Nav from './components/Nav';
import Signup from './pages/signup';

function App() {
  return (
    <Router>
      <Nav></Nav>
      <div className="App">
        <Routes>
          <Route path="/login" Component={Login}></Route>
          <Route path="/signup" Component={Signup}></Route>
          <Route
            path="/"
            element={<PrivateRoute Component={Home}></PrivateRoute>}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
