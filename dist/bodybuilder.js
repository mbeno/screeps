

const BODYS = {
    'general': {'work':5,'move':5,'carry':5},
    'speed_harvester': {'work':9, 'move':2},
    'fighter': {'tough':5, 'move':7, 'attack':7},
    'healer': {'tough': 3, 'move':4, 'heal':3},
    'hauler': {'carry':13, 'move':7}
};



function builder(body) {
    var new_body = []
    for (part in body) {
        switch(part) {
            case "work":
                new_body.push("work");
                break;
            case "move":
                new_body.push("move");
                break;
            case "carry":
                new_body.push("carry");
                break;
            case "attack":
                new_body.push("attack");
                break;
            case "heal":
                new_body.push("heal");
                break;
            default:
                console.log("Could not find bodypart: " + JSON.stringify(part));
        }
    }
}




/**

function bodyBuilder(price, role) {
    var body = [];
    if (role == 'general') {
        var occurances = {'work': 0, 'move': 0, 'carry': 0};
        while(price >= 50) {
            if (price >= BODYPART_COST.work && (occurances[WORK] == null || (occurances[WORK] < ((occurances[CARRY] / 2) + 2) ) )) {

                body.push(WORK);
                price -= BODYPART_COST.work;
                occurances[WORK] += 1;
            } else if(price >= BODYPART_COST.move && (occurances[MOVE] == null || ((occurances[WORK] + occurances[CARRY]) / 2) > occurances[MOVE])) {

                body.push(MOVE);
                price -= BODYPART_COST.move;
                occurances[MOVE] += 1;
            } else {

                body.push(CARRY);
                price -= BODYPART_COST.carry;
                occurances[CARRY] += 1;
            }

        }
    } else if (role == 'hauler') {
        var occurances = {'move': 0, 'carry': 0};
        while(price >= 50) {

            if(price >= BODYPART_COST.move && (occurances[MOVE] == 0 || ((occurances[CARRY] / 2) )) > occurances[MOVE]) {

                body.push(MOVE);
                price -= BODYPART_COST.move;
                occurances[MOVE] += 1;
            } else {

                body.push(CARRY);
                price -= BODYPART_COST.carry;
                occurances[CARRY] += 1;
            }

        }
    } else if (role == 'fighter') {
        var body = [];
        var cmove = 0;
        var weight = 0;
        var occurances = {'attack': 0, 'tough': 0}
        while(price >= 50) {
            if( price >= BODYPART_COST.move && cmove <= (weight / 2)) {
                body.push(MOVE);
                price -= BODYPART_COST.move;
                cmove += 1;
            } else
            if( price >= BODYPART_COST.attack && (weight / 2) < cmove  && occurances.attack <= (occurances.tough * 1.2)) {
                body.push(ATTACK);
                price -= BODYPART_COST.attack;
                occurances.attack += 1;
                weight += 1;
            }else {
                body.push(TOUGH);
                price -= BODYPART_COST.tough;
                weight += 1;
                occurances.tough += 1;
            }
        }
    } else if (role == 'healer') {
        var body = [];
        var cmove = 0;
        var weight = 0;
        while(price >= 50) {
            if( price >= BODYPART_COST.heal && (weight / 2) <= cmove) {
                body.push(HEAL);
                price -= BODYPART_COST.heal;
                weight += 1;
            }else if (cmove <= (weight / 2)) {
                body.push(MOVE);
                price -= BODYPART_COST.move;
                cmove += 1;
            }  else {
                body.push(TOUGH);
                price -= BODYPART_COST.tough;
                weight += 1;
            }
        }
    }
    return body;
}
*/
module.exports = {
    builder: builder
};
