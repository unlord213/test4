'use strict';

module.exports = () => {
	if (!Game.prototype.report) {
		Game.prototype.report = () => {
			/*eslint-disable no-console */
			console.log(Game.time);
		};
	}
};
