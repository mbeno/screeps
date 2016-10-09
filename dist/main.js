var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var creepBuilder = require('builder.creeps');
var structureBuilder = require('builder.sites');
var roleManager = require('role.manager');
var roleHauler = require('role.hauler');
var roleTower = require('role.turret');
var roleFighter = require('role.fighter');
var roleHealer = require('role.healer');
var _ = require('lodash');
var c = require('config');
const vocabulary = [
    'herp',
    'derp'
    ];

const nearing_death = [
    '*cough*',
    'Ugh!'
    ];

var cpumon = false;
var NAMES = c.names;

function creepInfo() {
    for (var creep in Game.creeps) {
        Game.creeps[creep].say(Game.creeps[creep].memory.role);
    }
    var builders = _.filter(Game.creeps, (o) => { return o.memory.role == 'builder'}).length;
    var haulers = _.filter(Game.creeps, (o) => { return o.memory.role == 'hauler'}).length;
    var upgraders = _.filter(Game.creeps, (o) => { return o.memory.role == 'upgrader'}).length;
    var harvesters = _.filter(Game.creeps, (o) => { return o.memory.role == 'harvester'}).length;
    var idle = _.filter(Game.creeps, (o) => { return o.memory.role == 'idle'}).length;
    console.log("#########NUMBER OF CREEPS###########\n"+
                "Haulers: " + haulers + "\n" +
                "Builders: " + builders + "\n" +
                "Harvesters: " + harvesters + "\n" +
                "Upgraders: " + upgraders + "\n" +
                "Idle: " + idle + "\n" +
                "#######################################");
}

function clearIdle() {
    for(var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            if (_.includes(NAMES, name)) {
                console.log("OH NOES! " + name + " has died! :'(");
            } else {
                console.log("Removed memories of " + name + ", it will not be missed.");
            }
        }
    }
    var creep_sources = [];
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == "harvester") {
            creep_sources.push(creep.memory.source);
        }
    }
    for(var source in Memory.sourcesInUse) {
        if(Memory.sourcesInUse[source]) {
            if (creep_sources.indexOf(source) < 0) {
                Memory.sourcesInUse[source] = false;
            }
        }
    }
}


module.exports.loop = function () {
   //creepInfo();

    clearIdle();
    roleManager.run("harvester");
    roleManager.run("builder");
    roleManager.run("upgrader");
    roleManager.run("hauler");
    roleManager.run('fighter');
    roleManager.run('healer');

    roleTower.run();


    if(cpumon) console.log("Cpu used  roleTower.run(); " + (Game.cpu.getUsed() - cpu_used));

    if(cpumon) cpu_used = Game.cpu.getUsed();
    if(cpumon) console.log("Cpu used  creepBuilder.run(); " + (Game.cpu.getUsed() - cpu_used));

    if(cpumon) cpu_used = Game.cpu.getUsed();
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        var rand = Math.floor(Math.random() * vocabulary.length);
        var rand2 = Math.floor(Math.random() * 20);
        if((rand2+1) == 1) {
            creep.say(vocabulary[rand], true);
        }

        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'hauler') {
            roleHauler.run(creep)
        }
        if(creep.memory.role == 'fighter') {
            roleFighter.run(creep);
        }
        if(creep.memory.role == 'healer') {
            roleHealer.run(creep);
        }
    }
}
