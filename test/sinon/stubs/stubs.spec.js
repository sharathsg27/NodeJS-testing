const expect = require('chai').expect;
const rewire = require('rewire');
const order = rewire('../../rewire/lib/order');
const sinon = require('sinon');


describe("Ordering Items spy", () => {

	beforeEach(() => {

		this.testData = [
			{sku: "AAA", qty: 10},
			{sku: "BBB", qty: 0},
			{sku: "CCC", qty: 3}
		];

		this.console = {
			log: sinon.spy()
        };
        
        // Fake Warehouse
        this.warehouse = {
            /* Stub controls the behavior of a function.
             Here yields invokes the callback with a fake tracking number passed in. */
            packageAndShip: sinon.stub().yields('TRA-1')
        };

		order.__set__("inventoryData", this.testData);
        order.__set__("console", this.console);
        order.__set__("warehouse", this.warehouse);

	});

	it("order an item when there are enough in stock - spy", (done) => {

		var _this = this;

		order.orderItem("CCC", 3, () => {

			expect(_this.console.log.callCount).to.equal(2);

			done();
		});

	});

});


describe('Warehouse Interaction', () => {

    beforeEach(() => {
        // A callback is set to spy if it's invoked
        this.callback = sinon.spy();
        order.orderItem("CCC", 3, this.callback);
    });

    it ('Receives a tracking number', () => {
        expect(this.callback.calledWith('TRA-1').to.equal(true));
    });

    it ('Calls packageAndShip with the correct sku & quantity', () => {
        expect(this.warehouse.packageAndShip.calledWith('CCC', 3).to.equal(true));
    });

});