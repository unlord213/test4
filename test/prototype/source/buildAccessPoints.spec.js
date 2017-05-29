'use strict';

desc('Source.buildAccessPoints', function () {
	const AccessPoint = require('../../../src/util/AccessPoint');
	const Position = require('../../../src/util/Position');
	let source;
	let roomName;

	beforeEach(function () {
		require('../../../src/prototype/source/memory')();
		require('../../../src/prototype/source/buildAccessPoints')();

		roomName = 'roomName0';
		source = new Source();
		source.pos = new RoomPosition(10, 10, roomName);
		source.pos.getAdjacent = sandbox.stub();
	});

	it('should do nothing if accessPoints defined', function () {
		const accessPoints = {foo: 'bar'};
		source.memory.accessPoints = accessPoints;

		source.buildAccessPoints();
		expect(source.memory.accessPoints).to.eql(accessPoints);
		expect(Game.map.getTerrainAt).to.not.have.been.called;
	});

	it('should set access points', function () {
		source.pos.getAdjacent.returns([
			new Position(10, 10),
			new Position(11, 11),
			new Position(12, 12)
		]);

		Game.map.getTerrainAt.withArgs(10, 10, roomName).returns('foo');
		Game.map.getTerrainAt.withArgs(11, 11, roomName).returns('wall');
		Game.map.getTerrainAt.withArgs(12, 12, roomName).returns('foo');

		source.buildAccessPoints();

		const accessPoints = {
			0: new AccessPoint(new Position(10, 10)),
			2: new AccessPoint(new Position(12, 12))
		};
		expect(source.memory.accessPoints).to.eql(accessPoints);

		expect(Game.map.getTerrainAt.callCount).to.eql(3);
		expect(Game.map.getTerrainAt).to.have.been.calledWith(10, 10, roomName);
		expect(Game.map.getTerrainAt).to.have.been.calledWith(11, 11, roomName);
		expect(Game.map.getTerrainAt).to.have.been.calledWith(12, 12, roomName);
	});
});