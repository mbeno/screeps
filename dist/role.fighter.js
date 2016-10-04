/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.fighter');
 * mod.thing == 'a thing'; // true
 */
var _ = require('lodash')
module.exports = {
    run: function(creep) {
        var target = creep.pos.findClosestByPath(creep.room.find(FIND_HOSTILE_CREEPS));
        if(target) {
            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            creep.moveTo(Game.flags['fighters']);
        }
        
        
    }
};