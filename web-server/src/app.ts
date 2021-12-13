const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocoding = require('./utils/geocoding');
const forecast = require('./utils/forecast');
// const chalk = require('chalk');
import { Request, Response } from 'express';
const app = express();
// ----------------------------------------------------------------
// - Types

type geoDataTypes = {
    latitude?: number;
    longitude?: number;
    location?: string;
};

// ----------------------------------------------------------------
//- Port number
const port = 3000;

// ----------------------------------------------------------------
//- Defined paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// ----------------------------------------------------------------
//- Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// ----------------------------------------------------------------
//- Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// ----------------------------------------------------------------
//- Express route handlers
app.get('/', (req: Request, res: Response) => {
    res.render('index', {
        title: 'Weather Page',
        name: 'Weather',
        year: 2021,
        site: { title: 'Weather Page', author: 'shammlo' },
    });
});

app.get('/about', (req: Request, res: Response) => {
    res.render('about', {
        title: 'About Page',
        name: 'About',
    });
});

app.get('/weather', (req: Request, res: Response) => {
    if (req.query.address === undefined) {
        return res.send({
            error: 'You must provide an address!',
        });
    }
    geocoding(
        req.query.address,
        (error: Error, { latitude, longitude, location }: geoDataTypes = {}) => {
            if (error) {
                return res.send({ error: error.message });
            }
            forecast(latitude, longitude, (error: Error, weatherData: any) => {
                if (error) {
                    return res.send({ error });
                }
                res.send({
                    address: req.query.address,
                    location: location,
                    forecast: `Current Weather in ${weatherData.name} is ${weatherData.weather[0].description}, its currently ${weatherData.main.temp} out, it feels like ${weatherData.main.feels_like} out.`,
                    latitude: latitude,
                    longitude: longitude,
                });
            });
        }
    );
});

app.get('/help', (req: Request, res: Response) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Help',
    });
});

app.get('/help/*', (req: Request, res: Response) => {
    res.render('404', {
        title: '404 Page',
        error: 'Help article not found',
    });
});
app.get('*', (req: Request, res: Response) => {
    res.render('404', {
        title: '404 Page',
        error: `Cannot find ${req.url}`,
    });
});

// ----------------------------------------------------------------
//- Express listen
app.listen(port, () => {
    console.log(`Your server available at http://localhost:${port}, on port ${port}`);
});
