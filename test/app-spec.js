const expect = require('chai').expect;
const rewire = require('rewire');
const app = rewire('../app');
const request = require('supertest');

// Cheerio module is used to convert responses in text format to HTML similar to Jquery to manipulate DOM
const cheerio = require('cheerio');

describe("Dictionary App", function () {
    it("Loads the home page", (done) => {
        request(app).get('/').expect(200).end((err, res) => {

            // DOM manipulation using response text
            let $ = cheerio.load(res.text);
            let pageHeading = $("body>h1:first-child").text();
            expect(pageHeading).to.equal('Skier Dictionary');
            done();
        });
    });

    describe("Dictionary API", function () {

        beforeEach(function () {

        	this.defs = [
                {
                    term: "One",
                    defined: "Term One Defined"
                },
                {
                    term: "Two",
                    defined: "Term Two Defined"
                }
            ];

            app.__set__("skierTerms", this.defs);
        });

        it("GETS dictionary-api", (done) => {
            request(app)
            .get('/dictionary-api')
            .expect(200)
            .end(done);
        });

        it("POSTS dictionary-api", (done) => {
            request(app)
            .post('/dictionary-api')
            .send({"term": "three", "defined": "Term Three defined"})
            .expect(200)
            .end(done)
        });

        it("DELETES dictionary-api", (done) => {
            request(app)
            .delete('/dictionary-api/One').expect(200)
            .expect(200)
            .end(done)
        });

    });

});