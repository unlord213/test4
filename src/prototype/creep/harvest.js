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

			if (this.pos.x !== x || this.pos.y !== y) {
				console.log('move')
				if(this.fatigue) {
					return ERR_TIRED;
				}

				const moveResult = this.moveTo(source, {
					visualizePathStyle: {
						fill: 'transparent',
						stroke: '#fff',
						lineStyle: 'dashed',
						strokeWidth: .15,
						opacity: .1
					}
				});

				if (moveResult !== OK) {
					/*eslint-disable no-console */
					console.log('Error moving to transfer: ' + this.name + ': ' + ResultMap.get(result));
				}

				return moveResult;
			}

			console.log('harvesting', sourceId, JSON.stringify(source))
			const result = this._harvest(source);
			if (result !== OK && result !== ERR_NOT_IN_RANGE) {
				/*eslint-disable no-console */
				console.log('Error harvesting: ' + this.name + ': ' + ResultMap.get(result));
			}

			return result;
		};

		// Creep.prototype.harvest = function (target) {
		// 	return this._work('harvest', target);
		// };
	}
};
