'use strict';

const Position = require('../../util/Position');

module.exports = function () {
	if (!RoomPosition.prototype.getAdjacent) {
		RoomPosition.prototype.getAdjacent = function () {
			const x = this.x;
			const y = this.y;
			const adjacent = [];

			[x - 1, x, x + 1].forEach(x => {
				if (x < 0 || x > 49) {
					return;
				}
				[y - 1, y, y + 1].forEach(y => {
					if (y < 0 || y > 49) {
						return;
					}

					adjacent.push(new Position(x, y));
				});
			});

			return adjacent;
		};
	}
};
