/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.turret');
 * mod.thing == 'a thing'; // true
 */
var _ = require('lodash');
var c = require('config');
function turretDo(turret) {
    var low = _.filter(turret.room.find(FIND_STRUCTURES), (o) => {
        return (o.structureType == STRUCTURE_WALL || o.structureType == STRUCTURE_RAMPART) && o.hits < 300 && turret.energy > 800});
    if (low.length > 0) {
        console.log(low.length + " target's very low, repairing");
        turret.repair(low[0]);
        return;
    }

    var creeps = _.filter(Game.creeps, (o) => {
        return ((o.hits + 100) < o.hitsMax) && turret.room == o.room
    });
    if (creeps.length > 0) {
        console.log(turret.heal(creeps[0]));
        return;
    }
    var targets = turret.room.find(FIND_HOSTILE_CREEPS);
    if (targets.length) {
        var target = turret.pos.findClosestByRange(targets);
        turret.attack(target);
        return;
    }
    var roads = _.filter(turret.room.find(FIND_STRUCTURES), (structure) => {
        return ((structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_CONTAINER) && (structure.hits + 100) < structure.hitsMax)
    });
    if (roads.length > 0 && turret.energy > 800) {
        turret.repair(roads[0])
        return;
    }
    var walls = _.filter(turret.room.find(FIND_STRUCTURES), (structure) => {
        return (structure.structureType == STRUCTURE_WALL && structure.hits < c.tower.wall_max_repair) || (structure.structureType == STRUCTURE_RAMPART && structure.hits < c.tower.rampart_max_repair)
    });
    if (walls.length > 0 && turret.energy > 500) {
        turret.repair(turret.pos.findClosestByRange(walls));
        return;
    }
}

module.exports = {
    run: function() {
        var turrets = _.filter(Game.spawns.Spawn1.room.find(FIND_STRUCTURES), (o) => {
            return o.structureType == STRUCTURE_TOWER
        });
        for (var turret of turrets) {
            turretDo(turret);
        }
    }
};
