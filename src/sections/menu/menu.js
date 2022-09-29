import React, { useEffect, useState, useContext } from "react";

import { AppContext } from "../../context";

import "./menu.css";

export default function Menu(props){
    let { setMenuOpen } = useContext(AppContext);

    const goToMenu = (menu) => {
        window.location.href = menu;
        setMenuOpen(false);
    };

    return(
        <>
            <div className="menu-main-div">
                <div className="element-div" onClick={() => { goToMenu("/"); }}>
                    <label>Home</label>
                </div>
                <div className="element-div" onClick={() => { goToMenu("/players"); }}>
                    <label>Players</label>
                </div>
            </div>
        </>
    )
};