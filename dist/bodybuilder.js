var _ = require('lodash');
var c = require('config');


function testbuilder() {
    for (var b in BODYS) {
        console.log(b + ": " + JSON.stringify(builder(BODYS[b])));
    }
}

function general() {
    var energyAvailable = Game.spawns[c.spawn].room.energyCapacityAvailable;
    if (energyAvailable >= 1000) {
        return builder(c.bodys['general']);
    } else if (energyAvailable >= 800) {
        return builder(c.eco_bodys['800']);
    } else if (energyAvailable >= 550) {
        return builder(c.eco_bodys['550']);
    } else if (energyAvailable >= 300) {
        return builder(c.bodys['300']);
    }


}

function builders() {
    var energyAvailable = Game.spawns[c.spawn].room.energyCapacityAvailable;
    if (energyAvailable >= 1250) {
        return builder(c.bodys['builder']);
    } else if (energyAvailable >= 1000) {
        return builder(c.bodys['general']);
    } else if (energyAvailable >= 800) {
        return builder(c.eco_bodys['800']);
    } else if (energyAvailable >= 550) {
        return builder(c.eco_bodys['550']);
    } else if (energyAvailable >= 300) {
        return builder(c.bodys['300']);
    }


}

function hauler() {
    var energyAvailable = Game.spawns[c.spawn].room.energyCapacityAvailable;
    if (energyAvailable >= 800) {
        return builder(c.eco_hauler['800']);
    } else if (energyAvailable >= 550) {
        return builder(c.eco_hauler['550']);
    }
}

function harvester() {
    var bodys;
    var energyAvailable = Game.spawns[c.spawn].room.energyCapacityAvailable;
    if(c.harvester_mode == "short") {
        bodys = c.harvester;
        if (energyAvailable >= 700) {
            return builder(bodys['700']);
        } else if (energyAvailable >= 550) {
            return builder(bodys['550']);
        }
    } else {
        bodys = c.eco_bodys;
        if (energyAvailable >= 800) {
            return builder(bodys['800']);
        } else if (energyAvailable >= 550) {
            return builder(bodys['550']);
        }
    }

}

function fighter() {

    return builder(c.bodys['fighter']);
}

function healer() {
   return builder(c.bodys['healer']);
}

function build(role) {
    if (role == "builder") {
        return builders();
    } else if (role == "upgrader") {
        return general();
    } else if (role == "hauler") {
        return hauler()
    } else if (role == "fighter") {
        return fighter();
    } else if (role == "healer") {
        return healer();
    } else if (role == "harvester") {
        return harvester();
    }
}

function builder(body) {
    var new_body = [];
    for (part in body) {
        switch(part) {
            case "work":
                new_body = new_body.concat(_.times(body[part], _.constant("work")));
                break;
            case "move":
                new_body = new_body.concat(_.times(body[part], _.constant("move")));
                break;
            case "carry":
                new_body = new_body.concat(_.times(body[part], _.constant("carry")));
                break;
            case "attack":
                new_body = new_body.concat(_.times(body[part], _.constant("attack")));
                break;
            case "heal":
                new_body = new_body.concat(_.times(body[part], _.constant("heal")));
                break;
            case "tough":
                new_body = new_body.concat(_.times(body[part], _.constant("tough")));
                break;
            case "ranged_attack":
                new_body = new_body.concat(_.times(body[part], _.constant("ranged_attack")));
                break;
            case "claim":
                new_body = new_body.concat(_.times(body[part], _.constant("claim")));
                break;
            default:
                console.log("Could not find bodypart: " + JSON.stringify(part));
        }
    }
    return new_body;
}

module.exports = {
    builder: builder,
    testbuilder: testbuilder,
    general: general,
    build: build
};
