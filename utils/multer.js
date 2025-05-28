const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const hash = crypto.randomBytes(16).toString('hex');
        const cleanName = file.originalname.replace(/\s+/g, ''); // remove spaces
        const finalFilename = `${hash}-${cleanName}`;
        req.savedImageFilename = finalFilename; // ✅ Save the filename to the request
        cb(null, finalFilename);
    }
});

const singleUpload = multer({ storage }).single('image');
const multipleUpload = multer({ storage }).array('images', 10);

module.exports = { singleUpload, multipleUpload };
