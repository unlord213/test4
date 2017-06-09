'use strict';
require('version');

require('util_Position');
require('util_AccessPoint');

require('prototype_room_init')();
require('prototype_roomPosition_getAdjacent')();
require('prototype_source_buildAccessPoints')();
require('prototype_structureSpawn_createCreep')();
require('prototype_creep__work')();
require('prototype_creep_harvest')();
require('prototype_creep_transfer')();

const Reporter = require('Reporter');
const RoomManager = require('RoomManager');
const CreepManager = require('CreepManager');
const MemoryManager = require('MemoryManager');

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

		room.find(FIND_MY_CREEPS).forEach(creep => {
			const creepManager = new CreepManager(roomManager, creep);
			creepManager.run();
		});
	}

	MemoryManager.cleanup();
	Reporter.report();
};
