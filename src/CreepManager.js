'use strict';

const Roles = require('./Roles');
const Actions = require('./Actions');
const ActionManager = require('./ActionManager');

const CreepManager = function (roomManager, creep) {
	this.roomManager = roomManager;
	this.creep = creep;
};

CreepManager.prototype = {
	run: run,
	_runHarvester: _runHarvester,
	_runBuilder: _runBuilder
};

module.exports = CreepManager;

function run() {
	if (!this.creep.memory || !this.creep.memory.role) {
		/*eslint-disable no-console */
		console.log('Could not find role for : ' + this.creep.name);
		return;
	}

	switch (this.creep.memory.role) {
		case Roles.HARVESTER.id:
			this._runHarvester();
			break;
		case Roles.BUILDER.id:
			this._runBuilder();
			break;
		default:
			/*eslint-disable no-console */
			console.log('Unknown role for run: ' + this.creep.name + ': ' + this.creep.memory.role);
	}
}

function _runHarvester() {
	if (undefined === this.creep.memory.action || this.creep.memory.action.done) {
		const action = new ActionManager(this.roomManager, this.creep).findAction();
		this.creep.memory.action = action;

		if (Actions.HARVEST === action.id) {
			this.roomManager.addCreepToSource(action.target.sourceId, action.target.accessPointId, this.creep.name);
		}

		// TODO: dont return here to get to next action quicker?
		return;
	}

	switch (this.creep.memory.action.id) {
		case Actions.HARVEST: {
			const result = this.creep.harvest();
			if (result === undefined) {
				const target = this.creep.memory.action.target;
				this.roomManager.removeCreepFromSource(target.sourceId, target.accessPointId);
			}
			break;
		}
		case Actions.TRANSFER:
			this.creep.transfer(RESOURCE_ENERGY);
			break;
		case Actions.IDLE:
			this.creep.memory.action.done = true;
			break;
		default:
			/*eslint-disable no-console */
			console.log('Unknown action for harvester: ' + this.creep.name + ': ' + this.creep.memory.action.id);
	}
}

function _runBuilder() {
}