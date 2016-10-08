/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.manager');
 * mod.thing == 'a thing'; // true
 */
var roleHarvester = require('role.harvester');
var builder = require('builder.creeps');
var _ = require('lodash');

function getWorkers(role) {
    var workers = _.filter(Game.creeps, {memory: {role: role}});
    return workers
}

function getIdleWorkers() {
    return _.filter(Game.creeps, {memory: {role: 'idle'}});
}

function getAvailableResourceSpace() {
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        }
    });
    if(targets.length > 0) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    run: function(role) {
        if (getWorkers(role).length < builder.MAX[role]) {
            if (role == 'fighter') {
                builder.run('fighter');
                return;
            } else if (role == 'healer') {
                builder.run('healer');
                return;
            }
            var idleWorkers = getIdleWorkers();
            for (worker of idleWorkers) {
                if (role == 'hauler') {
                        if (_.filter(idleWorkers[0].body, { type: 'work'}).length == 0){
                            worker.memory.role = 'hauler'
                            console.log(worker.name + " reassigned as " + role);
                            return;
                        }
                } else if (idleWorkers.length > 0 && _.filter(idleWorkers[0].body, { type: 'work'}).length) {
                    idleWorkers[0].memory.role = role;
                    console.log(idleWorkers[0].name + " reassigned as " + role);
                    return;
                }
            }
            if(role == 'hauler') { builder.build('hauler') } else { builder.run('general') }
        }

    },
    idle: function() { console.log(getIdleWorkers().length) }
};
