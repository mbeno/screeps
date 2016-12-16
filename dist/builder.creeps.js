var c = require('config');
var _ = require('lodash')
var helper = require('creep.helper');
var builder = require('bodybuilder');

const NAMES = c.names;
const MAX = c.max_roles;
const MAX_CREEPS = c.max_creeps;
const SPAWN = c.spawn;
const new_names = c.new_names;
function addCreep(role, cost) {
    var names = _.difference(new_names[role], Object.keys(Game.creeps));
    var body = builder.build(role);
    Memory.building = Game.time;
    if (names.length > 0) {
        console.log(Game.spawns[SPAWN].createCreep(body, names[0], {role: role}) + " is beeing prepared for duty.");
    } else {
        console.log(Game.spawns[SPAWN].createCreep(body, null, {role: role}) + " is beeing prepared for duty.");
    }
    console.log("Building " + role + " with body: " + JSON.stringify(body));
}

function checkJobs() {

}
module.exports = {
    MAX: MAX,
    run(role) {
        if(Game.time == Memory.building) return;
        var creeps = Object.keys(Game.creeps).length;
        if (creeps < MAX_CREEPS && Game.spawns[SPAWN].spawning == null &&
                (Game.spawns[SPAWN].room.energyAvailable == Game.spawns[SPAWN].room.energyCapacityAvailable
                || Game.spawns[SPAWN].room.energyAvailable >= 1250)) {
            addCreep(role, Game.spawns[SPAWN].room.energyCapacityAvailable);
        }
    }
};
