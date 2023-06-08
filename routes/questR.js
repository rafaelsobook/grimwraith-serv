const router = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const log = console.log;

const questModel = require("../models/questsM.js")

function auth(req,res, next){
    try {
        const token = req.headers.authori.split(" ")[1]

        const decodedData = jwt.verify(token, process.env.JWT_SEC)

        req.userId = decodedData.id
        next()
    } catch (error) {
        return res.json('tokenfailed')
    }
}
router.get("/", async (req, res) => {
    try {
        const allQuest = await questModel.find()

        res.json(allQuest)
    } catch (error) {
        res.send(error).status(400)
    }
})
router.post("/save", async (req, res) => {
// IN HERE YOU MUST FIND THE SENDER TO BE AN ADMIN INORDER TO SAVE SOME QUESTS
    console.log("we will save this")
    console.log(req.body)
    try {
        const newQuest = new questModel({...req.body, questId: Math.random().toString().split(".")[1]})

        await newQuest.save()

        res.json(newQuest)

    } catch (error) {
        res.send(error).status(400)
        log(error)
    }
})

router.delete("/delete/:id", async (req,res) => {
    try{
        const theQ = await questModel.findById(req.params.id)
        if(!theQ) return res.json({message: "quest not found"})
        await questModel.findByIdAndDelete(req.params.id)
        log("deleted successfully")
        return res.json(await questModel.find());
    }catch(err){
        res.json(err).status(400)
    }
})

module.exports = router