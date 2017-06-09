'use strict';

function Action(id) {
	this.id = id;
	this.target = null;
	this.done = false;
}

Action.HARVEST = 'HARVEST';
Action.BUILD = 'BUILD';
Action.TRANSFER = 'TRANSFER';
Action.IDLE = 'IDLE';

module.exports = Action;
