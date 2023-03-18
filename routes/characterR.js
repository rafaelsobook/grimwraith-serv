const router = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const log = console.log

const Users = require("../models/userM.js")
const Character = require("../models/charDetM.js")

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
router.get("/:id", auth, async (req, res) => {
    try {
        const charDet = await Character.findOne({owner: req.params.id})

        if(!charDet) return res.json("notfound")

        res.json(charDet)
    } catch (error) {
        res.send(error).status(400)
    }
})
router.post("/save", auth, async (req, res) => {
    

    try {
        const Uzer = await Character.findOne({name: req.body.name})
        if(Uzer) return res.json("exist")

        const newCharacter = new Character(req.body)

        await newCharacter.save()

        res.json(newCharacter)

    } catch (error) {
        res.send(error).status(400)
        log(error)
    }
})
router.patch("/updateloc/:id", auth, async (req,res) => {

    try {
        const {mypos, survival} = req.body
        const characterUpdated = await Character.findByIdAndUpdate(req.params.id, {x: mypos.x, z: mypos.z, survival}, {new: true})

        res.json(characterUpdated)
        log(characterUpdated)
    } catch (error) {
        res.json(error).status(400)
    }
})
router.patch("/updateplace/:id", auth, async (req,res) => {

    try {
        const ourDetails = await Character.findById(req.params.id)
        if(!ourDetails) return res.json({message: "not found our details"}).status(400)
        const curPlace = req.body.currentPlace
        const hadVisited = ourDetails.places.some(placeName => placeName == curPlace)
        let myPlaces
        if(!hadVisited){
            myPlaces = [...ourDetails.places, curPlace]
        }else{
            myPlaces = ourDetails.places
        }
        const characterUpdated = await Character.findByIdAndUpdate(req.params.id, {currentPlace: req.body.currentPlace, places: myPlaces}, {new: true})

        res.json(characterUpdated)
        log(characterUpdated)
    } catch (error) {
        res.json(error).status(400)
    }
})
router.patch("/additem/:id", auth, async (req,res) => {

    try {
        const character = await Character.findOne({owner: req.params.id})
        if(!character) return res.json("notfound")
        const cannotDuplicates = ['sword', 'armor']
        let canDuplicate = true
        cannotDuplicates.forEach(itemName => {
            if(itemName === req.body.itemType) canDuplicate = false            
        })
        
        if(!canDuplicate){
            log("cannot duplicate ")
            character.items.push(req.body)
            const theCharac = await Character.findByIdAndUpdate(character._id, character, {new: true})
            return res.json(theCharac)
        }
        const isHave = character.items.some(item => item.name === req.body.name)
        if(isHave){
            character.items.map(item => item.name === req.body.name ? {...item, qnty: item.qnty+=req.body.qnty } : item)
        }else{
            character.items.push(req.body)
        }

        const theCharac = await Character.findByIdAndUpdate(character._id, character, {new: true})
        res.json(theCharac)
    } catch (error) {
        res.json(error).status(400)
    }
})
router.patch("/updateweapon/:id", auth, async (req,res) => {

    try {
        const character = await Character.findById(req.params.id)
        if(!character) return res.json("notfound")

        const theCharac = await Character.findByIdAndUpdate(character._id, {weapon: req.body}, {new: true})

        res.json(theCharac)
    } catch (error) {
        res.json(error).status(400)
    }
})
router.patch("/deductitem/:id", auth, async (req,res) => {
    try {
        const character = await Character.findById(req.params.id)
        if(!character) return log("notfound")
        const theItem = character.items.find(item => item.meshId === req.body.meshId)
        if(!theItem) return log("item notfound")
        let newArr

        if(theItem){
            if(theItem.qnty === 1){
                newArr = character.items.filter(item => item.meshId !== req.body.meshId)
            }else{
                newArr = character.items.map(item => item.meshId === req.body.meshId ? {...item, qnty: item.qnty-=req.body.qnty } : item)
            }
        }
        const theCharac = await Character.findByIdAndUpdate(character._id, {items: newArr}, {new: true})

        res.json(theCharac)
    } catch (error) {
        res.json(error).status(400)
    }
})
router.patch("/updateall/:id", auth, async (req,res) => {

    try {
        const character = await Character.findById(req.params.id)
        if(!character) return res.json("notfound").status(400)
        
        const theCharac = await Character.findByIdAndUpdate(req.params.id, req.body, {new: true})

        res.json(theCharac)
    } catch (error) {
        res.json(error).status(400)
    }
})
// update haveBot to false after bot destroyed !
router.delete("/delete/:id", async (req,res) => {
    try{
        const theChar = await Character.findById(req.params.id)
        if(!theChar) return res.json({message: "not found char"})
        await Character.findByIdAndDelete(req.params.id)
    }catch(err){
        res.json(err).status(400)
    }
    log("deleted successfully")
    res.json(await Character.find())

})

module.exports = router