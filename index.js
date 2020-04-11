const express = require('express');
const bodyParser = require('body-parser-json');
const cors = require('cors');
let moment = require('moment');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const log = function(req, res) {
    const now = moment().format();
    console.log(`${req.ip} [${now}] "${req.method} ${req.originalUrl}" - ${res.statusCode}`);
};

app.get('/health', function (req, res) {
    res.contentType('application/json');
    res.status(200);
    res.json({status: 'OK'});
    log(req, res);
});

app.use(function (req, res) {
    res.contentType('application/json');
    res.status(404);
    res.json({status: 'Error', message: 'Not found'});
    log(req, res);
});

app.listen(8000, function () {
    console.log('Server started. Listening on 8000.');
});
