const mongoose = require("mongoose");

const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        productName: { type: String },
        description: { type: String },
        price: { type: Number },
        category: { type: String },
        imageUrl: { type: String },
        reviews: [{value:Number, content:String}],
    })
);

module.exports = Product;