// Load dependencies
const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');

const app = express();



app.listen(3001, function () {
    console.log('Server listening on port 3001.');
  });




  const spacesEndpoint = new aws.Endpoint('epictest.us-southeast-1.linodeobjects.com');


  const s3 = new aws.S3({
    endpoint: spacesEndpoint
  });