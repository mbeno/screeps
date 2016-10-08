var c = require('config');
var roleBuilder = {

        /** @param {Creep} creep **/
        run: function(creep) {
            if (creep.memory.building && creep.carry.energy == 0) {
                creep.memory.building = false;
                creep.say('harvesting');
            }
            if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
                creep.memory.building = true;
                creep.say('building');
            }

            if (creep.memory.building) {
                creep.memory.source = null;
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                var roads = _.filter(creep.room.find(FIND_STRUCTURES),
                    (structure) => {
                        return (
                            (structure.structureType == STRUCTURE_ROAD ||
                                structure.structureType == STRUCTURE_CONTAINER ||
                                (structure.structureType == STRUCTURE_WALL && structure.hits < c.creep.wall_max_repair) ||
                                (structure.structureType == STRUCTURE_RAMPART && structure.hits < c.creep.rampart_max_repair) &&
                                (structure.hits + 1000) < structure.hitsMax))
                        });
                    var walls = _.filter(creep.room.find(FIND_STRUCTURES), (structure) => {
                        return structure.structureType == STRUCTURE_WALL && structure.hits < 20000
                    });

                    if (roads.length && Memory.repair_targets != roads.length) {
                        console.log("Number of roads in need of repair: " + roads.length);
                        Memory.repair_targets = roads.length;
                    }

                    if (targets.length || roads.length || walls.length) {
                        if (roads.length > 0) {
                            if (creep.memory.repair_target == null) {
                                creep.memory.repair_target = creep.pos.findClosestByRange(roads).id;

                            }
                            var road = Game.getObjectById(creep.memory.repair_target);
                            if (road.hits < road.hitsMax) {
                                if (creep.repair(road) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(road);
                                }
                            } else {
                                creep.memory.repair_target = null;
                            }
                        } else if (targets.length > 0) {
                            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(targets[0]);
                            }
                        } else if (walls.length > 0) {
                            var wall = creep.pos.findClosestByRange(walls);
                            if (creep.repair(wall) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(wall);
                            }
                        }
                    } else {
                        creep.moveTo(Game.flags['builder']);
                        //            creep.memory.role = 'idle';
                    }
                }
                else {
                    if (creep.memory.source == null) {
                        var structure_sources = _.filter(Game.spawns.Spawn1.room.find(FIND_STRUCTURES), (o) => {
                            return (o.structureType == STRUCTURE_STORAGE || o.structureType == STRUCTURE_CONTAINER) && o.store[RESOURCE_ENERGY] > 500
                        });
                        if (structure_sources.length) {
                            creep.memory.source = structure_sources[0].id;
                        } else {
                            var sources = _.filter(creep.room.find(FIND_SOURCES_ACTIVE), (source) => {
                                return (source.energy > 0)
                            });
                            if (sources.length == 0) {
                                //	                    creep.memory.role = 'idle';
                            } else {
                                creep.memory.source = sources[Math.floor(Math.random() * sources.length)].id;
                            }
                        }
                    }
                    var source = Game.getObjectById(creep.memory.source)
                    if (source == null) return;
                    if (source.structureType == STRUCTURE_STORAGE || source.structureType == STRUCTURE_CONTAINER) {
                        if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source);
                        }
                    } else {
                        var harvest_ret = creep.harvest(source);
                        if (harvest_ret == ERR_NOT_IN_RANGE) {
                            if (creep.moveTo(source) == ERR_NO_PATH) {
                                creep.memory.source = null;
                            }
                        } else if (harvest_ret == ERR_NOT_ENOUGH_RESOURCES) {
                            creep.memory.source = null;
                        }
                    }
                }
            }
        };

        module.exports = roleBuilder;
