const axios = require('axios');
const chalk = require('chalk');
//----------------------------------------------------------------
const url =
    'http://api.weatherstack.com/current?access_key=700797ae92b1e5bbd7123ad8fe01ef7b&query=New%20York';
axios.get(url).then((response: any) => {
    console.log(response.data);

    console.log(
        chalk.blue(
            `Current Weather in New York, its currently ${response.data.current.temperature} out, it feels like ${response.data.current.feelslike} out.`
        )
    );
});
