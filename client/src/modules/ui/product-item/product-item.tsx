import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { Product } from './interface/product'

interface Props {
    product: Product
}

const ProductItem = ({ product }: Props) => {

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
                sx={{ height: 140, objectFit: "contain", bgcolor: "text.secondary" }}
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
                    <Button size="small">Add to Cart</Button>
                    <Button size="small">View</Button>
                </CardActions>
            </Box>
        </Card>
    )
}

export default ProductItem;
