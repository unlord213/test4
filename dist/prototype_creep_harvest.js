'use strict';

// const ResultMap = require('ResultMap');

module.exports = function() {
	if (!Creep.prototype._harvest) {
		Creep.prototype._harvest = Creep.prototype.harvest;

		/**
		 * work and carry, within 1, target param
		 */
		// Creep.prototype.harvest = function (...args) {
		// 	const result = this._harvest.apply(this, args);
		// 	if (result !== OK && result !== ERR_NOT_IN_RANGE) {
		// 		/*eslint-disable no-console */
		// 		console.log('Error harvesting: ' + this.name + ': ' + ResultMap.get(result));
		// 	}
		//
		// 	return result;
		// };

		Creep.prototype.harvest = (target) => {
			return this._work('harvest', target);
		};
	}
};
