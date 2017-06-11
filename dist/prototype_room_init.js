'use strict';

const EnergyStructureInfo = require('EnergyStructureInfo');

module.exports = function () {
	if (Room.prototype.init) {
		return;
	}

	Room.prototype.init = function () {
		if (this.memory.sourceAccessPoints) {
			return;
		}

		/*eslint-disable no-console */
		console.log('Init room: ' + this.name);

		let numAccessPoints = 0;
		this.memory.sourceAccessPoints = this.find(FIND_SOURCES).reduce(function (obj, source) {
			// TODO: remove when can handle dangerous sources
			if (source.pos.x === 6 && source.pos.y === 44) {
				return obj;
			}

			const accessPoints = source.buildAccessPoints();
			obj[source.id] = accessPoints;
			numAccessPoints += Object.keys(accessPoints).length;
			return obj;
		}, {});

		this.memory.numHarvesters = 0;
		this.memory.maxHarvesters = Math.ceil(numAccessPoints * 1.5);

		this.memory.numBuilders = 0;
		this.memory.maxBuilders = numAccessPoints;

		const filter = {
			filter: function (structure) {
				return structure.structureType == STRUCTURE_EXTENSION ||
					structure.structureType == STRUCTURE_SPAWN ||
					structure.structureType == STRUCTURE_TOWER;
			}
		};

		const energyStructures = {};
		energyStructures[STRUCTURE_SPAWN] = {};
		energyStructures[STRUCTURE_EXTENSION] = {};
		energyStructures[STRUCTURE_TOWER] = {};

		this.memory.energyStructures = this.find(FIND_MY_STRUCTURES, filter).reduce(function (obj, structure) {
			obj[structure.structureType][structure.id] = new EnergyStructureInfo(structure.energyCapacity);
			return obj;
		}, energyStructures);
	};
};
