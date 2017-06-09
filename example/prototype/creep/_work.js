'use strict';

const ResultMap = require('../../../src/util/ResultMap');

module.exports = function () {
	if (!Creep.prototype._work) {
		Creep.prototype._work = function (actionName, ...args) {
			const result = this[actionName].apply(this, args);
			if (result !== OK && result !== ERR_NOT_IN_RANGE) {
				/*eslint-disable no-console */
				console.log('Error performing ' + actionName + ': ' + this.name + ': ' + ResultMap.get(result));
			}

			return result;
		};
	}
};
