const axios = require('axios');
const chalk = require('chalk');
//----------------------------------------------------------------
const url =
    'http://api.weatherstack.com/current?access_key=700797ae92b1e5bbd7123ad8fe01ef7b&query=New%20York';

const url2 =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2hhbXp4IiwiYSI6ImNrZzVsN3dmYTB2aGwydXA0cTRjYTNlOHIifQ.PJEx5stm9_rUjgRzFQaLFg&limit=1';
// axios.get(url).then((response: any) => {
//     console.log(response.data);

//     console.log(
//         chalk.blue(
//             `Current Weather in New York, its currently ${response.data.current.temperature} out, it feels like ${response.data.current.feelslike} out.`
//         )
//     );
// });

axios
    .get(url2)
    .then((response: any) => {
        // console.log(response.data);
        const latitude = response.data.features[0].center[0];
        const longitude = response.data.features[0].center[1];

        console.log(
            chalk.blue(response.data.features[0].place_name) +
                ' latitude is: ' +
                chalk.yellow(latitude) +
                ' and longitude is: ' +
                chalk.yellow(longitude)
        );
    })
    .catch((error: any) => {
        console.log(error);
    });
