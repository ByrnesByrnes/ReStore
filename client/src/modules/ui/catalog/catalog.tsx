import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { ProductItem } from "../index";
import { Product } from '../product-item/interface/product';

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/products")
            .then((response) => response.json())
            .then((data) => setProducts(data.result))
            .catch((error) => console.error(error));
    }, [])

    return (
        <Grid container spacing={2} justifyContent="center">
            {products.map(product => (
                <Grid item xs={3} key={product.id}>
                    <ProductItem product={product} />
                </Grid>
            ))}
        </Grid>
    )
}