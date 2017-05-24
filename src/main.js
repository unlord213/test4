require('creep/creep.hello');

module.exports.loop = function() {
    console.log('loop');
    _.forIn(Game.creeps, (creep, creepName) => {
        creep.sayHello();
    });
};
