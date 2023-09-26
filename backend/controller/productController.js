import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import Category from '../models/categoryModel.js';

//@desc Fetch all products
//@route GET/api/products
//@access Public
const getProducts = asyncHandler(async (req, res)=>{
    const pageSize = 8;

    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword 
        ? { name: { $regex: req.query.keyword, $options: 'i' } } 
        : {}; 

    let searchObject = {};
    //search by keyword
    if(req.query.keyword){
        searchObject = {...keyword}
    }
    //search by category
    if(req.query.category){
        searchObject = {category : req.query.category}
    }
    //search by brand
    if(req.query.brand){
        searchObject = {brand : req.query.brand}
    }
    const count = await Product.countDocuments(searchObject);

    const products = await Product.find(searchObject)
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.json({products, page, pages: Math.ceil(count/pageSize)});
});


//@desc Fetch single product
//@route GET /api/products/:id
//@access Public
const getProductById = asyncHandler(async (req, res)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(404);
        throw new Error("Resource not found");
    }
    res.json(product);
});

//@desc Fetch single product
//@route GET /api/products/newArrivals
//@access Public
const getNewArrivals = asyncHandler(async (req, res)=>{
    const products = await Product.find().sort({createdAt: -1}).limit(2);
    if(!products){
        res.status(404);
        throw new Error("Resource not found");
    }
    res.json(products);
});

//@desc Fetch single product
//@route GET /api/products/categories
//@access Public
const getCategories = asyncHandler(async (req, res)=>{
    const categories = await Category.find({}).select(['-user']);
    res.status(200).json(categories);
});

//@desc Fetch single product
//@route GET /api/products/category
//@access Public
const getCategory = asyncHandler(async (req, res)=>{
    const categories = await Category.findOne({name: req.params.name}).select(['-user']);
    res.status(200).json(categories);
});

//@desc Fetch all products
//@route POST/api/products
//@access Private/Admin
const createProduct = asyncHandler(async (req, res)=>{
    const product = new Product({
        name: 'Sample Name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Samble Brand',
        category: 'Sample Category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description',
    })

    const createdProuct = await product.save();
    res.status(200).json(createdProuct);
});

//@desc Update product
//@route PUT/api/products/:id
//@access Private/Admin
const updateProduct = asyncHandler(async (req, res)=>{
    const { name, price, description, image, brand, category, countInStock, colors } = req.body;
    
    const product = await Product.findById(req.params.id);

    if(product){
        product.name = name;
        product.price = price;
        product.description = description;
        product.category = category;
        product.countInStock = countInStock;
        product.image = image;
        product.brand = brand;
        
        const updatedProduct = await product.save();

        const findCategory = await Category.find({ name: category });
        if(!findCategory.length){
            const categoryObject = new Category({
                name: category,
                user: req.user._id,
                brands: [brand], 
                colors: [...colors]                        
            })
            await categoryObject.save();
        }
        res.json(updatedProduct);
    }else{
        res.status(404);
        throw new Error('product not found');
    }
});

//@desc Update product
//@route PUT/api/products/:id
//@access Private/Admin

const deleteProduct = asyncHandler(async (req, res)=>{
    
    const product = await Product.findById(req.params.id);

    if(product){
        await Product.deleteOne({_id: product._id});
        res.status(200).json({message: 'Product Deleted'})
    }else{
        res.status(404);
        throw new Error('Resource Not Found');
    }
});

//@desc Create a new review
//@route PUT/api/products/:id/reviews
//@access Private

const createProductReview = asyncHandler(async (req, res)=>{

    const { rating, comment } = req.body;
    
    const product = await Product.findById(req.params.id);

    if(product){
        const alreadyReviewed = product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
        );
        if(alreadyReviewed){
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }
        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating = 
            product.reviews.reduce((acc, review) => acc + review.rating, 0)/
            product.reviews.length;

        await product.save();
        res.status(201).json({message: 'Review added'});
    }else{
        res.status(404);
        throw new Error('Resource Not Found');
    }
});

export {    
            getProductById, 
            getProducts, 
            createProduct, 
            updateProduct, 
            deleteProduct,
            createProductReview, 
            getNewArrivals, 
            getCategories, 
            getCategory
        };
