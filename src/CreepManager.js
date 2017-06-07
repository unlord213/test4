'use strict';

const Roles = require('./Roles');
const Actions = require('./Actions');

const CreepManager = function (roomManager) {
	this.roomManager = roomManager;
};

CreepManager.prototype = {
	run: run,
	_runHarvester: _runHarvester,
	_runBuilder: _runBuilder,
	_findActionForCreep: _findActionForCreep,
	_findActionForHarvester: _findActionForHarvester,
	_findActionForBuilder: _findActionForBuilder
};

module.exports = CreepManager;

function run() {
	this.roomManager.room.find(FIND_MY_CREEPS).forEach(creep => {
		switch (creep.memory.role) {
			case Roles.HARVESTER.id:
				this._runHarvester(creep);
				break;
			case Roles.BUILDER.id:
				this._runBuilder(creep);
				break;
			default:
				/*eslint-disable no-console */
				console.log('Unknown role for run: ' + creep.name + ': ' + creep.memory.role);
		}
	});
}

function _runHarvester(creep) {
	if (undefined === creep.memory.action || creep.memory.action.done) {
		creep.memory.action = this._findActionForCreep(creep);
		// TODO: why does not returning here cause conflicts on access points
		return;
	}

	switch (creep.memory.action.id) {
		case Actions.HARVEST.id: {
			const target = creep.memory.action.target;

			if (creep.carry.energy === creep.carryCapacity) {
				creep.memory.action.done = true;
				this.roomManager.removeCreepFromSource(target.sourceId, target.accessPointId);
				return;
			}

			creep.harvest(target.x, target.y, target.sourceId);
			break;
		}
		case Actions.TRANSFER.id:
			if (creep.carry.energy === 0) {
				creep.memory.action.done = true;
				return;
			}

			creep.transfer(Game.getObjectById(creep.memory.action.target), RESOURCE_ENERGY);
			break;
		default:
			/*eslint-disable no-console */
			console.log('Unknown action for harvester: ' + creep.name + ': ' + creep.memory.action.id);
	}
}

function _runBuilder(creep) {
}

function _findActionForCreep(creep) {
	switch (creep.memory.role) {
		case Roles.HARVESTER.id:
			return this._findActionForHarvester(creep);
		case Roles.BUILDER.id:
			return this._findActionForBuilder(creep);
		default:
			/*eslint-disable no-console */
			console.log('Unknown role for finding action: ' + creep.name + ': ' + creep.memory.role);
	}
}

function _findActionForHarvester(creep) {
	if (creep.carry.energy < creep.carryCapacity) {
		const action = Actions.HARVEST;
		action.target = this.roomManager.findOpenAccessPoint();
		this.roomManager.addCreepToSource(action.target.sourceId, action.target.accessPointId, creep.name);
		return action;
	}

	const action = Actions.TRANSFER;
	action.target = this.roomManager.findStructureNeedingEnergy();
	return action;
}

function _findActionForBuilder(creep) {
}