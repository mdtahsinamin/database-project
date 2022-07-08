const db = require('../helpers/mysql');
const cloudinary = require('cloudinary').v2
exports.enrollCourse = async (req, res) => {
   
    const file = req.files.file;
    const myCloud = await cloudinary.uploader.upload(file.tempFilePath,{
        folder: 'User-Profile',
      }
    )
     
    const name = req.body.name;
    
    const email = req.body.email;

    const courseName = req.body.course;

    const projectDetails = req.body.projectDetails;

    const status = req.body.status;

    const image =  myCloud.secure_url;



   const sqlStatement = "INSERT INTO customers (name, email,courseName,projectDetails, status , image) VALUES (?,?,?,?,?,?)";

   db.query(sqlStatement,[name, email, courseName, projectDetails,status,image],(err, result) => {
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

exports.clientReview = (req, res) => {
    const name = req.body.data.name;
    const companyName = req.body.data.companyName;
    const description = req.body.data.description;
    const photoUrl = req.body.data.photoURL;

    const sqlStatement = "INSERT INTO reviews (name, companyName,description, photoUrl) VALUES (?,?,?,?)";

    db.query(sqlStatement,[name, companyName, description, photoUrl],(err, result) => {
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



exports.customers = (req, res) => {
    const sqlStatement = "SELECT * from customers;";

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
    })
}

exports.reviews = (req, res) => {
    const sqlStatement = "SELECT * from reviews;";

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
    })    
}