const express = require("express")
const app = express()
const Data = require('./data')
const mongoose = require("mongoose")
const cache = require('./routeCache')


const cors = require("cors");
app.use(cors())
require('dotenv').config();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
port = process.env.PORT || 3001


const connectDB = (url) => {
    return mongoose.connect(url)
}

app.get("/countries", cache(300), (req, res) => {
    console.log(req.params.key)
    Data.find()
    .then(data=>{
        res.json({ data: data })
    })
    res.setHeader("Access-Control-Allow-Origin", "*")
})
app.get("/country/:id", cache(300), (req, res) => {
    Data.find(
        
            {$and:[
                {"country_or_area":{$regex:req.params.id}},
                {category:{$regex:req.query.category}},
                {year:{$gte: req.query.sYear}},
                {year:{$lte: req.query.eYear}}
            ]}
    )
    .then(data=>{
        res.json({ data: data })
    })
    res.setHeader("Access-Control-Allow-Origin", "*")
})


const start = async() => {
    try {
        await connectDB("mongodb+srv://iitdelhi:iitdelhistartup@cluster0.oni3zcs.mongodb.net/BlueSky?retryWrites=true&w=majority")
        app.listen(port, () => {
            console.log("server is listening on port 3001")
        })
    } catch (error) {
        console.log(error)
    }
}
start()