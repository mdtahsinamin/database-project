const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require('cloudinary').v2
dotenv.config({path:"./config.env"});

cloudinary.config({ 
       cloud_name: 'dgkcxtxh7', 
       api_key: '192638246624229', 
       api_secret: 'UQlEt7rAfVhbzDE004ibJ72TWqA' 
});

const port = process.env.PORT || 4000 ; 

app.listen(port ,()=>{
       console.log(`Server is running on port ${port}`);    
})

