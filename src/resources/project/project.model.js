import mongoose from "mongoose";
const Schema = mongoose.Schema;

const projectModel = new Schema({
    name: String,
    vendor: {
        required: true,
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    description: String,
    startDate: {
        type: Date,
        default: Date.now()
    },
    endDate: {
        type: Date,
        required: true
    }
});

export default mongoose.model("Project", projectModel)