const uploadToS3 = require('../utils/uploadToS3')

module.exports = {
     //-----------------------------//upload images using S3//------------------------- //
    uploadImage: async (req, res) => {
      const uploadedFiles = []
      for (let i = 0; i < req.files.length; i++) {
      const {path, originalname, mimetype} = req.files[i];
      const url = await uploadToS3(path, originalname, mimetype)
      uploadedFiles.push(url)
   }
    res.json(uploadedFiles)
    }
}