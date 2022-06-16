import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { ProductItem } from "../ui/index";
import { Product } from '../ui/product-item/interface/product';
import axios from "axios";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then((response) => setProducts(response.data.result))            
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
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