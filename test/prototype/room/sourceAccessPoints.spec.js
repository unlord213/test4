'use strict';

desc('Room.sourceAccessPoints', function () {
	let room;
	const roomName = 'roomName0';

	beforeEach(function () {
		require('../../../src/prototype/room/sourceAccessPoints')();

		room = new Room(roomName);
		sandbox.stub(room, 'find');
	});

	it('should get source access points', function() {
		const accessPoint1 = {foo: 'bar'};
		const source1 = {
			buildAccessPoints: sandbox.stub().returns(accessPoint1)
		};
		const accessPoint2 = {foo: 'bar'};
		const source2 = {
			buildAccessPoints: sandbox.stub().returns(accessPoint2)
		};
		room.find.returns([source1, source2]);

		const actual = room.sourceAccessPoints;

		expect(actual).to.eql({
			'0': accessPoint1,
			'1': accessPoint2
		});
		expect(room.find).to.have.been.calledWith(FIND_SOURCES);
	});

	it('should do nothing if already defined', function() {
		const sourceAccessPoints = {foo: 'bar'};
		room.memory.sourceAccessPoints = sourceAccessPoints;

		const actual = room.sourceAccessPoints;

		expect(actual).to.eql(sourceAccessPoints);
		expect(room.find).to.not.have.been.called;
	});
});