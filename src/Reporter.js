'use strict';

const SPAN_PURPLE = '<span style="color:rgba(198, 120, 221, 1)">';
const SPAN_ORANGE = '<span style="color:rgba(210, 127, 50, 1)">';
const SPAN_GREEN = '<span style="color:rgba(152, 195, 121, 1)">';
const SPAN_CLOSE = '</span>';

module.exports = {
	report: function () {
		const memoryUsage = _.round(JSON.stringify(Memory).length / 1024, 2);
		/*eslint-disable no-console */
		console.log(SPAN_PURPLE + 'Tick ' + Game.time + ': ' + Game.cpu.getUsed() + ' CPU: ' + memoryUsage + 'kb' + SPAN_CLOSE);
	}
};
