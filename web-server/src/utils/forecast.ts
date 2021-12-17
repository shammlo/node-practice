export {};
const axios = require('axios');
//***************************************** */

const forecast = async (
    latitude: number,
    longitude: number,
    callback: (error: Error | string | undefined, result: object | undefined) => void
) => {
    const url = `http://api.weatherstack.com/current?access_key=700797ae92b1e5bbd7123ad8fe01ef7b&query=${latitude},${longitude}`;
    const url2 = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=85aa2ccf79ac3462f1ade3c6265c6b60`;
    try {
        const response = await axios.get(url2);
        if (typeof latitude !== 'number' && typeof longitude !== 'number') {
            callback(new Error('Wrong Latitude and Longitude values'), undefined);
        } else {
            callback(undefined, response.data);
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            callback(error.message, undefined);
        }
    }
};

module.exports = forecast;
