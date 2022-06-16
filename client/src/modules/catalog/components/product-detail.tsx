import React, { useEffect, useState } from 'react'
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { Product } from '../../ui/product-item/interface/product';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { LocalDining } from '@mui/icons-material';

export default function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then(response => setProduct(response.data.result))
      .catch(error => error)
      .finally(() => setLoading(false));
  }, [])

  if (loading) return <h3>Loading...</h3>

  if (!product) return <h3>Product not found</h3>

  return (
    <Grid container spacing={6} sx={{ mt: 5 }}>
      <Grid item xs={6}>
        <img src={product.pictureUrl} alt={product.name} style={{ width: "100%" }} />
      </Grid>
      <Grid xs={6}>
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
      </Grid>
    </Grid>
  )
}
