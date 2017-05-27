'use strict';

module.exports = () => {
	Object.defineProperty(Creep.prototype, 'isFull', {
		get: () => {
			if (!this._isFull) {
				this._isFull = _.sum(this.carry) === this.carryCapacity;
			}
			return this._isFull;
		},
		enumerable: false,
		configurable: true
	});
};
