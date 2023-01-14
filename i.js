var express = require('express'),
    aws = require('aws-sdk'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: "gHBhvkda7Fnq5RzaBrEBuhnZB84lvUuWTgNFKuin",
    accessKeyId: 'WUO7MAQ2CBSJTUVND9XD',
    region: 'us-east-1'
});

var app = express(),
    s3 = new aws.S3();







    console.log(s3.config.credentials)


app.use(bodyParser.json());

var upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'epictest',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});

//open in browser to see upload form
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


//use by upload form
app.post('/upload', upload.single('a'), function (req, res, next) {
    res.send({
        message: "Uploaded!",
        function(file) {
            return {url: file.location, name: file.key, type: file.mimetype, size: file.size};
        }
    });
});
  
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});