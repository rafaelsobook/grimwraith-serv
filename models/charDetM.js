const { Schema, model } = require("mongoose")

const charSchema = new Schema({
    owner: String,
    name: String,
    stats: { 
        weapon: Number, 
        accuracy: Number, 
        critical: Number, 
        dex: Number, 
        strength: Number, 
        magic: Number, 
        spd: {type: Number, default: 4},
        atkSpd: {type: Number, default: .9},
    },
    lvl: { type: Number, default: 1},
    rank: { type: String, default: 'none'},
    hp: { type: Number, default: 300},
    maxHp: { type: Number, default: 300},
    mp: { type: Number, default: 100},
    maxMp: { type: Number, default: 100},
    sp: { type: Number, default: 100},
    maxSp: { type: Number, default: 100},
    exp: { type: Number, default: 0},
    maxExp: { type: Number, default: 100},
    x:{ type: Number, default: 0},
    z:{ type: Number, default: 0},
    cloth: String,
    pants: String,
    hair: String,
    boots: String,
    skinColor: {r: Number, g: Number, b: Number, name: String},
    hairColor: {r: Number, g: Number, b: Number},
    clothColor: {r: Number, g: Number, b: Number},
    pantsColor: {r: Number, g: Number, b: Number},
    items: {type: Array, default: []},
    skills: { type: Array, default: []},
    titles: { type: Array, default: [] },    
    currentPlace: String,
    places: { type: Array, default: [] }, 
    status: { type: Array, default: []}, // sickness //poisoned etc
    regens: {sp: Number, hp: Number, mana: Number},
    monsSoul: { type: Number, default: 1}, // same like points system
    coins: { type: Number, default: 100 },
    survival: { hunger: {type: Number, default: 100}, sleep: {type: Number, default: 100} },
    aptitude: { type: Array, default: [] },
    monsterKilled: { type: Number, default: 0},
    defeatedMonsters: { type: Array, default: []}, // name of monsters
    blessings: { type: Array, default: [] },
    // { qName: "", qTitle: "", desc: "", questType: //story//hunt//reqItem }
    // talkTo: npcName, huntRequire: { name: "daedalus"//reqItem//"goblin"//hunt, current:0, total: 5 }
    // in creation of NPC they have a list of quest that will match the title of this quest so
    // you wont have any problems what will go first
    stories:{type: Array, default: []},// for story
    quests: {type: Array, default: []}, //
    clearedQuests: {type: Array, default: []},
    race: String,
    characterType: { type: String, default: "player"},
    lastSpoken: {type: String, default: "none"}
})

module.exports = CharModel = model("character", charSchema)