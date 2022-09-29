import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  let _prevData = (localStorage.getItem("cosmic_admin") !== null) ? 
      JSON.parse(localStorage.getItem("cosmic_admin")) 
    : 
      {
        wallet: "", 
        walletState: "disconnected",
        walletConnected: "",
        userName: ""
      };
  const [user, setUser] = useState(_prevData);
  const [menuOpen, setMenuOpen] = useState(false);
  const value = { user, setUser,
                  menuOpen, setMenuOpen
                };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;