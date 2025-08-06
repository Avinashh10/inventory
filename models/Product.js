const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:String,
    price:String,
    quantity:Number,
    category:String,
    inStock:Boolean
},{timestamps:true});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;