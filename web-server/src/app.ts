const path = require('path');
const express = require('express');

import { Request, Response } from 'express';
const app = express();

const port = 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const aboutDirectoryPath = path.join(__dirname, '../public/about.html');
app.use(express.static(publicDirectoryPath));

app.set('view engine', 'hbs');

app.get('/', (req: Request, res: Response) => {
    res.render('index', {
        title: 'Home Page',
        name: 'Home',
    });
});

app.get('/about', (req: Request, res: Response) => {
    res.render('index', {
        title: 'About Page',
        name: 'About',
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
