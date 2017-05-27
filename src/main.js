'use strict';

require('./version');
require('./prototype/creep/hello')();

module.exports.loop = () => {
	if (!Memory.SCRIPT_VERSION || Memory.SCRIPT_VERSION !== global.SCRIPT_VERSION) {
		Memory.SCRIPT_VERSION = global.SCRIPT_VERSION;
		console.log('New code uploaded');
	}

	console.log('loop');
	_.forIn(Game.creeps, (creep, creepName) => {
		creep.sayHello();
	});

	//Game.spawns['Spawn1'].createCreep( [WORK, CARRY, MOVE], 'Harvester1' );
};
