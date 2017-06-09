'use strict';

const Roles = require('Roles');
const Actions = require('Actions');

module.exports = {
	cleanup: cleanup
};

function cleanup() {
	_.forIn(Memory.creeps, (creepMemory, creepName) => {
		if (!Game.creeps[creepName]) {
			/*eslint-disable no-console */
			console.log('Clearing non-existing creep memory: ' + creepName);

			const roomInfo = Memory.rooms[creepMemory.room];
			switch (creepMemory.role) {
				case Roles.HARVESTER.id:
					--roomInfo.numHarvesters;

					if(creepMemory.action.id === Actions.HARVEST) {
						const target = creepMemory.action.target;
						roomInfo.sourceAccessPoints[target.sourceId][target.accessPointId].creepName = null;
					}
					break;
				case Roles.BUILDER.id:
					--roomInfo.numBuilders;
					break;
				default:
					/*eslint-disable no-console */
					console.log('Unknown role for clearing creep memory: ' + creepName + ': ' + creepMemory.role);
			}

			// if (roomInfo.upgradeCreepId === creepName) {
			// 	roomInfo.upgradeCreepId = null;
			// }

			// _.forIn(roomInfo.energyStructureInfos.spawns, (spawn) => {
			// 	_.forIn(spawn.transfers, (transfer, creepId) => {
			// 		if (creepId === creepName) {
			// 			delete spawn.transfers[creepId];
			// 		}
			// 	});
			// });
			//
			// _.forIn(roomInfo.sourceInfos, (sourceInfo) => {
			// 	_.forIn(sourceInfo.accessPoints, (accessPoint) => {
			// 		if (accessPoint.creepId === creepName) {
			// 			accessPoint.creepId = null;
			// 		}
			// 	});
			// });

			delete Memory.creeps[creepName];
		}
	});

}

