const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TaskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    scheduledDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: false
    }
});

const Task = mongoose.model('tasks', TaskSchema);
module.exports = Task;