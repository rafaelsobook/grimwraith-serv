const { Schema, model } = require("mongoose");

const questSchema = new Schema({
    questId: String, 
    title: String, 
    def: String, 
    reward: Number, 
    demandKills: Number, 
    kills: Number,
    addPoints: Number,
    rank: String
})

module.exports = questModel = model("quests", questSchema)
