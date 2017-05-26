'use strict';

const ResultMap = require('../ResultMap');

module.exports = () => {
	if (!Creep.prototype._repair) {
		Creep.prototype._repair = Creep.prototype.repair;

		Creep.prototype.repair = function (...args) {
			if (this.fatigue) {
				return ERR_TIRED;
			}

			const result = this._repair.apply(this, args);
			if (result !== OK && result !== ERR_NOT_IN_RANGE) {
				/*eslint-disable no-console */
				console.log('Error repairing: ' + this.name + ': ' + ResultMap.get(result));
			}

			return result;
		};
	}
};
