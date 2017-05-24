'use strict';

// require('../src/creep/hello');

const main = require('../src/main');
// require('lib/screepsAutocomplete');
// const Creep = require('../lib/ScreepsAutocomplete/Creep');

desc('main', () => {
    beforeEach(() => {
        Game.creeps = [{
            creepName0: {
                sayHello: sinon.stub()
            },
            creepName1: {
                sayHello: sinon.stub()
            }
        }]
    });

    it('should update memory', () => {
        main.loop();
    });
});
