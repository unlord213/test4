'use strict';

function Action(id) {
	this.id = id;
	this.target = null;
	this.done = false;
}

module.exports = {
	HARVEST: new Action('HARVEST'),
	BUILD: new Action('BUILD'),
	TRANSFER: new Action('TRANSFER')
};
