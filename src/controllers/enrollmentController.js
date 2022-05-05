

const db = require('../helpers/mysql');
const admin = require('firebase-admin');


const serviceAccount = require("../../creative-agency-client-9d373-firebase-adminsdk-kqiyl-359dec1d23.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://creative-agency-client-9d373.firebaseio.com"
});


exports.customerEnrollment = (req, res) =>{
 
    const bearer = req.headers.authorization

    const sqlStatement = "SELECT courseName, status, image FROM customers WHERE email = ?"
      
    if(bearer && bearer.startsWith('Bearer ')){
       const idToken = bearer.split(' ')[1];
       admin.auth().verifyIdToken(idToken)
        .then((decodedToken) =>{
           let tokenEmail = decodedToken.email;
            if(tokenEmail == req.query.email){
                db.query(sqlStatement,[req.query.email],(err, result)=>{
                    res.status(200).json({
                        status: "success",
                        data: result
                    })
                });
            }
        }).catch((error) =>{
           res.status(401).send('Un authorized access')
        });
    }
    else{
       res.status(401).send('Un authorized access')
    }
    

}
