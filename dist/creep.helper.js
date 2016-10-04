/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.helper');
 * mod.thing == 'a thing'; // true
 */
var _ = require('lodash');

function findEnergyStorage(creep) {
    var sources = _.filter(creep.room.find(FIND_STRUCTURES), 
    (o) => {return o.structureType == STRUCTURE_STORAGE && o.store[RESOURCE_ENERGY] > creep.carryCapacity});
    if(sources.length) {
        creep.memory.source = creep.pos.findClosestByPath(sources).id;
    }
}

function getEnergy(creep) {
    if(creep.memory.source == null) {
        findEnergyStorage(creep);
    }
    var ret = creep.withdraw(Game.getObjectById(creep.memory.source), RESOURCE_ENERGY)
    if(ret == ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.getObjectById(creep.memory.source));
    } else if (ret == ERR_INVALID_TARGET) {
        creep.source = null;
    }
}

function deliverEnergy(creep) {
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
    var containers = _.filter(creep.room.find(FIND_STRUCTURES), (o) => { return (Memory.haul_targets.indexOf(o) < 0) && (o.structureType == STRUCTURE_CONTAINER && ((o.store[RESOURCE_ENERGY] + 300) < o.storeCapacity))});
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

function bodyBuilder(price, role) {
    var body = [];
    if (role == 'general') {
        var occurances = {'work': 0, 'move': 0, 'carry': 0};
        while(price >= 50) {
            if (price >= BODYPART_COST.work && (occurances[WORK] == null || (occurances[WORK] < ((occurances[CARRY] / 2) + 2) ) )) { 
    
                body.push(WORK);
                price -= BODYPART_COST.work;
                occurances[WORK] += 1;
            } else if(price >= BODYPART_COST.move && (occurances[MOVE] == null || ((occurances[WORK] + occurances[CARRY]) / 2) > occurances[MOVE])) {
    
                body.push(MOVE);
                price -= BODYPART_COST.move;
                occurances[MOVE] += 1;
            } else {
    
                body.push(CARRY);
                price -= BODYPART_COST.carry;
                occurances[CARRY] += 1;
            }
    
        }
    } else if (role == 'hauler') {
        var occurances = {'move': 0, 'carry': 0};
        while(price >= 50) {

            if(price >= BODYPART_COST.move && (occurances[MOVE] == 0 || ((occurances[CARRY] / 2) )) > occurances[MOVE]) {
    
                body.push(MOVE);
                price -= BODYPART_COST.move;
                occurances[MOVE] += 1;
            } else {
    
                body.push(CARRY);
                price -= BODYPART_COST.carry;
                occurances[CARRY] += 1;
            }
    
        }
    } else if (role == 'fighter') {
        var body = [];
        var cmove = 0;
        var weight = 0;
        var occurances = {'attack': 0, 'tough': 0}
        while(price >= 50) {
            if( price >= BODYPART_COST.move && cmove <= (weight / 2)) {
                body.push(MOVE);
                price -= BODYPART_COST.move;
                cmove += 1;
            } else
            if( price >= BODYPART_COST.attack && (weight / 2) < cmove  && occurances.attack <= (occurances.tough * 1.2)) {
                body.push(ATTACK);
                price -= BODYPART_COST.attack;
                occurances.attack += 1;
                weight += 1;
            }else {
                body.push(TOUGH);
                price -= BODYPART_COST.tough;
                weight += 1;
                occurances.tough += 1;
            } 
        }
    } else if (role == 'healer') {
        var body = [];
        var cmove = 0;
        var weight = 0;
        while(price >= 50) {
            if( price >= BODYPART_COST.heal && (weight / 2) <= cmove) {
                body.push(HEAL);
                price -= BODYPART_COST.heal;
                weight += 1;
            }else if (cmove <= (weight / 2)) {
                body.push(MOVE);
                price -= BODYPART_COST.move;
                cmove += 1;
            }  else {
                body.push(TOUGH);
                price -= BODYPART_COST.tough;
                weight += 1;
            } 
        }
    }
    return body;
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
    bodyBuilder: bodyBuilder
};