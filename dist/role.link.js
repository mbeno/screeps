var helper = require('creep.helper');
function findSourceLinks() {
    return _.filter(Game.spawns.Spawn1.room.find(FIND_STRUCTURES), (o) => { return (o.structureType == "link" && o.cooldown == 0 && Memory.source_links.indexOf(o.id) > -1) } );
}


module.exports.run = function() {
    if (Memory.source_links == null) Memory.source_links = [];
    if (Memory.storage_links == null) Memory.storage_links = [];
    var links = findSourceLinks();
    if(links.length == 0) return;
    for (var link of links) {
        if(Memory.source_links.indexOf(link)) {
            if (link.energy > 0) {
                helper.linkTransfer(link);
            } else {
                return;
            }
        } else if (Memory.storage_links.indexOf(link)) {
            return;
        } else {
            return;
        }
    }

}
