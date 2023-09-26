import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import products from "./data/products.js";
import categories from './data/categories.js';
import users from './data/users.js';
import connectDB from "./config/db.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import Category from "./models/categoryModel.js";

dotenv.config();

connectDB();

const importData = async()=>{
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Category.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers.find((user) => user.isAdmin===true); 
        const sampleProducts = products.map((product)=>{
            return {...product, user: adminUser}
        });
        
        const productCategories = products.reduce((acc, product)=>{
            let foundCategory = acc.find((x)=>x.name === product.category);
            if(foundCategory){
                let index = acc.indexOf(foundCategory);
                acc[index].colors = [...acc[index].colors, ...product.colors.filter((color) => acc[index].colors.indexOf(color) === -1)];
                if(acc[index].brands.indexOf(product.brand) === -1) 
                    acc[index].brands = [...acc[index].brands, product.brand];
                if(acc[index].price.min > product.price)//current price is lowest price
                    acc[index].price.min = product.price
                if(acc[index].price.max < product.price)//current price is highest price
                    acc[index].price.max = product.price
            }else{
                foundCategory = {
                    user: adminUser,
                    name: product.category,
                    brands: [product.brand],
                    colors: [...product.colors],
                    price: {min: product.price, max: product.price}
                }
                return [...acc, foundCategory]
            }
            return acc;
        }, []);

        let sampleCategories = categories.map((category) => {return {...category, user: adminUser}})

        sampleCategories = sampleCategories.map((category) =>{
            const foundCategory = productCategories.find((productCategory)=> category.name === productCategory.name);
            if(foundCategory)
                return {...category, ...foundCategory};
            return {...category}
        })

        // console.log(sampleCategories);

        await Category.insertMany(sampleCategories);
        await Product.insertMany(sampleProducts);
        console.log(colors.green.inverse("Data imported successfully"));
        process.exit();
    } catch (error) {
        console.log(colors.red.inverse(`Error: ${error.message}`));
        process.exit(1);
    }
}

const destroyData = async()=>{
    try {
        await Product.deleteMany();
        await Order.deleteMany();
        await User.deleteMany();
        await Category.deleteMany();
        console.log(colors.red.inverse("Data destroyed successfully"));
        process.exit();
    } catch (error) {
        console.log(colors.red.inverse(`Error: ${error.message}`));
        process.exit(1);
    }
}

if(process.argv[2] === "-d") {
    destroyData();
}else{
    importData();
}