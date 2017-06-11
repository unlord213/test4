'use strict';

const Roles = require('Roles');
const Actions = require('Actions');

const ActionManager = function (roomManager, creep) {
	this.roomManager = roomManager;
	this.creep = creep;
};

ActionManager.prototype = {
	findAction: findAction,
	_findActionForHarvester: _findActionForHarvester,
	_findActionForBuilder: _findActionForBuilder
};

module.exports = ActionManager;

function findAction() {
	switch (this.creep.memory.role) {
		case Roles.HARVESTER.id:
			return this._findActionForHarvester();
		case Roles.BUILDER.id:
			return this._findActionForBuilder();
		default:
			/*eslint-disable no-console */
			console.log('Unknown role for finding action: ' + this.creep.name + ': ' + this.creep.memory.role);
	}
}

function _findActionForHarvester() {
	if (this.creep.carry.energy < this.creep.carryCapacity) {
		const target = this.roomManager.findOpenAccessPoint();

		if (target === undefined) {
			return new Actions(Actions.IDLE);
		}

		const action = new Actions(Actions.HARVEST);
		action.target = target;
		return action;
	}

	const structureId = this.roomManager.findStructureNeedingEnergy();
	if (structureId === undefined) {
		return new Actions(Actions.IDLE);
	}

	const action = new Actions(Actions.TRANSFER);
	action.target = structureId;
	return action;
}

function _findActionForBuilder() {
}
