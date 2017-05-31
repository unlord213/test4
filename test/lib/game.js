'use strict';

module.exports = function () {
	global = _.merge(global, {
		// TOP: 1,
		// TOP_RIGHT: 2,
		// RIGHT: 3,
		// BOTTOM_RIGHT: 4,
		// BOTTOM: 5,
		// BOTTOM_LEFT: 6,
		// LEFT: 7,
		// TOP_LEFT: 8,

		FIND_SOURCES: 105,
		//
		// LOOK_CREEPS: "creep",
		// LOOK_ENERGY: "energy",
		// LOOK_RESOURCES: "resource",
		// LOOK_SOURCES: "source",
		// LOOK_MINERALS: "mineral",
		// LOOK_STRUCTURES: "structure",
		// LOOK_FLAGS: "flag",
		// LOOK_CONSTRUCTION_SITES: "constructionSite",
		// LOOK_NUKES: "nuke",
		// LOOK_TERRAIN: "terrain",
		//
		// STRUCTURE_CONTAINER: 'container',
		// STRUCTURE_CONTROLLER: 'controller',
		// STRUCTURE_EXTENSION: 'extension',
		// STRUCTURE_KEEPER_LAIR: 'keeperLair',
		// STRUCTURE_LINK: 'link',
		// STRUCTURE_NUKER: 'nuker',
		// STRUCTURE_OBSERVER: 'observer',
		// STRUCTURE_PORTAL: 'portal',
		// STRUCTURE_POWER_BANK: 'powerBank',
		// STRUCTURE_POWER_SPAWN: 'powerSpawn',
		// STRUCTURE_RAMPART: 'rampart',
		// STRUCTURE_ROAD: 'road',
		// STRUCTURE_SPAWN: 'spawn',
		// STRUCTURE_STORAGE: 'storage',
		// STRUCTURE_TOWER: 'tower',
		// STRUCTURE_WALL: 'constructedWall',
	});

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

	global.Room = function (name) {
		this.name = name;
	};
	Room.prototype.memory = {};
	Room.prototype.find = function () {
	};

	global.Source = function () {
	};
};
