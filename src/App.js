import './App.css';
import { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AppContext } from "./context";

import Header from './sections/header/hearder';
import Home from './sections/home/home';
import Login from './sections/login/login';
import Menu from './sections/menu/menu';
import Players from './sections/players/players';
import NewPlayers from './sections/players/newPlayers';

function App() {

  let { user, menuOpen } = useContext(AppContext);
  
  useEffect(() => {
    if(user.walletState !== "connected" && window.location.pathname !== "/login"){
      window.location.href = "/login";
      return false;
    };
    if(user.walletState === "connected" && window.location.pathname === "/login"){
      window.location.href = "/";
      return false;
    }
  }, []);

  const goTo = (link) => {
    window.location.href = link;
  };

  return (
    <div className="">
      { user.walletState === "connected" ? <Header /> : <></> }
      { user.walletState === "connected" && menuOpen === true ? <Menu /> : <></> }
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<Players goTo={goTo} />} />
          <Route path="/newplayers" element={<NewPlayers goTo={goTo} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
