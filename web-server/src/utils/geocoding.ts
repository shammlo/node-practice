export {};
const axios = require('axios');
//************************************ */
const geocoding = async (
    address: string,
    callback: (err: Error | undefined, result: object | undefined) => void
) => {
    let url;
    if (address === '' || address === undefined) {
        callback(new Error('Address is empty, please provide an address!'), undefined);
    } else {
        url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            address
        )}.json?access_token=pk.eyJ1Ijoic2hhbXp4IiwiYSI6ImNrZzVsN3dmYTB2aGwydXA0cTRjYTNlOHIifQ.PJEx5stm9_rUjgRzFQaLFg&limit=1`;
    }

    try {
        const response = await axios.get(url);
        if (response.data.features.length === 0) {
            callback(
                new Error('Unable to find the location, please try another search!'),
                undefined
            );
        } else {
            callback(undefined, {
                location: response.data.features[0].place_name,
                latitude: response.data.features[0].center[1],
                longitude: response.data.features[0].center[0],
            });
        }
    } catch (error: any) {
        callback(error.message, undefined);
    }
};

module.exports = geocoding;
