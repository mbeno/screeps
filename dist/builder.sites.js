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
    var flags = Game.spawns.Spawn1.room.find(FIND_FLAGS);
    var start_x = flags['buildfrom'].pos.x;
    var start_y = flags['buildfrom'].pos.y;
    var end_x = flags['buildto'].pos.x;
    var end_y = flags['buildto'].pos.y;
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
