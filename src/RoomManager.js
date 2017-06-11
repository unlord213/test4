'use strict';

const Roles = require('./Roles');

const RoomManager = function (room) {
	this.room = room;
};

RoomManager.prototype = {
	run: run,
	addCreepToSource: addCreepToSource,
	removeCreepFromSource: removeCreepFromSource,
	addCreepToEnergyStructure: addCreepToEnergyStructure,
	removeCreepFromEnergyStructure: removeCreepFromEnergyStructure,
	findOpenAccessPoint: findOpenAccessPoint,
	findStructureNeedingEnergy: findStructureNeedingEnergy,
	_createHarvester: _createHarvester,
	_createBuilder: _createBuilder,
	_updateEnergyStructures: _updateEnergyStructures
};

module.exports = RoomManager;

const spawnFilter = {
	filter: {structureType: STRUCTURE_SPAWN}
};

function run() {
	this.room.init();
	this._updateEnergyStructures();

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

function addCreepToSource(sourceId, accessPointId, creepName) {
	this.room.memory.sourceAccessPoints[sourceId][accessPointId].creepName = creepName;
}

function removeCreepFromSource(sourceId, accessPointId) {
	this.room.memory.sourceAccessPoints[sourceId][accessPointId].creepName = null;
}

// TODO: put structure type in action to prevent loop?
function addCreepToEnergyStructure(target, creepName, energy) {
	const energyStructures = this.room.memory.energyStructures;
	for (const structureType in energyStructures) {
		const structureInfos = energyStructures[structureType];

		for(const structureId in structureInfos) {
			if(structureId === target) {
				structureInfos[structureId].transfers[creepName] = energy;
				return;
			}
		}
	}
}

// TODO: put structure type in action to prevent loop?
function removeCreepFromEnergyStructure(target, creepName) {
	const energyStructures = this.room.memory.energyStructures;
	for (const structureType in energyStructures) {
		const structureInfos = energyStructures[structureType];

		for(const structureId in structureInfos) {
			if(structureId === target) {
				delete structureInfos[structureId].transfers[creepName];
			}
		}
	}
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

function findStructureNeedingEnergy() {
	if (this.structuresNeedingEnergy === undefined) {
		this.structuresNeedingEnergy = [];

		const energyStructures = this.room.memory.energyStructures;
		for (const structureType in energyStructures) {
			const structureTypeInfo = energyStructures[structureType];

			for (const structureId in structureTypeInfo) {
				const energyStructureInfo = structureTypeInfo[structureId];
				if (energyStructureInfo.potentialEnergy < energyStructureInfo.energyCapacity) {
					this.structuresNeedingEnergy.push(structureId);
				}
			}
		}
	}

	return this.structuresNeedingEnergy[0];
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

function _updateEnergyStructures() {
	const spawns = this.room.memory.energyStructures[STRUCTURE_SPAWN];
	for (const spawnId in spawns) {
		const structureInfo = spawns[spawnId];

		const energy = Game.getObjectById(spawnId).energy;
		structureInfo.energy = energy;

		let potentialEnergy = energy;

		const transfers = structureInfo.transfers;
		for (const creepName in transfers) {
			potentialEnergy += transfers[creepName];
		}

		structureInfo.potentialEnergy = potentialEnergy;
	}
}