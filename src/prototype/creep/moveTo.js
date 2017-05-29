'use strict';

const ResultMap = require('../../util/ResultMap');

module.exports = function() {
	if (!Creep.prototype._moveTo) {
		Creep.prototype._moveTo = Creep.prototype.moveTo;

		Creep.prototype.moveTo = (...args) => {
			if (this.fatigue) {
				return ERR_TIRED;
			}

			const result = this._moveTo.apply(this, args);
			if (result !== OK) {
				/*eslint-disable no-console */
				console.log('Error moving to: ' + this.name + ': ' + ResultMap.get(result));
			}

			return result;
		};
	}
};
