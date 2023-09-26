import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    comment:{
        type: String,
        required: true,
    },
},{timestamps: true});

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: ''
    },
    cardImage: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    price:{
        type: Number,
        required: true,
        default: 0,
    },
    countInStock:{
        type: Number,
        required: true,
        default: 0,
    },
    colors: {
        type: [String],
    },
    brand:{
        type: String,
        required: true,
    },
    images:{
        type: [String],
        required: true,
    },
    dimensions: {
        type: mongoose.SchemaTypes.Mixed,
    },
    warranty: {
        type: String,
    },
    technicalSpecification:{
        type: mongoose.SchemaTypes.Mixed
    }
},{timestamps:true});

const Product = mongoose.model("Product", productSchema);

export default Product;
