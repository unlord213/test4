'use strict';

module.exports = function () {
	if (Room.prototype.buildSourceAccessPoints) {
		return;
	}

	Room.prototype.buildSourceAccessPoints = function () {
		if (this.memory.sourceAccessPoints) {
			return;
		}

		this.memory.sourceAccessPoints = this.find(FIND_SOURCES).reduce(function (obj, source) {
			obj[source.id] = source.buildAccessPoints();
			return obj;
		}, {});
	}
};
