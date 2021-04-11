const { ConfigService } = require('aws-sdk');
var AWS = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')


AWS.config.update({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

const s3 = new AWS.S3({apiVersion: '2006-03-01'});


var storage = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    acl: 'private',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString()+'.'+arguments['1'].mimetype.split('/')[1])//Getting the image file type
    }
  })
})

const uploadS3 = multer(storage);
module.exports = uploadS3