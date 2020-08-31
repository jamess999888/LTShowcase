const fetch = require('node-fetch');

async function processRequest(albumNumber) {
    const data = await getAlbumJsonData(albumNumber);
    var responseString = buildReturnString(data);
    return responseString;
}

function extractAlbumNumberFromQuery(req) {
    var queryAlbumArgument = req.query.album;
    var albumNumber = Number.parseInt(queryAlbumArgument);
    return albumNumber;
}

async function getAlbumJsonData(albumNumber) {
    const ajaxRes = await fetch('https://jsonplaceholder.typicode.com/photos?albumId=' + albumNumber);
    const data = await ajaxRes.json();
    return data;
}

function buildReturnString(data) {
    var responseString = "";
    data.forEach(obj => {
        obj = checkForNeededVariables(obj);
        responseString += "[" + obj.id + "] " + obj.title + "\n";
    });
    return responseString;
}

function checkForNeededVariables(obj) {
    if (!('id' in obj)) {
        obj.id = "undefined";
    }
    if (!('title' in obj)) {
        obj.title = "undefined";
    }
    return obj;
}

module.exports = {
    processRequest: processRequest,
    extractAlbumNumberFromQuery: extractAlbumNumberFromQuery
};