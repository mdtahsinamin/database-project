const db = require('../helpers/mysql');
const cloudinary = require('cloudinary').v2

exports.createService = async (req, res) =>{
    const file = req.files.file;
    const myCloud = await cloudinary.uploader.upload(file.tempFilePath,{
        folder: 'User-Profile',
      }
    )

    const serviceTitle = req.body.serviceTitle;
    const description = req.body.description;
    const image = myCloud.secure_url;
    

   const sqlStatement = "INSERT INTO service (serviceTitle, description, image) VALUES (?,?,?)";

   db.query(sqlStatement,[serviceTitle,description,image],(err, result) => {
    try {
        res.status(201).json({
            status: "success",
            data: result.insertId
    });
   } catch (error) {
       res.status(400).json({
           status: "error",
            message: err.message
       })
   }
   });
   

}

exports.services = (req, res) => {
    const sqlStatement = "SELECT * from service;";

    db.query(sqlStatement, (err, result) => {
        try {
            res.status(200).json({
                status: "success",
                data: result
            })
        } catch (error) {
            res.status(400).json({
                status: "error",
                data: err.message
            })
        }
     });
}



/*
*/