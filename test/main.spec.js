'use strict';

require('./lib/common');

desc('main', function () {
	const Reporter = require('../src/Reporter');
	const main = require('../src/main');

	beforeEach(function () {
		sandbox.stub(Reporter, 'report');
		sandbox.stub(console, 'log');
	});

	it('should log if script version new', function () {
		Memory.SCRIPT_VERSION = undefined;
		global.SCRIPT_VERSION = 1;

		main.loop();

		/*eslint-disable no-console */
		expect(console.log.callCount).to.eql(1);
		expect(console.log).to.have.been.calledWith('New code uploaded: 1');
	});

	it('should log if script version different', function () {
		Memory.SCRIPT_VERSION = 1;
		global.SCRIPT_VERSION = 2;

		main.loop();

		/*eslint-disable no-console */
		expect(console.log.callCount).to.eql(1);
		expect(console.log).to.have.been.calledWith('New code uploaded: 2');
	});

	it('should not log if script version the same', function () {
		Memory.SCRIPT_VERSION = 1;
		global.SCRIPT_VERSION = 1;

		main.loop();

		/*eslint-disable no-console */
		expect(console.log).to.not.have.been.called;
	});
});
