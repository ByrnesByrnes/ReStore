import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableRow, TableCell, Box } from "@mui/material";
import React from 'react';
import { priceConverter } from "../../ui";
import { BasketItem } from "../interfaces/basket-item";
import { LoadStates as Load } from "./interfaces/load-states";

interface Props {
  item: BasketItem;
  onRemoveItem: (productId: number, loadType: Load, quantity?: number) => void;
  onAddItem: (productId: number) => void;
  loading: string;
}

const TableBasketItem: React.FC<Props> = ({ item, onRemoveItem, onAddItem, loading }) => {

  return (
    <TableRow
      key={item.productId}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <Box display="flex" alignItems="center">
          <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: "1em" }} />
          {item.name}
        </Box>
      </TableCell>
      <TableCell align="right">${priceConverter(item.price).toFixed(2)}</TableCell>
      <TableCell align="center">
        <LoadingButton aria-label="Reduce Quantity" loading={loading === Load.Remove + item.productId} color="error" onClick={() => onRemoveItem(item.productId, Load.Remove)}>
          <Remove />
        </LoadingButton>
        {item.quantity}
        <LoadingButton aria-label="Increase Quantity" loading={loading === Load.Add + item.productId} color="secondary" onClick={() => onAddItem(item.productId)}>
          <Add />
        </LoadingButton>
      </TableCell>
      <TableCell align="right">${(priceConverter(item.price) * item.quantity).toFixed(2)}</TableCell>
      <TableCell align="right">
        <LoadingButton aria-label="Remove Item" loading={loading === Load.RemoveAll + item.productId} color="error" onClick={() => onRemoveItem(item.productId, Load.RemoveAll, item.quantity)}>
          <Delete />
        </LoadingButton>
      </TableCell>
    </TableRow>
  );
};

export default TableBasketItem;