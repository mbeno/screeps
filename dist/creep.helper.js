/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.helper');
 * mod.thing == 'a thing'; // true
 */
var _ = require('lodash');
var c = require('config');
function findEnergyStorage(creep) {

    if(creep.memory.role == "hauler") {
        var sources = _.filter(creep.room.find(FIND_STRUCTURES),
                            (o) => {return (((o.structureType == STRUCTURE_STORAGE && o.store[RESOURCE_ENERGY] > creep.carryCapacity) || (o.structureType == STRUCTURE_CONTAINER && o.store[RESOURCE_ENERGY] > 300 )))});
    } else {
        var sources = _.filter(creep.room.find(FIND_STRUCTURES),
        (o) => {return (o.structureType == STRUCTURE_STORAGE && o.store[RESOURCE_ENERGY] > creep.carryCapacity) || (o.structureType == STRUCTURE_CONTAINER && o.store[RESOURCE_ENERGY] > 300 )});
    }
    var prefered_sources = _.filter(sources,
    (o) => {return Memory.storage_containers.indexOf(o.id) > -1});
    if(prefered_sources.length > 0) {
        creep.memory.source = creep.pos.findClosestByPath(prefered_sources).id;
    } else if (sources.length > 0) {
        creep.memory.source = creep.pos.findClosestByPath(sources).id;
    } else {
        findEnergySource(creep);
    }
}
function deliverBase(creep) {
    var base = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity)
            }
    });
    if (base.length > 0) {
        var target = creep.pos.findClosestByRange(base);
        var ret = creep.transfer(target, RESOURCE_ENERGY);
        if(ret == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
            return true;
        } else if (ret != OK) {
            if (creep.carry.energy == 0) {
                creep.memory.status = 'gathering';
                creep.say('gathering');
            }
            creep.memory.source = null;
            return false;
        } else {
            return true;
        }
    } else return false;
}

function harvestLoop(creep) {
    if(Memory.sourcesInUse == null) Memory.sourcesInUse = {};
    if(creep.memory.source == null) {
        var sources = _.filter(creep.room.find(FIND_SOURCES_ACTIVE), (o) => { return !Memory.sourcesInUse[o.id] });
        if(sources.length == 0) return;
        creep.memory.source = creep.pos.findClosestByRange(sources).id;
        Memory.sourcesInUse[creep.memory.source] = true;
    }
    if (creep.memory.target == null) {
        creep.memory.target = Memory.source_targets[creep.memory.source];
    }
    var source = Game.getObjectById(creep.memory.source);
    var target = Game.getObjectById(creep.memory.target);
    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(target);
    else if(creep.harvest(source) == ERR_NOT_IN_RANGE) creep.moveTo(source);
}

function deliverContainer(creep) {
    if(creep.memory.target == null) {

        var stor = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_STORAGE && (structure.store[RESOURCE_ENERGY] < structure.storeCapacity)) ||
                            (structure.structureType == STRUCTURE_CONTAINER && Memory.source_containers.indexOf(structure.id) > -1 && structure.store[RESOURCE_ENERGY] < structure.storeCapacity) )
                }
        });
        if (stor.length > 0) {
            creep.memory.target = creep.pos.findClosestByRange(stor).id;
        } else {
            return false;
        }
    }
    var target = Game.getObjectById(creep.memory.target);
    var ret = creep.transfer(target, RESOURCE_ENERGY);
    if(ret == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
        return true;
    } else if (ret == ERR_NOT_ENOUGH_RESOURCES) {
            creep.memory.status = 'gathering';
            creep.say('gathering');
            creep.memory.source = null;
            return true;
    } else if(ret != OK) {
        creep.memory.source = null;
        return false;
    } else {
        return true;
    }
}

function findEnergySource(creep){
    if(creep.memory.source == null) {
        var sources = creep.room.find(FIND_SOURCES_ACTIVE);
        if (sources.length > 0) {
            creep.memory.source = creep.pos.findClosestByRange(sources).id;
        }
    }
    var source = Game.getObjectById(creep.memory.source);
    var harvest_ret = creep.harvest(source);
    if(harvest_ret == OK) return true;
    else if (harvest_ret == ERR_NOT_IN_RANGE) {
        var move_ret = creep.moveTo(source);
        if (move_ret == ERR_NO_PATH) {
            creep.say("no path!");
            var sources = _.filter(creep.room.find(FIND_SOURCES_ACTIVE), (o) => { return o.id != creep.memory.source});
            if (sources.length > 0) {
                creep.memory.source = creep.pos.findClosestByRange(sources).id;
                return true;
            } else return false;
        }
        return true;
    } else if (harvest_ret == ERR_NOT_ENOUGH_RESOURCES && c.harvester_mode == "long") {
        creep.say("no resources!");
        var sources = _.filter(creep.room.find(FIND_SOURCES_ACTIVE), (o) => { return o.id != creep.memory.id});
        if (sources.length > 0) {
            creep.memory.source = creep.pos.findClosestByRange(sources).id;
            return true;
        } else return false;

    }
}

function findEnergySourceShort(creep) {
    if(creep.memory.source == null) {
        var sources = creep.room.find(FIND_SOURCES_ACTIVE);
        if (sources.length > 0) {
            creep.memory.source = creep.pos.findClosestByRange(sources).id;
        }
    }
    var source = Game.getObjectById(creep.memory.source);
    var harvest_ret = creep.harvest(source);
    if(harvest_ret == OK) {
//        deliverContainer(creep);
        return true;
    }
    else if (harvest_ret == ERR_NOT_IN_RANGE) {
        var move_ret = creep.moveTo(source);
        if (move_ret == ERR_NO_PATH) {
            creep.say("no path!");
            return true;
        }
        return true;
    } else if (harvest_ret == ERR_NOT_ENOUGH_RESOURCES && c.harvester_mode == "long") {
        creep.say("no resources!");
        var sources = _.filter(creep.room.find(FIND_SOURCES_ACTIVE), (o) => { return o.id != creep.memory.id});
        if (sources.length > 0) {
            creep.memory.source = creep.pos.findClosestByRange(sources).id;
            return true;
        } else return false;

    }
}

function repair(creep) {
    if (creep.memory.repair_target == null) {
        var targets = _.filter(creep.room.find(FIND_STRUCTURES), (o) => { return (o.structureType == STRUCTURE_WALL && o.hits < c.creep.wall_max_repair) || (o.structureType == STRUCTURE_RAMPART && o.hits < c.creep.rampart_max_repair)});
        var roadcon = _.filter(creep.room.find(FIND_STRUCTURES), (o) => { return (o.structureType == STRUCTURE_ROAD || o.structureType == STRUCTURE_CONTAINER) && (o.hits + 1000) < o.hitsMax});
        if (targets.length > 0) {
            creep.memory.repair_target = creep.pos.findClosestByRange(targets).id;
        } else if (roadcon.length > 0) {
            creep.memory.repair_target = creep.pos.findClosestByRange(roadcon).id;
        } else {
            return false;
        }
    }
    var target = Game.getObjectById(creep.memory.repair_target);
    if ((target.hits < target.hitsMax && (target.structureType == STRUCTURE_ROAD || target.structureType == STRUCTURE_CONTAINER)) || (target.structureType == STRUCTURE_RAMPART && target.hits < c.creep.rampart_max_repair) || (target.structureType == STRUCTURE_WALL && target.hits < c.creep.wall_max_repair)) {
        var repair_ret = creep.repair(target);
        if (repair_ret == OK) return true;
        else if (repair_ret == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
            return true;
        }
    } else {
        creep.memory.repair_target = null;
        return false;
    }
    return false;
}

function build(creep) {
    if (creep.memory.build_target == null) {
        var build_targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        var pri_build_targets = _.filter(build_targets, (o) => { return o.structureType == STRUCTURE_EXTENSION });
        if(pri_build_targets.length > 0){
            console.log("Building priority target");
            build_targets = pri_build_targets;
        }
        if( build_targets.length > 0) {
            creep.memory.build_target = creep.pos.findClosestByRange(build_targets).id;
        } else {
            return false;
        }
    }
    var build_ret = creep.build(Game.getObjectById(creep.memory.build_target));
    if (build_ret == OK) return true;
    else if (build_ret == ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.getObjectById(creep.memory.build_target));
        return true;
    }
    else {
        creep.memory.build_target = null;
        return false;
    }
    return false;
}

function getEnergy(creep) {
    if(creep.memory.source == null) {
        findEnergyStorage(creep);
    }
    var ret = creep.withdraw(Game.getObjectById(creep.memory.source), RESOURCE_ENERGY)
    if(ret == ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.getObjectById(creep.memory.source));
    } else if (ret != OK) {
        creep.memory.source = null;
    }
}

function deliverEnergy(creep) {
    var base = _.filter(creep.room.find(FIND_STRUCTURES),
        (structure) => {
            return ( (Memory.haul_targets.indexOf(structure)  < 0) && (
            (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity))
        }
    );
    if(base.length > 0) {
        if(creep.memory.target == null) {
            creep.memory.target = creep.pos.findClosestByRange(base).id;
            Memory.haul_targets.push(creep.memory.target);
        }
        var target = Game.getObjectById(creep.memory.target);
        var ret = creep.transfer(target, RESOURCE_ENERGY)
        if(ret == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }else {
            Memory.haul_targets = _.without(Memory.haul_targets, creep.memory.target);
            creep.memory.target = null;
        }
        return true;
    }
    var towers = _.filter(creep.room.find(FIND_STRUCTURES), (o) => {return (Memory.haul_targets.indexOf(o) < 0) && (o.structureType == STRUCTURE_TOWER && (o.energy < (o.energyCapacity - 300)))})
    if (towers.length > 0) {
        if(creep.memory.target == null) {
            creep.memory.target = creep.pos.findClosestByRange(towers).id;
            Memory.haul_targets.push(creep.memory.target);
        }
        var target = Game.getObjectById(creep.memory.target);
        var ret = creep.transfer(target, RESOURCE_ENERGY)
        if(ret == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        } else {
            Memory.haul_targets = _.without(Memory.haul_targets, creep.memory.target);
            creep.memory.target = null;
        }
        return true;
    }
    var containers = _.filter(creep.room.find(FIND_STRUCTURES), (o) => { return (Memory.haul_targets.indexOf(o) < 0) && (o.structureType == STRUCTURE_CONTAINER && ((o.store[RESOURCE_ENERGY] + 300) < o.storeCapacity) &&
                                                                                                                        Memory.storage_containers.indexOf(o.id) > -1 )});
    if (containers.length > 0) {
        if(creep.memory.target == null) {
            creep.memory.target = creep.pos.findClosestByRange(containers).id;
            Memory.haul_targets.push(creep.memory.target);
        }
        var target = Game.getObjectById(creep.memory.target);
        var ret = creep.transfer(target, RESOURCE_ENERGY)
        if(ret == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }else {
            Memory.haul_targets = _.without(Memory.haul_targets, creep.memory.target);
            creep.memory.target = null;
        }
        return true;
    }
    return false;
}


function isFull(creep) {
    if(creep.carry.energy == creep.carryCapacity) return true;
    return false;
}

module.exports = {
    findEnergyStorage: findEnergyStorage,
    getEnergy: getEnergy,
    deliverEnergy: deliverEnergy,
    isFull: isFull,
    findEnergySource: findEnergySource,
    findEnergySourceShort: findEnergySourceShort,
    build: build,
    repair: repair,
    deliverBase: deliverBase,
    deliverContainer: deliverContainer,
    harvestLoop: harvestLoop

};
