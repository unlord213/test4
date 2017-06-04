'use strict';

const Roles = require('./Roles');

module.exports = {
	run: run
};

function run(room) {
	room.find(FIND_MY_CREEPS).forEach(creep => {
		switch (creep.memory.role) {
			case Roles.HARVESTER.id:
				_runHarvester(creep);
				break;
			case Roles.BUILDER.id:
				_runBuilder(creep);
				break;
			default:
				/*eslint-disable no-console */
				console.log('Unknown role id: ' + creep.name + ': ' + creep.memory.role);
		}
	});
}

function _runHarvester(creep) {
};

function _runBuilder(creep) {
};