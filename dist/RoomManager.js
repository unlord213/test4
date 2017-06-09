'use strict';

const Roles = require('Roles');

const RoomManager = function (room) {
	this.room = room;
};

RoomManager.prototype = {
	run: run,
	removeCreepFromSource: removeCreepFromSource,
	addCreepToSource: addCreepToSource,
	findOpenAccessPoint: findOpenAccessPoint,
	findStructureNeedingEnergy: findStructureNeedingEnergy,
	_createHarvester: _createHarvester,
	_createBuilder: _createBuilder
};

module.exports = RoomManager;

const spawnFilter = {
	filter: {structureType: STRUCTURE_SPAWN}
};

function run() {
	this.room.init();

	// this.room.memory.spawnIds.forEach(spawnId => {
	// 	const spawn = Game.getObjectById(spawnId);
	this.room.find(FIND_STRUCTURES, spawnFilter).forEach(spawn => {
		if (this.room.memory.numHarvesters < this.room.memory.maxHarvesters) {
			this._createHarvester(spawn);
			return;
		}

		if (this.room.memory.numBuilders < this.room.memory.maxBuilders) {
			this._createBuilder(spawn);
		}
	});
}

function removeCreepFromSource(sourceId, accessPointId) {
	this.room.memory.sourceAccessPoints[sourceId][accessPointId].creepName = null;
}

function addCreepToSource(sourceId, accessPointId, creepName) {
	this.room.memory.sourceAccessPoints[sourceId][accessPointId].creepName = creepName;
}

function findOpenAccessPoint() {
	for (const sourceId in this.room.memory.sourceAccessPoints) {
		const accessPoints = this.room.memory.sourceAccessPoints[sourceId];

		for (const accessPointId in accessPoints) {
			const accessPoint = accessPoints[accessPointId];

			if (accessPoint.creepName === null) {
				return {
					sourceId: sourceId,
					accessPointId: accessPointId,
					x: accessPoint.pos.x,
					y: accessPoint.pos.y
				};
			}
		}
	}
}

// TODO: rework this
function findStructureNeedingEnergy() {
	return Game.spawns['Spawn1'].id;
}

function _createHarvester(spawn) {
	const created = spawn.createCreep(Roles.HARVESTER);
	if (created) {
		++this.room.memory.numHarvesters;
	}
}

function _createBuilder(spawn) {
	const created = spawn.createCreep(Roles.BUILDER);
	if (created) {
		++this.room.memory.numBuilders;
	}
}