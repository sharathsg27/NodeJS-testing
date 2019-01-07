const expect = require('chai').expect;
const rewire = require('rewire');
const order = rewire('./lib/order');

describe('Ordering items', () => {
    beforeEach(() => {
        this.testData = [
            {sku: 'AA', qty: 10},
            {sku: 'BB', qty: 0},
            {sku: 'CC', qty: 5},
        ];
        order.__set__("inventoryData", this.testData);
    });

    it('Order an item when in stock', (done) => {
        order.orderItem('CC', 5, () => {
            done();
        })
    });
});