import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import { AppContext } from "../../context";

import { externalServices } from "../../services/external.services";

import "./header.css";
import icpLogo from "../../resources/internet-computer-icp-logo.png";

export default function Header(props){
    let { menuOpen, setMenuOpen, user } = useContext(AppContext);
    const [icpPrice, setIcpPrice] = useState(0);

    useEffect(() => { getIcpPrice(); }, []);
    useEffect(() => {}, [icpPrice]);

    const getIcpPrice = async () => {
        let _icpPrice = await externalServices.getTokenPrice("ICP");
        let _price = Math.round(parseFloat(_icpPrice.data.data.rates.USD) * 10000) / 10000;
        setIcpPrice(_price);
        setTimeout(() => { getIcpPrice(); }, 30000);
    };

    return(
        <>
            <div className="main-bar">
                <div className="bars-menu-div" onClick={() => { setMenuOpen(!menuOpen); }}>
                    <FontAwesomeIcon className="bars-menu" icon={solid('bars')} />
                </div>
                <label>{ user.walletConnected.slice(0,5) + "..." + user.walletConnected.slice(user.walletConnected.length - 3, user.walletConnected.length)}</label>
                <div className="token-div">
                    <img src={icpLogo} className="img-logo-icp" alt="ICP" />
                    <label className="txt-icp">$ {icpPrice} USD</label>
                </div>
                <div className="notifications-div">
                    <FontAwesomeIcon className="notifications-icon-idle" icon={solid('bell')} />
                </div>
            </div>
        </>
    )
};