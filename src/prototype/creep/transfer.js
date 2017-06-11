'use strict';

const ResultMap = require('../../util/ResultMap');

module.exports = function () {
	if (!Creep.prototype._transfer) {
		Creep.prototype._transfer = Creep.prototype.transfer;

		/**
		 * carry, within 1, target, resource type, amount params
		 */
		// TODO: only transfer enough to fill up structure
		Creep.prototype.transfer = function (resourceType, amount) {
			const target = Game.getObjectById(this.memory.action.target);

			const result = this._transfer(target, resourceType, amount);

			if (result === ERR_NOT_IN_RANGE) {
				const moveResult = this.moveTo(target, {
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
					console.log('Error moving to transfer: ' + this.name + ': ' + ResultMap.get(result));
				}

				return false;
			}

			if (result !== OK) {
				/*eslint-disable no-console */
				console.log('Error transferring: ' + this.name + ': ' + ResultMap.get(result));
			} else {
				this.memory.action.done = true;
				return true;
			}

			return false;
		};

		// Creep.prototype.transfer = function (...args) {
		// 	return this._work('transfer', args);
		// };
	}
};
