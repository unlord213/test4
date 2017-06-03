'use strict';

module.exports = function () {
	if (Room.prototype.init) {
		return;
	}

	Room.prototype.init = function () {
		if (this.memory.sourceAccessPoints) {
			return;
		}

		let maxHarvesters = 0;
		this.memory.sourceAccessPoints = this.find(FIND_SOURCES).reduce(function (obj, source) {
			// TODO: remove when can handle dangerous sources
			if (source.pos.x === 6 && source.pos.y === 44) {
				return obj;
			}

			const accessPoints = source.buildAccessPoints();
			obj[source.id] = accessPoints;
			maxHarvesters += Object.keys(accessPoints).length;
			return obj;
		}, {});

		this.memory.maxHarvesters = maxHarvesters * 2;
		this.memory.numHarvesters = 0;

		this.memory.maxBuilders = 5;
		this.memory.numBuilders = 0;

		this.memory.spawnIds = this.find(FIND_STRUCTURES, {
			filter: {structureType: STRUCTURE_SPAWN}
		}).map(spawn => spawn.id);
	};
};
