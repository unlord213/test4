'use strict';

const ResultMap = require('../ResultMap');

module.exports = () => {
	if (!Creep.prototype._transfer) {
		Creep.prototype._transfer = Creep.prototype.transfer;

		Creep.prototype.transfer = function (...args) {
			if (this.fatigue) {
				return ERR_TIRED;
			}

			const result = this._transfer.apply(this, args);
			if (result !== OK && result !== ERR_NOT_IN_RANGE) {
				/*eslint-disable no-console */
				console.log('Error transferring: ' + this.name + ': ' + ResultMap.get(result));
			}

			return result;
		};
	}
};
