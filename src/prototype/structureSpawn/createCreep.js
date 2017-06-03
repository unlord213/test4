'use strict';

const NameGenerator = require('../../util/NameGenerator');
const ResultMap = require('../../util/ResultMap');

module.exports = function () {
	if (StructureSpawn.prototype._createCreep) {
		return;
	}

	StructureSpawn.prototype._createCreep = StructureSpawn.prototype.createCreep;

	StructureSpawn.prototype.createCreep = function (body, memory = {}) {
		const creepName = this._createCreep(body, NameGenerator.generate(this.name, memory.role), memory);

		if (_.isString(creepName)) {
			return creepName;
		}

		/*eslint-disable no-console */
		console.log('Error creating creep: ' + ResultMap.get(creepName));
	};
};
