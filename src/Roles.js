'use strict';

function Role(id, body, cost) {
	this.id = id;
	this.body = body;
	this.cost = cost;
}

module.exports = {
	HARVESTER: new Role('HARVESTER', [WORK, CARRY, MOVE], 300),
	BUILDER: new Role('BUILDER', [WORK, CARRY, MOVE], 300)
};
