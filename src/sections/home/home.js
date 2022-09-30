import React, { useEffect, useContext, useState } from "react";

import "./home.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Work in progress...',
      },
    },
};
const labels = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'];

const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Working on the data',
        data: labels.map(() => { return 100 }),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
};

export default function Home(props){
    let { user } = useContext(AppContext);
    let navigate = useNavigate();
  
    useEffect(() => {
        if(user.walletState !== "connected"){
            navigate("/login");
        };
    }, []);

    return(
        <>
            <div className="chart-div">
                <Line options={options} data={data} />
            </div>
        </>
    )
};