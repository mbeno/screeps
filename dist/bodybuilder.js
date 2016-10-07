var _ = require('lodash');

const BODYS = {
    'general': {'work':5,'move':5,'carry':5},
    'speed_harvester': {'work':9, 'move':2},
    'fighter': {'tough':5, 'move':7, 'attack':7},
    'healer': {'tough': 3, 'move':4, 'heal':3},
    'hauler': {'carry':13, 'move':7}
};

function testbuilder() {
    for (var b in BODYS) {
        console.log(b + ": " + JSON.stringify(builder(BODYS[b])));
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
    testbuilder, testbuilder
};
