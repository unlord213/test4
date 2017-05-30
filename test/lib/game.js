'use strict';

module.exports = function() {
	global.Game = {
		creeps: {},
		flags: {},
		rooms: {},
		structures: {},
		spawns: {},
		cpu: {
			getUsed: sandbox.stub()
		},
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

	global.Room = function(name) {
		this.name = name;
	};
	Room.prototype.memory = {};

	global.Source = function() {
	};
};
