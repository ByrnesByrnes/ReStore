import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { agent } from "../routes";
import { MainLoader, ProductItem } from "../ui";
import { Product } from "../ui/product-item/interface/product";


export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        agent.Catalog.list()
            .then(products => setProducts(products.result))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <MainLoader />;

    return (
        <Grid container spacing={2} justifyContent="center">
            {products.map(product => (
                <Grid item xs={3} key={product.id}>
                    <ProductItem product={product} />
                </Grid>
            ))}
        </Grid>
    );
}