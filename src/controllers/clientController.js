const db = require('../helpers/mysql');

exports.enrollCourse = (req, res) => {
    const file = req.files.file;
     
    const name = req.body.name;
    
    const email = req.body.email;

    const courseName = req.body.courseName;

    const projectDetails = req.body.projectDetails;

    const status = req.body.status;
   
    const newImg = file.data;
    const encImg = newImg.toString('base64');

    var image = {
     contentType: file.mimetype,
     size: file.size,
     img: Buffer.from(encImg, 'base64')
    }


    const jsonImg = JSON.stringify(image);


   const sqlStatement = "INSERT INTO customers (name, email,courseName,projectDetails, status , image) VALUES (?,?,?,?,?,?)";

   db.query(sqlStatement,[name, email, courseName, projectDetails,status,jsonImg],(err, result) => {
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