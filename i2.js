const express = require('express')
var multer = require('multer');
var AWS = require('aws-sdk');
const app = express();
var accessKeyId = "WUO7MAQ2CBSJTUVND9XD"
var secretAccessKey = "gHBhvkda7Fnq5RzaBrEBuhnZB84lvUuWTgNFKuin"

AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});

var s3 = new AWS.S3();


app.use(multer());
  

app.post('/upload', function(req, res){
    if(req.files.image !== undefined){ // `image` is the field name from your form
        res.redirect("/uploads"); // success
    }else{
        res.send("error, no file chosen");
    }
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
