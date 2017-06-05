'use strict';

const ResultMap = require('../../util/ResultMap');

module.exports = function () {
	if (!Creep.prototype._transfer) {
		Creep.prototype._transfer = Creep.prototype.transfer;

		/**
		 * carry, within 1, target, resource type, amount params
		 */
		Creep.prototype.transfer = function (target, resourceType, amount) {
			const result = this._transfer(target, resourceType, amount);
			if (result !== OK) {
				if (result === ERR_NOT_IN_RANGE) {
					if (this.fatigue) {
						return ERR_TIRED;
					}

					const moveResult = this.moveTo(target, {
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

				/*eslint-disable no-console */
				console.log('Error transferring: ' + this.name + ': ' + ResultMap.get(result));
			}

			return result;
		};

		// Creep.prototype.transfer = function (...args) {
		// 	return this._work('transfer', args);
		// };
	}
};
