const Product = require("./product.model");
const axios = require('axios');
const mongoose = require("mongoose");

const avg = (reviews) => {
    let x=0;
    for(let i=0;i<reviews.length;i++){
        x+=reviews[i].value;
    }
    return x/reviews.length;
}

exports.fillData = async (req, res) => {
    await axios.get('https://tech.dev.ats-digital.com/api/products?size=100')
    .then(response => {
        const products = response.data.products;
        products.forEach(function (item, i, array) {
            const product = new Product({
                _id: new mongoose.Types.ObjectId(),
                productName: item.productName,
                description: item.description,
                price: item.price,
                category: item.category,
                imageUrl: item.imageUrl,
                reviews: item.reviews
            });
            product.save();
        });
        return res.status(200).send({ message: "Products added" });
    })
    .catch(error => {
        return res.status(500).send({ message: error });
    });
    
};

exports.getAll = (req, res) => {
    const page = parseInt(req.query.page);
    const skipIndex = (page - 1) * 20;
      Product.find()
        .sort({ _id: 1 })
        .limit(20)
        .skip(skipIndex)
        .exec()
        .then(docs => {
            const response = [];
            docs.forEach((doc) => {
                response.push({
                    id: doc._id,
                    productName: doc.productName,
                    price: doc.price,
                    category: doc.category,
                    imageUrl: doc.imageUrl,
                    reviews: avg(doc.reviews)
                });
            });
            if (docs.length >= 0) {
                return res.status(200).send(response);
            } else {
                return res.status(404).send({ message: 'No entries found' });
            }
        }).catch(err => {
            return res.status(500).send({ message: err });
        });
};

exports.getById = (req, res) => {
    Product.findById({
        _id: req.params.id
    }).then((product) => {
        if (!product) {
            return res.status(404).send({ message: "Product Not found." });
        }

        return res.status(200).send({
            productName: product.productName,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl,
            reviews: product.reviews
        });

    }).catch(err => {
        res.status(500).send({ message: err });
    });

};
