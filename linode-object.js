var express = require('express');
var app = express();
var LinodeObjectStorage = require('linode-object-storage');

// Replace with your own Linode Object Storage API key, secret key, and bucket name
var accessKeyId = "WUO7MAQ2CBSJTUVND9XD"
var secretAccessKey = "gHBhvkda7Fnq5RzaBrEBuhnZB84lvUuWTgNFKuin"
var apiKey = accessKeyId;
var secretKey = secretAccessKey ;;
var bucketName = 'hero';

// Connect to Linode Object Storage
var objectStorage = new LinodeObjectStorage({
    apiKey: apiKey,
    secretKey: secretKey
});

// Set up a route to list the contents of the bucket
app.get('/list-bucket', function (req, res) {
    objectStorage.listObjects({ bucket: bucketName }, function (err, objects) {
        if (err) {
            res.status(500).send(err.message);
            return;
        }


        res.send(objects);
    });
});

// Set up a route to upload a file to the bucket
app.post('/upload', function (req, res) {
    objectStorage.upload({
        bucket: bucketName,
        object: 'example-object.txt',
        data: 'Hello, world!'
    }, function (err) {
        if (err) {
            res.status(500).send(err.message);
            return;
        }


        res.send('File uploaded successfully!');
    });
});

// Set up a route to download a file from the bucket
app.get('/download', function (req, res) {
    objectStorage.download({
        bucket: bucketName,
        object: 'example-object.txt'
    }, function (err, data) {
        if (err) {
            res.status(500).send(err.message);
            return;
        }


        res.send(data);
    });
});

// Set up a route to delete a file from the bucket
app.delete('/delete', function (req, res) {
    objectStorage.delete({
        bucket: bucketName,
        object: 'example-object.txt'
    }, function (err) {
        if (err) {
            res.status(500).send(err.message);
            return;
        }

        res.send('File deleted successfully!');
    });
});

// Start the express app
app.listen(3000, function () {
    console.log('Express app listening on port 3000');
});