'use strict';

module.exports = function() {
	Object.defineProperty(Creep.prototype, 'isFull', {
		get: function() {
			if (!this._isFull) {
				this._isFull = _.sum(this.carry) === this.carryCapacity;
			}
			return this._isFull;
		},
		enumerable: false,
		configurable: true
	});
};
