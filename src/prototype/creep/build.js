'use strict';

const ResultMap = require('../ResultMap');

module.exports = () => {
	if (!Creep.prototype._build) {
		Creep.prototype._build = Creep.prototype.build;

		Creep.prototype.build = function (...args) {
			if (this.fatigue) {
				return ERR_TIRED;
			}

			const result = this._build.apply(this, args);
			if (result !== OK && result !== ERR_NOT_IN_RANGE) {
				/*eslint-disable no-console */
				console.log('Error building: ' + this.name + ': ' + ResultMap.get(result));
			}

			return result;
		};
	}
};
