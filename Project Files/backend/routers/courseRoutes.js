const express = require('express');
const router = express.Router();
const { getCourses, getCourse, createCourse, addSection, deleteCourse } = require('../controllers/courseController');
const { protect } = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ 
    storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.mp4' && ext !== '.mkv' && ext !== '.avi' && ext !== '.mov') {
            return callback(new Error('Only videos are allowed'))
        }
        callback(null, true)
    }
});

router.route('/').get(getCourses).post(protect, createCourse);
router.route('/:id').get(getCourse).delete(protect, deleteCourse);
router.route('/:id/sections').post(protect, upload.single('video'), addSection);

module.exports = router;
