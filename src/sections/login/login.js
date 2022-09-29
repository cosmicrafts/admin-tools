import React, { useEffect, useContext, useState } from "react";
import "./login.css";

import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { StoicIdentity } from "ic-stoic-identity";

import { AppContext } from "../../context";

const canisterId = "onhpa-giaaa-aaaak-qaafa-cai";
const betaCanisterId = "k7h5q-jyaaa-aaaan-qaaaq-cai";
const whitelist = [canisterId, betaCanisterId, "fo275-uiaaa-aaaai-qe3lq-cai"];
const host ='https://mainnet.dfinity.network';

export default function Login(props){

    let { setUser } = useContext(AppContext);

    const loginPlug = async () => {
        console.log("Plug");
        let connection = await window.ic.plug.requestConnect({ whitelist });
        console.log("Plug connection:", connection);
        const principalId = await window.ic.plug.agent.getPrincipal();
        var principal = principalId.toString();
        console.log(principal);
        let _user = {
            wallet: "Plug", 
            walletState: "connected",
            walletConnected: principal,
            userName: ""
        };
        setUser(_user);
        localStorage.setItem("cosmic_admin", JSON.stringify(_user));
        window.location.href = "/";
        return principal;
    };
    
    return(
        <>
            <div className="main-div">
                <div className="central-panel">
                    <div className="button-login button-plug" onClick={() => { loginPlug(); }}>
                        <label className="button-text">Plug wallet</label>
                    </div>
                </div>
            </div>
        </>
    )
};