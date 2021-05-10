const express    = require('express');
const memoryRoute = express.Router();
const AWS = require('aws-sdk');
const cloudinaryUploader = require('../../configs/cloudinary-setup');
const Memory       = require('../../models/memory-model');


memoryRoute.get('/memories', (req, res) =>{
    const {category} = req.query
  
    Memory.find({category})
          // .sort({createdAt:-1})
          .then(memories=>{
            if(memories){
              res.status(200).json({data:memories});
            }else{
              res.status(500).json({data:"no memories"})
            }
          })
          .catch(err =>{
            console.log(err)
            res.status(500).json({err})
          })
})

memoryRoute.post('/memories', cloudinaryUploader.single('File'), (req, res, next) =>{


  const {category, title, owner, memory, textColour, cardColour} = req.body
  let image='';
  if(req.file){
    image = req.file.path
  }
  Memory.create({category, title, memory, owner, image, textColour, cardColour})
        .then((results)=>{
          res.status(200).json({data:{ message: "Jouw herinnering is succesvol opgeslagen"}})
        })
        .catch(err => {
          res.status(500).json({error: err, message: "An issue occured please try again"})
        })
})

module.exports=memoryRoute