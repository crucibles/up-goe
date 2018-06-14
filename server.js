const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const busboyBodyParser = require('busboy-body-parser');

// API file for interacting with MongoDB
const api = require('./server/routes/api');

// Parsers
 app.use(bodyParser.json());


// extended set to true: https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0
app.use(bodyParser.urlencoded({ extended: true}));

// Angular DIST output folder (renamed to public for development stage)
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

// app.use(busboyBodyParser({ limit: '10mb' }));

// changed localhost to 127.0.0.1, interchangable, only for console log
server.listen(port, () => console.log(`Running on 127.0.0.1:${port}`));