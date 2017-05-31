'use strict';

module.exports = function () {
	Object.defineProperty(Room.prototype, 'sourceAccessPoints', {
		get: function () {
			if (!this.memory.sourceAccessPoints) {
				this.memory.sourceAccessPoints = this.find(FIND_SOURCES).reduce(function(obj, source, index) {
					obj[index] = source.buildAccessPoints();
					return obj;
				}, {});
			}

			return this.memory.sourceAccessPoints;
		},
		enumerable: false,
		configurable: true
	});
};
