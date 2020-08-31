const expect = require('chai').expect;
var proxyquire =  require('proxyquire');
const fetchMock = require('fetch-mock').sandbox();
var photoAlbumFunctions = proxyquire('../src/helpers/photoAlbumHelpers.js', { 'node-fetch': fetchMock });
var request = require('supertest');

describe('Express Relay Tests', () => {
    var expressApp;

    beforeEach(() => {
        //start express server
        expressApp = require('../src/photoAlbum.js');
    })


    afterEach(() => {
        //shutdown express server
        expressApp.server.close();
    })


    it('TDD happy path - process request returns expected string', async () => {
        const response  = [
            {
            "albumId": 3,
            "id": 101,
            "title": "test 1",
            "url": "https://via.placeholder.com/600/e743b",
            "thumbnailUrl": "https://via.placeholder.com/150/e743b"
            },
            {
            "albumId": 3,
            "id": 102,
            "title": "test 2",
            "url": "https://via.placeholder.com/600/a393af",
            "thumbnailUrl": "https://via.placeholder.com/150/a393af"
            }
        ];
        const expectedProcessedString = '[101] test 1\n[102] test 2\n';
        const albumNumber = 5; //this number is filler and doesn't matter since we mock the response.

        //mock our fetch so our test suite does not require network
        fetchMock.mock('https://jsonplaceholder.typicode.com/photos?albumId=' + albumNumber, response);
        var responseString = await photoAlbumFunctions.processRequest(albumNumber);
        fetchMock.restore();
        expect(responseString).to.equal(expectedProcessedString);
    });


    it('TDD Sad path - should return int mess', (done) => {
        request(expressApp.server)
            .get('/')
            .query({ album:'NaN' })
            .expect(200)
            .end(function(err, res) {
                expect(res.text).to.equal('The first argument must be an integer');
                done();
              });
    });
    

    it('should return expected album number', () => {
        req = Object;
        req.query = Object;
        req.query.album = 1;
        returnedAlbumNumber = photoAlbumFunctions.extractAlbumNumberFromQuery(req);
        expect(returnedAlbumNumber).to.equal(1);
    });

    it('should return NaN on invalid input', () => {
        req = Object;
        req.query = Object;
        req.query.album = 'Not a Number';
        returnedAlbumNumber = photoAlbumFunctions.extractAlbumNumberFromQuery(req);
        expect(Number.isNaN(returnedAlbumNumber)).to.be.true;
    });
});