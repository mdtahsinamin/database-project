const db = require('../helpers/mysql');


exports.createService = (req, res) =>{
    const file = req.files.file;
    const serviceTitle = req.body.serviceTitle;
    const description = req.body.description;
    
    const newImg = file.data;
    const encImg = newImg.toString('base64');


   var image = {
     contentType: file.mimetype,
     size: file.size,
     img: Buffer.from(encImg, 'base64')
   };

   const jsonImg = JSON.stringify(image)

   //console.log(image);
   const sqlStatement = "INSERT INTO service (serviceTitle, description, image) VALUES (?,?,?)";

   db.query(sqlStatement,[serviceTitle,description,jsonImg],(err, result) => {
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