const { Schema, model } = require("mongoose");

const questSchema = new Schema({
    questId: String,
    questTarget: { targetName: String, targetType: String }, // an item name or monsName // if monster then every time you kill a monter it will check your current quests with a questTarget same with the monster you killed
    title: String, 
    def: String, 
    reward: { rewardType: String, rewardItems: {type: Array, default: [] }, rewardCoin: Number }, 
    demandNumber: Number, 
    currentNumber: Number,
    addPoints: Number, // this is for your rank to be promoted you must reach 100 points
    requiredRank: String,
    questPicName: String
})
// IN REWARD TYPE IT CAN BE. money || item || both if "both" then you can have money and an Item
module.exports = questModel = model("quests", questSchema)
