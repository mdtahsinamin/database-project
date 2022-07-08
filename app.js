
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./src/routes/route');
const fileUpload = require('express-fileupload');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use(fileUpload({ useTempFiles : true}));
app.use(express.static('services'));


app.use('/v1',router);


// Not Found Route 
app.use('*',(req, res) => {
     res.json({ 
        data:'Not Found'
     })
})

module.exports = app;