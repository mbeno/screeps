const bodys = {
    'general': {'work':5,'move':5,'carry':5},
    'builder': {'work':5,'move':8,'carry':10},
    'speed_harvester': {'work':9, 'move':2},
    'fighter': {'tough':5, 'move':7, 'attack':7},
    'healer': {'tough': 3, 'move':4, 'heal':3},
    'hauler': {'carry':13, 'move':7}
};

const eco_bodys = {
    '300': {'work': 1, 'carry':2, 'move':2},
    '550': {'work': 2, 'carry':4, 'move':3},
    '800': {'work': 4, 'carry':4, 'move':4}
};

const harvester_mode = "short";

const eco_hauler = {
    '550': {'carry': 7, 'move':4},
    '800': {'carry': 10, 'move':5}
}

const harvester = {
    '550': {'work': 4, 'carry': 1, 'move': 1},
    '700': {'work': 5, 'carry': 1, 'move': 3}
}
/**
 * Vegard: miner
 * Torjus: hauler
 * Silje: HMS
 * Benjamin: upgrader
 * Daniel: builder
 * Marie: miner
 * Thor: Fighter
 * Benny: healer
 *
 * hauler
 * fighter
 * healer
 * upgrader
 * builder
 * miner
 */

const new_names = {
    'harvester': ['Vegard', 'Lille-Vegard'],
    'healer': ['Torjus', 'Lille-Torjus', 'T-Jizzle', 'T-Juice'],
    'hms': ['Silje', 'Lille-Silje'],
    'upgrader': ['Benjamin', 'Lille-Benjamin', 'Mini-Benjamin'],
    'fighter': ['Thor', 'Lille-Thor'],
    'hauler': ['Benny','Lille-Benny', 'BennyB', 'Mr. Benoisen'],
    'builder': ['Daniel', 'Lille-Daniel', 'Mini-Daniel']}

const names = [
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

module.exports.new_names = new_names;
module.exports.harvester_mode = harvester_mode;
module.exports.harvester = harvester;
module.exports.eco_hauler = eco_hauler;
module.exports.bodys = bodys;

module.exports.eco_bodys = eco_bodys;


module.exports.general_body = eco_bodys['300'];


module.exports.max_roles = {
    'harvester' : 2,
    'builder' : 2,
    'upgrader': 1,
    'hauler': 3,
    'fighter': 2,
    'healer': 2
    };
module.exports.max_creeps = 14;
module.exports.spawn = 'Spawn1';
module.exports.names = names;
module.exports.creep = {
    'wall_max_repair': 50000,
    'rampart_max_repair': 50000
}
module.exports.tower = {
    'wall_max_repair': 100000,
    'rampart_max_repair': 100000
}
