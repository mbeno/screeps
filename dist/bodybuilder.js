var _ = require('lodash');
var c = require('config');


function testbuilder() {
    for (var b in BODYS) {
        console.log(b + ": " + JSON.stringify(builder(BODYS[b])));
    }
}

function general() {
    return builder(c.general_body);
}

function build(role) {
    if (role == "general") {
        return general();
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
