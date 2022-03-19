// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a new 'StudentSchema'
const StudentSchema = new Schema({
    id: String,
    studentNumber: Number,
    password: String,
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    phone: Number,
    email: String,
    program: String,	
});

// Create the 'Student' model out of the 'StudentSchema'
module.exports = mongoose.model('Student', StudentSchema);