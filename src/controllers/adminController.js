const db = require('../helpers/mysql');

exports.helloGet = (req, res) =>{
    res.status(200).json({
        status: "success",
        data: "This is get request"
    });
}

exports.createAdmin = (req, res) =>{
   const {email} = req.body;

   const sqlStatement = "INSERT INTO admin (email) VALUES (?)";
   
   db.query(sqlStatement, [email], (err,result) =>{
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

exports.isAdmin = (req, res) => {
     const {email} = req.body;
     
     const sqlStatement = "SELECT email FROM admin WHERE email = ?";

     db.query(sqlStatement,[email], (err, result)=>{
        if(email === result[0].email){
          res.status(200).json({
            status: "success",
            data:{
              isAdmin: true
            }
          })
        }
        else{
          res.status(401).json({
            status: "error",
            data:{
              isAdmin: false
            }
          })
        }
     })

}
