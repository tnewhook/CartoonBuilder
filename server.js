// server.js
const express = require('express'),
    path = require('path'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    multer = require('multer');

// Define Express App
const app = express();
const PORT = process.env.PORT || 8080;

//set Content Security Policy
//*
app.use(function (req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://*.google.com");
    return next();
});
//*/
// Serve Static Assets
app.use(express.static('public'));
// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
// serving static files
app.use('/uploads', express.static('uploads'));

// handle storage using multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});
var upload = multer({
    storage: storage
});

// handle single file upload
app.post('/uploadfile', upload.single('dataFile'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send({
            message: 'Please upload a file.'
        });
    }
    return res.send({
        message: 'File uploaded successfully.',
        file
    });
});

app.listen(PORT, () => {
    console.log('Server connected at:', PORT);
});