const expect = require('chai').expect;
const tools = require('./tools');

describe('loadWiki', () => {

    it('Should load Narendra Modi page', (done) => {
        tools.loadWiki({first: 'Narendra', last: 'Modi'}, (html) => {
            expect(html).to.be.ok;
            // The done callback is called only when the response ie recevied from the server
            done();
        })
    })

});