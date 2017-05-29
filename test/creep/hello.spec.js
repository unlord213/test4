// 'use strict';
//
// // require('../lib/common.js');
//
// // global.expect = require("chai").expect;
// // global.chai = require("chai");
// // global.sinon = require("sinon");
// // // global.sinonChai = require("sinon-chai");
// // global.chai.use(require("sinon-chai"));
// // global.sandbox = global.sinon.sandbox.create();
//
// const chai = require('chai');
// const sinon = require('sinon');
// const expect = chai.expect;
//
// const sandbox = sinon.sandbox.create();
//
// describe('main', function() {
// 	beforeEach(function() {
// 		require('../lib/screepsAutocomplete.js')();
// 	});
//
// 	afterEach(function() {
// 		sandbox.restore();
// 	});
//
// 	let creep;
// 	let creepName;
//
// 	beforeEach(function() {
// 		sandbox.stub(console, 'log');
//
// 		require('../../src/prototype/creep/hello')();
//
// 		creepName = 'creepName0';
// 		creep = new Creep();
// 		creep.name = creepName;
// 	});
//
// 	it('should be defined', function() {
// 		expect(creep.sayHello).to.not.be.undefined;
// 	});
//
// 	it('should say hello', function() {
// 		creep.sayHello();
// 		expect(console.log).to.have.been.calledWith(creepName + ' says: Hello Sunshine');
// 	});
// });
