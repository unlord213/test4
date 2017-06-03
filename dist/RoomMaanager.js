'use strict';

const Harvester = require('Harvester');
const Builder = require('Builder');

module.exports = {
	run: run
};

function run(room) {
	room.init();

	room.memory.spawnIds.forEach(spawnId => {
		const spawn = Game.getObjectById(spawnId);
		if (spawn.spawning) {
			return;
		}

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
	if (spawn.energy < Harvester.cost) {
		return;
	}

	console.log('Creating harvester');
	const creepName = spawn.createCreep(Harvester.body, {role: Harvester.role});
	if (creepName !== undefined) {
		++room.memory.numHarvesters;
	}
}

function _createBuilder(spawn, room) {
	if (spawn.energy < Builder.cost) {
		return;
	}

	console.log('Creating builder');
	const creepName = spawn.createCreep(Builder.body, {role: Builder.role});
	if (creepName !== undefined) {
		++room.memory.numBuilders;
	}
}