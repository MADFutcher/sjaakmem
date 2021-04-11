const express    = require('express');
const memoryRoute = express.Router();
const AWS = require('aws-sdk');
const cloudinaryUploader = require('../../configs/cloudinary-setup');
const Memory       = require('../../models/memory-model');




// AWS.config.update({
//   accessKeyId: process.env.AWS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_KEY
// });

// let s3 = new AWS.S3();


memoryRoute.get('/memories', (req, res) =>{
    const {category} = req.query
  
    Memory.find({category})
          .then(memories=>{
            console.log(memories)
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
  console.log(category ,title, owner, memory, image, textColour, cardColour)
  Memory.create({category, title, memory, owner, image, textColour, cardColour})
        .then((results)=>{
          res.status(200).json({data:{ message: "Your Memory was successfully saved"}})
        })
        .catch(err => {
          res.status(500).json({message: "An issue occured please try again"})
        })
})

module.exports=memoryRoute