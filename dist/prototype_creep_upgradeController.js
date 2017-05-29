'use strict';

// const ResultMap = require('ResultMap');

module.exports = function() {
	if (!Creep.prototype._upgradeController) {
		Creep.prototype._upgradeController = Creep.prototype.upgradeController;

		/**
		 * work and carry, within 3, target param
		 */
		// Creep.prototype.upgradeController = function (...args) {
		// 	const result = this._upgradeController.apply(this, args);
		// 	if (result !== OK && result !== ERR_NOT_IN_RANGE) {
		// 		/*eslint-disable no-console */
		// 		console.log('Error upgrading controller: ' + this.name + ': ' + ResultMap.get(result));
		// 	}
		//
		// 	return result;
		// };

		Creep.prototype.upgradeController = (target) => {
			return this._work('upgradeController', target);
		};
	}
};
