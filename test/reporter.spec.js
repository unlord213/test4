'use strict';

require('./lib/common');

desc('Reporter report', function () {
	const Reporter = require('../src/Reporter');

	beforeEach(function () {
		sandbox.stub(console, 'log');
	});

	it('should report', function () {
		global.Memory = {foo: 'bar'};
		Game.time = 42;
		Game.cpu.getUsed.returns('43');

		Reporter.report();

		/*eslint-disable no-console */
		expect(console.log).to.have.been.calledWith('<span style="color:rgba(198, 120, 221, 1)">Tick 42: 43 CPU: 0.01kb</span>');
	});
});
