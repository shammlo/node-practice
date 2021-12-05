const path = require('path');
const express = require('express');

import { Request, Response } from 'express';
const app = express();

const port = 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const aboutDirectoryPath = path.join(__dirname, '../public/about.html');
app.use(express.static(publicDirectoryPath));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Express');
});

app.get('/about', (req: Request, res: Response) => {
    res.sendFile(aboutDirectoryPath);
});

app.get('/help', (req: Request, res: Response) => {
    res.sendFile(publicDirectoryPath + '/help.html');
});
app.get('/weather', (req: Request, res: Response) => {
    res.send('Weather page');
});
app.get('/welcome', (req: Request, res: Response) => {
    res.send('welcome page');
});
app.listen(port, () => console.log(`Listening on port ${port}`));
