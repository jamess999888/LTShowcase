'use strict';

const express = require('express');
const photoAlbumHelpers = require('./helpers/photoAlbumHelpers');


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/', async (req, res) => {
    
    var albumNumber = photoAlbumHelpers.extractAlbumNumberFromQuery(req);
    let responseString;
    if(Number.isInteger(albumNumber)) {
        responseString = await photoAlbumHelpers.processRequest(albumNumber);
    } else {
        responseString = 'The first argument must be an integer';
    }
    res.send(responseString);
});

var server = app.listen(PORT, HOST);


console.log(`Running on http://${HOST}:${PORT}`);


module.exports = {
    server:server
};