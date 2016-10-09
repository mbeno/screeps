
var _ = require('lodash')
var helper = require('creep.helper')
var c = require('config');
var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(c.harvester_mode == "short") helper.harvestLoop(creep);
	    if(creep.carry.energy < creep.carryCapacity && creep.memory.status == 'gathering') {
            if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.status = 'delivering';
                creep.say("delivering");
            }
            if(c.harvester_mode == "short") {
                helper.findEnergySourceShort(creep);
            } else {
                helper.findEnergySource(creep);
            }
        }
        else {
            creep.memory.status = 'delivering';
            if(c.harvester_mode == "long") {
                if(helper.deliverBase(creep)) return;
                if(helper.deliverContainer(creep)) return;
            } else if(helper.deliverContainer(creep)) return;
            else if (c.harvester_mode == "long") creep.moveTo(Game.flags['idle']);
        }
	}
};

module.exports = roleHarvester;
