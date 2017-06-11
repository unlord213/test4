'use strict';

const ResultMap = require('../../util/ResultMap');

module.exports = function () {
	if (!Creep.prototype._harvest) {
		Creep.prototype._harvest = Creep.prototype.harvest;

		/**
		 * work and carry, within 1, target param
		 */
		// TODO: get source passed in?
		Creep.prototype.harvest = function () {
			const target = this.memory.action.target;
			if (this.pos.x === target.x && this.pos.y === target.y) {
				const result = this._harvest(Game.getObjectById(target.sourceId));
				if (result !== OK && result !== ERR_NOT_IN_RANGE) {
					/*eslint-disable no-console */
					console.log('Error harvesting: ' + this.name + ': ' + ResultMap.get(result));
				}

				if (this.carry.energy === this.carryCapacity) {
					this.memory.action.done = true;
					return true;
				}

				return false;
			}

			const moveResult = this.moveTo(new RoomPosition(target.x, target.y, this.room.name), {
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

			return false;
		};

		// Creep.prototype.harvest = function (target) {
		// 	return this._work('harvest', target);
		// };
	}
};
