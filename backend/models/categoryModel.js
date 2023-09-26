import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    screenImageSource:{
        type: String,
        required: true
    },
    cardImageSource: {
        type: String,
        required: true
    },
    brands:{
        type: [String],
        required: true,
    },
    colors:{
        type: [String],
        default: [],
        required: true,
    },
    description:{
        type: String,
        default: '',
        required: true,
    },
    price:{
        type: mongoose.Schema.Types.Mixed,
        default: {min: 0, max: 0},
        require: true
    }
    // filters:{
    //     type: [String],
    //     defaultValue: ['Price', 'Color', ''],
    // }
},{timestamps: true});

const Category = mongoose.model("Category", categorySchema);

export default Category;