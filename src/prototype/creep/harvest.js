'use strict';

const ResultMap = require('../../util/ResultMap');

module.exports = function () {
	if (!Creep.prototype._harvest) {
		Creep.prototype._harvest = Creep.prototype.harvest;

		/**
		 * work and carry, within 1, target param
		 */
		// TODO: get source passed in?
		Creep.prototype.harvest = function (x, y, sourceId) {
			const source = Game.getObjectById(sourceId);

			if (this.pos.x === x && this.pos.y === y) {
				const result = this._harvest(source);
				if (result !== OK && result !== ERR_NOT_IN_RANGE) {
					/*eslint-disable no-console */
					console.log('Error harvesting: ' + this.name + ': ' + ResultMap.get(result));
				}

				return result;
			}

			const moveResult = this.moveTo(new RoomPosition(x, y, this.room.name), {
				visualizePathStyle: {
					fill: 'transparent',
					stroke: '#fff',
					lineStyle: 'dashed',
					strokeWidth: .15,
					opacity: .1
				}
			});

			if (moveResult !== OK && moveResult !== ERR_TIRED) {
				/*eslint-disable no-console */
				console.log('Error moving to transfer: ' + this.name + ': ' + ResultMap.get(moveResult));
			}

			return moveResult;
		};

		// Creep.prototype.harvest = function (target) {
		// 	return this._work('harvest', target);
		// };
	}
};
