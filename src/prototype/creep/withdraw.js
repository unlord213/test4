'use strict';

const ResultMap = require('../ResultMap');

module.exports = () => {
	if (!Creep.prototype._withdraw) {
		Creep.prototype._withdraw = Creep.prototype.withdraw;

		Creep.prototype.withdraw = function (...args) {
			if (this.fatigue) {
				return ERR_TIRED;
			}

			const result = this._withdraw.apply(this, args);
			if (result !== OK && result !== ERR_NOT_IN_RANGE) {
				/*eslint-disable no-console */
				console.log('Error withdrawing: ' + this.name + ': ' + ResultMap.get(result));
			}

			return result;
		};
	}
};
