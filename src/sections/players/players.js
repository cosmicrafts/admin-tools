import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { useNavigate } from "react-router-dom";

import { idlFactory } from "../../candid/nfts_beta_test";
import { idlFactory as idlXP } from "../../candid/score_token";
import { idlFactory as idlPlayers } from "../../candid/players_canister";

import "./players.css";

const columns = [
    {
        name: 'Player',
        selector: row => row.player,
    },
    {
        name: 'Faction',
        selector: row => row.faction
    }
];

const betaCanisterId = "k7h5q-jyaaa-aaaan-qaaaq-cai";
const xpCanisterId = "e3q2w-lqaaa-aaaai-aazva-cai";
const playersCanisterId = "7saxw-4aaaa-aaaak-qadmq-cai";

export default function Players(props){
    const [betaNFTsCanister, setBetaNFTsCanister] = useState(null);
    const [xpCanister, setXpCanister] = useState(null);
    const [playersCanister, setPlayersCanister] = useState(null);
    const [data, setData] = useState([]);
    let navigate = useNavigate();

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

    const generateXPCan = async () => {
        (async () => {
            const _xpCanister = await window.ic.plug.createActor({
                canisterId: xpCanisterId,
                interfaceFactory: idlXP,
            });
            setXpCanister(_xpCanister);
        })()
    };

    const generatePlayersCan = async () => {
        (async () => {
            const _playersCanister = await window.ic.plug.createActor({
                canisterId: playersCanisterId,
                interfaceFactory: idlPlayers,
            });
            setPlayersCanister(_playersCanister);
        })()
    };

    const getPlayers = async () => {
        let _users = await betaNFTsCanister.getAllUsers();
        let newData = [];
        for(let i = 0; i < _users.length; i++){
            let p = _users[i];
            if(parseInt(p[1].allowed) === 1){
                let _principal = p[1].id.toString();
                let _data = {
                    player: _principal,
                    faction: getFaction(parseInt(p[1].faction))
                };
                newData.push(_data);
            }
        }
        setData(newData);
        let _players = await playersCanister.getAllPlayers();
        console.log("All players", _players);
    };

    const getFaction = (factionID) => {
        switch(factionID){
            case 1: return "CosmiCons";
            case 2: return "Spirats"; 
            default: return "Undefined";
        }
    };

    const getScores = async () => {
        let _scores = await xpCanister.getAllScores();
        console.log("All scores", _scores);
    };

    const customSort = (rows, selector, direction) => {
        return rows.sort((rowA, rowB) => {
         // use the selector function to resolve your field names by passing the sort comparitors
         const aField = selector(rowA)
         const bField = selector(rowB)
       
         let comparison = 0;
       
         if (aField > bField) {
          comparison = 1;
         } else if (aField < bField) {
          comparison = -1;
         }
       
         return direction === 'desc' ? comparison * -1 : comparison;
        });
    };

    useEffect(() => { 
        generatePlugCan();
        generateXPCan();
        generatePlayersCan();
    }, []);
    
    useEffect(() => { 
        if(betaNFTsCanister !== null && playersCanister !== null) {
            getPlayers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [betaNFTsCanister, playersCanister]);

    useEffect(() => {
        if(xpCanister !== null) {
            getScores();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [xpCanister]);

    useEffect(() => {}, [data]);
    
    return(
        <>
            <div className="title-div">
                <label className="title-text">Active Players</label>
                <div className="btn-new" onClick={() => { navigate("/newplayers"); }}>
                    <label>Add Players</label>
                </div>
            </div>
            <div className="main-table-div">
                <DataTable
                    columns={columns}
                    data={data}
                    sortFunction={customSort}
                    pagination
                />
            </div>
        </>
    )
};