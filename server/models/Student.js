// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { courseSchema } = require('./Course');

// Define a new 'StudentSchema'
const StudentSchema = new Schema({
    id: String,
    studentNumber: String,
    password: String,
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    phone: String,
    email: String,
    program: String,
    enrolledCourses: [courseSchema]
});

// Create the 'Student' model out of the 'StudentSchema'
module.exports = mongoose.model('Student', StudentSchema);