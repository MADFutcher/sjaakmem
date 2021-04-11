const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});



const storage = new CloudinaryStorage({
  cloudinary,

  params: {
    folder: 'SjaakMem', // The name of the folder in cloudinary
    allowedFormats: ['jpg','jpeg', 'png','mp4', 'mp3'],
    resource_type: function(req,res){
        if(res.originalname.includes('mp')){
          return 'video'
        }else{
         return 'image'
        }
    }
  },
  filename: function (req, res, cb) {
    cb(null, res.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

module.exports = multer({ storage });
