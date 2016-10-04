/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder.sites');
 * mod.thing == 'a thing'; // true
 */



function findConstructionSite() {
    var _ = require('lodash');
    var rx = Game.spawns['Spawn1'].pos.x;
    var ty = Game.spawns['Spawn1'].pos.y;
    var lx = rx;
    var by = Game.spawns['Spawn1'].pos.y;
    rx += 2;
    lx += 2;
    ty -= 1;
    by += 1;


        for (var i = 0; i<10; i++) {
            var area = Game.spawns['Spawn1'].room.lookAtArea(ty,lx,by,rx, true);
            var result = _.filter(area, { 'terrain': 'wall' })
            var structs = _.filter(area, (o) => o.type == 'structure' || o.type == 'constructionSite')
            var spots = [];
            for (var a of area) {
                spots.push(new RoomPosition(a.x,a.y,Game.spawns['Spawn1'].room.name));
            }
            if (result.length == 0 && structs.length < spots.length) {
                Memory.build_site = spots;
                break;
            } else {
                rx +=2;
                lx +=2;
            }
        }

}

function buildSite(site_type) {
    if (Memory.build_site != null && Memory.build_site.length != 0) {
        var site = Memory.build_site.shift();
        Game.spawns['Spawn1'].room.createConstructionSite(site.x,site.y, site_type);
    } else {
        findConstructionSite();
    }
    
}

module.exports = {
    
    run(site_type) {
        buildSite(site_type);
    }

};