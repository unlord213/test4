'use strict';

// const ResultMap = require('../ResultMap');

module.exports = function() {
	if (!Creep.prototype._withdraw) {
		Creep.prototype._withdraw = Creep.prototype.withdraw;

		/**
		 * carry, within 1, target, resource type, amount params
		 */
		// Creep.prototype.withdraw = function (...args) {
		// 	const result = this._withdraw.apply(this, args);
		// 	if (result !== OK && result !== ERR_NOT_IN_RANGE) {
		// 		/*eslint-disable no-console */
		// 		console.log('Error withdrawing: ' + this.name + ': ' + ResultMap.get(result));
		// 	}
		//
		// 	return result;
		// };

		Creep.prototype.withdraw = (...args) => {
			return this._work('withdraw', args);
		};
	}
};
