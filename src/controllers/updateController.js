const db = require('../helpers/mysql');

exports.updateEnrollCourseStatus = (req, res) =>{
    const status = req.body.status;
    const id = req.params.id;
    console.log(status, id)
    const sqlStatement = "UPDATE customers SET status = ? WHERE customerId = ?"
    db.query(sqlStatement,[status,id],(err, result)=>{
        try {
            res.status(200).json({
                status: "success",
                data: result
            });
        } catch (error) {
            res.status(400).json({
                status: "error",
                data: err
            })
        }
    });
}