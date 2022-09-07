import React, { useEffect, useState } from "react";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { Product } from "../../ui/product-item/interfaces/product";
import { useParams } from "react-router-dom";
import { agent } from "../../routes";
import { MainLoader, NotFound } from "../../ui";
import { useStoreContext } from "../../../context/store-context";
import { LoadingButton } from "@mui/lab";

export default function ProductDetail() {
  const { basket, setBasket, removeItem } = useStoreContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(0);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const item = basket?.find(i => i.productId === product?.id);

  const { id } = useParams<{ id: string; }>();

  useEffect(() => {

    if (item) {
      setQuantity(item.quantity);
    }

    agent.Catalog.details(Number(id))
      .then(product => setProduct(product.result))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, [id, item]);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentQuantity = Number(event?.target.value);

    if (currentQuantity >= 0) {
      setQuantity(currentQuantity);
    }
  };

  const handleUpdateCard = () => {
    setSubmitting(true);

    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;

      agent.Basket.addItem(product?.id!, updatedQuantity)
        .then(basket => setBasket(basket.items.$values))
        .catch(error => console.error(error))
        .finally(() => setSubmitting(false));
    } else {
      const updatedQuantity = item.quantity - quantity;

      agent.Basket.removeItem(product?.id!, updatedQuantity)
        .then(basket => removeItem(product?.id!, updatedQuantity))
        .catch(error => console.error(error))
        .finally(() => setSubmitting(false));
    }

  };


  if (loading) return <MainLoader />;

  if (!product) return <NotFound />;

  return (
    <Grid container spacing={6} sx={{ mt: 5 }}>
      <Grid item xs={6}>
        <img src={product.pictureUrl} alt={product.name} style={{ width: "100%" }} />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">${product.price / 100}</Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={(quantity === item?.quantity) || (!item && quantity === 0)}
              loading={submitting}
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
              onClick={handleUpdateCard}
            >
              {item ? "Update Quantity" : "Add to Cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
