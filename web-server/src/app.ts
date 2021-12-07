const path = require('path');
const express = require('express');
const hbs = require('hbs');
import { Request, Response } from 'express';
const app = express();

//- Port number
const port = 3000;

//- Defined paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//- Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//- Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//- Express route handlers
app.get('/', (req: Request, res: Response) => {
    res.render('index', {
        title: 'Home Page',
        name: 'Home',
        year: 2021,
        site: { title: 'Home Page', author: 'shammlo' },
    });
});

app.get('/about', (req: Request, res: Response) => {
    res.render('about', {
        title: 'About Page',
        name: 'About',
    });
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

//- Express listen
app.listen(port, () => {
    console.log(`Your server available at http://localhost:3000, on port ${port}`);
});
