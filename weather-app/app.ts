export {};
const chalk = require('chalk');
const geocoding = require('./utils/geocoding');
const forecast = require('./utils/forecast');
//----------------------------------------------------------------
const url =
    'http://api.weatherstack.com/current?access_key=700797ae92b1e5bbd7123ad8fe01ef7b&query=';

const url2 =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2hhbXp4IiwiYSI6ImNrZzVsN3dmYTB2aGwydXA0cTRjYTNlOHIifQ.PJEx5stm9_rUjgRzFQaLFg&limit=1';

// axios
//     .get(url)
//     .then((response: any) => {
//         console.log(response.data);

//         console.log(
//             chalk.blue(
//                 `Current Weather in New York, its currently ${response.data.current.temperature} out, it feels like ${response.data.current.feelslike} out.`
//             )
//         );
//     })
//     .catch((error: any) => {
//         console.log(chalk.red(error));
//     });

const command = process.argv[2];

geocoding(command, (error: Error | undefined, data: object | undefined) => {
    if (data) {
        console.log(chalk.green.inverse('Your Data: '));
        console.log(data);
    } else if (error) {
        console.log(chalk.red(error));
    }
});

// forecast(-75.7088, 44.1545, (error: Error, data: object) => {
//     if (data) {
//         console.log(chalk.green.inverse('Your Data: '));
//         console.log(data);
//     } else if (error) {
//         console.log(chalk.red(error));
//     }
// });
