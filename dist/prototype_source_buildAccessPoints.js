'use strict';

const AccessPoint = require('util_AccessPoint');

module.exports = function() {
	if (!Source.prototype.buildAccessPoints) {
		Source.prototype.buildAccessPoints = function() {
			if (this.memory.accessPoints !== undefined) {
				return;
			}

			this.memory.accessPoints = {};

			const roomName = this.pos.roomName;
			const adjacent = this.pos.getAdjacent();
			adjacent.forEach((pos, index) => {
				if (Game.map.getTerrainAt(pos.x, pos.y, roomName) !== 'wall') {
					this.memory.accessPoints[index] = new AccessPoint(pos);
				}
			});
		};
	}
};
