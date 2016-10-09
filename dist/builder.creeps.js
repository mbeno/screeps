var c = require('config');
var _ = require('lodash')
var helper = require('creep.helper');
var builder = require('bodybuilder');

const NAMES = c.names;
const MAX = c.max_roles;
const MAX_CREEPS = c.max_creeps;
const SPAWN = c.spawn;

function addCreep(role, cost) {
    var names = _.difference(NAMES, Object.keys(Game.creeps));
    var body = builder.build(role);
    if (names.length > 0) {
        console.log(Game.spawns[SPAWN].createCreep(body, names[0], {role: role}) + " is beeing prepared for duty.");
    } else {
        console.log(Game.spawns[SPAWN].createCreep(body, null, {role: role}) + " is beeing prepared for duty.");
    }
    console.log("Building " + role + " with body: " + JSON.stringify(body));
}

function clearIdle() {
    for(var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            if (_.includes(NAMES, name)) {
                console.log("OH NOES! " + name + " has died! :'(");
            } else {
                console.log("Removed memories of " + name + ", it will not be missed.");
            }
        }
    }
}

function checkJobs() {

}
module.exports = {
    MAX: MAX,
    run(role) {
        clearIdle();

        var creeps = Object.keys(Game.creeps).length;
        if (creeps < MAX_CREEPS && Game.spawns[SPAWN].spawning == null &&
                (Game.spawns[SPAWN].room.energyAvailable == Game.spawns[SPAWN].room.energyCapacityAvailable
                || Game.spawns[SPAWN].room.energyAvailable >= 1000)) {
            addCreep(role, Game.spawns[SPAWN].room.energyCapacityAvailable);
        }
    }
};
