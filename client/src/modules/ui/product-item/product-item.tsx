import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Typography } from "@mui/material";
import React, { useState } from "react";
import { Product } from "./interfaces/product";
import { Link } from "react-router-dom";
import { agent, CATALOG } from "../../routes";
import { useStoreContext } from "../../../context/store-context";

interface Props {
    product: Product;
}

const ProductItem = ({ product }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setBasket } = useStoreContext();

    const handleAddItem = (productId: number) => {
        setLoading(true);
        agent.Basket.addItem(productId)
            .then((basket) => setBasket(basket.items.$values))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    };

    return (
        <Card sx={{ borderRadius: "8px" }} variant="outlined">
            <CardHeader
                avatar={<Avatar sx={{ bgcolor: "secondary.main" }}>{product.name[0].toUpperCase()}</Avatar>}
                title={product.name}
                titleTypographyProps={{
                    sx: { fontWeight: "bold", color: "primary.main" }
                }}
            >
            </CardHeader>
            <CardMedia
                component="img"
                sx={{ height: 140, objectFit: "contain", bgcolor: "primary.light" }}
                image={product.pictureUrl}
                alt={product.name} title={product.name}
            />
            <Box>
                <CardContent>
                    <Typography variant="h5" color="secondary">${(product.price / 100).toFixed(2)}</Typography>
                    <Typography variant="body2" color="text.secondary">{product.brand} / {product.type}</Typography>
                    {/* <Typography variant="body2" color="text.secondary">{product.description}</Typography> */}
                </CardContent>
                <CardActions>
                    {/* update this loader  */}
                    {loading ?
                        <CircularProgress /> :
                        <Button size="small" onClick={() => handleAddItem(product.id)}>Add to Cart</Button>
                    }
                    <Button size="small" component={Link} to={`${CATALOG}/${product.id}`}>View</Button>
                </CardActions>
            </Box>
        </Card>
    );
};

export default ProductItem;
