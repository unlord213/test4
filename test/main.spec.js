'use strict';

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

global._ = require('./lib/lodash.js');

describe('Creep.prototype.hello', () => {
	let main;

	beforeEach(() => {
		sinon.sandbox.create();
		require('./lib/screepsAutocomplete.js')();
		main = require('../src/main');
	});

	afterEach(() => {
		sinon.sandbox.restore();
	});

	it('should say hello', () => {
		Game.creeps = {};
		main.loop();
	});
});
