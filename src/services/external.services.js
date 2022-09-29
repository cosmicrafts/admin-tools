import { handleResponse } from "../functions/functions";

export const externalServices = {
    getTokenPrice
};

function getTokenPrice(token){
    const requestOptions = {
        method: "GET",
        headers: { "Content-type": "application/json" }
    };
    return fetch(`https://api.coinbase.com/v2/exchange-rates?currency=${token}`, requestOptions)
            .then(handleResponse)
            .then((data) => {
                return data;
            });
}