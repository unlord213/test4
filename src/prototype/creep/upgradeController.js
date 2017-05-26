'use strict';

const ResultMap = require('../ResultMap');

module.exports = () => {
	if (!Creep.prototype._upgradeController) {
		Creep.prototype._upgradeController = Creep.prototype.upgradeController;

		Creep.prototype.upgradeController = function (...args) {
			if (this.fatigue) {
				return ERR_TIRED;
			}

			const result = this._upgradeController.apply(this, args);
			if (result !== OK && result !== ERR_NOT_IN_RANGE) {
				/*eslint-disable no-console */
				console.log('Error upgrading controller: ' + this.name + ': ' + ResultMap.get(result));
			}

			return result;
		};
	}
};
