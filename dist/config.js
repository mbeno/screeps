const bodys = {
    'general': {'work':5,'move':5,'carry':5},
    'speed_harvester': {'work':9, 'move':2},
    'fighter': {'tough':5, 'move':7, 'attack':7},
    'healer': {'tough': 3, 'move':4, 'heal':3},
    'hauler': {'carry':13, 'move':7}
};

const eco_bodys = {
    '300': {'work': 1, 'carry':2, 'move':2},
    '500': {'work': 2, 'carry':3, 'move':3},
    '700': {'work': 3, 'carry':4, 'move':4}
};



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


module.exports.bodys = bodys;

module.exports.eco_bodys = eco_bodys;


module.exports.general_body = eco_bodys['300'];


module.exports.max_roles = {
    'harvester' : 3,
    'builder' : 3,
    'upgrader': 1,
    'hauler': 0
    };
module.exports.max_creeps = 14;
module.exports.spawn = 'Spawn1';
module.exports.names = names;
module.exports.creep = {
    'wall_max_repair': 100000,
    'rampart_max_repair': 50000
}
module.exports.tower = {
    'wall_max_repair': 100000,
    'rampart_max_repair': 50000
}
