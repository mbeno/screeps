/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.healer');
 * mod.thing == 'a thing'; // true
 */

var _ = require('lodash')
module.exports = {
    run: function(creep) {
        var target = creep.pos.findClosestByPath(_.filter(creep.room.find(FIND_MY_CREEPS), (o) => { return (creep.hits + 90) < creep.hitsMax}));
        if(target) {
            creep.say(target.name);
            if(creep.heal(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            creep.moveTo(Game.flags['healers']);
        }
        
        
    }
};