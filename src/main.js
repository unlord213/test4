'use strict';
require('./version');

require('./util/Position');
require('./util/AccessPoint');

require('./prototype/room/init')();
require('./prototype/roomPosition/getAdjacent')();
require('./prototype/source/buildAccessPoints')();
require('./prototype/structureSpawn/createCreep')();
require('./prototype/creep/_work')();
require('./prototype/creep/harvest')();
require('./prototype/creep/transfer')();

const Reporter = require('./Reporter');
const RoomManager = require('./RoomManager');
const CreepManager = require('./CreepManager');

module.exports.loop = function () {
	if (Memory.SCRIPT_VERSION === undefined || Memory.SCRIPT_VERSION !== global.SCRIPT_VERSION) {
		Memory.SCRIPT_VERSION = global.SCRIPT_VERSION;
		/*eslint-disable no-console */
		console.log('New code uploaded: ' + Memory.SCRIPT_VERSION);
	}

	for (const roomName in Game.rooms) {
		const room = Game.rooms[roomName];

		const roomManager = new RoomManager(room);
		roomManager.run();

		const creepManager = new CreepManager(roomManager);
		creepManager.run();
	}

	Reporter.report();
};
