// server.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

const uploadedFiles = [];

app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const fileLink = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
    uploadedFiles.push({ fileName: file.originalname, fileLink: fileLink });

    res.json({
        fileName: file.originalname,
        fileLink: fileLink,
        uploadedFiles: uploadedFiles,
    });
});

app.get('/files', (req, res) => {
    res.json(uploadedFiles);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
