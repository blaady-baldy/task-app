import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    desc: {
        type:String,
        required:true
    },
    done: Boolean
});

var taskModel = mongoose.model("Task", taskSchema);
export default taskModel;