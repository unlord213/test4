'use strict';

function EnergyStructureInfo(energyCapacity) {
	this.energyCapacity = energyCapacity;
	this.energy = 0;
	this.potentialEnergy = 0;
	this.transfers = {};
}

module.exports = EnergyStructureInfo;
