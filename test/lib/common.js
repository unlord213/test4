"use strict";

global.expect = require("chai").expect;
global.chai = require("chai");
global.sinon = require("sinon");
// global.sinonChai = require("sinon-chai");
global.chai.use(require("sinon-chai"));
global.sandbox = global.sinon.sandbox.create();

// global._ = require('./lodash.js');

global.desc = function(description, callback) {
	describe(description, function() {
		// beforeEach(function() {
		// 	require('./screepsAutocomplete.js');
		// });

		afterEach(function() {
			sandbox.restore();
		});

		callback();
	});
}
