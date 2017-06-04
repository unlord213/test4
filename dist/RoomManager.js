'use strict';

const Roles = require('Roles');

module.exports = {
	run: run
};

const spawnFilter = {
	filter: {structureType: STRUCTURE_SPAWN}
};

function run(room) {
	room.init();

	// room.memory.spawnIds.forEach(spawnId => {
	// 	const spawn = Game.getObjectById(spawnId);
	room.find(FIND_STRUCTURES, spawnFilter).forEach(spawn => {
		if (room.memory.numHarvesters < room.memory.maxHarvesters) {
			_createHarvester(spawn, room);
			return;
		}

		if (room.memory.numBuilders < room.memory.maxBuilders) {
			_createBuilder(spawn, room);
		}
	});
}

function _createHarvester(spawn, room) {
	const created = spawn.createCreep(Roles.HARVESTER);
	if (created) {
		++room.memory.numHarvesters;
	}
}

function _createBuilder(spawn, room) {
	const created = spawn.createCreep(Roles.BUILDER);
	if (created) {
		++room.memory.numBuilders;
	}
}