import React, { useState, useEffect } from 'react';
import Products from './Products';
import { Pagination } from "@mui/lab";
import axios from 'axios';

const ProductsTable = () => {

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const res = await axios.get('http://localhost:3005/api/products?page=' + currentPage);
            setProducts(res.data);
            console.log(products);
            setLoading(false);
        };

        fetchProducts();
    }, [currentPage]);


    const totalProducts = 100;
    const productsPerPage = 20;
    const count = Math.ceil(totalProducts / productsPerPage);

    const handleChange = (e, p) => {
        setCurrentPage(p);
    }

    return (
        <div>
            <Pagination
                count={count}
                size="large"
                page={currentPage}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
            />
            <Products products={products} loading={loading} />

        </div>



    );
};

export default ProductsTable;