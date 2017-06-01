'use strict';

global.chai = require('chai');
global.sinon = require('sinon');
global.expect = global.chai.expect;
global.chai.use(require('sinon-chai'));

global.sandbox = sinon.sandbox.create();
global._ = require('./lodash.js');

require('./game.js')(sandbox);

global.desc = function (description, callback) {
	describe(description, function() {
		afterEach(function () {
			sandbox.restore();
		});

		callback();
	});
};

