const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    C_educator: {
        type: String,
        required: true
    },
    C_categories: {
        type: String,
        required: true
    },
    C_title: {
        type: String,
        required: true
    },
    C_description: {
        type: String,
        required: true
    },
    sections: [{
        title: String,
        description: String,
        videoUrl: String
    }],
    C_price: {
        type: Number,
        required: true
    },
    enrolled: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
