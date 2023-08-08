import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import products from "./data/products.js";
import users from './data/users.js';
import connectDB from "./config/db.js";
import User from "./models/userModel.js";
import Prodcut from "./models/productModel.js";
import Order from "./models/orderModel.js";

dotenv.config();

connectDB();

const importData = async()=>{
    try {
        await Order.deleteMany();
        await Prodcut.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers.find((user) => user.isAdmin===true); 
        const sampleProducts = products.map((product)=>{
            return {...product, user: adminUser}
        });

        await Prodcut.insertMany(sampleProducts);
        console.log(colors.green.inverse("Data imported successfully"));
        process.exit();
    } catch (error) {
        console.log(colors.red.inverse(`Error: ${error.message}`));
        process.exit(1);
    }
}

const destroyData = async()=>{
    try {
        await Prodcut.deleteMany();
        await Order.deleteMany();
        await User.deleteMany();
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