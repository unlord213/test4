'use strict';

// require('../lib/common.js');

// global.expect = require("chai").expect;
// global.chai = require("chai");
// global.sinon = require("sinon");
// // global.sinonChai = require("sinon-chai");
// global.chai.use(require("sinon-chai"));
// global.sandbox = global.sinon.sandbox.create();

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

describe('main', () => {
	beforeEach(() => {
		sinon.sandbox.create();
		require('../lib/screepsAutocomplete.js')();
		require('../../src/creep/hello')();
	});

	afterEach(() => {
		sinon.sandbox.restore();
	});

	it('should say hello', () => {
		Game.creeps = {};
	});
});
