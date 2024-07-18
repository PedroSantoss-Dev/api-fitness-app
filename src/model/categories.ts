import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    exercise:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
    }
});

const Category = mongoose.model("Category", categorySchema);
export default Category