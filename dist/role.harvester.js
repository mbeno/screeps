
var _ = require('lodash')
var helper = require('creep.helper')

var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity && creep.memory.status == 'gathering') {
            if (creep.memory.source == null) {
                var sources = _.filter(creep.room.find(FIND_SOURCES_ACTIVE), (source) => { return (source.energy > 0 )});
                var source = sources[Math.floor((Math.random() * sources.length))];
                if(source == null) {
          //          creep.memory.role = 'idle';
                    return;
                }
                creep.memory.source = source.id;
            }
            var source = Game.getObjectById(creep.memory.source);
            var harvest_ret = creep.harvest(source);
            if(harvest_ret == ERR_NOT_IN_RANGE) {
                if (creep.moveTo(source) == ERR_NO_PATH) {
                    creep.memory.source = null;
                    return;
                }
                if (creep.carry.energy == creep.carryCapacity) {
                    creep.memory.status = 'delivering';
                    creep.say("delivering");
                }
            } else if (harvest_ret == ERR_NOT_ENOUGH_RESOURCES) {
                console.log("not enough resources");
                creep.memory.source = null;
            }
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
   //             creep.memory.role = 'idle';
            }
        }
	}
};

module.exports = roleHarvester;