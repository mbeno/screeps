var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
            creep.memory.source = null;
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('upgrading');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            if (creep.memory.source == null) {
                var structure_sources = _.filter(creep.room.find(FIND_STRUCTURES), (o) => {return (o.structureType == STRUCTURE_CONTAINER || o.structureType == STRUCTURE_STORAGE) && o.store[RESOURCE_ENERGY] > 100});
    	        if (structure_sources.length) {
    	                creep.memory.source = creep.pos.findClosestByRange(structure_sources).id;
    	        } else {
                    var sources = creep.room.find(FIND_SOURCES);
                    var source = creep.pos.findClosestByPath(sources);
                    creep.memory.source = source.id;
    	        }
            }
            var source = Game.getObjectById(creep.memory.source);
            if (source.structureType == STRUCTURE_STORAGE || source.structureType == STRUCTURE_CONTAINER) {
                if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            } else if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
	}
};

module.exports = roleUpgrader;