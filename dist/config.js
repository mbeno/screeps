/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('config');
 * mod.thing == 'a thing'; // true
 */

module.exports.BODY = [WORK,MOVE, MOVE,CARRY, CARRY];


/**
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
 *
 *
*/

module.exports.BODYS = {
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

module.exports.MAX = {
    'harvester' : 5,
    'builder' : 5,
    'upgrader': 3,
    'hauler': 1
    };
module.exports.MAX_CREEPS = 14;
module.exports.SPAWN = 'Spawn1';

module.exports.creep = {
    'wall_max_repair': 100000,
    'rampart_max_repair': 100000
}
module.exports.tower = {
    'wall_max_repair': 100000,
    'rampart_max_repair': 100000
}
