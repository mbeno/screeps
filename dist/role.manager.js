var builder = require('builder.creeps');
var _ = require('lodash');

function getWorkers(role) {
    var workers = _.filter(Game.creeps, {memory: {role: role}});
    return workers
}

module.exports = {
    run: function(role) {
        if (getWorkers(role).length < builder.MAX[role]) {
            if(role == 'hauler') {
                var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;
                if (energy < 550) {
                    return
                }
            }
                builder.run(role)
        }

    },
};
