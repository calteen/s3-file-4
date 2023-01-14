var express = require('express')
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload());


var AWS = require('aws-sdk');



var accessKeyId = "WUO7MAQ2CBSJTUVND9XD"
var secretAccessKey = "gHBhvkda7Fnq5RzaBrEBuhnZB84lvUuWTgNFKuin"

// AWS.config.update({
//     accessKeyId: accessKeyId,
//     secretAccessKey: secretAccessKey
// });



AWS.config.update({
    "secretAccessKey": "gHBhvkda7Fnq5RzaBrEBuhnZB84lvUuWTgNFKuin",
    "accessKeyId": 'WUO7MAQ2CBSJTUVND9XD',
    region: 'us-southeast-1'
});

// var s3 = new AWS.S3();

const spacesEndpoint = new AWS.Endpoint('us-southeast-1.linodeobjects.com');


const s3 = new AWS.S3({
  endpoint: spacesEndpoint
});


console.log(s3.config.credentials)






app.post('/upload', async (req, res) => {



    // Binary data base64
    const fileContent  = Buffer.from(req.files.a.data, 'binary');

    // Setting up S3 upload parameters
    const params = {
        ACL: "private",
        Bucket: 'hero-game',
        Key: "t.pdf", // File name you want to save as in S3
        Body: fileContent 
    };

    
    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        res.send({
            "response_code": 200,
            "response_message": "Success",
            "response_data": data
        });
    });

})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});










app.get("/list", async (req, res) => {

    let r = await s3.listObjectsV2({ Bucket:"hero"  }).promise();
    let x = r.Contents.map(item => item.Key);
    res.send(x)
})


app.get("/download/:filename", async (req, res) => {
    const filename = req.params.filename
    let x = await s3.getObject({ Bucket: "hero", Key: filename }).promise();
    res.send(x.Body)
})

app.delete("/delete/:filename", async (req, res) => {
    const filename = req.params.filename
    await s3.deleteObject({ Bucket: "hero", Key: filename }).promise();
    res.send("File Deleted Successfully")

})










const getSingedUrl = async () => {
    const params = {
        Bucket: 'hero-game',
        Key: 't.pdf',
        Expires: 10 * 1
      };
    try {
        const url = await new Promise((resolve, reject) => {
          s3.getSignedUrl('getObject', params, (err, url) => {
            err ? reject(err) : resolve(url);
          });
        });
        console.log(url)
      } catch (err) {
        if (err) {
          console.log(err)
        }
      }
    }
     getSingedUrl()