'use strict';
require('./version');

require('./util/Position');
require('./util/AccessPoint');

require('./prototype/roomPosition/getAdjacent')();
require('./prototype/source/memory')();
require('./prototype/source/buildAccessPoints')();

const Reporter = require('./Reporter');

module.exports.loop = function () {
	if (Memory.SCRIPT_VERSION === undefined || Memory.SCRIPT_VERSION !== global.SCRIPT_VERSION) {
		Memory.SCRIPT_VERSION = global.SCRIPT_VERSION;
		/*eslint-disable no-console */
		console.log('New code uploaded: ' + Memory.SCRIPT_VERSION);
	}

	// console.log('--------------Init-------------')
	for (const roomName in Game.rooms) {
		const room = Game.rooms[roomName];
		const sourceAccessPoints = room.sourceAccessPoints;
		// room.find(FIND_SOURCES).forEach(source => {
		// 	const accessPoints = source.buildAccessPoints();
		// });
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

	Reporter.report();

	//Game.spawns['Spawn1'].createCreep( [WORK, CARRY, MOVE], 'Harvester1' );
};
