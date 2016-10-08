
var _ = require('lodash')
var helper = require('creep.helper')

var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity && creep.memory.status == 'gathering') {
            if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.status = 'delivering';
                creep.say("delivering");
            }
            helper.findEnergySource(creep);
        }
        else {
            creep.memory.status = 'delivering';
            var targets = null;
            var base = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity)
                    }
            });
            var stor = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_STORAGE && (structure.store[RESOURCE_ENERGY] < structure.storeCapacity)))
                    }
            });
            if (base.length) targets = base;
            else targets = stor;
            if(targets.length > 0) {
                var tTarget = creep.pos.findClosestByRange(targets);
                var ret = creep.transfer(tTarget, RESOURCE_ENERGY);
                if(ret == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tTarget);
                } else if (ret != OK) {
                    if (creep.carry.energy == 0) {
                        creep.memory.status = 'gathering';
                        creep.say('gathering');
                    }
                    creep.memory.source = null;
                }
            } else {
                creep.moveTo(Game.flags['idle']);
            }
        }
	}
};

module.exports = roleHarvester;
