import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Product from './Product';


const ProductCard = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const res = await axios.get('https://pdbk.herokuapp.com/api/products/' + id);
            setProduct(res.data);
            console.log(product);
            setLoading(false);
        };
        fetchProduct();
    }, []);
    return (
        <div>
            <Product product={product} loading={loading} />
        </div>

    );
};

export default ProductCard;