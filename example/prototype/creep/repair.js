'use strict';

// const ResultMap = require('../ResultMap');

module.exports = function () {
	if (!Creep.prototype._repair) {
		Creep.prototype._repair = Creep.prototype.repair;

		/**
		 * work and carry, within 3, target param
		 */
		// Creep.prototype.repair = function (...args) {
		// 	const result = this._repair.apply(this, args);
		// 	if (result !== OK && result !== ERR_NOT_IN_RANGE) {
		// 		/*eslint-disable no-console */
		// 		console.log('Error repairing: ' + this.name + ': ' + ResultMap.get(result));
		// 	}
		//
		// 	return result;
		// };

		Creep.prototype.repair = function (target) {
			return this._work('repair', target);
		};
	}
};
