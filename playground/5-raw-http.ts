const https = require('https');
// ********************************

const url2 = `http://api.openweathermap.org/data/2.5/weather?lat=40&lon=-70&units=metric&appid=85aa2ccf79ac3462f1ade3c6265c6b60`;

https
    .request(url2, (res: any) => {
        let data = '';
        res.on('data', (chunk: any) => {
            data += chunk;
        });
        res.on('end', () => {
            const body = JSON.parse(data);
            console.log(body);
        });
    })
    .error((error: any) => {
        console.log(error);
    })
    .end();
