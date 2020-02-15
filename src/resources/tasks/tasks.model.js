import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    description: String,
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project"
    },
    done: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("Task", taskSchema)