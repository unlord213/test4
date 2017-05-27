'use strict';

const NameGenerator = require('../../util/NameGenerator');

module.exports = () => {
	if (!StructureSpawn.prototype._createCreep) {
		StructureSpawn.prototype._createCreep = StructureSpawn.prototype.createCreep;

		StructureSpawn.prototype.createCreep = (body, memory = {}) => {
			return this._createCreep(body, NameGenerator.generate(this.name, memory.role), memory);
		};
	}
};