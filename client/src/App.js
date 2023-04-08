import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" Component={Login}></Route>
          <Route path="/" Component={Home}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
