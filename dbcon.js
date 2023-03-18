const mongoose = require("mongoose")
require("dotenv").config()
const log = console.log


module.exports = dbcon = () => {

    mongoose.connect(process.env.MONGO_URI)
    .then( () => log("db connected !"))
    .catch( error => log(error))
}