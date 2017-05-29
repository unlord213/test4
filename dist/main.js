'use strict';

require('version');

require('util_Position');
require('util_AccessPoint');

require('prototype_game_report')();
require('prototype_roomPosition_getAdjacent')();
require('prototype_source_memory')();
require('prototype_source_buildAccessPoints')();

module.exports.loop = function () {
	if (Memory.SCRIPT_VERSION === undefined || Memory.SCRIPT_VERSION !== global.SCRIPT_VERSION) {
		Memory.SCRIPT_VERSION = global.SCRIPT_VERSION;
		/*eslint-disable no-console */
		console.log('New code uploaded: ' + Memory.SCRIPT_VERSION);
	}

	// console.log('--------------Init-------------')
	for (const roomName in Game.rooms) {
		const room = Game.rooms[roomName];
		room.find(FIND_SOURCES).forEach(source => {
			source.buildAccessPoints();
		});
	}
	//
	// console.log('--------------Report-------------')
	// for (const roomName in Game.rooms) {
	// 	const room = Game.rooms[roomName];
	// 	room.find(FIND_SOURCES).forEach(source => {
	// 		console.log('source ' + source.id + ' memory:');
	// 		console.log(JSON.stringify(source.memory, 2));
	// 	});
	// }
	//
	// console.log('Memory.sources');
	// console.log(JSON.stringify(Memory.sources, 2));

	// Game.report();

	//Game.spawns['Spawn1'].createCreep( [WORK, CARRY, MOVE], 'Harvester1' );
};
