const express = require('express');
const fs = require('fs');
const path = require('path');
const url = require('url');
const app = require('./modules/actor');
const pathToSwaggerUI = require('swagger-ui-dist').absolutePath()

const port = process.env.PORT || 8080;

// allows all origins and methods for requests

app.use(express.json());

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
    app.use(express.static(__dirname + '/public'));
});

app.get('/index.html', function(req, res) {
    res.sendFile(__dirname + "/index.html");
    app.use(express.static(__dirname + '/public'));
});

app.get('/API/v1/documentation.html', function(req, res) {
    res.sendFile(__dirname + '/documentation.html');
});

app.listen(port, () => {
    
});

