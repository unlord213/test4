'use strict';

require('../../lib/common');

desc('RoomPosition.getAdjacent', function () {
	require('../../../src/prototype/roomPosition/getAdjacent')();
	const Position = require('../../../src/util/Position');

	let roomPosition;
	const roomName = 'roomName0';

	beforeEach(function () {
		roomPosition = new RoomPosition(10, 10, roomName);
	});

	it('should return adjacent', function () {
		const adjacent = roomPosition.getAdjacent();

		const expected = [
			new Position(9, 9),
			new Position(9, 10),
			new Position(9, 11),
			new Position(10, 9),
			new Position(10, 10),
			new Position(10, 11),
			new Position(11, 9),
			new Position(11, 10),
			new Position(11, 11)
		];
		expect(adjacent).to.eql(expected);
	});

	it('should not return x less than 0', function () {
		roomPosition.x = 0;
		const adjacent = roomPosition.getAdjacent();

		const expected = [
			new Position(0, 9),
			new Position(0, 10),
			new Position(0, 11),
			new Position(1, 9),
			new Position(1, 10),
			new Position(1, 11)
		];
		expect(adjacent).to.eql(expected);
	});

	it('should not return x greater than 49', function () {
		roomPosition.x = 49;
		const adjacent = roomPosition.getAdjacent();

		const expected = [
			new Position(48, 9),
			new Position(48, 10),
			new Position(48, 11),
			new Position(49, 9),
			new Position(49, 10),
			new Position(49, 11)
		];
		expect(adjacent).to.eql(expected);
	});

	it('should not return y less than 0', function () {
		roomPosition.y = 0;
		const adjacent = roomPosition.getAdjacent();

		const expected = [
			new Position(9, 0),
			new Position(9, 1),
			new Position(10, 0),
			new Position(10, 1),
			new Position(11, 0),
			new Position(11, 1)
		];
		expect(adjacent).to.eql(expected);
	});

	it('should not return y greater than 49', function () {
		roomPosition.y = 49;
		const adjacent = roomPosition.getAdjacent();

		const expected = [
			new Position(9, 48),
			new Position(9, 49),
			new Position(10, 48),
			new Position(10, 49),
			new Position(11, 48),
			new Position(11, 49),
		];
		expect(adjacent).to.eql(expected);
	});
});
