export {};
const chalk = require('chalk');
const geocoding = require('./utils/geocoding');
const forecast = require('./utils/forecast');
//----------------------------------------------------------------
const url =
    'http://api.weatherstack.com/current?access_key=700797ae92b1e5bbd7123ad8fe01ef7b&query=';

const url2 =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2hhbXp4IiwiYSI6ImNrZzVsN3dmYTB2aGwydXA0cTRjYTNlOHIifQ.PJEx5stm9_rUjgRzFQaLFg&limit=1';

const address = process.argv[2];
if (address) {
    geocoding(
        address,
        (
            error: Error | undefined,
            geoData: { latitude: number; longitude: number; location: string } | undefined
        ) => {
            if (geoData) {
                // console.log(chalk.green.inverse('Your geoData: '));
                // console.log(geoData);

                forecast(geoData.latitude, geoData.longitude, (error: Error, weatherData: any) => {
                    if (weatherData) {
                        console.log(chalk.green.inverse('Your weatherData: '));
                        console.log(
                            chalk.blue(
                                `Current Weather in ${weatherData.name} is ${weatherData.weather[0].description}, its currently ${weatherData.main.temp} out, it feels like ${weatherData.main.feels_like} out.`
                            )
                        );
                        // console.log(weatherData);
                    } else if (error) {
                        console.log(chalk.red(error));
                    }
                });
            } else if (error) {
                console.log(chalk.red(error));
            }
        }
    );
} else {
    console.log(chalk.red('Please provide an address'));
}
