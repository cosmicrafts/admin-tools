import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppProvider from "./context";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Header from './sections/header/hearder';
import Home from './sections/home/home';
import Login from './sections/login/login';
import Menu from './sections/menu/menu';
import NewPlayers from './sections/players/newPlayers';
import Players from './sections/players/players';

const root = createRoot(document.getElementById('root'));

root.render(
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Menu />
            <Home />
          </>
        } />
        <Route path="/players" element={
          <>
            <Header />
            <Menu />
            <Players />
          </>
        } />
        <Route path="/newPlayers" element={
          <>
            <Header />
            <Menu />
            <NewPlayers />
          </>
        } />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </AppProvider>
);

