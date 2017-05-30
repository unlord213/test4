'use strict';

global.chai = require('chai');
global.sinon = require('sinon');
global.expect = global.chai.expect;
global.chai.use(require('sinon-chai'));

global.sandbox = sinon.sandbox.create();
global._ = require('./lodash.js');

global.desc = function (description, callback) {
	require('./game.js')();
	// beforeEach(function () {
	// });

	afterEach(function () {
		global.sandbox.restore();
	});

	callback();
};

