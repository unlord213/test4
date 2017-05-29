'use strict';

module.exports = function() {
	// global._ = require('lodash');

	global.Game = {
		creeps: {},
		flags: {},
		rooms: {},
		structures: {},
		spawns: {},
		map: {
			getTerrainAt: sandbox.stub()
		}
	};

	global.Memory = {
		creeps: {},
		spawns: {},
		rooms: {}
	};

	global.RoomPosition = function (x, y, roomName) {
		this.x = x;
		this.y = y;
		this.roomName = roomName;
	};

	global.Source = function() {
	};
};
