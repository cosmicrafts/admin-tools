import { Principal } from "@dfinity/principal";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { idlFactory } from "../../candid/nfts_beta_test";

import "./players.css";

const betaCanisterId = "k7h5q-jyaaa-aaaan-qaaaq-cai";

export default function NewPlayers(props){
    const [betaNFTsCanister, setBetaNFTsCanister] = useState(null);
    const [data, setData] = useState([]);
    const [currentReg, setCurrentReg] = useState(0);
    const [totalReg, setTotalReg] = useState(0);
    const [saving, setSaving] = useState("Save new players");
    let navigate = useNavigate();
        
    useEffect(() => { generatePlugCan(); }, []);
    
    useEffect(() => { 
        if(betaNFTsCanister !== null) { /**/ }
    }, [betaNFTsCanister]);

    useEffect(() => {}, [data]);
    useEffect(() => {}, [currentReg]);

    ///Plug wallet
    const generatePlugCan = async () => {
        (async () => {
            const _betaNFTsCanister = await window.ic.plug.createActor({
                canisterId: betaCanisterId,
                interfaceFactory: idlFactory,
            });
            setBetaNFTsCanister(_betaNFTsCanister);
        })()
    };

    const getFaction = (factionID) => {
        switch(factionID){
            case 1: return "CosmiCons";
            case 2: return "Spirats"; 
            default: return "Undefined";
        }
    };

    const addPlayers = () => {
        let rawdata = document.getElementById("textarea-data").value;
        let _splitteddata = rawdata.split("\n");
        console.log(_splitteddata);
        savePlayer(_splitteddata, 0);
        setTotalReg(_splitteddata.length);
        setCurrentReg(1);
        setSaving("Saving");
    };

    const savePlayer = async (d, i) => {
        if(i < d.length){
            setCurrentReg(i + 1);
            let _d = d[i].split(",");
            if(_d.length > 0){
                try{
                    let _prin   = Principal.fromText(_d[0]);
                    let _wallet = (_d[1] !== undefined && _d[1] !== null) ? String(_d[1]) : "Not specified";
                    let _side   = (_d[2] !== undefined && _d[2] !== null) ? (_d[2].toUpperCase() === "SPIRATS") ? 2 : (_d[2].toUpperCase() === "COSMICONS" || _d[2].toUpperCase() === "ALLIANCE") ? 1 : getRandomFaction() : getRandomFaction();
                    /// Check if faction is available
                    let _added = await betaNFTsCanister.adminAddBetaPlayer(_wallet, _side, _prin);
                    let _apprv = await betaCanisterId.approveUser(_prin);
                    console.log("Reg: " + i, _added, _apprv);
                }catch(err){
                    console.log("Error on registry:" + _d, err);
                }
            }
            console.log("i:" + i + " -> ", _d);
            savePlayer(d, i + 1);
        } else {
            setSaving("Saved");
        }
    };

    const getRandomFaction = () => {
        return (Math.floor(Math.random() * 2)) + 1;
    };
    
    return(
        <>
            <div className="title-div">
                <div className="btn-return" onClick={() => { navigate("/players"); }}>
                    <label>Return</label>
                </div>
                <label className="title-text">Add Players</label>
            </div>
            <div className="main-table-div">
                <label>You must add a Principal and optionally add the wallet service it comes from and the faction to set to that wallet (split this data with colons)
                    <br />Each player must be a new line
                    <br />Examples:
                    <br />
                </label>
                <label>aca47-jlvn2-rjczs-tigrb-e3ec5-mly6v-balql-nwill-vyyk6-5kuvn-fae
                    <br />aca47-jlvn2-rjczs-tigrb-e3ec5-mly6v-balql-nwill-vyyk6-5kuvn-fae,Plug
                    <br />aca47-jlvn2-rjczs-tigrb-e3ec5-mly6v-balql-nwill-vyyk6-5kuvn-fae,Plug,Spirats
                    <br />aca47-jlvn2-rjczs-tigrb-e3ec5-mly6v-balql-nwill-vyyk6-5kuvn-fae,,Cosmicons
                    <br />
                </label>
                <label><strong>IMPORTANT:</strong><br />If the wallet service wont be added but the faction will, there must be double colons, as seen in the last example</label>
                <div className="textarea-div">
                    <textarea className="textarea-data" id="textarea-data"></textarea>
                </div>
                <div className="title-div">
                    <label> {saving}: {currentReg} / {totalReg} </label>
                </div>
                <div>
                    <button className="add-players-btn" onClick={() => { addPlayers(); }}>ADD PLAYERS</button>
                </div>
            </div>
        </>
    )
};