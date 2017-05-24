'use strict';

require('./version');
require('./creep/hello')();

module.exports.loop = function() {
	if (!Memory.SCRIPT_VERSION || Memory.SCRIPT_VERSION !== global.SCRIPT_VERSION) {
		Memory.SCRIPT_VERSION = global.SCRIPT_VERSION;
		console.log('New code uploaded');
	}

	console.log('loop');
	_.forIn(Game.creeps, (creep, creepName) => {
		creep.sayHello();
	});
};
