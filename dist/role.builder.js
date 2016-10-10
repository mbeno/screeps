var c = require('config');
var helper = require('creep.helper');
var roleBuilder = {

        /** @param {Creep} creep **/
        run: function(creep) {
            if (creep.memory.building && creep.carry.energy == 0) {
                creep.memory.building = false;
                creep.say('harvesting');
            }
            if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
                creep.memory.building = true;
                creep.say('building');
            }

            if (creep.memory.building) {
                creep.memory.source = null;
                if(helper.repair(creep)) return;
                if(helper.build(creep)) return;
                creep.moveTo(Game.flags['idle']);
            } else helper.getEnergy(creep);
        }
}

        module.exports = roleBuilder;
