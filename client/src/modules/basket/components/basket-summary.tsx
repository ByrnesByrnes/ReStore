import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import React from "react";
import { useStoreContext } from "../../../context/store-context";
import { priceConverter } from "../../ui";

const BasketSummary: React.FC = () => {
    const { basket } = useStoreContext();

    const subtotal = (basket?.reduce((sum, item) => sum + (item.price * item.quantity), 0)) || 0;

    const deliveryFee = 39.99;

    return (
        <TableContainer
            component={Paper}
            variant={'outlined'}
            sx={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
        >
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="right">{priceConverter(subtotal).toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Delivery fee*</TableCell>
                        <TableCell align="right">{deliveryFee}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">{Number(priceConverter(subtotal).toFixed(2)) + deliveryFee}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <span style={{ fontStyle: 'italic' }}>*Orders over $100 qualify for free delivery</span>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BasketSummary;