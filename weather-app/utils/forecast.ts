export {};

const axios = require('axios');
//***************************************** */

const forecast = async (
    latitude: number,
    longitude: number,
    callback: (error: Error | undefined, result: object | undefined) => void
) => {
    const url = `http://api.weatherstack.com/current?access_key=700797ae92b1e5bbd7123ad8fe01ef7b&query=${latitude},${longitude}`;
    const url2 = ``;
    try {
        const response = await axios.get(url);
        if (typeof latitude === 'string' && typeof longitude === 'string') {
            callback(new Error('Wrong Latitude and Longitude values'), undefined);
        } else {
            callback(undefined, response.data);
        }
    } catch (error) {
        callback(error, undefined);
    }
};

module.exports = forecast;
