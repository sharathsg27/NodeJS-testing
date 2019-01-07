const expect = require('chai').expect;
const tools = require('../async-chai/tools');

// A nock is a mock server
const nock = require('nock');

describe('loadWiki', () => {

    // This is the mock server called instead of a real Web server reducing time
    before(() => {
        nock('https://en.wikipedia.org')
        .get('/wiki/Narendra_Modi')
        .reply(200, 'Mock Narendra Modi Wiki page');
    });

    it('Should load Narendra Modi page', (done) => {

        tools.loadWiki({first: 'Narendra', last: 'Modi'}, (html) => {
            expect(html).to.equal('Mock Narendra Modi Wiki page');
            // The done callback is called only when the response ie recevied from the server
            done();
        });

    });

});