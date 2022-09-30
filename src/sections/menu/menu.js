import React, { useEffect, useState, useContext } from "react";

import { AppContext } from "../../context";
import { useNavigate } from "react-router-dom";

import "./menu.css";

export default function Menu(props){
    let { menuOpen, setMenuOpen } = useContext(AppContext);
    let navigate = useNavigate();

    const goToMenu = (menu) => {
        navigate(menu);
        setMenuOpen(false);
    };

    return(
        <>
        {menuOpen === true ? 
            <div className="menu-main-div">
                <div className="element-div" onClick={() => { goToMenu("/"); }}>
                    <label>Home</label>
                </div>
                <div className="element-div" onClick={() => { goToMenu("/players"); }}>
                    <label>Players</label>
                </div>
            </div>
            :
            <></>
        }
        </>
    )
};