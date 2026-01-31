const Course = require('../schemas/courseModel');

// @desc    Get all courses
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single course
const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            res.status(404);
            throw new Error('Course not found');
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new course
const createCourse = async (req, res) => {
    if (req.user.type !== 'teacher' && req.user.type !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to create courses' });
    }

    const { C_title, C_categories, C_description, C_price } = req.body;
    const C_educator = req.user.name; 

    try {
        const course = await Course.create({
            userId: req.user.id,
            C_educator,
            C_title,
            C_categories,
            C_description,
            C_price,
            sections: []
        });
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Add section to course
const addSection = async (req, res) => {
     try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (course.userId.toString() !== req.user.id && req.user.type !== 'admin') {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const { title, description } = req.body;
        const videoUrl = req.file ? req.file.filename : '';

        const newSection = {
            title,
            description,
            videoUrl
        };

        course.sections.push(newSection);
        await course.save();

        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete course
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (course.userId.toString() !== req.user.id && req.user.type !== 'admin') {
             return res.status(401).json({ message: 'User not authorized' });
        }

        await course.deleteOne(); // Use deleteOne instead of remove
        res.status(200).json({ id: req.params.id });
    } catch (error) {
         res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCourses,
    getCourse,
    createCourse,
    addSection,
    deleteCourse
};
