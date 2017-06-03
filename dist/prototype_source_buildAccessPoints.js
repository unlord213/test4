'use strict';

const AccessPoint = require('util_AccessPoint');

module.exports = function () {
	if (!Source.prototype.buildAccessPoints) {
		Source.prototype.buildAccessPoints = function () {
			const accessPoints = {};

			const roomName = this.pos.roomName;
			const adjacent = this.pos.getAdjacent();
			adjacent.forEach((pos, index) => {
				if (Game.map.getTerrainAt(pos.x, pos.y, roomName) !== 'wall') {
					accessPoints[index] = new AccessPoint(pos);
				}
			});

			return accessPoints;
		};
	}
};
