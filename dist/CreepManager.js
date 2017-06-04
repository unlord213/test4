'use strict';

const Roles = require('Roles');

module.exports = {
	run: run
};

function run(room) {
	room.find(FIND_MY_CREEPS).forEach(creep => {
		switch (creep.memory.role) {
			case Roles.HARVESTER.id:
				console.log(creep.name + ' harvesting')
				break;
			case Roles.BUILDER.id:
				break;
			default:
				/*eslint-disable no-console */
				console.log('Unknown role id: ' + creep.memory.role);
		}
	});
}
