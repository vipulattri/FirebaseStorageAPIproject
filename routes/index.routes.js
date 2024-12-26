const express = require('express');
const router = express.Router();
const fileModel = require('../models/files.models');
const upload = require('../config/multer.config');

// Route to render the home page
router.get('/home', (req, res) => {
    res.render('home');
});

// Route to handle file upload
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: 'No file uploaded'
            });
        }

        // Save the uploaded file information to the database
        const newFile = await fileModel.create({
            path: req.file.path,           // Path of the uploaded file
            originalname: req.file.originalname,  // Original file name
        });

        // Send a response back to the client
        res.status(201).json({
            message: 'File uploaded successfully',
            file: newFile  // Return file details
        });
    } catch (error) {
        // Handle any error that occurs during file upload or database operation
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while uploading the file',
            error: error.message
        });
    }
});

module.exports = router;
