const express = require("express")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 8100
const log = console.log

const dbCon = require("./dbcon.js")

app.use(cors())
app.use(express.json({limit: '3mb'}))
app.use(express.urlencoded({extended: false}))

dbCon();

app.get("/", (req, res) => res.send("API OF DUNGEON BORN"))
app.use("/users", require('./routes/userR'))
app.use("/characters", require('./routes/characterR'));
app.use("/quests", require('./routes/questR'));
app.use("/worldmessage", require('./routes/worldMessageR'));

app.listen(PORT, () => log("Server is running..."))
