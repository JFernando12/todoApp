import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" Component={Login}></Route>
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
