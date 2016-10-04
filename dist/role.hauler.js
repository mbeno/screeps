/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.hauler');
 * mod.thing == 'a thing'; // true
 */

var helper = require('creep.helper');
var _ = require('lodash');

module.exports = {
    run: function(creep) {
        if(creep.memory.status == 'delivering' && creep.carry.energy > 0) {
            if(!helper.deliverEnergy(creep)) {
                creep.memory.status = 'gathering';
            }

        } else {
            creep.memory.status = 'gathering'
            helper.getEnergy(creep);
            if(helper.isFull(creep)) {
                creep.memory.status = 'delivering';
            }
        }
    }
};