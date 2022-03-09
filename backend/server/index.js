
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const axios = require('axios')

const adapter = new FileSync('../db/db.json')
const db = low(adapter)

db.defaults({pictures:[],picturesData:[]}).write()

const app = express()
const port = process.env.PORT
const pictures_api = process.env.PICTURES_API

app.use(cors())

app.get('/getPictures', async(req, res) => {

   const pictures = db.get('pictures').value()
    if(pictures.length===0){
        await firstCall()
        await res.send(pictures)
    }else{
        console.log('not first call')
        await res.send(pictures)
    }
})
app.get('/getPicturesData', async(req, res) => {
    res.send(db.get('picturesData').value())
})

app.put('/upvote',async(req, res) => {
    const id = req.query.id
    const amount = Number(req.query.amount)

    const pictureIndex = db.get('picturesData').value().findIndex((pictureData)=>pictureData.id===id)
    const pictureData = db.get('picturesData').value()[pictureIndex]
    
    db.get('picturesData').find(pictureData).assign({id:pictureData.id,upvotes:Number(pictureData.upvotes)+amount,downvotes:Number(pictureData.downvotes)}).write()

})
app.put('/downvote',async(req, res) => {
    const id = req.query.id
    const amount = Number(req.query.amount)

    const pictureIndex = db.get('picturesData').value().findIndex((pictureData)=>pictureData.id===id)
    const pictureData = db.get('picturesData').value()[pictureIndex]

    db.get('picturesData').find(pictureData).assign({id:pictureData.id,upvotes:Number(pictureData.upvotes),downvotes:Number(pictureData.downvotes)+amount}).write()
})


//function which executes actions that needs to be preformed on the fist call
const firstCall = async()=>{
    //get pictures data from the api
    const pictures =  await axios.get(pictures_api)
    //convert the id field to number form
    const pictures_numbered_ids = pictures.data.map((picture)=>{return {...picture,id:Number(picture.id)}})
    //insert the picture objects to the db in field pictures
    pictures.data.forEach((picture) => {
        db.get('pictures').push(picture).write()
        db.get('picturesData').push({id:picture.id,upvotes:0,downvotes:0}).write()
    });
}
  
app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})



