'use strict';

global.chai = require('chai');
global.sinon = require('sinon');
global.expect = global.chai.expect;
global.chai.use(require('sinon-chai'));

global.sandbox = sinon.sandbox.create();

global.desc = function (description, callback) {
	beforeEach(function () {
		require('./game.js')();
	});

	afterEach(function () {
		sandbox.restore();
	});

	callback();
};

global._ = require('./lodash.js');

// "use strict";
//
// global.expect = require("chai").expect;
// global.chai = require("chai");
// global.sinon = require("sinon");
// // global.sinonChai = require("sinon-chai");
// global.chai.use(require("sinon-chai"));
// global.sandbox = global.sinon.sandbox.create();
//
// // global._ = require('./lodash.js');
//
// global.desc = function(description, callback) {
// 	describe(description, function() {
// 		// beforeEach(function() {
// 		// 	require('./screepsAutocomplete.js');
// 		// });
//
// 		afterEach(function() {
// 			sandbox.restore();
// 		});
//
// 		callback();
// 	});
// }
