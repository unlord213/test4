'use strict';

require('../../lib/common');

desc('Room.init', function () {
	require('../../../src/prototype/room/init')();

	let room;
	const roomName = 'roomName0';
	const sourceId0 = 'sourceId0';
	const sourceId1 = 'sourceId1';

	beforeEach(function () {
		room = new Room(roomName);
		sandbox.stub(room, 'find');
	});

	it('should get source access points', function () {
		const accessPoint0 = {foo: 'bar'};
		const source0 = {
			id: sourceId0,
			buildAccessPoints: sandbox.stub().returns(accessPoint0),
			pos: {x: 0, y: 0}
		};
		const accessPoint1 = {foo: 'bar'};
		const source1 = {
			id: sourceId1,
			buildAccessPoints: sandbox.stub().returns(accessPoint1),
			pos: {x: 1, y: 1}
		};
		room.find.returns([source0, source1]);

		room.init();

		expect(room.memory.sourceAccessPoints).to.eql({
			sourceId0: accessPoint0,
			sourceId1: accessPoint1
		});
		expect(room.memory.maxHarvesters).to.eql(3);
		expect(room.find).to.have.been.calledWith(FIND_SOURCES);
	});

	it('should do nothing if already defined', function () {
		const sourceAccessPoints = {foo: 'bar'};
		room.memory.sourceAccessPoints = sourceAccessPoints;

		room.init();

		expect(room.memory.sourceAccessPoints).to.eql(sourceAccessPoints);
		expect(room.find).to.not.have.been.called;
	});
});