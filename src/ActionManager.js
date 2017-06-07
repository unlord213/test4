'use strict';

const Roles = require('./Roles');
const Actions = require('./Actions');

const ActionManager = function (creep) {
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
		const action = Actions.HARVEST;
		action.target = this.roomManager.findOpenAccessPoint();
		return action;
	}

	const action = Actions.TRANSFER;
	action.target = this.roomManager.findStructureNeedingEnergy();
	return action;
}

function _findActionForBuilder() {
}
