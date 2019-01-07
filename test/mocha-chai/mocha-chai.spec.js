const expect = require('chai').expect;

describe('Count', () => {
    it('The sum of array of numbers', () => {
        let result = [1, 2, 3, 4, 5].reduce((p, c) => {
            return p + c;
        }, 0); 
        expect(result).to.equal(15);
    })
})