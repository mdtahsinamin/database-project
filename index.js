const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({path:"./config.env"});

const port = process.env.PORT || 4000 ; 

app.listen(port ,()=>{
       console.log(`Server is running on port ${port}`);    
})

