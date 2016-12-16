var builder = require('builder.creeps');
var _ = require('lodash');

function getWorkers(role) {
    var workers = _.filter(Game.creeps, {memory: {role: role}});
    return workers
}

module.exports = {
    run: function(role) {
        if ((getWorkers(role).length < builder.MAX[role])) {
            if(Memory.waitforharvester && role != 'harvester') return;
            if(Memory.waitforhauler && (role != 'hauler' && role != 'harvester')) return;
            if(role == 'hauler') {
                var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;
                if (energy < 550) {
                    return
                }
            }
                builder.run(role)
            if(role == 'harvester') {
                if(getWorkers(role).length < 2) {
                    Memory.waitforharvester = true;
                } else {
                    Memory.waitforharvester = false;
                }
            }
            if(role == 'hauler') {
                if (getWorkers(role) < 2) {
                    Memory.waitforhauler = true;
                } else {
                    Memory.waitforhauler = false;
                }
            }
        } else if (role == 'harvester') Memory.waitforharvester = false;
        else if(role == 'hauler') Memory.waitforhauler = false;

    },
};
