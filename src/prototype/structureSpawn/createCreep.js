'use strict';

const NameGenerator = require('../../util/NameGenerator');
const ResultMap = require('../../util/ResultMap');

module.exports = function () {
	if (StructureSpawn.prototype._createCreep) {
		return;
	}

	StructureSpawn.prototype._createCreep = StructureSpawn.prototype.createCreep;

	StructureSpawn.prototype.createCreep = function (role) {
		if (this.spawning || this.energy < role.cost) {
			return;
		}

		/*eslint-disable no-console */
		console.log('Creating creep: ' + role.id);
		const creepName = this._createCreep(role.body, NameGenerator.generate(this.name, role.id), {role: role.id, room: this.room.name});

		if (_.isString(creepName)) {
			return true;
		}

		/*eslint-disable no-console */
		console.log('Error creating creep: ' + ResultMap.get(creepName));
	};
};
