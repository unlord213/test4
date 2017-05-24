'use strict';

require('version');
require('creep_hello');

module.exports.loop = function () {
    if (!Memory.SCRIPT_VERSION || Memory.SCRIPT_VERSION != SCRIPT_VERSION) {
        Memory.SCRIPT_VERSION = SCRIPT_VERSION
        console.log('New code uplodated')
    }

    console.log('loop');
    _.forIn(Game.creeps, (creep, creepName) => {
        creep.sayHello();
    });
};
