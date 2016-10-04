/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder.creeps');
 * mod.thing == 'a thing'; // true
 */
/**
const BODY = [WORK,MOVE, MOVE,CARRY, CARRY];



    '800': [WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, CARRY, CARRY],
    '750': [WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, CARRY],
    '700': [WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE],
    '650': [WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY],
    '600': [WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY],
        '800': [WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, CARRY, CARRY],
    '750': [WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, CARRY],
    '700': [WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE],
    '650': [WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY],
    '600': [WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY],
    '550': [WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY, CARRY],
    '450': [WORK, WORK, MOVE, MOVE, CARRY, CARRY, CARRY],
    '400': [WORK, WORK, MOVE, MOVE, CARRY, CARRY],


const BODYS = {
    '800': [WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
    '750': [WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, CARRY],
    '700': [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE],
    '650': [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY],
    '600': [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY],
    '550': [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY],
    '450': [WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY],
    '400': [WORK, WORK, MOVE, MOVE, CARRY, CARRY],
    '350': [WORK, MOVE, MOVE, CARRY, CARRY, CARRY],
    '300': [WORK, MOVE, MOVE, CARRY, CARRY]
};
*/

const MAX = {
    'harvester' : 3,
    'builder' : 2,
    'upgrader': 1,
    'hauler': 4,
    'fighter': 2,
    'healer': 1
    };

var _ = require('lodash')
var helper = require('creep.helper');
const MAX_CREEPS = 14;
const SPAWN = 'Spawn1';
/**
function buildCost(size) {
    for (var i in BODYS[size]) {
        body_cost += BODYPART_COST[BODYS[size][i]];
    }
    return body_cost;
}
*/
const NAMES = [
    'Vegard',
    'Silje',
    'Benjamin',
    'Thor',
    'Torjus',
    'Benny',
    'Daniel',
    'Lille-Silje',
    'Lille-Vegard',
    'Lille-Benny',
    'Lille-Thor',
    'Lille-Torjus',
    'Lille-Daniel',
    'Safet',
    'Lille-Safet'
    ];
function addCreep(role) {
    var names = _.difference(NAMES, Object.keys(Game.creeps));
    var body = helper.bodyBuilder(1000, role);
    if(role == 'general') {
        role = 'idle';
    }
    if (names.length > 0) {
        console.log(Game.spawns[SPAWN].createCreep(body, names[0], {role: role}) + " is beeing prepared for duty.");
    } else {
        console.log(Game.spawns[SPAWN].createCreep(body, null, {role: role}) + " is beeing prepared for duty.");
    }
    console.log("Building " + role + " body with: " + JSON.stringify(body.sort()));
}

function checkJobs() {

}
module.exports = {
    MAX: MAX,
    run(role) {
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
        var creeps = Object.keys(Game.creeps).length;
        if (creeps < MAX_CREEPS && Game.spawns[SPAWN].spawning == null && 
        (Game.spawns[SPAWN].room.energyAvailable == Game.spawns[SPAWN].room.energyCapacityAvailable 
        || Game.spawns[SPAWN].room.energyAvailable >= 1000)) 
        {
            addCreep(role);
        } 
    }
};