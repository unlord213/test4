'use strict';
require('version');

require('util_Position');
require('util_AccessPoint');

require('prototype_room_init')();
require('prototype_roomPosition_getAdjacent')();
require('prototype_source_buildAccessPoints')();
require('prototype_structureSpawn_createCreep')();

const Reporter = require('Reporter');
const RoomManager = require('RoomMaanager');

module.exports.loop = function () {
	if (Memory.SCRIPT_VERSION === undefined || Memory.SCRIPT_VERSION !== global.SCRIPT_VERSION) {
		Memory.SCRIPT_VERSION = global.SCRIPT_VERSION;
		/*eslint-disable no-console */
		console.log('New code uploaded: ' + Memory.SCRIPT_VERSION);
	}

	for (const roomName in Game.rooms) {
		RoomManager.run(Game.rooms[roomName]);
	}

	Reporter.report();
};
