'use strict';

module.exports = {
	generate: (spawnName, role) => {
		if (role) {
			return spawnName + '_' + role + '_' + Game.time;
		}

		return spawnName + '_' + Game.time;
	}
};
