import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography, Grid, Button } from "@mui/material";
import React, { useState } from "react";
import { useStoreContext } from "../../context/store-context";
import { Link } from "react-router-dom";
import { agent, CHECKOUT } from "../routes";
import { BasketItem, BasketSummary } from "./components";
import { LoadStates as Load } from "./components/interfaces/load-states";


const Basket = () => {
    const { basket, setBasket, removeItem } = useStoreContext();
    const [loading, setLoading] = useState<string>(Load.None);

    const handleAddItem = (productId: number) => {
        setLoading(Load.Add + productId);

        agent.Basket.addItem(productId)
            .then(basket => setBasket(basket.items.$values))
            .catch(error => console.error(error))
            .finally(() => setLoading(Load.None));
    };

    const handleRemoveItem = (productId: number, action: Load, quantity: number = 1,) => {
        setLoading(action + productId);

        agent.Basket.removeItem(productId)
            .then(() => removeItem(productId, quantity))
            .catch(error => console.error(error))
            .finally(() => setLoading(Load.None));
    };

    if (!basket) return <Typography variant="h3">Your Basket is Empty</Typography>;

    return (
        <>
            <TableContainer component={Paper} sx={{ borderBottomRightRadius: 0 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket?.map((item) => (
                            <BasketItem
                                key={item.productId}
                                item={item}
                                onRemoveItem={handleRemoveItem}
                                onAddItem={handleAddItem}
                                loading={loading}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container >
                <Grid item xs={6} />
                <Grid item xs={6} component={Paper}>
                    <BasketSummary />
                    <Button
                        component={Link}
                        to={CHECKOUT}
                        variant="contained"
                        size="large"
                        fullWidth
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default Basket;