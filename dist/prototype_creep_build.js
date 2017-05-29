'use strict';

// const ResultMap = require('ResultMap');

module.exports = function() {
	if (!Creep.prototype._build) {
		Creep.prototype._build = Creep.prototype.build;

		/**
		 * work and carry, within 3, target param
		 */
		// Creep.prototype.build = function (...args) {
		// 	const result = this._build.apply(this, args);
		// 	if (result !== OK && result !== ERR_NOT_IN_RANGE) {
		// 		/*eslint-disable no-console */
		// 		console.log('Error building: ' + this.name + ': ' + ResultMap.get(result));
		// 	}
		//
		// 	return result;
		// };

		Creep.prototype.build = (target) => {
			return this._work('build', target);
		};
	}
};
