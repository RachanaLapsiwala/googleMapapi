import './App.css';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Main from './components/Dashboard/Dashboard';
import Event from './components/Event/Event';
import Docs from './components/Docs/Docs';
import Contacts from './components/Contacts/Contacts';
import Maps from './components/Maps/Maps';
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
        <Route path="/maps" element={<Maps />}/>
      </Routes>
    </div>
  );
}

export default App;
