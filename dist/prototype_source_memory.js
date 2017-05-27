'use strict';

module.exports = () => {
	Object.defineProperty(Source.prototype, 'memory', {
		configurable: true,
		get: () => {
			if (_.isUndefined(Memory.mySourcesMemory)) {
				Memory.mySourcesMemory = {};
			}
			if (!_.isObject(Memory.mySourcesMemory)) {
				return undefined;
			}
			return Memory.mySourcesMemory[this.id] =
				Memory.mySourcesMemory[this.id] || {};
		},
		set: (value) => {
			if (_.isUndefined(Memory.mySourcesMemory)) {
				Memory.mySourcesMemory = {};
			}
			if (!_.isObject(Memory.mySourcesMemory)) {
				throw new Error('Could not set source memory');
			}
			Memory.mySourcesMemory[this.id] = value;
		}
	});
};
