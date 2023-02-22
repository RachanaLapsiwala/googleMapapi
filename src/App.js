import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Main from './components/Dashboard/Dashboard';
import Event from './components/Event/Event';
import Docs from './components/Docs/Docs';
import Contacts from './components/Contacts/Contacts';
function App() {
  const [loggedIn, setloggedIn] = useState(false);

  function callbackFunction(childData) {
    setloggedIn(childData);
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/Dashboard" element={loggedIn ? <Main /> : <Navigate to="/" />} />

        <Route path="/" element={loggedIn ? (
          <Navigate to="/Dashboard" />
        ) : (
          <Login parentCallback={callbackFunction} />
        )} />
        <Route path="/event" element={<Event/>} />
        <Route path="/docs" element={<Docs/>} />
        <Route path="/contact" element={<Contacts/>} />
      </Routes>
    </div>
  );
}

export default App;
