const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const fs = require('fs')

const bucket = 'airfly'

const uploadToS3 = async (path, originalFilename, mimetype) => {
    const client = new S3Client({
     region: 'us-east-2',
     credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
     }
    })
    const parts = originalFilename.split('.')
    const ext = parts[parts.length - 1]
    const newFilename = Date.now() + '.' + ext
     await client.send(new PutObjectCommand({
        Bucket: bucket,
        Body: fs.readFileSync(path),
        Key: newFilename,
        ContentType: mimetype,
        ACL: 'public-read'
    }))

    return `https://${bucket}.s3.amazonaws.com/${newFilename}`
  }

  module.exports = uploadToS3