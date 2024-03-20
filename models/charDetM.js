const { Schema, model } = require("mongoose")

const charSchema = new Schema({
    owner: String,
    name: String,
    stats: { weapon: Number, accuracy: Number, critical: Number, dex: Number, strength: Number, magic: Number, spd: {type: Number, default: 3.5}},
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
    hairColor: {r: Number, g: Number, b: Number},
    clothColor: {r: Number, g: Number, b: Number},
    pantsColor: {r: Number, g: Number, b: Number},
    items: {type: Array, default: []},
    skills: { type: Array, default: []},
    quests: {type: Array, default: []},
    titles: { type: Array, default: [] },
    clearedQuests: { totalCleared: {type: Number, default: 0}, currPoints: {type: Number, default: 0}},
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
    storyQue: { type: Array, default: []},
    blessings: { type: Array, default: [] },
    race: String
})

module.exports = CharModel = model("character", charSchema)