export const handleResponse = (response) => {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        const responseData = {
            error: false,
            data: data
        };
        if(!response.ok){
            if(response.status === 401){
                /// Request login again
            }
            responseData.error = true;
            return responseData;
        };
        return responseData;
    });
};