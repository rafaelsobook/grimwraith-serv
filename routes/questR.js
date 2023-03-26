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

    try {
        const newQuest = new questModel(req.body)

        await newQuest.save()

        res.json(newQuest)

    } catch (error) {
        res.send(error).status(400)
        log(error)
    }
})
// update haveBot to false after bot destroyed !
router.delete("/delete/:id", async (req,res) => {
    try{
        const theChar = await questModel.findById(req.params.id)
        if(!theChar) return res.json({message: "not found char"})
        await questModel.findByIdAndDelete(req.params.id)
    }catch(err){
        res.json(err).status(400)
    }
    log("deleted successfully")
    res.json(await questModel.find());
})

module.exports = router