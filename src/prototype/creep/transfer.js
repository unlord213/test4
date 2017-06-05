'use strict';

const ResultMap = require('../../util/ResultMap');

module.exports = function () {
	if (!Creep.prototype._transfer) {
		Creep.prototype._transfer = Creep.prototype.transfer;

		/**
		 * carry, within 1, target, resource type, amount params
		 */
		Creep.prototype.transfer = function (...args) {
			const result = this._transfer.apply(this, args);
			if (result !== OK) {
				if(result === ERR_NOT_IN_RANGE) {
					//TODO: move
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
